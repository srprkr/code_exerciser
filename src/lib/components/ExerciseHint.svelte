<script>
  import { KNOWN_FUNCTION_DOC_LINKS, DOC_SITE_NAME } from '../stores/ui.js';

  let { exercise } = $props();

  // Popover ids must be unique per exercise since CodeEditor/SolutionDetails
  // keep exercises mounted across navigation in some cases — cheap to scope
  // by id rather than risk two hints fighting over one shared anchor.
  const popoverId = $derived(`hint-popover-${exercise.id}`);

  // Derived from the exercise's own tags rather than stored per problem, so
  // every exercise gets the right docs link without repeating URLs across the
  // data file. `hint.mdnUrl` still wins when set, for the cases where the
  // useful page isn't one of the filter tags (e.g. localeCompare).
  const docUrl = $derived(
    exercise.hint?.mdnUrl ??
      exercise.functions?.map((fn) => $KNOWN_FUNCTION_DOC_LINKS[fn]).find(Boolean) ??
      null
  );
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
    {#if docUrl}
      <a href={docUrl} target="_blank" rel="noopener noreferrer">View on {$DOC_SITE_NAME}</a>
    {/if}
  </div>
{/if}
