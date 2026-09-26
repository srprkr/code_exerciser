// Type-checks and transpiles TypeScript inside a dedicated Web Worker, so
// loading the compiler (~1.6MB gzipped) and each check stay off the main
// thread. Only compiles — the emitted JavaScript is handed back and run by
// sandbox.js exactly like a JavaScript exercise (see typescriptSandbox.js),
// so timers, mock fetch and grading behave identically across the two.
//
// The actual check lives in typescriptCompiler.js (kept separate so the
// unit tests run the same strict check in Node). This file is just the
// Worker-side loading and postMessage glue.
import { collectLibs, createCompiler } from './typescriptCompiler.js';

// Lazy glob: each lib .d.ts becomes its own chunk, and only the ones
// collectLibs() actually walks to (about 70 of the ~100 TypeScript ships)
// are ever fetched.
const LIB_LOADERS = import.meta.glob('/node_modules/typescript/lib/lib.*.d.ts', {
  query: '?raw',
  import: 'default'
});

function loadLib(fileName) {
  const loader = LIB_LOADERS[`/node_modules/typescript/lib/${fileName}`];
  return loader ? loader() : undefined;
}

let compilerReadyPromise = null;

// Mirrors pythonWorker.js: status messages fire once, on the first compile
// that actually triggers the load; every later call reuses the memoized
// promise.
function getCompiler() {
  if (!compilerReadyPromise) {
    self.postMessage({ type: 'runtime-status', payload: { status: 'loading' } });

    compilerReadyPromise = (async () => {
      const [{ default: ts }, libs] = await Promise.all([import('typescript'), collectLibs(loadLib)]);
      const compile = createCompiler(ts, libs);
      self.postMessage({ type: 'runtime-status', payload: { status: 'loaded' } });
      return compile;
    })();
  }
  return compilerReadyPromise;
}

self.onmessage = async (event) => {
  if (!event.data || event.data.type !== 'compile') return;

  let compile;
  try {
    compile = await getCompiler();
  } catch (err) {
    compilerReadyPromise = null;
    self.postMessage({ type: 'runtime-status', payload: { status: 'error' } });
    self.postMessage({ type: 'compiled', payload: { error: `Failed to load the TypeScript compiler: ${err.message}` } });
    return;
  }

  try {
    self.postMessage({ type: 'compiled', payload: compile(event.data.code) });
  } catch (err) {
    self.postMessage({ type: 'compiled', payload: { error: `TypeScript compiler error: ${err.message}` } });
  }
};
