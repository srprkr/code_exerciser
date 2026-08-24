<script>
  import ThemeToggle from './lib/components/ThemeToggle.svelte';
  import ExerciseCarousel from './lib/components/ExerciseCarousel.svelte';
  import { currentView } from './lib/stores/ui.js';
</script>

<div class="page-wrap">
  <div class="page-header">
    <h1 class="text-2xl sm:text-4xl font-extrabold tracking-tight">Coding function practice</h1>

    <div class="header-actions">
      <button
        type="button"
        class="btn btn-ghost btn-circle"
        aria-label="View profile"
        onclick={() => currentView.set('profile')}
      >
        <svg class="icon h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
        </svg>
      </button>

      <ThemeToggle />
    </div>
  </div>

  {#if $currentView === 'exercises'}
    <ExerciseCarousel />
  {:else}
    <!-- ProfilePanel mounts here in Phase 4 -->
    <p>Profile panel coming in Phase 4.</p>
    <button type="button" class="btn btn-ghost btn-sm" onclick={() => currentView.set('exercises')}>
      Back to exercises
    </button>
  {/if}
</div>
