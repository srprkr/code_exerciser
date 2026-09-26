import { deepEqual } from '../utils/deepEqual.js';

// Decides pass/fail for a Check-answer run. Tries the last logged value
// first (the common case: one console.log of a final result) and falls
// back to the array of every logged value (exercises that log one line
// per loop iteration, e.g. ids 70/98, where `output` is the array of
// those lines) — passes if EITHER matches.
//
// A TypeScript run also carries `typeErrors` (see typescriptSandbox.js): any
// type error fails the run even when the output is right, since getting the
// types right is the point of a TypeScript exercise.
export function hasTypeErrors(payload) {
  return Array.isArray(payload.typeErrors) && payload.typeErrors.length > 0;
}

export function outputMatches(payload, expectedOutput) {
  if (!payload.hasLastLogValue) return false;
  if (deepEqual(payload.lastLogValue, expectedOutput)) return true;
  return deepEqual(payload.allLogValues, expectedOutput);
}

export function gradeRun(payload, expectedOutput) {
  return !hasTypeErrors(payload) && outputMatches(payload, expectedOutput);
}

// Full pass/completion decision: also factors in whether the exercise's
// solution was peeked at this session (Check-answer still shows "correct"
// but doesn't count toward completion/badges).
export function decideCheckResult(payload, exercise, hasPeekedThisSession) {
  const passed = gradeRun(payload, exercise.output);
  const peeked = hasPeekedThisSession(exercise.id);
  const countsTowardCompletion = !peeked;

  // Lets the UI say "right output, but fix the types" rather than a bare
  // "doesn't match", which would be misleading when the output is correct.
  const blockedByTypeErrors = !passed && hasTypeErrors(payload) && outputMatches(payload, exercise.output);

  return { passed, countsTowardCompletion, blockedByTypeErrors };
}
