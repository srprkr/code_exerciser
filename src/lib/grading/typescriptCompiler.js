// Type-checks and transpiles one TypeScript snippet entirely in memory. Kept
// free of any browser/Node specifics — the TypeScript module and the lib
// .d.ts contents are handed in — so the exact same check runs in
// typescriptWorker.js (browser) and in the unit tests (Node, reading libs
// off disk). That's what lets the tests prove every TS solution passes the
// same strict check a user's code is held to.

// The roots the checker starts from. Their own /// <reference lib="..." />
// lines pull in the rest (esnext → es2024 → ... → es5), which
// collectLibNames() walks. esnext rather than a fixed year so problems
// using newer built-ins (Object.groupBy, Set methods) type-check; dom for
// console, setTimeout and fetch.
export const ROOT_LIBS = ['lib.esnext.d.ts', 'lib.dom.d.ts'];

const LIB_REFERENCE = /\/\/\/\s*<reference\s+lib="([^"]+)"\s*\/>/g;

function libFileName(reference) {
  return `lib.${reference.toLowerCase()}.d.ts`;
}

// Walks the /// <reference lib> graph from ROOT_LIBS, loading each lib's
// text via `loadLib(fileName)` (sync or async). Returns a Map of every lib
// the checker needs, so the caller can fetch only those rather than all
// ~100 files TypeScript ships.
export async function collectLibs(loadLib) {
  const libs = new Map();
  const pending = [...ROOT_LIBS];

  while (pending.length > 0) {
    const name = pending.pop();
    if (libs.has(name)) continue;

    const text = await loadLib(name);
    if (text === undefined) continue;
    libs.set(name, text);

    for (const match of text.matchAll(LIB_REFERENCE)) {
      pending.push(libFileName(match[1]));
    }
  }

  return libs;
}

const USER_FILE = '/exercise.ts';

// TypeScript emits `export {};` for a module with no exports. The code runs
// as an async function body in sandbox.js, where `export` is a syntax error.
const EMPTY_EXPORT = /^export \{\};\s*$/m;

// Returns compile(code) → { js, typeErrors }, where typeErrors is
// [{ line, message }] (line is 1-based, over the whole editor document —
// sample data included — so it matches the editor's gutter).
export function createCompiler(ts, libs) {
  const options = {
    strict: true,
    target: ts.ScriptTarget.ESNext,
    // Forced module detection so top-level await type-checks (the sandbox
    // runs code in an async function), and so user variables like `name` or
    // `status` don't clash with lib.dom's same-named globals.
    module: ts.ModuleKind.ESNext,
    moduleDetection: ts.ModuleDetectionKind.Force,
    lib: ROOT_LIBS,
    noEmitOnError: false,
    // The libs are TypeScript's own and known-good; checking them costs
    // seconds per compile (lib.dom alone is 2MB) and only user code matters.
    skipLibCheck: true,
    types: []
  };

  // Lib source files are immutable and the costliest part to parse, so
  // they're parsed once and reused by every compile.
  const libSourceFiles = new Map();
  // Handing the previous program to createProgram lets TypeScript reuse
  // everything unchanged (i.e. all the libs) and only redo the user's file.
  let previousProgram;

  function libSourceFile(fileName) {
    const name = fileName.split('/').pop();
    if (!libs.has(name)) return undefined;
    if (!libSourceFiles.has(name)) {
      libSourceFiles.set(name, ts.createSourceFile(fileName, libs.get(name), ts.ScriptTarget.ESNext));
    }
    return libSourceFiles.get(name);
  }

  return function compile(code) {
    let js = '';

    const host = {
      getSourceFile: (fileName, languageVersion) =>
        fileName === USER_FILE
          ? ts.createSourceFile(fileName, code, languageVersion)
          : libSourceFile(fileName),
      getDefaultLibFileName: () => '/lib/lib.d.ts',
      writeFile: (fileName, text) => {
        if (fileName.endsWith('.js')) js = text;
      },
      getCurrentDirectory: () => '/',
      getCanonicalFileName: (fileName) => fileName,
      useCaseSensitiveFileNames: () => true,
      getNewLine: () => '\n',
      fileExists: (fileName) => fileName === USER_FILE || libs.has(fileName.split('/').pop()),
      readFile: (fileName) => (fileName === USER_FILE ? code : libs.get(fileName.split('/').pop()))
    };

    const program = ts.createProgram([USER_FILE], options, host, previousProgram);
    previousProgram = program;

    const sourceFile = program.getSourceFile(USER_FILE);
    const typeErrors = [
      ...program.getSyntacticDiagnostics(sourceFile),
      ...program.getSemanticDiagnostics(sourceFile)
    ]
      .filter((d) => d.category === ts.DiagnosticCategory.Error)
      .map((d) => ({
        line: d.file && d.start !== undefined ? d.file.getLineAndCharacterOfPosition(d.start).line + 1 : null,
        message: ts.flattenDiagnosticMessageText(d.messageText, '\n')
      }));

    program.emit();

    return { js: js.replace(EMPTY_EXPORT, ''), typeErrors };
  };
}
