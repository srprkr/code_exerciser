import { writable } from 'svelte/store';
import { DEFAULT_LANGUAGE, isKnownLanguage } from '../data/languages.js';

// Languages the exerciser can present in the title dropdown. Rust and Ruby
// are planned for later branches and deliberately left out until their
// exercise modules exist.
export const LANGUAGES = [
  { id: 'javascript', label: 'JavaScript', available: true },
  { id: 'python', label: 'Python', available: true }
];

const LANGUAGE_KEY = 'language';

function isSelectable(id) {
  return LANGUAGES.some((lang) => lang.id === id && lang.available) && isKnownLanguage(id);
}

// A persisted language that's since been removed (or an unavailable one)
// falls back to the default rather than leaving the app on a language it
// can no longer render.
function loadLanguage() {
  try {
    const saved = localStorage.getItem(LANGUAGE_KEY);
    return saved && isSelectable(saved) ? saved : DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
}

export const currentLanguage = writable(loadLanguage());

currentLanguage.subscribe((value) => {
  try {
    localStorage.setItem(LANGUAGE_KEY, value);
  } catch {
    // Private-mode / storage-disabled browsers still get a working session,
    // just without the selection surviving a reload.
  }
});

export function selectLanguage(id) {
  if (!isSelectable(id)) return;
  currentLanguage.set(id);
}
