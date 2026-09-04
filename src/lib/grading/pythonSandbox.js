// Main-thread facade over pythonWorker.js. Deliberately mirrors sandbox.js's
// runCode(code, { onConsoleLine, onDone }) / teardownSandbox() shape so
// CodeEditor.svelte can pick between the two with one branch, and so
// grade.js's decideCheckResult() — which only ever sees the onDone payload
// — works unmodified for Python.
let worker = null;
let messageHandler = null;

function getWorker() {
  if (worker) return worker;
  worker = new Worker(new URL('./pythonWorker.js', import.meta.url), { type: 'module' });
  return worker;
}

// Runs `code` as Python. onConsoleLine(text, isError) fires for each printed
// line (in order) and for a runtime error's traceback. onRuntimeStatus(status)
// fires with 'loading'/'loaded'/'error' — only on the very first Python run
// this page load, since the worker's loadPyodide() promise is memoized and
// resolves instantly after that. onDone(payload) fires once with
// { hasLastLogValue, lastLogValue, allLogValues } — identical shape to
// sandbox.js's JS runner, so the same grading code handles both.
export function runCode(code, { onConsoleLine, onRuntimeStatus, onDone } = {}) {
  const w = getWorker();

  if (messageHandler) {
    w.removeEventListener('message', messageHandler);
  }

  messageHandler = (event) => {
    const { type, payload } = event.data;

    if (type === 'runtime-status') {
      if (onRuntimeStatus) onRuntimeStatus(payload.status);
    } else if (type === 'console') {
      if (onConsoleLine) onConsoleLine(payload.args.join(' '), payload.level === 'error');
    } else if (type === 'done') {
      w.removeEventListener('message', messageHandler);
      messageHandler = null;
      if (onDone) onDone(payload);
    }
  };

  w.addEventListener('message', messageHandler);
  w.postMessage({ type: 'run', code });
}

// Called on component teardown so a run in flight doesn't leave a dangling
// listener if the page/component unmounts mid-grade. Deliberately does NOT
// terminate the worker — Pyodide's ~1s load cost should only be paid once
// per page session, not once per exercise navigation.
export function teardownSandbox() {
  if (worker && messageHandler) {
    worker.removeEventListener('message', messageHandler);
    messageHandler = null;
  }
}
