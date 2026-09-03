import { describe, expect, it, beforeAll } from 'vitest';
import { loadPyodide } from 'pyodide';
import { RUNNER_PY, runPythonSource } from '../../src/lib/grading/pythonRunner.js';
import { gradeRun } from '../../src/lib/grading/grade.js';
import { exercises } from '../../src/lib/data/python-exercises.js';

// Runs against a real Pyodide instance (Node-importable directly from the
// npm package — no Worker, no self-hosted browser assets needed for that),
// loaded once and shared across this file's tests since init takes ~1s.
let pyodide;

beforeAll(async () => {
  pyodide = await loadPyodide();
  pyodide.runPython(RUNNER_PY);
}, 30000);

describe('runPythonSource', () => {
  // The actual regression guard this exists for: every seeded Python
  // problem's real sampleData+solution — assembled the same way
  // CodeEditor.svelte builds the initial editor doc — run for real and
  // graded through the same gradeRun() the JS sandbox uses, must still
  // pass. Catches a broken runner/grading pipeline, a wrong `output`
  // field, or (as this caught once already) a solution that only works
  // because it silently depends on a sampleData variable.
  it.each(exercises.map((e) => [e.id, e]))('problem %i: solution grades as correct', (_id, exercise) => {
    const source = `${exercise.sampleData}\n\n${exercise.solution}`;
    const result = runPythonSource(pyodide, source);

    expect(result.threw, `Problem ${exercise.id} threw: ${result.errorMessage}`).toBe(false);
    expect(
      gradeRun(result, exercise.output),
      `Problem ${exercise.id} printed ${JSON.stringify(result.lastLogValue)}, expected ${JSON.stringify(exercise.output)}`
    ).toBe(true);
  });

  it('does not pass a wrong answer', () => {
    const result = runPythonSource(pyodide, 'print([1, 2, 3])');
    expect(gradeRun(result, ['quick', 'brown', 'jumps'])).toBe(false);
  });

  it('captures the real value printed, not its stringified text — dicts stay structurally comparable', () => {
    const result = runPythonSource(pyodide, 'print({"a": 1, "b": 2})');
    expect(result.lastLogValue).toEqual({ a: 1, b: 2 });
  });

  it('reports a runtime error rather than silently producing no output', () => {
    const result = runPythonSource(pyodide, 'print(this_name_does_not_exist)');
    expect(result.threw).toBe(true);
    expect(result.errorMessage).toContain('NameError');
    expect(result.hasLastLogValue).toBe(false);
  });

  it('reports invalid syntax the same way as any other runtime error', () => {
    const result = runPythonSource(pyodide, 'def broken(:\n  pass');
    expect(result.threw).toBe(true);
    expect(result.errorMessage).toContain('SyntaxError');
  });
});
