import { writable, get } from 'svelte/store';
import { exercises, KNOWN_FUNCTIONS, exerciseHasFunction } from '../data/exercises.js';

// Per-exercise progress, persisted to localStorage. `progress` is a
// reactive store so components re-render automatically when it changes,
// instead of every consumer having to manually re-query localStorage.
const PROGRESS_KEY = 'exerciseProgress';

function loadProgress() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? JSON.parse(raw) : {};
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

function getAll() {
  return get(progress);
}

function getExercise(exerciseId) {
  const all = getAll();
  return all[exerciseId] || { attempted: false, completed: false };
}

function markAttempted(exerciseId) {
  progress.update((current) => {
    const entry = current[exerciseId] || { attempted: false, completed: false };
    entry.attempted = true;
    return { ...current, [exerciseId]: entry };
  });
}

function markCompleted(exerciseId) {
  progress.update((current) => {
    const entry = current[exerciseId] || { attempted: false, completed: false };
    entry.attempted = true;
    entry.completed = true;
    return { ...current, [exerciseId]: entry };
  });
}

// Badge computation requires exercises.js's `exercises`/`KNOWN_FUNCTIONS`/
// `exerciseHasFunction` — imported directly above rather than relying on
// load order, since these are now real ES module imports.
function getBadges() {
  const current = getAll();

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
const ALL_SYNC_KEYS = [PROGRESS_KEY, DISPLAY_NAME_KEY, 'theme', 'lookItUpDismissed'];

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
  getExercise,
  markAttempted,
  markCompleted,
  getBadges,
  getDisplayName,
  setDisplayName,
  exportData,
  importData
};
