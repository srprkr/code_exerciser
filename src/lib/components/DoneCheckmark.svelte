<script>
  // Deliberately uses {#if} to add/remove this element from the DOM
  // entirely, rather than the original vanilla-JS approach of toggling a
  // CSS class with `display: none !important`. That class-toggle existed
  // to work around a daisyUI/Tailwind cascade collision with the `hidden`
  // attribute — removing the element from the DOM sidesteps that whole bug
  // class instead of needing to defend against it.
  let { completed = false } = $props();
</script>

{#if completed}
  <svg
    class="icon done-checkmark h-5 w-5"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="3"
    stroke-linecap="round"
    stroke-linejoin="round"
    role="img"
    aria-label="Completed"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12.5l2.5 2.5 5-6" />
  </svg>
{/if}
