<script>
  let { exercise } = $props();

  // Popover ids must be unique per exercise since CodeEditor/SolutionDetails
  // keep exercises mounted across navigation in some cases — cheap to scope
  // by id rather than risk two hints fighting over one shared anchor.
  const popoverId = $derived(`hint-popover-${exercise.id}`);
</script>

{#if exercise.hint}
  <button type="button" class="hint-trigger" popovertarget={popoverId}>
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
    <span class="toggle-label">See hint</span>
  </button>

  <div popover id={popoverId} class="hint-popover">
    <p>{exercise.hint.text}</p>
    {#if exercise.hint.mdnUrl}
      <a href={exercise.hint.mdnUrl} target="_blank" rel="noopener noreferrer">View on MDN</a>
    {/if}
  </div>
{/if}
