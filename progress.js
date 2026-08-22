// Per-exercise progress, persisted to localStorage. Shared by code-editor.js
// (writes) and profile.html (reads) via window.Progress.
const PROGRESS_KEY = 'exerciseProgress';

function loadProgress() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgress(progress) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

function getExerciseProgress(exerciseId) {
  const progress = loadProgress();
  return progress[exerciseId] || { attempted: false, completed: false };
}

function markAttempted(exerciseId) {
  const progress = loadProgress();
  const entry = progress[exerciseId] || { attempted: false, completed: false };
  entry.attempted = true;
  progress[exerciseId] = entry;
  saveProgress(progress);
}

function markCompleted(exerciseId) {
  const progress = loadProgress();
  const entry = progress[exerciseId] || { attempted: false, completed: false };
  entry.attempted = true;
  entry.completed = true;
  progress[exerciseId] = entry;
  saveProgress(progress);
}

// Badge computation requires exercise-data.js's `exercises`, `KNOWN_FUNCTIONS`,
// and `exerciseHasFunction` to be loaded — safe to call any time after that,
// regardless of which order the two files themselves were included in.
function getBadges() {
  const progress = loadProgress();

  return KNOWN_FUNCTIONS.map((fn) => {
    const taggedExercises = exercises.filter((exercise) => exerciseHasFunction(exercise, fn));
    const earned =
      taggedExercises.length > 0 &&
      taggedExercises.every((exercise) => {
        const entry = progress[exercise.id];
        return entry && entry.completed;
      });

    return {
      tag: fn,
      earned,
      total: taggedExercises.length,
      completedCount: taggedExercises.filter((exercise) => {
        const entry = progress[exercise.id];
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

// All localStorage keys this site uses. Kept as one list so export/import
// can't silently drift out of sync with what's actually written elsewhere.
// Uses the literal string values (not named constants) because exercises.js
// declares its own DONT_ASK_AGAIN_KEY — both files are classic scripts
// sharing one global scope, so a same-named const here would collide and
// throw a SyntaxError, breaking exercises.js entirely.
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
  return true;
}

window.Progress = {
  getAll: loadProgress,
  getExercise: getExerciseProgress,
  markAttempted,
  markCompleted,
  getBadges,
  getDisplayName,
  setDisplayName,
  exportData,
  importData
};
