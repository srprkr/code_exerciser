<script>
  const DONT_ASK_AGAIN_KEY = 'lookItUpDismissed';

  let { onConfirm } = $props();

  let dialogEl = $state(null);
  let dontAskAgain = $state(false);

  export function open() {
    dialogEl?.showModal();
  }

  function close() {
    dialogEl?.close();
  }

  function confirm() {
    if (dontAskAgain) {
      localStorage.setItem(DONT_ASK_AGAIN_KEY, 'true');
    }
    onConfirm();
    close();
  }

  export function isDismissedPermanently() {
    return localStorage.getItem(DONT_ASK_AGAIN_KEY) === 'true';
  }
</script>

<dialog bind:this={dialogEl} class="modal">
  <div class="modal-box relative">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" aria-label="Close">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 6 6 18" />
          <path d="M6 6l12 12" />
        </svg>
      </button>
    </form>

    <h3 class="text-lg font-bold">Are you sure?</h3>
    <p class="py-4">Practicing without the answers improves muscle memory. Try working through it a bit longer before peeking.</p>
    <label class="modal-dismiss flex items-center gap-2 text-sm cursor-pointer">
      <input type="checkbox" class="checkbox checkbox-sm" bind:checked={dontAskAgain} />
      Don't ask me again
    </label>
    <div class="modal-action flex-col sm:flex-row gap-4 !space-x-0">
      <button type="button" class="btn w-full sm:w-auto" onclick={confirm}>Show me the solution</button>
      <button type="button" class="btn btn-primary w-full sm:w-auto" onclick={close}>Keep toughing it out</button>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
