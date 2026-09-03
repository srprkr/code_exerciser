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
  let flatSection = $state({ left: 0, width: 0 });

  const currentLabel = $derived(
    LANGUAGES.find((lang) => lang.id === $currentLanguage)?.label ?? ''
  );

  // A pill's rounded caps eat `height / 2` of horizontal run at each end, so
  // the flat part of its border starts one cap-radius in and ends one
  // cap-radius short. Measured rather than hardcoded because the title font
  // (and so the pill's height) changes at the sm: breakpoint.
  function measureFlatSection() {
    if (!triggerEl) return;
    const rect = triggerEl.getBoundingClientRect();
    const capRadius = rect.height / 2;
    flatSection = { left: capRadius, width: Math.max(rect.width - capRadius * 2, 0) };
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
    aria-label="Select programming language"
    aria-haspopup="listbox"
    aria-expanded={open}
    onclick={() => (open ? closeList() : openList())}
    onkeydown={onTriggerKeydown}
  >
    <span class="language-chevron" aria-hidden="true"></span>
    {currentLabel}
  </button>

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

  .language-trigger {
    display: inline-flex;
    align-items: center;
    gap: 0.4em;
    background: transparent;
    color: inherit;
    font: inherit;
    font-weight: inherit;
    letter-spacing: inherit;
    border: 1.5px solid color-mix(in srgb, currentColor 30%, transparent);
    border-radius: 999px;
    padding: 0 0.7em 0.1em 0.8em;
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
