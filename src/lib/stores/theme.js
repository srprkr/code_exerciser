import { writable } from 'svelte/store';

// The initial value is already set on <html data-theme> by the inline
// anti-FOUC script in index.html (must run before Svelte mounts) — this
// store just reads that same state back so components can react to it.
function currentThemeFromDocument() {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

export const theme = writable(currentThemeFromDocument());

export function setTheme(next) {
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  theme.set(next);
}

export function toggleTheme() {
  theme.update((current) => {
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
    return next;
  });
}
