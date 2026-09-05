<script>
  import { LANGUAGES, currentLanguage, selectLanguage } from '../stores/language.js';

  // A hand-rolled listbox rather than a native <select>: the browser draws a
  // native popup as an OS-level widget, which ignores our theme tokens
  // entirely on macOS and always spans the trigger's full border-box width.
  // Owning the popup as real DOM is what lets it be themed everywhere and
  // inset to the pill's flat section.
  let open = $state(false);
  let activeIndex = $state(0);
  let triggerEl = $state(null);
  let listEl = $state(null);
  let measureEls = $state([]);
  let flatSection = $state({ left: 0, width: 0 });
  // The trigger's own natural width changes with whichever language is
  // selected ("Python" is shorter than "JavaScript") — and since the popup's
  // width is measured off the trigger (see measureFlatSection below), an
  // unpinned trigger would make the popup too narrow to comfortably fit the
  // longest option whenever a shorter one is currently selected. Pinning the
  // trigger's min-width to the widest label fixes both at once.
  let triggerMinWidth = $state(0);

  const currentLabel = $derived(
    LANGUAGES.find((lang) => lang.id === $currentLanguage)?.label ?? ''
  );

  // The popup spans the trigger's full width edge-to-edge — not inset by the
  // pill's cap radius the way an earlier version of this did, since insetting
  // shrinks the popup below the pill's own width, defeating the point of
  // pinning the trigger to the widest label in the first place (the popup
  // must never end up narrower than that). Measured rather than hardcoded
  // because the title font (and so the pill's width) changes at the sm:
  // breakpoint.
  function measureFlatSection() {
    if (!triggerEl) return;
    const rect = triggerEl.getBoundingClientRect();
    flatSection = { left: 0, width: rect.width };
  }

  // Measures each language's natural pill width via off-screen clones (see
  // .language-trigger-measure below) rather than approximating text width in
  // JS — a real rendered clone automatically accounts for the current font,
  // padding, border and chevron exactly as CSS actually lays them out.
  function measureWidestTriggerWidth() {
    const widths = measureEls.filter(Boolean).map((el) => el.getBoundingClientRect().width);
    if (widths.length > 0) triggerMinWidth = Math.max(...widths);
  }

  function openList() {
    measureFlatSection();
    const selectedIndex = LANGUAGES.findIndex((lang) => lang.id === $currentLanguage);
    activeIndex = selectedIndex === -1 ? 0 : selectedIndex;
    open = true;
  }

  function closeList({ refocus = true } = {}) {
    open = false;
    if (refocus) triggerEl?.focus();
  }

  function choose(lang) {
    // Unavailable languages stay in the list so the roadmap is visible, but
    // they're aria-disabled rather than skipped — a keyboard or screen-reader
    // user can still land on them and hear they exist.
    if (!lang.available) return;
    selectLanguage(lang.id);
    closeList();
  }

  function moveActive(delta) {
    const len = LANGUAGES.length;
    activeIndex = (((activeIndex + delta) % len) + len) % len;
  }

  function onTriggerKeydown(event) {
    if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
      event.preventDefault();
      openList();
    }
  }

  function onListKeydown(event) {
    // keyboardNav.js binds ArrowLeft/ArrowRight on the document to step
    // between exercises. Stop every key here from reaching it, so navigating
    // an open dropdown never also flips the exercise behind it.
    event.stopPropagation();

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        moveActive(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        moveActive(-1);
        break;
      case 'Home':
        event.preventDefault();
        activeIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        activeIndex = LANGUAGES.length - 1;
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        choose(LANGUAGES[activeIndex]);
        break;
      case 'Escape':
        event.preventDefault();
        closeList();
        break;
      case 'Tab':
        closeList({ refocus: false });
        break;
      default:
        break;
    }
  }

  // Move focus into the popup once it exists, so the listbox keymap above
  // receives keys and `aria-activedescendant` announces the active option.
  $effect(() => {
    if (open) listEl?.focus();
  });

  // Runs regardless of open/closed state — the trigger's width has to be
  // correct before the user ever opens the dropdown, not just once they do.
  // Re-measures on resize since the font (and so every clone's width)
  // changes at the title's sm: breakpoint.
  $effect(() => {
    measureWidestTriggerWidth();
    window.addEventListener('resize', measureWidestTriggerWidth);
    return () => window.removeEventListener('resize', measureWidestTriggerWidth);
  });

  $effect(() => {
    if (!open) return;

    function onPointerDown(event) {
      if (triggerEl?.contains(event.target) || listEl?.contains(event.target)) return;
      closeList({ refocus: false });
    }

    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('resize', measureFlatSection);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('resize', measureFlatSection);
    };
  });
