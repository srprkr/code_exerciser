<script>
  import { Progress } from '../stores/progress.js';

  let importPanelOpen = $state(false);
  let syncTextarea = $state(null);
  let textareaValue = $state('');
  let statusMessage = $state('');
  let statusIsError = $state(false);

  function setSyncStatus(message, isError) {
    statusMessage = message;
    statusIsError = isError;
  }

  async function handleExport() {
    const json = Progress.exportData();

    try {
      await navigator.clipboard.writeText(json);
      setSyncStatus('Copied!', false);
    } catch {
      // Clipboard API unavailable (non-secure context, permissions, etc.) —
      // fall back to revealing the textarea, pre-filled and selected, so
      // the user can copy it manually.
      importPanelOpen = true;
      textareaValue = json;
      setSyncStatus(
        "Couldn't copy automatically — the text below is selected, copy it manually (Ctrl/Cmd+C).",
        true
      );
      // Wait for the textarea to actually render before focusing/selecting it.
      queueMicrotask(() => {
        syncTextarea?.focus();
        syncTextarea?.select();
      });
    }
  }

  function toggleImportPanel() {
    importPanelOpen = !importPanelOpen;
    if (importPanelOpen) {
      queueMicrotask(() => syncTextarea?.focus());
    }
  }

  function handleImportConfirm() {
    const success = Progress.importData(textareaValue.trim());

    if (!success) {
      setSyncStatus("That doesn't look like valid progress data — paste the exact text you copied.", true);
      return;
    }

    setSyncStatus('Imported! Reloading…', false);
    window.location.reload();
  }
</script>

<div class="block">
  <details>
    <summary>
      <svg class="icon summary-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 18l6-6-6-6" />
      </svg>
      Sync across browsers
    </summary>

    <div class="sync-panel">
      <p class="text-sm mb-2" style="color: var(--color-text-muted);">
        Copy your progress to paste into another browser, or paste progress copied from elsewhere to bring it here.
      </p>

      <div class="flex flex-wrap items-center gap-2">
        <button
          type="button"
          class="btn btn-outline btn-circle btn-sm"
          aria-label="Copy my progress"
          title="Copy my progress"
          onclick={handleExport}
        >
          <svg class="icon h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        </button>

        <button
          type="button"
          class="btn btn-outline btn-circle btn-sm"
          aria-label="Import progress"
          title="Import progress"
          onclick={toggleImportPanel}
        >
          <svg class="icon h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 3v12" />
            <path d="m7 10 5 5 5-5" />
            <path d="M5 21h14" />
          </svg>
        </button>

        <span class="text-sm" style="color: {statusIsError ? '#b3261e' : 'var(--color-text-muted)'};">
          {statusMessage}
        </span>
      </div>

      {#if importPanelOpen}
        <div class="mt-2">
          <textarea
            bind:this={syncTextarea}
            bind:value={textareaValue}
            class="textarea textarea-bordered w-full font-mono text-xs"
            rows="4"
            placeholder="Paste your copied progress here…"
          ></textarea>
          <button type="button" class="btn btn-primary btn-sm mt-2" onclick={handleImportConfirm}>
            Import
          </button>
        </div>
      {/if}
    </div>
  </details>
</div>
