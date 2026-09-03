<script>
  import { marked } from 'marked';
  import javascriptReadme from '../../../JAVASCRIPT_REFERENCE.md?raw';
  import pythonReadme from '../../../PYTHON_IDIOMS_REFERENCE.md?raw';
  import { currentLanguage } from '../stores/language.js';

  // One doc per language, mirroring how DOC_SITE_NAME/KNOWN_FUNCTION_DOC_LINKS
  // already split per language module. Falls back to the JavaScript doc so an
  // unrecognised language still shows something rather than a blank modal.
  const README_SOURCES = { javascript: javascriptReadme, python: pythonReadme };

  let dialogEl = $state(null);

  const html = $derived(marked.parse(README_SOURCES[$currentLanguage] ?? javascriptReadme));

  export function open() {
    dialogEl?.showModal();
  }

  function close() {
    dialogEl?.close();
  }
</script>

<dialog bind:this={dialogEl} class="modal" aria-label="Function reference docs">
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
