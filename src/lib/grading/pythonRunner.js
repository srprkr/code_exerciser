// The actual Python execution + value-capture logic, factored out of
// pythonWorker.js so it's directly unit-testable with a real Pyodide
// instance (Node-importable, no browser/Worker/self-hosted-asset plumbing
// needed for that) rather than only reachable through an e2e browser test.

// Defines a Python-side __run(source) that captures each print() call's
// REAL value (not its stringified text) by substituting print in the exec
// scope — the same trick sandbox.js plays on console.log — so a Python
// dict prints as something JS can structurally compare against an
// exercise's `output` field, not as unparseable Python repr text.
export const RUNNER_PY = `
def __run(source):
    text_lines = []
    log_calls = []

    def __capturing_print(*args, **kwargs):
        text_lines.append(" ".join(str(a) for a in args))
        log_calls.append(args[0] if len(args) == 1 else list(args))

    scope = {"print": __capturing_print}
    exec(source, scope)
    return {"text_lines": text_lines, "log_calls": log_calls}
`;

// undefined isn't valid JSON, so it needs the same explicit pass-through
// sandbox.js's serializeLoggedValue gives it — letting exercises that
// print None grade correctly rather than being treated as "no output".
function serializeLoggedValue(value) {
  if (value === undefined) return { ok: true, value: undefined };
  try {
    return { ok: true, value: JSON.parse(JSON.stringify(value)) };
  } catch {
    return { ok: false, value: null };
  }
}

// pyodide must already have RUNNER_PY loaded (pyodide.runPython(RUNNER_PY)).
// Returns { threw, errorMessage, textLines, hasLastLogValue, lastLogValue,
// allLogValues } — the last three match sandbox.js's onDone payload shape
// exactly, so the same grading code (grade.js) handles JS and Python runs
// identically.
export function runPythonSource(pyodide, source) {
  const runPython = pyodide.globals.get('__run');

  try {
    const resultPy = runPython(source);
    const result = resultPy.toJs({ dict_converter: Object.fromEntries });
    resultPy.destroy();

    let hasLastLogValue = false;
    let lastLogValue = null;
    let allLogValues = [];

    if (result.log_calls.length > 0) {
      const lastResult = serializeLoggedValue(result.log_calls[result.log_calls.length - 1]);
      hasLastLogValue = lastResult.ok;
      lastLogValue = lastResult.value;

      allLogValues = result.log_calls
        .map(serializeLoggedValue)
        .filter((r) => r.ok)
        .map((r) => r.value);
    }

    return { threw: false, errorMessage: null, textLines: result.text_lines, hasLastLogValue, lastLogValue, allLogValues };
  } catch (err) {
    return { threw: true, errorMessage: err.message, textLines: [], hasLastLogValue: false, lastLogValue: null, allLogValues: [] };
  }
}
