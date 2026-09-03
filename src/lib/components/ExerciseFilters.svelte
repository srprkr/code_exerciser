<script>
  import {
    CORE_FUNCTIONS,
    KNOWN_FUNCTIONS,
    DIFFICULTIES,
    activeFunctionFilters,
    activeDifficultyFilter,
    toggleFunctionFilter,
    toggleDifficultyFilter,
    clearFilters
  } from '../stores/ui.js';

  // Tag lists are per-language stores now, so the "Show N more" split has to
  // recompute on a language switch rather than being fixed at init.
  const functionPillsVisible = $derived($CORE_FUNCTIONS.length);
  let functionPillsExpanded = $state(false);

  const hiddenCount = $derived($KNOWN_FUNCTIONS.length - functionPillsVisible);
  const hasActiveFilters = $derived($activeFunctionFilters.size > 0 || $activeDifficultyFilter !== null);
</script>

<div class="filters" aria-label="Filter exercises">
  <div class="filter-group" id="function-filters">
    <span class="filter-label">Functions</span>
    {#each $KNOWN_FUNCTIONS as fn, index (fn)}
      <button
        type="button"
        class="pill btn btn-outline btn-xs sm:btn-sm"
        class:btn-active={$activeFunctionFilters.has(fn)}
        class:collapsed={!functionPillsExpanded && index >= functionPillsVisible}
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
    {#each $DIFFICULTIES as level (level)}
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

  {#if hasActiveFilters}
    <button type="button" id="clear-filters" class="btn btn-ghost btn-xs sm:btn-sm" onclick={clearFilters}>
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 6 6 18" />
        <path d="M6 6l12 12" />
      </svg>
      Clear filters
    </button>
  {/if}
</div>
