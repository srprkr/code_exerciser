const headingTextEl = document.querySelector('#profile-heading-text');
const nameInput = document.querySelector('#display-name-input');
const editNameButton = document.querySelector('#edit-name-button');
const editNameIcon = document.querySelector('#edit-name-icon');
const saveNameIcon = document.querySelector('#save-name-icon');
const achievementsGrid = document.querySelector('#achievements-grid');
const progressSummaryEl = document.querySelector('#progress-summary');
const progressListEl = document.querySelector('#progress-list');
const tabButtons = document.querySelectorAll('.progress-tab-button');
const exportButton = document.querySelector('#export-button');
const importToggleButton = document.querySelector('#import-toggle-button');
const importPanel = document.querySelector('#import-panel');
const importConfirmButton = document.querySelector('#import-confirm-button');
const syncTextarea = document.querySelector('#sync-textarea');
const syncStatusEl = document.querySelector('#sync-status');

let activeStatus = 'completed';
let isEditingName = false;

function renderHeading() {
  if (!headingTextEl) return;
  const name = window.Progress.getDisplayName() || 'Insert name here';
  headingTextEl.textContent = `${name}'s Profile`;
}

function openNameEditor() {
  if (!headingTextEl || !nameInput) return;
  isEditingName = true;
  nameInput.value = window.Progress.getDisplayName();
  headingTextEl.hidden = true;
  nameInput.hidden = false;
  if (editNameIcon) editNameIcon.hidden = true;
  if (saveNameIcon) saveNameIcon.hidden = false;
  nameInput.focus();
}

function closeNameEditorUI() {
  isEditingName = false;
  if (headingTextEl) headingTextEl.hidden = false;
  if (nameInput) nameInput.hidden = true;
  if (editNameIcon) editNameIcon.hidden = false;
  if (saveNameIcon) saveNameIcon.hidden = true;
}

function saveNameEditor() {
  if (!nameInput || !isEditingName) return;
  window.Progress.setDisplayName(nameInput.value.trim());
  renderHeading();
  closeNameEditorUI();
}

if (editNameButton) {
  editNameButton.addEventListener('click', () => {
    if (isEditingName) {
      saveNameEditor();
    } else {
      openNameEditor();
    }
  });
}

if (nameInput) {
  // Click-out (blur) saves. The save-icon click also blurs the input first,
  // so this covers that path too — saveNameEditor no-ops if already saved.
  nameInput.addEventListener('blur', saveNameEditor);

  nameInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      nameInput.blur();
    } else if (event.key === 'Escape') {
      closeNameEditorUI();
    }
  });
}

function renderAchievements() {
  if (!achievementsGrid) return;
  achievementsGrid.innerHTML = '';

  const achievements = window.Progress.getBadges();

  achievements.forEach((achievement) => {
    const mdnUrl = KNOWN_FUNCTION_MDN_LINKS[achievement.tag];
    const card = document.createElement(mdnUrl ? 'a' : 'div');
    card.className = achievement.earned ? 'achievement-card achievement-card-earned' : 'achievement-card';

    if (mdnUrl) {
      card.href = mdnUrl;
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
      card.title = 'View on MDN';
    }

    const label = document.createElement('span');
    label.className = 'achievement-card-label';
    label.textContent = achievement.tag;

    const status = document.createElement('span');
    status.className = 'achievement-card-status';
    status.textContent = achievement.earned
      ? 'Mastered'
      : `${achievement.completedCount} / ${achievement.total}`;

    card.appendChild(label);
    card.appendChild(status);
    achievementsGrid.appendChild(card);
  });
}

function getExercisesByStatus(status) {
  const progress = window.Progress.getAll();

  return exercises.filter((exercise) => {
    const entry = progress[exercise.id];
    if (status === 'completed') return entry && entry.completed;
    if (status === 'attempted') return entry && entry.attempted && !entry.completed;
    return !entry || (!entry.attempted && !entry.completed);
  });
}

function renderProgressSummary() {
  if (!progressSummaryEl) return;
  const progress = window.Progress.getAll();
  const total = exercises.length;
  const completed = exercises.filter((e) => progress[e.id] && progress[e.id].completed).length;
  progressSummaryEl.textContent = `${completed} / ${total} problems completed`;
}

function renderProgressList() {
  if (!progressListEl) return;
  progressListEl.innerHTML = '';

  const list = getExercisesByStatus(activeStatus);

  if (list.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'progress-list-empty';
    empty.textContent = 'Nothing here yet.';
    progressListEl.appendChild(empty);
    return;
  }

  list.forEach((exercise) => {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = `index.html?exercise=${exercise.id}`;
    link.className = 'progress-list-link';
    link.textContent = `Problem ${exercise.id}: ${exercise.question}`;
    item.appendChild(link);
    progressListEl.appendChild(item);
  });
}

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeStatus = button.dataset.status;
    tabButtons.forEach((b) => b.classList.remove('tab-active'));
    button.classList.add('tab-active');
    renderProgressList();
  });
});

const defaultTab = document.querySelector(`.progress-tab-button[data-status="${activeStatus}"]`);
if (defaultTab) defaultTab.classList.add('tab-active');

function setSyncStatus(message, isError) {
  if (!syncStatusEl) return;
  syncStatusEl.textContent = message;
  syncStatusEl.style.color = isError ? '#b3261e' : 'var(--color-text-muted)';
}

if (exportButton) {
  exportButton.addEventListener('click', async () => {
    const json = window.Progress.exportData();

    try {
      await navigator.clipboard.writeText(json);
      setSyncStatus('Copied!', false);
    } catch {
      // Clipboard API unavailable (non-secure context, permissions, etc.) —
      // fall back to revealing the textarea, pre-filled and selected, so
      // the user can copy it manually.
      if (importPanel) importPanel.hidden = false;
      if (syncTextarea) {
        syncTextarea.value = json;
        syncTextarea.focus();
        syncTextarea.select();
      }
      setSyncStatus("Couldn't copy automatically — the text below is selected, copy it manually (Ctrl/Cmd+C).", true);
    }
  });
}

if (importToggleButton) {
  importToggleButton.addEventListener('click', () => {
    if (!importPanel) return;
    importPanel.hidden = !importPanel.hidden;
    if (!importPanel.hidden && syncTextarea) syncTextarea.focus();
  });
}

if (importConfirmButton) {
  importConfirmButton.addEventListener('click', () => {
    if (!syncTextarea) return;
    const success = window.Progress.importData(syncTextarea.value.trim());

    if (!success) {
      setSyncStatus("That doesn't look like valid progress data — paste the exact text you copied.", true);
      return;
    }

    setSyncStatus('Imported! Reloading…', false);
    window.location.reload();
  });
}

renderHeading();
renderAchievements();
renderProgressSummary();
renderProgressList();
