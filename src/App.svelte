<script>
  import { fly } from 'svelte/transition';
  import ThemeToggle from './lib/components/ThemeToggle.svelte';
  import LanguageSelect from './lib/components/LanguageSelect.svelte';
  import ExerciseCarousel from './lib/components/ExerciseCarousel.svelte';
  import ProfilePanel from './lib/components/ProfilePanel.svelte';
  import ReadmeModal from './lib/components/ReadmeModal.svelte';
  import { currentView } from './lib/stores/ui.js';

  let readmeModalRef = $state(null);
  function openReadme() {
    readmeModalRef?.open();
  }
</script>

<a href="#main-content" class="skip-link">Skip to exercise content</a>

<div class="page-wrap">
  {#if $currentView === 'exercises'}
    <div class="page-header">
      <h1 class="text-2xl sm:text-4xl font-extrabold tracking-tight title-row">
        <LanguageSelect />
        Exerciser
      </h1>

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

        <button type="button" class="btn btn-ghost btn-circle" aria-label="Function reference docs" onclick={openReadme}>
          <svg class="icon h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        </button>

        <ThemeToggle />
      </div>
    </div>

    <div id="main-content">
      <ExerciseCarousel />
    </div>
  {:else}
    <div id="main-content" in:fly={{ x: 40, duration: 200 }} out:fly={{ x: -40, duration: 150 }}>
      <ProfilePanel onOpenReadme={openReadme} />
    </div>
  {/if}
</div>

<ReadmeModal bind:this={readmeModalRef} />
