<script>
  import { CORE_FUNCTIONS } from '../data/exercises.js';
  import {
    KNOWN_FUNCTIONS,
    DIFFICULTIES,
    activeFunctionFilters,
    activeDifficultyFilter,
    toggleFunctionFilter,
    toggleDifficultyFilter,
    clearFilters
  } from '../stores/ui.js';

  const FUNCTION_PILLS_VISIBLE = CORE_FUNCTIONS.length;
  let functionPillsExpanded = $state(false);

  const hiddenCount = $derived(KNOWN_FUNCTIONS.length - FUNCTION_PILLS_VISIBLE);
</script>

<div class="filters" aria-label="Filter exercises">
  <div class="filter-group" id="function-filters">
    <span class="filter-label">Functions</span>
    {#each KNOWN_FUNCTIONS as fn, index (fn)}
      <button
        type="button"
        class="pill btn btn-outline btn-xs sm:btn-sm"
        class:btn-active={$activeFunctionFilters.has(fn)}
        class:collapsed={!functionPillsExpanded && index >= FUNCTION_PILLS_VISIBLE}
        data-value={fn}
        onclick={() => toggleFunctionFilter(fn)}
      >
        {fn}
      </button>
    {/each}
    {#if hiddenCount > 0}
      <button
        type="button"
        class="pill-toggle btn btn-ghost btn-xs sm:btn-sm"
        onclick={() => (functionPillsExpanded = !functionPillsExpanded)}
      >
        {functionPillsExpanded ? 'Show less' : `Show ${hiddenCount} more`}
      </button>
    {/if}
  </div>

  <div class="filter-group" id="difficulty-filters">
    <span class="filter-label">Difficulty</span>
    {#each DIFFICULTIES as level (level)}
      <button
        type="button"
        class="pill btn btn-outline btn-xs sm:btn-sm"
        class:btn-active={$activeDifficultyFilter === level}
        data-value={level}
        onclick={() => toggleDifficultyFilter(level)}
      >
        {level}
      </button>
    {/each}
  </div>

  <button type="button" id="clear-filters" class="btn btn-ghost btn-xs sm:btn-sm" onclick={clearFilters}>
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 6 6 18" />
      <path d="M6 6l12 12" />
    </svg>
    Clear filters
  </button>
</div>
