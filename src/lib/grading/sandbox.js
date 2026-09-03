// Runs user code in a sandboxed iframe (sandbox="allow-scripts", no
// allow-same-origin) and reports back every console.log call made during
// the run, via postMessage. The iframe is a single long-lived node
// appended directly to document.body, deliberately OUTSIDE the Svelte
// component tree — do not move this into a component's template, since
// Svelte's DOM diffing could interfere with the srcdoc-reassignment timing
// this relies on for giving each run a fresh global scope.

const SANDBOX_HTML = `<!DOCTYPE html>
<html><body><script>
  const send = (type, payload) => parent.postMessage({ source: 'code-editor-sandbox', type, payload }, '*');

  // Every console.log call this run makes, in order — not just the last.
  // Needed so exercises that log one line per loop iteration (rather than
  // one final result) can still be graded correctly; see runCode's caller
  // for how "last value" vs "all values" candidates are both checked.
  let logCalls = [];

  ['log', 'warn', 'error', 'info'].forEach((level) => {
    console[level] = (...args) => {
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

  window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'run') {
      let threw = false;
      try {
        new Function(event.data.code)();
      } catch (err) {
        threw = true;
        send('console', { level: 'error', args: [err.message] });
      }

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
