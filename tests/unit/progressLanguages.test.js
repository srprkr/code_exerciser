import { describe, expect, it, beforeEach, vi } from 'vitest';

// progress.js reads and migrates localStorage at import time, so each test
// seeds storage first and then imports the module fresh.
beforeEach(() => {
  localStorage.clear();
  vi.resetModules();
});

async function freshStores() {
  const progress = await import('../../src/lib/stores/progress.js');
  const language = await import('../../src/lib/stores/language.js');
  return { ...progress, ...language };
}

describe('legacy progress migration', () => {
  it('folds a pre-multi-language flat map under javascript', async () => {
    // The shape every existing user has in localStorage today.
    localStorage.setItem(
      'exerciseProgress',
      JSON.stringify({ 1: { attempted: true, completed: true }, 5: { attempted: true, completed: false } })
    );

    const { Progress } = await freshStores();

    expect(Progress.getExercise(1).completed).toBe(true);
    expect(Progress.getExercise(5).attempted).toBe(true);
    expect(Progress.getExercise(5).completed).toBe(false);
    expect(Progress.getAllLanguages()).toEqual({
      javascript: { 1: { attempted: true, completed: true }, 5: { attempted: true, completed: false } }
    });
  });

  it('leaves an already-migrated nested map untouched', async () => {
    const nested = {
      javascript: { 2: { attempted: true, completed: true } },
      python: { 11: { attempted: true, completed: false } }
    };
    localStorage.setItem('exerciseProgress', JSON.stringify(nested));

    const { Progress } = await freshStores();
    expect(Progress.getAllLanguages()).toEqual(nested);
  });

  it('does not re-wrap on a second load, so migration is idempotent', async () => {
    localStorage.setItem('exerciseProgress', JSON.stringify({ 3: { attempted: true, completed: true } }));

    const first = await freshStores();
    expect(first.Progress.getExercise(3).completed).toBe(true);

    // Whatever the first load persisted must survive a second load unchanged.
    vi.resetModules();
    const second = await freshStores();
    expect(second.Progress.getAllLanguages()).toEqual({
      javascript: { 3: { attempted: true, completed: true } }
    });
  });

  it('survives empty and corrupt stored values', async () => {
    localStorage.setItem('exerciseProgress', 'not json at all');
    const { Progress } = await freshStores();
    expect(Progress.getAllLanguages()).toEqual({});
    expect(Progress.getExercise(1).completed).toBe(false);
  });
});

describe('per-language progress isolation', () => {
  it('keeps identical exercise ids in different languages separate', async () => {
    const { Progress, currentLanguage } = await freshStores();

    // Both languages have a problem with id 1; completing one must not
    // complete the other.
    Progress.markCompleted(1);
    expect(Progress.getExercise(1).completed).toBe(true);

    currentLanguage.set('python');
    expect(Progress.getExercise(1).completed).toBe(false);

    Progress.markAttempted(1);
    expect(Progress.getExercise(1).attempted).toBe(true);
    expect(Progress.getExercise(1).completed).toBe(false);

    currentLanguage.set('javascript');
    expect(Progress.getExercise(1).completed).toBe(true);
  });

  it('stores both languages side by side', async () => {
    const { Progress, currentLanguage } = await freshStores();

    Progress.markCompleted(1);
    currentLanguage.set('python');
    Progress.markCompleted(11);

    expect(Progress.getAllLanguages()).toEqual({
      javascript: { 1: { attempted: true, completed: true } },
      python: { 11: { attempted: true, completed: true } }
    });
  });

  it('computes badges from the active language tag set', async () => {
    const { Progress, currentLanguage } = await freshStores();

    const jsBadges = Progress.getBadges().map((b) => b.tag);
    expect(jsBadges).toContain('map');
    expect(jsBadges).not.toContain('list-comprehension');

    currentLanguage.set('python');
    const pyBadges = Progress.getBadges().map((b) => b.tag);
    expect(pyBadges).toContain('list-comprehension');
    expect(pyBadges).toContain('any/all');
    expect(pyBadges).not.toContain('spread');
  });

  it('counts python badge progress against python exercises only', async () => {
    const { Progress, currentLanguage } = await freshStores();
    currentLanguage.set('python');

    const before = Progress.getBadges().find((b) => b.tag === 'list-comprehension');
    expect(before.completedCount).toBe(0);
    expect(before.total).toBeGreaterThan(0);

    Progress.markCompleted(1);
    const after = Progress.getBadges().find((b) => b.tag === 'list-comprehension');
    expect(after.completedCount).toBe(1);
  });
});

describe('language persistence', () => {
  it('restores a persisted language on load', async () => {
    localStorage.setItem('language', 'python');
    const { currentLanguage } = await freshStores();
    const { get } = await import('svelte/store');
    expect(get(currentLanguage)).toBe('python');
  });

  it('falls back to javascript when the persisted language has no module', async () => {
    localStorage.setItem('language', 'rust');
    const { currentLanguage } = await freshStores();
    const { get } = await import('svelte/store');
    expect(get(currentLanguage)).toBe('javascript');
  });

  it('includes the language key in exported sync data', async () => {
    const { Progress, currentLanguage } = await freshStores();
    currentLanguage.set('python');

    const exported = JSON.parse(Progress.exportData());
    expect(exported.language).toBe('python');
  });
});