</script>

<div class="language-select">
  <button
    bind:this={triggerEl}
    type="button"
    class="language-trigger"
    style={triggerMinWidth ? `min-width: ${triggerMinWidth}px` : undefined}
    aria-label="Select programming language"
    aria-haspopup="listbox"
    aria-expanded={open}
    onclick={() => (open ? closeList() : openList())}
    onkeydown={onTriggerKeydown}
  >
    <span class="language-chevron" aria-hidden="true"></span>
    {currentLabel}
  </button>

  <!-- Invisible but laid-out (not display:none) clones of every language's
       pill, purely so measureWidestTriggerWidth() can read a real rendered
       width per label — this is what lets the trigger (and so the popup,
       which sizes off the trigger) stay pinned to the widest one. -->
  <div class="language-trigger-measure" aria-hidden="true">
    {#each LANGUAGES as lang, index (lang.id)}
      <span class="language-trigger" bind:this={measureEls[index]}>
        <span class="language-chevron"></span>
        {lang.label}
      </span>
    {/each}
  </div>

  {#if open}
    <ul
      bind:this={listEl}
      class="language-listbox"
      role="listbox"
      tabindex="-1"
      aria-label="Programming language"
      aria-activedescendant={`language-option-${LANGUAGES[activeIndex].id}`}
      style={`left: ${flatSection.left}px; width: ${flatSection.width}px;`}
      onkeydown={onListKeydown}
    >
      {#each LANGUAGES as lang, index (lang.id)}
        <!-- The ARIA listbox pattern puts the keymap on the focused container,
             not on each option, so the per-option keyboard handler this rule
             asks for would be redundant. Keys are handled by onListKeydown. -->
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <li
          id={`language-option-${lang.id}`}
          class="language-option"
          class:is-active={index === activeIndex}
          role="option"
          aria-selected={lang.id === $currentLanguage}
          aria-disabled={!lang.available}
          onclick={() => choose(lang)}
          onmouseenter={() => (activeIndex = index)}
        >
          {lang.label}
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .language-select {
    position: relative;
    display: inline-flex;
    align-items: center;
  }

  /* Laid out for real (not display:none, which would give zero width) so
     measureWidestTriggerWidth() gets accurate rendered widths, but taken
     out of flow and clipped to zero size so it never affects visible
     layout or the page's scroll dimensions. */
  .language-trigger-measure {
    position: absolute;
    top: 0;
    left: 0;
    height: 0;
    overflow: hidden;
    visibility: hidden;
    pointer-events: none;
  }

  .language-trigger {
    display: inline-flex;
    align-items: center;
    gap: 0.4em;
    background: transparent;
    color: inherit;
    font: inherit;
    font-size: 0.8em;
    font-weight: inherit;
    letter-spacing: inherit;
    border: 1.5px solid color-mix(in srgb, currentColor 30%, transparent);
    border-radius: 999px;
    padding: 0 0.5em 0.1em 0.6em;
    cursor: pointer;
  }

  .language-trigger:hover {
    border-color: color-mix(in srgb, currentColor 55%, transparent);
  }

  .language-trigger:focus-visible {
    outline: 2px solid color-mix(in srgb, currentColor 55%, transparent);
    outline-offset: 2px;
  }

  .language-chevron {
    width: 0.4em;
    height: 0.4em;
    margin-top: -0.2em;
    border-right: 2px solid currentColor;
    border-bottom: 2px solid currentColor;
    transform: rotate(45deg);
    opacity: 0.5;
    flex: none;
  }

  /* Positioned by inline `left`/`width` from measureFlatSection() so the
     popup's edges meet the flat run of the pill's border. */
  .language-listbox {
    position: absolute;
    top: calc(100% + 0.35rem);
    z-index: 30;
    margin: 0;
    padding: 0.25rem;
    list-style: none;
    box-sizing: border-box;
    background: var(--color-bg);
    color: var(--color-text);
    border: 1px solid var(--color-border);
    border-radius: 10px;
    box-shadow: 0 6px 18px rgb(0 0 0 / 16%);
    /* The trigger wears the h1's oversized extrabold title font; the list
       is body copy and must not inherit it. */
    font-family: Arial, sans-serif;
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: normal;
  }

  .language-listbox:focus {
    outline: none;
  }

  .language-option {
    padding: 0.3rem 0.55rem;
    border-radius: 6px;
    cursor: pointer;
    white-space: nowrap;
  }

  .language-option.is-active {
    background: var(--color-surface-alt);
  }

  .language-option[aria-selected='true'] {
    font-weight: 700;
  }

  .language-option[aria-disabled='true'] {
    color: var(--color-text-muted);
    cursor: default;
  }
</style>
