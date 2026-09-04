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

// attempted/completed are permanent achievements, so a merge should only
// ever be able to add one, never lose one already recorded on either side —
// hence OR rather than "imported wins" or "existing wins".
function mergeProgressEntry(existing, incoming) {
  if (!existing) return incoming;
  if (!incoming) return existing;
  return { attempted: existing.attempted || incoming.attempted, completed: existing.completed || incoming.completed };
}

function mergeLanguageBucket(existing = {}, incoming = {}) {
  const merged = { ...existing };
  Object.entries(incoming).forEach(([exerciseId, entry]) => {
    merged[exerciseId] = mergeProgressEntry(existing[exerciseId], entry);
  });
  return merged;
}

// Merges per exercise id, within each language independently — an imported
// blob for one language (e.g. an old, pre-multi-language export, which is
// always JS-only) must never touch another language's bucket it has nothing
// to say about, let alone wipe it by replacing the whole progress key.
function mergeAllLanguages(existing, incoming) {
  const merged = { ...existing };
  Object.keys(incoming).forEach((language) => {
    merged[language] = mergeLanguageBucket(existing[language], incoming[language]);
  });
  return merged;
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
    // Progress is merged below rather than blindly overwritten here — a
    // straight localStorage.setItem would replace this browser's entire
    // progress with whatever was imported, silently destroying any other
    // language's progress an old (pre-multi-language, JS-only) export has
    // nothing to say about.
    if (key === PROGRESS_KEY) return;
    if (typeof data[key] === 'string') {
      localStorage.setItem(key, data[key]);
    }
  });

  if (typeof data[PROGRESS_KEY] === 'string') {
    let incomingRaw;
    try {
      incomingRaw = JSON.parse(data[PROGRESS_KEY]);
    } catch {
      incomingRaw = null;
    }

    if (incomingRaw && typeof incomingRaw === 'object') {
      const incoming = migrateLegacyShape(incomingRaw);
      saveProgress(mergeAllLanguages(loadProgress(), incoming));
    }
  }

  // Progress store must be refreshed from localStorage after an import,
  // since PROGRESS_KEY may have just changed via the merge above.
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
