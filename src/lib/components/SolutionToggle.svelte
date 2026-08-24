<script>
  import { markPeeked } from '../stores/ui.js';
  import LookItUpModal from './LookItUpModal.svelte';

  let { exercise, solutionVisible = $bindable(false) } = $props();

  let modalRef = $state(null);

  function onToggleChange(event) {
    if (event.target.checked) {
      if (modalRef?.isDismissedPermanently()) {
        revealManually();
      } else {
        // Revert the visual toggle until the user confirms via the modal.
        event.target.checked = false;
        modalRef?.open();
      }
    } else {
      solutionVisible = false;
    }
  }

  function revealManually() {
    markPeeked(exercise.id);
    solutionVisible = true;
  }
</script>

<div class="tough-it-out-toggle">
  <label class="swap" aria-label="Toggle tough it out or see solution mode">
    <input type="checkbox" checked={solutionVisible} onchange={onToggleChange} />

    <!-- swap-on shows when checked (solution visible): clicking hides it again -->
    <span class="swap-on toggle-content">
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
        <path d="M4 4l16 16" />
      </svg>
      <span class="toggle-label">Tough it out</span>
    </span>

    <!-- swap-off shows when unchecked (solution hidden): clicking reveals it -->
    <span class="swap-off toggle-content">
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      <span class="toggle-label">See solution</span>
    </span>
  </label>
</div>

<LookItUpModal bind:this={modalRef} onConfirm={revealManually} />
