import { describe, expect, it, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import {
  applyDeepLinkFromUrl,
  currentExerciseIndex,
  exerciseLabel,
  languageExercises
} from '../../src/lib/stores/ui.js';
import { currentLanguage } from '../../src/lib/stores/language.js';

function visit(search) {
  window.history.replaceState(null, '', `/${search}`);
  return applyDeepLinkFromUrl();
}

function currentExercise() {
  return get(languageExercises)[get(currentExerciseIndex)];
}

beforeEach(() => {
  currentLanguage.set('javascript');
  currentExerciseIndex.set(0);
});

describe('applyDeepLinkFromUrl', () => {
  it('jumps to a regular exercise id', () => {
    expect(visit('?exercise=12')).toBe(true);
    expect(currentExercise().id).toBe(12);
  });

  // TypeScript's intro problems run -9 through 0; a truthiness check on the
  // id used to throw 0 away as "no deep link".
  it.each([0, -1, -9])('jumps to TypeScript intro problem %i', (id) => {
    expect(visit(`?lang=typescript&exercise=${id}`)).toBe(true);
    expect(get(currentLanguage)).toBe('typescript');
    expect(currentExercise().id).toBe(id);
  });

  it.each(['', 'abc', '1.5'])('ignores a non-integer exercise param (%j)', (value) => {
    expect(visit(`?exercise=${value}`)).toBe(false);
    expect(get(currentExerciseIndex)).toBe(0);
  });

  it('ignores a missing exercise param', () => {
    expect(visit('')).toBe(false);
  });

  it('ignores an id the language does not have', () => {
    expect(visit('?exercise=0')).toBe(false);
    expect(get(currentExerciseIndex)).toBe(0);
  });

  it('ignores an id just below the intro range', () => {
    expect(visit('?lang=typescript&exercise=-10')).toBe(false);
  });
});

describe('exerciseLabel', () => {
  it('names intro problems as intro problems', () => {
    expect(exerciseLabel({ id: -4, intro: true })).toBe('Intro Problem -4');
    expect(exerciseLabel({ id: 0, intro: true })).toBe('Intro Problem 0');
  });

  it('names every other problem as before', () => {
    expect(exerciseLabel({ id: 12 })).toBe('Problem 12');
  });
});
