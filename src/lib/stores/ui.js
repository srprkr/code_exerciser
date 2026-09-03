import { writable, derived, get } from 'svelte/store';
import { currentLanguage, selectLanguage } from './language.js';
import { getLanguageData } from '../data/languages.js';

export const currentView = writable('exercises'); // 'exercises' | 'profile'

export const activeFunctionFilters = writable(new Set());
export const activeDifficultyFilter = writable(null);
export const currentExerciseIndex = writable(0);

// The active language's exercise module. Everything below reads through this
// rather than importing a language's data directly, so switching languages
// swaps the exercise list, the filter tags and the docs links together.
export const languageData = derived(currentLanguage, ($currentLanguage) =>
  getLanguageData($currentLanguage)
);

export const languageExercises = derived(languageData, ($languageData) => $languageData.exercises);
export const CORE_FUNCTIONS = derived(languageData, ($languageData) => $languageData.CORE_FUNCTIONS);
export const KNOWN_FUNCTIONS = derived(languageData, ($languageData) => $languageData.KNOWN_FUNCTIONS);
export const DIFFICULTIES = derived(languageData, ($languageData) => $languageData.DIFFICULTIES);
export const DOC_SITE_NAME = derived(languageData, ($languageData) => $languageData.DOC_SITE_NAME);
export const KNOWN_FUNCTION_DOC_LINKS = derived(
  languageData,
  ($languageData) => $languageData.KNOWN_FUNCTION_DOC_LINKS
);

export const filteredExercises = derived(
  [languageData, activeFunctionFilters, activeDifficultyFilter],
  ([$languageData, $activeFunctionFilters, $activeDifficultyFilter]) =>
    $languageData.exercises.filter((exercise) => {
      const matchesFunctions =
        $activeFunctionFilters.size === 0 ||
        [...$activeFunctionFilters].every((fn) =>
          $languageData.exerciseHasFunction(exercise, fn)
        );
      const matchesDifficulty =
        !$activeDifficultyFilter || exercise.difficulty === $activeDifficultyFilter;

      return matchesFunctions && matchesDifficulty;
    })
);

// Filters and carousel position are language-specific: a JavaScript tag like
// 'map' selects nothing in the Python set, and index 87 doesn't exist in an
// 8-problem list. Without this reset, switching languages would land on an
// empty carousel with filter pills active that the new language never shows.
let lastLanguage = get(currentLanguage);
currentLanguage.subscribe((next) => {
  if (next === lastLanguage) return;
  lastLanguage = next;

  activeFunctionFilters.set(new Set());
  activeDifficultyFilter.set(null);
  currentExerciseIndex.set(0);
});

export function resetIndexAndRender() {
  currentExerciseIndex.set(0);
}

// Moves the current exercise index by `delta` positions within the
// currently filtered list, wrapping at both ends — shared by the
// single-step Prev/Next buttons/arrow keys and the skip-10 buttons/
// Shift+Arrow shortcut, so they all wrap consistently.
export function stepExercise(delta) {
  const filtered = get(filteredExercises);
  const len = filtered.length;
  if (len === 0) return;

  currentExerciseIndex.update((current) => ((current + delta) % len + len) % len);
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

// Deep-link support for "jump to this problem" links, e.g. ?exercise=42 or
// ?lang=python&exercise=11. Exercise ids restart at 1 per language, so a bare
// ?exercise= is ambiguous across languages and is resolved against whichever
// language is currently active. Clears any active filters so the target
// exercise is guaranteed to be reachable regardless of filter state. Returns
// true if a valid deep link was applied.
export function applyDeepLinkFromUrl() {
  const params = new URLSearchParams(window.location.search);

  // Routed through selectLanguage so a ?lang= for an unavailable language is
  // ignored the same way picking it from the dropdown would be.
  const requestedLanguage = params.get('lang');
  if (requestedLanguage) selectLanguage(requestedLanguage);

  const requestedId = Number(params.get('exercise'));
  if (!requestedId) return false;

  const index = get(languageExercises).findIndex((exercise) => exercise.id === requestedId);
  if (index === -1) return false;

  activeFunctionFilters.set(new Set());
  activeDifficultyFilter.set(null);
  currentExerciseIndex.set(index);
  return true;
}
