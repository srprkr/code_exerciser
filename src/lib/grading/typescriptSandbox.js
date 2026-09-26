// Main-thread facade for TypeScript. Deliberately mirrors sandbox.js's
// runCode(code, { onConsoleLine, onDone }) / teardownSandbox() shape (like
// pythonSandbox.js does) so CodeEditor.svelte picks a runner per language
// and nothing downstream needs to know TypeScript exists.
//
// A run is two steps: typescriptWorker.js type-checks and transpiles, then
// the emitted JavaScript runs in sandbox.js. Type errors don't stop the run
// (tsc emits despite errors too, and seeing the output helps) — they're
// printed first and passed along as `typeErrors` on the done payload, which
// grade.js treats as a fail.
import { runCode as runJavaScript, teardownSandbox as teardownJavaScript } from './sandbox.js';

let worker = null;
let messageHandler = null;

function getWorker() {
  if (worker) return worker;
  worker = new Worker(new URL('./typescriptWorker.js', import.meta.url), { type: 'module' });
  return worker;
}

export function formatTypeError({ line, message }) {
  return line ? `Type error (line ${line}): ${message}` : `Type error: ${message}`;
}

// onRuntimeStatus(status) fires with 'loading'/'loaded'/'error' — only on
// the first TypeScript run this page load, while the compiler downloads.
export function runCode(code, { onConsoleLine, onRuntimeStatus, onDone } = {}) {
  const w = getWorker();

  if (messageHandler) {
    w.removeEventListener('message', messageHandler);
  }

  messageHandler = (event) => {
    const { type, payload } = event.data;

    if (type === 'runtime-status') {
      if (onRuntimeStatus) onRuntimeStatus(payload.status);
      return;
    }
    if (type !== 'compiled') return;

    w.removeEventListener('message', messageHandler);
    messageHandler = null;

    if (payload.error) {
      if (onConsoleLine) onConsoleLine(payload.error, true);
      if (onDone) onDone({ hasLastLogValue: false, lastLogValue: null, allLogValues: [], typeErrors: [] });
      return;
    }

    const { js, typeErrors } = payload;
    if (onConsoleLine) typeErrors.forEach((typeError) => onConsoleLine(formatTypeError(typeError), true));

    runJavaScript(js, {
      onConsoleLine,
      onDone: (runPayload) => {
        if (onDone) onDone({ ...runPayload, typeErrors });
      }
    });
  };

  w.addEventListener('message', messageHandler);
  w.postMessage({ type: 'compile', code });
}

// Like pythonSandbox.js, keeps the worker alive — the compiler download
// should be paid once per page session, not once per exercise.
export function teardownSandbox() {
  if (worker && messageHandler) {
    worker.removeEventListener('message', messageHandler);
    messageHandler = null;
  }
  teardownJavaScript();
}
