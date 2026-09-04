// Runs Python code via Pyodide inside a dedicated Web Worker, so the ~1s
// runtime load and every execution stay off the main thread — the page
// never freezes waiting on Python the way it would running Pyodide inline.
// Self-hosted from public/pyodide/ (see scripts/copy-pyodide-assets.mjs)
// rather than a CDN, both for load-time (measured faster) and to not
// depend on a third party's uptime at runtime.
//
// The actual execution/value-capture logic lives in pythonRunner.js (kept
// separate so it's unit-testable directly with a real Pyodide instance,
// without needing a Worker or the self-hosted browser assets this file
// loads). This file is just the Worker-side loading and postMessage glue.
import { RUNNER_PY, runPythonSource } from './pythonRunner.js';

let pyodideReadyPromise = null;

// Status messages fire exactly once per page session — the first call
// that actually triggers a real load. Every call after that returns the
// same resolved promise without re-entering this branch, so the main
// thread's "loaded" UI state (which persists once set) never needs a
// repeat signal.
function getPyodide() {
  if (!pyodideReadyPromise) {
    self.postMessage({ type: 'runtime-status', payload: { status: 'loading' } });

    pyodideReadyPromise = (async () => {
      const indexURL = `${self.location.origin}${import.meta.env.BASE_URL}pyodide/`;
      // Loaded by URL rather than `import 'pyodide'` so the JS glue and the
      // .wasm/stdlib it fetches alongside itself come from the same
      // self-hosted copy — see scripts/copy-pyodide-assets.mjs.
      const { loadPyodide } = await import(/* @vite-ignore */ `${indexURL}pyodide.mjs`);
      const pyodide = await loadPyodide({ indexURL });
      pyodide.runPython(RUNNER_PY);
      self.postMessage({ type: 'runtime-status', payload: { status: 'loaded' } });
      return pyodide;
    })();
  }
  return pyodideReadyPromise;
}

self.onmessage = async (event) => {
  if (!event.data || event.data.type !== 'run') return;
  const { code } = event.data;

  let pyodide;
  try {
    pyodide = await getPyodide();
  } catch (err) {
    self.postMessage({ type: 'runtime-status', payload: { status: 'error' } });
    self.postMessage({ type: 'console', payload: { level: 'error', args: [`Failed to load the Python runtime: ${err.message}`] } });
    self.postMessage({ type: 'done', payload: { hasLastLogValue: false, lastLogValue: null, allLogValues: [] } });
    return;
  }

  const result = runPythonSource(pyodide, code);

  if (result.threw) {
    // Pyodide's error message is the full Python traceback (multiple
    // lines) — more useful for debugging than a single summary line, and
    // the console panel's `white-space: pre-wrap` renders it correctly as
    // one entry.
    self.postMessage({ type: 'console', payload: { level: 'error', args: [result.errorMessage] } });
  } else {
    for (const line of result.textLines) {
      self.postMessage({ type: 'console', payload: { level: 'log', args: [line] } });
    }
  }

  self.postMessage({
    type: 'done',
    payload: {
      hasLastLogValue: result.hasLastLogValue,
      lastLogValue: result.lastLogValue,
      allLogValues: result.allLogValues
    }
  });
};
