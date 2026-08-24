// Carousel rendering/filtering logic. Exercise data (the exercises array,
// CORE_FUNCTIONS/SECONDARY_FUNCTIONS/KNOWN_FUNCTIONS, DIFFICULTIES) lives in
// exercise-data.js, which must load before this file — both are classic
// scripts sharing one global scope, and exercise-data.js is also loaded by
// profile.html for badge computation.
const DIFFICULTY_BADGE_CLASS = {
  easy: 'badge-success',
  medium: 'badge-warning',
  hard: 'badge-error'
};

const activeFunctionFilters = new Set();
let activeDifficultyFilter = null;
let currentExerciseIndex = 0;

// Re-indents a code snippet to 2 spaces per nesting level, based on brace/
// bracket/paren depth, so inconsistent source indentation in the template
// literals doesn't leak into the rendered sample-data/solution boxes.
function dedent(text) {
  const lines = text.split('\n');
  let depth = 0;

  return lines
    .map((rawLine) => {
      const line = rawLine.trim();
      if (line.length === 0) return '';

      const closesFirst = /^[)\]}]/.test(line);
      const lineDepth = closesFirst ? Math.max(depth - 1, 0) : depth;

      for (const char of line) {
        if (char === '(' || char === '[' || char === '{') depth++;
        else if (char === ')' || char === ']' || char === '}') depth = Math.max(depth - 1, 0);
      }

      return '  '.repeat(lineDepth) + line;
    })
    .join('\n');
}
window.dedent = dedent;

const exerciseEl = document.querySelector('#exercise-1');
const titleEl = document.querySelector('#exercise-1 .exercise-title');
const doneCheckmark = document.querySelector('#done-checkmark');
const tagsEl = document.querySelector('#exercise-1 .tags');
const questionEl = document.querySelector('#exercise-1 .question');
const solutionEl = document.querySelector('#exercise-1 .solution');
const outputEl = document.querySelector('#exercise-1 .output');
const counterEl = document.querySelector('.carousel-counter');
const buttons = document.querySelectorAll('.carousel-button');
const functionFiltersEl = document.querySelector('#function-filters');
const difficultyFiltersEl = document.querySelector('#difficulty-filters');
const clearFiltersButton = document.querySelector('#clear-filters');
const toggleFunctionFiltersButton = document.querySelector('#toggle-function-filters');
const noResultsEl = document.querySelector('#no-results');

function getFilteredExercises() {
  return exercises.filter((exercise) => {
    const matchesFunctions =
      activeFunctionFilters.size === 0 ||
      [...activeFunctionFilters].every((fn) => exerciseHasFunction(exercise, fn));
    const matchesDifficulty =
      !activeDifficultyFilter || exercise.difficulty === activeDifficultyFilter;

    return matchesFunctions && matchesDifficulty;
  });
}

function renderExercise(index) {
  const filtered = getFilteredExercises();
  const exercise = filtered[index];

  const hasResults = filtered.length > 0;
  if (exerciseEl) exerciseEl.hidden = !hasResults;
  if (noResultsEl) noResultsEl.hidden = hasResults;

  if (!exercise || !exerciseEl) {
    if (counterEl) counterEl.textContent = '0 / 0';
    return;
  }

  if (titleEl) titleEl.textContent = `Problem ${exercise.id}`;
  if (tagsEl) {
    tagsEl.innerHTML = '';
    exercise.functions.forEach((fn) => {
      const span = document.createElement('span');
      span.className = 'badge badge-info badge-outline';
      span.textContent = fn;
      tagsEl.appendChild(span);
    });
    const difficultySpan = document.createElement('span');
    difficultySpan.className = `badge ${DIFFICULTY_BADGE_CLASS[exercise.difficulty]}`;
    difficultySpan.textContent = exercise.difficulty;
    tagsEl.appendChild(difficultySpan);
  }
  if (questionEl) questionEl.textContent = exercise.question;
  if (solutionEl) solutionEl.textContent = dedent(exercise.solution);
  if (outputEl) outputEl.textContent = JSON.stringify(exercise.output, null, 2);
  if (counterEl) counterEl.textContent = `${index + 1} / ${filtered.length}`;

  window.currentExercise = exercise;
  if (window.loadExerciseIntoEditor) window.loadExerciseIntoEditor(exercise);
  resetSolutionMode();
  updateDoneCheckbox();
}

