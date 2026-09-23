import { describe, expect, it, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import {
  currentExerciseIndex,
  activeFunctionFilters,
  activeDifficultyFilter,
  stepExercise
} from '../../src/lib/stores/ui.js';
import { exercises } from '../../src/lib/data/javascript-exercises.js';

// Derived from the data so adding problems doesn't break the wrap math.
const TOTAL = exercises.length;
const LAST = TOTAL - 1;
const HARD_COUNT = exercises.filter((ex) => ex.difficulty === 'hard').length;

beforeEach(() => {
  currentExerciseIndex.set(0);
  activeFunctionFilters.set(new Set());
  activeDifficultyFilter.set(null);
});

describe('stepExercise', () => {
  it('moves forward by delta', () => {
    stepExercise(1);
    expect(get(currentExerciseIndex)).toBe(1);
  });

  it('moves backward by delta', () => {
    currentExerciseIndex.set(5);
    stepExercise(-1);
    expect(get(currentExerciseIndex)).toBe(4);
  });

  it('wraps forward past the end of the list', () => {
    currentExerciseIndex.set(LAST); // last index, unfiltered
    stepExercise(1);
    expect(get(currentExerciseIndex)).toBe(0);
  });

  it('wraps backward past the start of the list', () => {
    currentExerciseIndex.set(0);
    stepExercise(-1);
    expect(get(currentExerciseIndex)).toBe(LAST);
  });

  it('skips forward by 10 and wraps correctly near the end', () => {
    currentExerciseIndex.set(TOTAL - 5);
    stepExercise(10);
    expect(get(currentExerciseIndex)).toBe(5); // (TOTAL - 5 + 10) % TOTAL = 5
  });

  it('skips backward by 10 and wraps correctly near the start', () => {
    currentExerciseIndex.set(3);
    stepExercise(-10);
    expect(get(currentExerciseIndex)).toBe(TOTAL - 7); // (3 - 10 + TOTAL) % TOTAL
  });

  it('respects the currently filtered list length, not the full list', () => {
    activeDifficultyFilter.set('hard');
    currentExerciseIndex.set(0);
    stepExercise(-1);
    // Wraps to the last index of the FILTERED (hard-only) list, not LAST.
    expect(HARD_COUNT).toBeLessThan(TOTAL);
    expect(get(currentExerciseIndex)).toBe(HARD_COUNT - 1);
  });

  it('is a no-op when the filtered list is empty', () => {
    activeFunctionFilters.set(new Set(['map']));
    activeDifficultyFilter.set('hard');
    // Force an impossible combination if one exists in the dataset isn't
    // guaranteed, so just directly verify the empty-list guard using a
    // filter combination known to be empty (hard + flat, per exploration).
    activeFunctionFilters.set(new Set(['flat']));
    activeDifficultyFilter.set('hard');
    currentExerciseIndex.set(0);
    stepExercise(1);
    expect(get(currentExerciseIndex)).toBe(0);
  });
});
