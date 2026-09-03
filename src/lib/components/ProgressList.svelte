<script>
  import { exercises } from '../data/exercises.js';
  import { progress, Progress } from '../stores/progress.js';

  let { onSelectExercise } = $props();

  const STATUSES = [
    { status: 'completed', label: 'Completed' },
    { status: 'attempted', label: 'Attempted' },
    { status: 'untouched', label: 'Not started' }
  ];

  let activeStatus = $state('completed');

  const allProgress = $derived($progress);

  const total = $derived(exercises.length);
  const completedCount = $derived(
    exercises.filter((e) => allProgress[e.id] && allProgress[e.id].completed).length
  );

  const listForStatus = $derived.by(() => {
    return exercises.filter((exercise) => {
      const entry = allProgress[exercise.id];
      if (activeStatus === 'completed') return entry && entry.completed;
      if (activeStatus === 'attempted') return entry && entry.attempted && !entry.completed;
      return !entry || (!entry.attempted && !entry.completed);
    });
  });
</script>

<div id="progress-summary" class="mb-2">{completedCount} / {total} problems completed</div>

<div class="tabs tabs-boxed w-fit">
  {#each STATUSES as { status, label } (status)}
    <button
      type="button"
      class="tab progress-tab-button"
      class:tab-active={activeStatus === status}
      onclick={() => (activeStatus = status)}
    >
      {label}
    </button>
  {/each}
</div>

<ul class="progress-list">
  {#if listForStatus.length === 0}
    <li class="progress-list-empty">Nothing here yet.</li>
  {:else}
    {#each listForStatus as exercise (exercise.id)}
      <li>
        <button
          type="button"
          class="progress-list-link"
          onclick={() => onSelectExercise(exercise.id)}
        >
          Problem {exercise.id}: {exercise.question}
        </button>
      </li>
    {/each}
  {/if}
</ul>