// Reflects Progress's completed status for the currently displayed
// exercise. Read-only — Check answer is the only thing that can mark a
// problem done. Called on every render and again by code-editor.js right
// after a Check-answer pass, so the checkmark updates immediately without
// waiting for the next navigation.
function updateDoneCheckbox() {
  if (!doneCheckmark || !window.currentExercise || !window.Progress) return;
  const progress = window.Progress.getExercise(window.currentExercise.id);
  doneCheckmark.classList.toggle('is-visible', !!(progress && progress.completed));
}
window.updateDoneCheckbox = updateDoneCheckbox;

function resetIndexAndRender() {
  currentExerciseIndex = 0;
  renderExercise(currentExerciseIndex);
}

const FUNCTION_PILLS_VISIBLE = CORE_FUNCTIONS.length;
let functionPillsExpanded = false;

function updateFunctionPillsVisibility() {
  if (!functionFiltersEl || !toggleFunctionFiltersButton) return;

  const pills = functionFiltersEl.querySelectorAll('.pill');
  const hiddenCount = pills.length - FUNCTION_PILLS_VISIBLE;

  if (hiddenCount <= 0) {
    toggleFunctionFiltersButton.hidden = true;
    return;
  }

  toggleFunctionFiltersButton.hidden = false;
  toggleFunctionFiltersButton.textContent = functionPillsExpanded
    ? 'Show less'
    : `Show ${hiddenCount} more`;

  pills.forEach((pill, index) => {
    pill.classList.toggle(
      'collapsed',
      !functionPillsExpanded && index >= FUNCTION_PILLS_VISIBLE
    );
  });
}

function renderFilterPills() {
  if (functionFiltersEl) {
    KNOWN_FUNCTIONS.forEach((fn) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'pill btn btn-outline btn-xs sm:btn-sm';
      button.textContent = fn;
      button.dataset.value = fn;
      button.addEventListener('click', () => {
        if (activeFunctionFilters.has(fn)) {
          activeFunctionFilters.delete(fn);
          button.classList.remove('btn-active');
        } else {
          if (activeFunctionFilters.size >= 3) return;
          activeFunctionFilters.add(fn);
          button.classList.add('btn-active');
        }
        resetIndexAndRender();
      });
      functionFiltersEl.insertBefore(button, toggleFunctionFiltersButton);
    });

    updateFunctionPillsVisibility();

    if (toggleFunctionFiltersButton) {
      toggleFunctionFiltersButton.addEventListener('click', () => {
        functionPillsExpanded = !functionPillsExpanded;
        updateFunctionPillsVisibility();
      });
    }
  }

  if (difficultyFiltersEl) {
    DIFFICULTIES.forEach((level) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'pill btn btn-outline btn-xs sm:btn-sm';
      button.textContent = level;
      button.dataset.value = level;
      button.addEventListener('click', () => {
        const alreadyActive = activeDifficultyFilter === level;
        difficultyFiltersEl
          .querySelectorAll('.pill')
          .forEach((pill) => pill.classList.remove('btn-active'));

        activeDifficultyFilter = alreadyActive ? null : level;
        if (!alreadyActive) button.classList.add('btn-active');

        resetIndexAndRender();
      });
      difficultyFiltersEl.appendChild(button);
    });
  }
}

if (clearFiltersButton) {
  clearFiltersButton.addEventListener('click', () => {
    activeFunctionFilters.clear();
    activeDifficultyFilter = null;
    document.querySelectorAll('.filters .pill').forEach((pill) => pill.classList.remove('btn-active'));
    resetIndexAndRender();
  });
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    const filteredLength = getFilteredExercises().length;

    if (filteredLength === 0) return;

    if (action === 'next') {
      currentExerciseIndex = (currentExerciseIndex + 1) % filteredLength;
    } else if (action === 'prev') {
      currentExerciseIndex = (currentExerciseIndex - 1 + filteredLength) % filteredLength;
    }

    renderExercise(currentExerciseIndex);
  });
});

