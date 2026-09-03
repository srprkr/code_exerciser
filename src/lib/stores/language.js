import { writable } from 'svelte/store';

// Languages the exerciser can present in the title dropdown. Only
// `available` languages have exercise content wired up yet. Rust and Ruby
// are planned for later branches and deliberately left out here.
export const LANGUAGES = [
  { id: 'javascript', label: 'JavaScript', available: true },
  { id: 'python', label: 'Python', available: false }
];

export const currentLanguage = writable('javascript');

export function selectLanguage(id) {
  const language = LANGUAGES.find((lang) => lang.id === id);
  if (!language || !language.available) return;
  currentLanguage.set(id);
}
