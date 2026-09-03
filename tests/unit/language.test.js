import { describe, expect, it, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import { LANGUAGES, currentLanguage, selectLanguage } from '../../src/lib/stores/language.js';

beforeEach(() => {
  currentLanguage.set('javascript');
});

describe('language store', () => {
  it('lists javascript as available and python as planned', () => {
    const byId = Object.fromEntries(LANGUAGES.map((lang) => [lang.id, lang]));
    expect(Object.keys(byId)).toEqual(['javascript', 'python']);
    expect(byId.javascript.available).toBe(true);
    expect(byId.python.available).toBe(false);
  });

  it('defaults to javascript', () => {
    expect(get(currentLanguage)).toBe('javascript');
  });

  it('selectLanguage switches to an available language', () => {
    selectLanguage('javascript');
    expect(get(currentLanguage)).toBe('javascript');
  });

  it('selectLanguage ignores unavailable languages, leaving the current selection unchanged', () => {
    selectLanguage('python');
    expect(get(currentLanguage)).toBe('javascript');
  });

  it('selectLanguage ignores unknown language ids', () => {
    selectLanguage('not-a-real-language');
    expect(get(currentLanguage)).toBe('javascript');
  });
});