// Tough it out / Look it up toggle
const DONT_ASK_AGAIN_KEY = 'lookItUpDismissed';

// Exercise ids whose solution has been manually revealed this page session
// (in-memory only — resets on refresh, matching the "come back later
// without peeking and it still counts" rule for achievements). The
// auto-reveal-on-correct-answer reward path does NOT add to this set,
// since it only fires after a genuine pass.
const peekedExerciseIds = new Set();

// Called by code-editor.js before crediting a Check-answer pass toward
// completion/badges.
function hasPeekedThisSession(exerciseId) {
  return peekedExerciseIds.has(exerciseId);
}
window.hasPeekedThisSession = hasPeekedThisSession;

const solutionModeInput = document.querySelector('#solution-mode-input');
const solutionDetails = document.querySelector('#solution-details');
const lookItUpModal = document.querySelector('#look-it-up-modal');
const dontAskAgainInput = document.querySelector('#dont-ask-again-input');
const modalCancelButton = document.querySelector('#modal-cancel-button');
const modalConfirmButton = document.querySelector('#modal-confirm-button');

function applySolutionMode(isLookItUp) {
  if (solutionDetails) solutionDetails.hidden = !isLookItUp;
  if (solutionDetails) solutionDetails.open = isLookItUp;
}

function resetSolutionMode() {
  if (solutionModeInput) solutionModeInput.checked = false;
  applySolutionMode(false);
}

// Manual reveal — marks this exercise as peeked for the session.
function revealSolutionManually() {
  if (window.currentExercise) peekedExerciseIds.add(window.currentExercise.id);
  if (solutionModeInput) solutionModeInput.checked = true;
  applySolutionMode(true);
}

// Called by code-editor.js when Check answer passes, so a correct answer
// earns the reveal regardless of the current tough-it-out/look-it-up state.
// Deliberately does NOT mark the exercise as peeked — it only fires after
// a genuine pass, so it shouldn't disqualify the pass that triggered it.
function revealSolutionOnCorrectAnswer() {
  if (solutionModeInput) solutionModeInput.checked = true;
  applySolutionMode(true);
}
window.revealSolutionOnCorrectAnswer = revealSolutionOnCorrectAnswer;

function openLookItUpModal() {
  if (lookItUpModal && lookItUpModal.showModal) lookItUpModal.showModal();
}

function closeLookItUpModal() {
  if (lookItUpModal && lookItUpModal.close) lookItUpModal.close();
}

if (solutionModeInput) {
  solutionModeInput.addEventListener('change', () => {
    if (solutionModeInput.checked) {
      const dismissed = localStorage.getItem(DONT_ASK_AGAIN_KEY) === 'true';
      if (dismissed) {
        revealSolutionManually();
      } else {
        // Revert the visual toggle until the user confirms via the modal.
        solutionModeInput.checked = false;
        openLookItUpModal();
      }
    } else {
      applySolutionMode(false);
    }
  });
}

if (modalCancelButton) {
  modalCancelButton.addEventListener('click', () => {
    closeLookItUpModal();
  });
}

if (modalConfirmButton) {
  modalConfirmButton.addEventListener('click', () => {
    if (dontAskAgainInput && dontAskAgainInput.checked) {
      localStorage.setItem(DONT_ASK_AGAIN_KEY, 'true');
    }
    revealSolutionManually();
    closeLookItUpModal();
  });
}

// Deep-link support for profile.html's "jump to this problem" links, e.g.
// index.html?exercise=42. Clears any active filters so the target exercise
// is guaranteed to be reachable regardless of filter state.
function applyDeepLinkFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const requestedId = Number(params.get('exercise'));
  if (!requestedId) return;

  const index = exercises.findIndex((exercise) => exercise.id === requestedId);
  if (index === -1) return;

  activeFunctionFilters.clear();
  activeDifficultyFilter = null;
  document.querySelectorAll('.filters .pill').forEach((pill) => pill.classList.remove('btn-active'));

  currentExerciseIndex = index;
}

renderFilterPills();
applyDeepLinkFromUrl();
renderExercise(currentExerciseIndex);
