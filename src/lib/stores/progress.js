import { writable, get } from 'svelte/store';
import { currentLanguage } from './language.js';
import { getLanguageData, isKnownLanguage, DEFAULT_LANGUAGE } from '../data/languages.js';

// Per-exercise progress, persisted to localStorage. `progress` is a
// reactive store so components re-render automatically when it changes,
// instead of every consumer having to manually re-query localStorage.
//
// Shape is nested by language — { javascript: { 3: {...} }, python: {...} }
// — because exercise ids restart at 1 for each language and would otherwise
// collide.
const PROGRESS_KEY = 'exerciseProgress';

// Before multi-language support this was a flat { exerciseId: entry } map,
// and everything in it was JavaScript progress. Anyone with saved progress
// still has that shape in localStorage, so fold it under 'javascript' rather
// than stranding it. Detected by top-level keys that aren't language ids —
// exercise ids are numeric, so the two can't be confused.
function migrateLegacyShape(raw) {
  if (!raw || typeof raw !== 'object') return {};

  const keys = Object.keys(raw);
  if (keys.length === 0) return {};
  if (keys.every((key) => isKnownLanguage(key))) return raw;

  return { [DEFAULT_LANGUAGE]: raw };
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? migrateLegacyShape(JSON.parse(raw)) : {};
  } catch {
    return {};
  }
}

function saveProgress(next) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
}

export const progress = writable(loadProgress());

// Keep localStorage in sync whenever the store changes (including from
// getExercise/markAttempted/markCompleted below, and from importData).
progress.subscribe((value) => {
  saveProgress(value);
});

function activeLanguage() {
  return get(currentLanguage);
}

// Every entry point below is implicitly scoped to the active language, which
// keeps callers (CodeEditor, AchievementsGrid, ProfilePanel) unaware that
// progress is partitioned at all.
function getAll() {
  return get(progress)[activeLanguage()] || {};
}

function getAllLanguages() {
  return get(progress);
}

function getExercise(exerciseId) {
  return getAll()[exerciseId] || { attempted: false, completed: false };
}

function updateEntry(exerciseId, changes) {
  const language = activeLanguage();
  progress.update((current) => {
    const forLanguage = current[language] || {};
    const entry = forLanguage[exerciseId] || { attempted: false, completed: false };
    return {
      ...current,
      [language]: { ...forLanguage, [exerciseId]: { ...entry, ...changes } }
    };
  });
}

function markAttempted(exerciseId) {
  updateEntry(exerciseId, { attempted: true });
}

function markCompleted(exerciseId) {
  updateEntry(exerciseId, { attempted: true, completed: true });
}

// Badges are computed against the active language's tag list and exercise
// set, so switching languages swaps the whole achievement grid rather than
// showing JavaScript tags over Python progress.
function getBadges() {
  const current = getAll();
  const { exercises, KNOWN_FUNCTIONS, exerciseHasFunction } = getLanguageData(activeLanguage());

  return KNOWN_FUNCTIONS.map((fn) => {
    const taggedExercises = exercises.filter((exercise) => exerciseHasFunction(exercise, fn));
    const earned =
      taggedExercises.length > 0 &&
      taggedExercises.every((exercise) => {
        const entry = current[exercise.id];
        return entry && entry.completed;
      });

    return {
      tag: fn,
      earned,
      total: taggedExercises.length,
      completedCount: taggedExercises.filter((exercise) => {
        const entry = current[exercise.id];
        return entry && entry.completed;
      }).length
    };
  });
}

const DISPLAY_NAME_KEY = 'displayName';

function getDisplayName() {
  return localStorage.getItem(DISPLAY_NAME_KEY) || '';
}

function setDisplayName(name) {
  localStorage.setItem(DISPLAY_NAME_KEY, name);
}

// All localStorage keys this site uses. Kept as literal strings (not named
// constants) so export/import can't silently drift out of sync with what's
// actually written elsewhere — carried over from the original vanilla
// codebase, where this also avoided a cross-file const-collision risk that
// no longer applies now that these are real ES modules with real scoping.
const ALL_SYNC_KEYS = [PROGRESS_KEY, DISPLAY_NAME_KEY, 'theme', 'lookItUpDismissed', 'language'];

function exportData() {
  const data = {};
  ALL_SYNC_KEYS.forEach((key) => {
    const value = localStorage.getItem(key);
    if (value !== null) data[key] = value;
  });
  return JSON.stringify(data, null, 2);
}

// Returns true on success, false if the JSON was invalid or empty.
function importData(jsonString) {
  let data;
  try {
    data = JSON.parse(jsonString);
  } catch {
    return false;
  }
  if (!data || typeof data !== 'object') return false;

  ALL_SYNC_KEYS.forEach((key) => {
    if (typeof data[key] === 'string') {
      localStorage.setItem(key, data[key]);
    }
  });

  // Progress store must be refreshed from localStorage after an import,
  // since PROGRESS_KEY may have just been overwritten directly above.
  progress.set(loadProgress());

  return true;
}

export const Progress = {
  getAll,
  getAllLanguages,
  getExercise,
  markAttempted,
  markCompleted,
  getBadges,
  getDisplayName,
  setDisplayName,
  exportData,
  importData
};
