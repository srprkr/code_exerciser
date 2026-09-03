<script>
  import { Progress } from '../stores/progress.js';
  import { currentView, currentExerciseIndex, languageExercises } from '../stores/ui.js';
  import ThemeToggle from './ThemeToggle.svelte';
  import AchievementsGrid from './AchievementsGrid.svelte';
  import ProgressList from './ProgressList.svelte';
  import SyncPanel from './SyncPanel.svelte';

  let { onOpenReadme } = $props();

  let isEditingName = $state(false);
  let nameInputValue = $state('');
  let displayName = $state(Progress.getDisplayName());
  let nameInputEl = $state(null);

  function openNameEditor() {
    isEditingName = true;
    nameInputValue = displayName;
    queueMicrotask(() => nameInputEl?.focus());
  }

  function saveNameEditor() {
    if (!isEditingName) return;
    Progress.setDisplayName(nameInputValue.trim());
    displayName = Progress.getDisplayName();
    isEditingName = false;
  }

  function closeNameEditorUI() {
    isEditingName = false;
  }

  function onNameKeydown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      nameInputEl?.blur();
    } else if (event.key === 'Escape') {
      closeNameEditorUI();
    }
  }

  // Jumps directly into the exercises view at the given problem, replacing
  // the old index.html?exercise=N page navigation now that profile is an
  // in-page view rather than a separate page. Setting currentExerciseIndex
  // directly (instead of relying on a URL param re-read) is also what
  // fixes the "navigating to profile and back resets to problem 1" bug —
  // the index now lives in a shared store instead of being re-derived from
  // a fresh page load each time.
  function selectExercise(exerciseId) {
    const index = $languageExercises.findIndex((e) => e.id === exerciseId);
    if (index === -1) return;
    currentExerciseIndex.set(index);
    currentView.set('exercises');
  }
</script>

<div class="page-header">
  <div class="profile-heading">
    {#if isEditingName}
      <input
        bind:this={nameInputEl}
        bind:value={nameInputValue}
        type="text"
        class="input input-bordered font-extrabold text-2xl sm:text-4xl profile-heading-input"
        placeholder="Insert name here"
        maxlength="40"
        onblur={saveNameEditor}
        onkeydown={onNameKeydown}
      />
    {:else}
      <h1 class="text-2xl sm:text-4xl font-extrabold tracking-tight">
        {displayName || 'Insert name here'}'s Profile
      </h1>
    {/if}

    <button
      type="button"
      class="btn btn-ghost btn-circle btn-sm"
      aria-label="Edit display name"
      onclick={() => (isEditingName ? saveNameEditor() : openNameEditor())}
    >
      {#if isEditingName}
        <svg class="icon h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      {:else}
        <svg class="icon h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
        </svg>
      {/if}
    </button>
  </div>

  <div class="header-actions">
    <button
      type="button"
      class="btn btn-ghost btn-circle"
      aria-label="Back to exercises"
      onclick={() => currentView.set('exercises')}
    >
      <svg class="icon h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>

    <button type="button" class="btn btn-ghost btn-circle" aria-label="Function reference docs" onclick={onOpenReadme}>
      <svg class="icon h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    </button>

    <ThemeToggle />
  </div>
</div>

<div class="block">
  <h3 class="font-bold mt-4 mb-1">Achievements</h3>
  <AchievementsGrid />
</div>

<div class="block">
  <h3 class="font-bold mt-4 mb-1">Progress</h3>
  <ProgressList onSelectExercise={selectExercise} />
</div>

<SyncPanel />
