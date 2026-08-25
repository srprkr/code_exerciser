<script>
  import { onMount } from 'svelte';
  import {
    filteredExercises,
    currentExerciseIndex,
    applyDeepLinkFromUrl,
    stepExercise
  } from '../stores/ui.js';
  import { progress as progressStore } from '../stores/progress.js';
  import { bindArrowKeyNav } from '../utils/keyboardNav.js';
  import ExerciseFilters from './ExerciseFilters.svelte';
  import DoneCheckmark from './DoneCheckmark.svelte';
  import SolutionToggle from './SolutionToggle.svelte';
  import SolutionDetails from './SolutionDetails.svelte';
  import CodeEditor from './CodeEditor.svelte';

  const SKIP_AMOUNT = 10;

  const DIFFICULTY_BADGE_CLASS = {
    easy: 'badge-success',
    medium: 'badge-warning',
    hard: 'badge-error'
  };

  const exercise = $derived($filteredExercises[$currentExerciseIndex]);
  const hasResults = $derived($filteredExercises.length > 0);

  // Lifted so SolutionToggle (title row) and SolutionDetails (near the
  // bottom) share one visibility state, matching the original two-location
  // layout. Reset whenever the exercise changes, equivalent to the old
  // resetSolutionMode() called on every render.
  let solutionVisible = $state(false);
  $effect(() => {
    exercise; // dependency
    solutionVisible = false;
  });

  const completed = $derived.by(() => {
    if (!exercise) return false;
    const allProgress = $progressStore; // actually read the store's value so this re-derives on any progress change
    const entry = allProgress[exercise.id];
    return !!(entry && entry.completed);
  });

  const showSkipButtons = $derived($filteredExercises.length >= SKIP_AMOUNT);

  onMount(() => {
    applyDeepLinkFromUrl();
    return bindArrowKeyNav({ onStep: stepExercise, skipAmount: SKIP_AMOUNT });
  });
</script>

<section class="exercise-carousel" aria-label="Exercise carousel">
  <ExerciseFilters />

  <div class="carousel-controls">
    <div class="carousel-controls-group">
      {#if showSkipButtons}
        <button
          type="button"
          class="carousel-button carousel-skip-button btn btn-outline btn-sm sm:btn-md"
          aria-label="Back {SKIP_AMOUNT} problems"
          onclick={() => stepExercise(-SKIP_AMOUNT)}
        >
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 17l-5-5 5-5" />
            <path d="M11 17l-5-5 5-5" />
          </svg>
        </button>
      {/if}
      <button type="button" class="carousel-button btn btn-outline btn-sm sm:btn-md" onclick={() => stepExercise(-1)}>
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Previous
      </button>
    </div>

    <span class="carousel-counter">
      {hasResults ? `${$currentExerciseIndex + 1} / ${$filteredExercises.length}` : '0 / 0'}
    </span>

    <div class="carousel-controls-group">
      <button type="button" class="carousel-button btn btn-outline btn-sm sm:btn-md" onclick={() => stepExercise(1)}>
        Next
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
      {#if showSkipButtons}
        <button
          type="button"
          class="carousel-button carousel-skip-button btn btn-outline btn-sm sm:btn-md"
          aria-label="Forward {SKIP_AMOUNT} problems"
          onclick={() => stepExercise(SKIP_AMOUNT)}
        >
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 17l5-5-5-5" />
            <path d="M13 17l5-5-5-5" />
          </svg>
        </button>
      {/if}
    </div>
  </div>

  {#if !hasResults}
    <p class="no-results alert alert-info justify-center">
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
        <path d="M8 8l6 6" />
        <path d="M14 8l-6 6" />
      </svg>
      No exercises match the selected filters.
    </p>
  {:else if exercise}
    <section class="exercise">
      <div class="exercise-title-row">
        <div class="exercise-title-group">
          <DoneCheckmark {completed} />
          <h2 class="exercise-title text-xl sm:text-2xl font-bold">Problem {exercise.id}</h2>
        </div>

        {#if !completed}
          <SolutionToggle {exercise} bind:solutionVisible />
        {/if}
      </div>

      <div class="block tags">
        {#each exercise.functions as fn (fn)}
          <span class="badge badge-info badge-outline">{fn}</span>
        {/each}
        <span class="badge {DIFFICULTY_BADGE_CLASS[exercise.difficulty]}">{exercise.difficulty}</span>
      </div>

      <div class="block">
        <h3 class="font-bold mt-4 mb-1">Question:</h3>
        <p class="question">{exercise.question}</p>
      </div>

      <div class="block mb-0">
        <h3 class="font-bold mt-4 mb-1">Your turn:</h3>
        <CodeEditor {exercise} onCheckPassed={() => (solutionVisible = true)} />
      </div>

      <SolutionDetails {exercise} {solutionVisible} />
    </section>
  {/if}
</section>
