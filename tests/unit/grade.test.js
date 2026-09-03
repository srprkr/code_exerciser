import { describe, expect, it } from 'vitest';
import { gradeRun, decideCheckResult } from '../../src/lib/grading/grade.js';

describe('gradeRun', () => {
  it('fails when there is no logged value at all', () => {
    expect(gradeRun({ hasLastLogValue: false }, [1, 2, 3])).toBe(false);
  });

  it('passes when the last logged value matches output (the common single-log case)', () => {
    const payload = { hasLastLogValue: true, lastLogValue: [1, 2, 3], allLogValues: [[1, 2, 3]] };
    expect(gradeRun(payload, [1, 2, 3])).toBe(true);
  });

  it('fails when the last logged value does not match and neither does the all-logs array', () => {
    const payload = { hasLastLogValue: true, lastLogValue: 'wrong', allLogValues: ['wrong'] };
    expect(gradeRun(payload, [1, 2, 3])).toBe(false);
  });

  it('passes via the all-logs fallback for a multi-log loop exercise (ids 70/98 pattern)', () => {
    // Simulates: for (...) console.log(line) called twice, output expects
    // both lines as an array — the LAST single log value alone ("2: Ana")
    // does not match the array, but the full set of logged lines does.
    const payload = {
      hasLastLogValue: true,
      lastLogValue: '2: Ana',
      allLogValues: ['1: Sam', '2: Ana']
    };
    expect(gradeRun(payload, ['1: Sam', '2: Ana'])).toBe(true);
  });

  it('correctly grades undefined as a legitimate logged value', () => {
    const payload = { hasLastLogValue: true, lastLogValue: undefined, allLogValues: [undefined] };
    expect(gradeRun(payload, undefined)).toBe(true);
  });

  it('does not false-positive when only one loop iteration happened but output expects more', () => {
    const payload = {
      hasLastLogValue: true,
      lastLogValue: '1: Sam',
      allLogValues: ['1: Sam']
    };
    expect(gradeRun(payload, ['1: Sam', '2: Ana'])).toBe(false);
  });
});

describe('decideCheckResult', () => {
  const exercise = { id: 42, output: [1, 2, 3] };

  it('passes and counts toward completion when not peeked', () => {
    const payload = { hasLastLogValue: true, lastLogValue: [1, 2, 3], allLogValues: [[1, 2, 3]] };
    const result = decideCheckResult(payload, exercise, () => false);
    expect(result.passed).toBe(true);
    expect(result.countsTowardCompletion).toBe(true);
  });

  it('passes but does not count toward completion when peeked', () => {
    const payload = { hasLastLogValue: true, lastLogValue: [1, 2, 3], allLogValues: [[1, 2, 3]] };
    const result = decideCheckResult(payload, exercise, () => true);
    expect(result.passed).toBe(true);
    expect(result.countsTowardCompletion).toBe(false);
  });

  it('fails and does not count when the answer is wrong, regardless of peeked state', () => {
    const payload = { hasLastLogValue: true, lastLogValue: 'nope', allLogValues: ['nope'] };
    const result = decideCheckResult(payload, exercise, () => false);
    expect(result.passed).toBe(false);
  });
});
