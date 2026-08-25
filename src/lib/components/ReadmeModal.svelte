<script>
  import { marked } from 'marked';
  import readmeSource from '../../../README.md?raw';

  let dialogEl = $state(null);

  const html = marked.parse(readmeSource);

  export function open() {
    dialogEl?.showModal();
  }

  function close() {
    dialogEl?.close();
  }
</script>

<dialog bind:this={dialogEl} class="modal">
  <div class="modal-box relative max-w-3xl readme-modal-box">
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" aria-label="Close">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 6 6 18" />
          <path d="M6 6l12 12" />
        </svg>
      </button>
    </form>

    <div class="readme-content">
      {@html html}
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
