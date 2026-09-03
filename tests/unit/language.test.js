import { describe, expect, it, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import { LANGUAGES, currentLanguage, selectLanguage } from '../../src/lib/stores/language.js';

beforeEach(() => {
  localStorage.clear();
  currentLanguage.set('javascript');
});

describe('language store', () => {
  it('lists javascript and python, both available', () => {
    const byId = Object.fromEntries(LANGUAGES.map((lang) => [lang.id, lang]));
    expect(Object.keys(byId)).toEqual(['javascript', 'python']);
    expect(byId.javascript.available).toBe(true);
    expect(byId.python.available).toBe(true);
  });

  it('defaults to javascript', () => {
    expect(get(currentLanguage)).toBe('javascript');
  });

  it('selectLanguage switches to python', () => {
    selectLanguage('python');
    expect(get(currentLanguage)).toBe('python');
  });

  it('selectLanguage ignores unknown language ids', () => {
    selectLanguage('not-a-real-language');
    expect(get(currentLanguage)).toBe('javascript');
  });

  it('ignores a language with no exercise module registered', () => {
    // Rust/Ruby are planned but have no module yet, so they must not be
    // reachable even if an id leaks in from a stale URL or storage value.
    selectLanguage('rust');
    expect(get(currentLanguage)).toBe('javascript');
  });

  it('persists the selection so it survives a reload', () => {
    selectLanguage('python');
    expect(localStorage.getItem('language')).toBe('python');
  });
});
