// Runs user code in a sandboxed iframe (sandbox="allow-scripts", no
// allow-same-origin) and reports back every console.log call made during
// the run, via postMessage. The iframe is a single long-lived node
// appended directly to document.body, deliberately OUTSIDE the Svelte
// component tree — do not move this into a component's template, since
// Svelte's DOM diffing could interfere with the srcdoc-reassignment timing
// this relies on for giving each run a fresh global scope.
//
// User code runs as an async function (so top-level await works), and a
// run only counts as finished once its promise has settled AND no timers
// or mock fetches are still pending — otherwise setTimeout/await/fetch
// exercises would be graded before they'd logged anything. A hard cap
// keeps a never-cleared setInterval from hanging the run forever.

import { MOCK_API_BASE, MOCK_API_DATA, createMockFetch } from './mockApi.js';

export const RUN_TIME_LIMIT_MS = 5000;

// How long the sandbox must stay idle (no pending timers/fetches, no new
// activity) before it reports done. Some promise work — e.g. reading a
// Response body — resolves on a later task rather than a microtask, so
// "nothing pending right now" isn't quite enough on its own.
const IDLE_GRACE_MS = 50;

const SANDBOX_HTML = `<!DOCTYPE html>
<html><body><script>
  const send = (type, payload) => parent.postMessage({ source: 'code-editor-sandbox', type, payload }, '*');

  const realSetTimeout = window.setTimeout.bind(window);
  const realClearTimeout = window.clearTimeout.bind(window);
  const realSetInterval = window.setInterval.bind(window);

  // Timer ids (timeouts and intervals alike) that haven't fired/been
  // cleared yet, plus mock fetches still in flight. The run isn't done
  // while either is non-empty.
  const activeTimers = new Set();
  let fetchesInFlight = 0;
  // Bumped on any event that could lead to more output, so the idle check
  // can tell "quiet for the whole grace period" from "just went quiet".
  let activity = 0;
  let codeSettled = false;
  let threw = false;
  let finished = false;

  window.setTimeout = (callback, delay, ...args) => {
    const id = realSetTimeout(() => {
      activeTimers.delete(id);
      activity++;
      try {
        if (typeof callback === 'function') callback(...args);
      } finally {
        scheduleIdleCheck();
      }
    }, delay);
    activeTimers.add(id);
    return id;
  };

  window.setInterval = (callback, delay, ...args) => {
    const id = realSetInterval(() => {
      activity++;
      if (typeof callback === 'function') callback(...args);
    }, delay);
    activeTimers.add(id);
    return id;
  };

  // Browsers let clearTimeout and clearInterval cancel either kind of
  // timer, so one implementation serves both.
  window.clearTimeout = window.clearInterval = (id) => {
    activeTimers.delete(id);
    realClearTimeout(id);
    activity++;
    scheduleIdleCheck();
  };

  window.fetch = (${createMockFetch.toString()})(
    ${JSON.stringify(MOCK_API_BASE)},
    ${JSON.stringify(MOCK_API_DATA)},
    {
      start() { fetchesInFlight++; activity++; },
      end() { fetchesInFlight--; activity++; scheduleIdleCheck(); },
      setTimeout: realSetTimeout
    }
  );

  // Every console.log call this run makes, in order — not just the last.
  // Needed so exercises that log one line per loop iteration (rather than
  // one final result) can still be graded correctly; see runCode's caller
  // for how "last value" vs "all values" candidates are both checked.
  let logCalls = [];

  ['log', 'warn', 'error', 'info'].forEach((level) => {
    console[level] = (...args) => {
      activity++;
      if (level === 'log') logCalls.push(args.length === 1 ? args[0] : args);
      send('console', { level, args: args.map((a) => {
        try { return typeof a === 'string' ? a : JSON.stringify(a, null, 2); }
        catch { return String(a); }
      }) });
    };
  });

  window.addEventListener('error', (event) => {
    send('console', { level: 'error', args: [event.message] });
  });

  // A promise that rejects with nothing awaiting it (e.g. an un-awaited
  // async call that throws) would otherwise fail silently.
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    const message = reason && reason.message ? reason.message : String(reason);
    send('console', { level: 'error', args: ['Uncaught (in promise): ' + message] });
  });

  // JSON.stringify(undefined) returns the value undefined (not a string),
  // so JSON.parse would throw — handle it directly so exercises like
  // "what does .find() return when nothing matches?" can still grade a
  // console.log(undefined) as real output.
  function serializeLoggedValue(value) {
    if (value === undefined) return { ok: true, value: undefined };
    try {
      return { ok: true, value: JSON.parse(JSON.stringify(value)) };
    } catch {
      return { ok: false, value: null };
    }
  }

  function isIdle() {
    return codeSettled && activeTimers.size === 0 && fetchesInFlight === 0;
  }

  function scheduleIdleCheck() {
    realSetTimeout(checkIdle, 0);
  }

  function checkIdle() {
    if (finished || !isIdle()) return;
    const activityAtCheck = activity;
    realSetTimeout(() => {
      if (finished || !isIdle()) return;
      if (activity !== activityAtCheck) return checkIdle();
      finish();
    }, ${IDLE_GRACE_MS});
  }

  function finish() {
    if (finished) return;
    finished = true;

    let hasLastLogValue = false;
    let lastLogValue = null;
    let allLogValues = [];

    if (!threw && logCalls.length > 0) {
      const lastResult = serializeLoggedValue(logCalls[logCalls.length - 1]);
      hasLastLogValue = lastResult.ok;
      lastLogValue = lastResult.value;

      allLogValues = logCalls
        .map(serializeLoggedValue)
        .filter((r) => r.ok)
        .map((r) => r.value);
    }

    send('done', { hasLastLogValue, lastLogValue, allLogValues });
  }

  const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

  window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'run') {
      realSetTimeout(() => {
        if (finished) return;
        send('console', {
          level: 'error',
          args: ['Stopped waiting after ${RUN_TIME_LIMIT_MS / 1000}s — a timer, interval, or request was still pending.']
        });
        finish();
      }, ${RUN_TIME_LIMIT_MS});

      let run;
      try {
        run = new AsyncFunction(event.data.code)();
      } catch (err) {
        // Syntax errors throw from the constructor, before anything runs.
        run = Promise.reject(err);
      }

      run.then(
        () => {
          codeSettled = true;
          scheduleIdleCheck();
        },
        (err) => {
          threw = true;
          send('console', { level: 'error', args: [err && err.message ? err.message : String(err)] });
          finish();
        }
      );
    }
  });

  send('ready', null);
<\/script></body></html>`;

