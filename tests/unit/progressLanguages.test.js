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

describe('importing a pre-multi-language sync export', () => {
  // Exactly what the currently-deployed (pre-branch) site's "Copy my
  // progress" produces: exerciseProgress is the OLD flat shape, and there is
  // no `language` field at all — that key doesn't exist in the old build.
  // This is what an active user has sitting in a saved note/clipboard right
  // now, and would paste into "Import progress" after this branch deploys.
  function oldSiteExportJson() {
    return JSON.stringify({
      exerciseProgress: JSON.stringify({
        1: { attempted: true, completed: true },
        21: { attempted: true, completed: true },
        70: { attempted: true, completed: false }
      }),
      displayName: 'Sean',
      theme: 'dark',
      lookItUpDismissed: 'true'
    });
  }

  it('migrates a pasted old-site export into the javascript bucket, not just a fresh page load', async () => {
    // Import happens on an ALREADY-RUNNING module (the user has the new site
    // open in a tab), not at cold module-load time like the other migration
    // tests — this is what actually exercises the Sync panel's code path.
    const { Progress } = await freshStores();
    localStorage.clear(); // the importing session starts with nothing of its own

    const success = Progress.importData(oldSiteExportJson());

    expect(success).toBe(true);
    expect(Progress.getExercise(1).completed).toBe(true);
    expect(Progress.getExercise(21).completed).toBe(true);
    expect(Progress.getExercise(70).attempted).toBe(true);
    expect(Progress.getExercise(70).completed).toBe(false);
    expect(Progress.getAllLanguages()).toEqual({
      javascript: {
        1: { attempted: true, completed: true },
        21: { attempted: true, completed: true },
        70: { attempted: true, completed: false }
      }
    });
  });

  it('carries over the other old fields (display name, theme) alongside the migrated progress', async () => {
    const { Progress } = await freshStores();
    localStorage.clear();

    Progress.importData(oldSiteExportJson());

    expect(Progress.getDisplayName()).toBe('Sean');
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('defaults the language to javascript, since an old export has no language field at all', async () => {
    const { Progress, currentLanguage } = await freshStores();
    localStorage.clear();

    Progress.importData(oldSiteExportJson());

    // importData() only writes localStorage; it doesn't touch the
    // already-loaded currentLanguage store (matching every other imported
    // field — SyncPanel reloads the page after a successful import, and
    // it's that reload, not importData() itself, that re-derives language
    // from localStorage). Confirm the reload path lands on javascript by
    // re-loading the language store fresh, the way the reload would.
    vi.resetModules();
    const { currentLanguage: reloadedLanguage } = await freshStores();
    const { get } = await import('svelte/store');
    expect(get(reloadedLanguage)).toBe('javascript');
  });

  it('does not clobber existing python progress already present in this browser', async () => {
    // A user who already has some Python progress in this browser (from
    // using the site pre-import) pastes an old JS-only export from another
    // browser — their Python progress must survive the import untouched.
    localStorage.setItem('exerciseProgress', JSON.stringify({ python: { 1: { attempted: true, completed: true } } }));
    const { Progress, currentLanguage } = await freshStores();

    Progress.importData(oldSiteExportJson());

    expect(Progress.getAllLanguages().javascript).toEqual({
      1: { attempted: true, completed: true },
      21: { attempted: true, completed: true },
      70: { attempted: true, completed: false }
    });

    currentLanguage.set('python');
    expect(Progress.getExercise(1).completed).toBe(true);
  });

  it('merges conflicting state for the same problem by OR-ing, never regressing a completion', async () => {
    // This browser has problem 1 completed; the imported blob only has it
    // attempted (e.g. exported from a browser where it was later re-solved
    // elsewhere but that export predates it). The merge must not downgrade
    // an already-recorded completion just because the imported side is behind.
    localStorage.setItem(
      'exerciseProgress',
      JSON.stringify({ javascript: { 1: { attempted: true, completed: true } } })
    );
    const { Progress } = await freshStores();

    Progress.importData(
      JSON.stringify({ exerciseProgress: JSON.stringify({ 1: { attempted: true, completed: false } }) })
    );

    expect(Progress.getExercise(1)).toEqual({ attempted: true, completed: true });
  });

  it('picks up a completion from the imported side even if this browser only has it attempted', async () => {
    localStorage.setItem(
      'exerciseProgress',
      JSON.stringify({ javascript: { 1: { attempted: true, completed: false } } })
    );
    const { Progress } = await freshStores();

    Progress.importData(
      JSON.stringify({ exerciseProgress: JSON.stringify({ 1: { attempted: true, completed: true } }) })
    );

    expect(Progress.getExercise(1)).toEqual({ attempted: true, completed: true });
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
