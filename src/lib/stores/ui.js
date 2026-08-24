import { writable, derived } from 'svelte/store';
import { exercises, KNOWN_FUNCTIONS, DIFFICULTIES, exerciseHasFunction } from '../data/exercises.js';

export const currentView = writable('exercises'); // 'exercises' | 'profile'

export const activeFunctionFilters = writable(new Set());
export const activeDifficultyFilter = writable(null);
export const currentExerciseIndex = writable(0);

export const filteredExercises = derived(
  [activeFunctionFilters, activeDifficultyFilter],
  ([$activeFunctionFilters, $activeDifficultyFilter]) =>
    exercises.filter((exercise) => {
      const matchesFunctions =
        $activeFunctionFilters.size === 0 ||
        [...$activeFunctionFilters].every((fn) => exerciseHasFunction(exercise, fn));
      const matchesDifficulty =
        !$activeDifficultyFilter || exercise.difficulty === $activeDifficultyFilter;

      return matchesFunctions && matchesDifficulty;
    })
);

export function resetIndexAndRender() {
  currentExerciseIndex.set(0);
}

export function toggleFunctionFilter(fn) {
  activeFunctionFilters.update((current) => {
    const next = new Set(current);
    if (next.has(fn)) {
      next.delete(fn);
    } else {
      if (next.size >= 3) return current;
      next.add(fn);
    }
    return next;
  });
  resetIndexAndRender();
}

export function toggleDifficultyFilter(level) {
  activeDifficultyFilter.update((current) => (current === level ? null : level));
  resetIndexAndRender();
}

export function clearFilters() {
  activeFunctionFilters.set(new Set());
  activeDifficultyFilter.set(null);
  resetIndexAndRender();
}

// Exercise ids whose solution has been manually revealed this page session
// (in-memory only — resets on refresh, matching the "come back later
// without peeking and it still counts" rule for achievements). The
// auto-reveal-on-correct-answer reward path does NOT add to this set,
// since it only fires after a genuine pass. Deliberately not a store —
// nothing needs to reactively re-render off this, and it must not persist.
const peekedExerciseIds = new Set();

export function markPeeked(exerciseId) {
  peekedExerciseIds.add(exerciseId);
}

export function hasPeekedThisSession(exerciseId) {
  return peekedExerciseIds.has(exerciseId);
}

// Deep-link support for "jump to this problem" links, e.g. ?exercise=42.
// Clears any active filters so the target exercise is guaranteed to be
// reachable regardless of filter state. Returns true if a valid deep link
// was applied.
export function applyDeepLinkFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const requestedId = Number(params.get('exercise'));
  if (!requestedId) return false;

  const index = exercises.findIndex((exercise) => exercise.id === requestedId);
  if (index === -1) return false;

  activeFunctionFilters.set(new Set());
  activeDifficultyFilter.set(null);
  currentExerciseIndex.set(index);
  return true;
}

export { KNOWN_FUNCTIONS, DIFFICULTIES };