let sandboxFrame = null;
let messageHandler = null;

function getSandboxFrame() {
  if (sandboxFrame) return sandboxFrame;

  sandboxFrame = document.createElement('iframe');
  sandboxFrame.setAttribute('sandbox', 'allow-scripts');
  sandboxFrame.style.display = 'none';
  document.body.appendChild(sandboxFrame);
  return sandboxFrame;
}

// Runs `code` in the sandbox. onConsoleLine(text, isError) is called for
// every console line produced during the run (in order); onDone(payload)
// is called once with { hasLastLogValue, lastLogValue, allLogValues }.
export function runCode(code, { onConsoleLine, onDone } = {}) {
  const frame = getSandboxFrame();

  if (messageHandler) {
    window.removeEventListener('message', messageHandler);
  }

  messageHandler = (event) => {
    if (!event.data || event.data.source !== 'code-editor-sandbox') return;

    if (event.data.type === 'ready') {
      frame.contentWindow.postMessage({ type: 'run', code }, '*');
    } else if (event.data.type === 'console') {
      const { level, args } = event.data.payload;
      if (onConsoleLine) onConsoleLine(args.join(' '), level === 'error');
    } else if (event.data.type === 'done') {
      window.removeEventListener('message', messageHandler);
      messageHandler = null;
      if (onDone) onDone(event.data.payload);
    }
  };

  window.addEventListener('message', messageHandler);

  // Reloading the srcdoc gives each run a fresh global scope.
  frame.srcdoc = SANDBOX_HTML;
}

// Called on component teardown so a run in flight doesn't leave a dangling
// listener if the page/component unmounts mid-grade.
export function teardownSandbox() {
  if (messageHandler) {
    window.removeEventListener('message', messageHandler);
    messageHandler = null;
  }
}
