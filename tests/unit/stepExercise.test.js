import { describe, expect, it, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import {
  currentExerciseIndex,
  activeFunctionFilters,
  activeDifficultyFilter,
  stepExercise
} from '../../src/lib/stores/ui.js';

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
    currentExerciseIndex.set(139); // last index (140 exercises, unfiltered)
    stepExercise(1);
    expect(get(currentExerciseIndex)).toBe(0);
  });

  it('wraps backward past the start of the list', () => {
    currentExerciseIndex.set(0);
    stepExercise(-1);
    expect(get(currentExerciseIndex)).toBe(139);
  });

  it('skips forward by 10 and wraps correctly near the end', () => {
    currentExerciseIndex.set(135);
    stepExercise(10);
    expect(get(currentExerciseIndex)).toBe(5); // 135 + 10 = 145, 145 % 140 = 5
  });

  it('skips backward by 10 and wraps correctly near the start', () => {
    currentExerciseIndex.set(3);
    stepExercise(-10);
    expect(get(currentExerciseIndex)).toBe(133); // (3 - 10 + 140) % 140 = 133
  });

  it('respects the currently filtered list length, not the full 140', () => {
    activeDifficultyFilter.set('hard');
    currentExerciseIndex.set(0);
    stepExercise(-1);
    // Wraps to the last index of the FILTERED (hard-only) list, not 139.
    expect(get(currentExerciseIndex)).toBe(17); // 18 hard exercises -> last index 17
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
