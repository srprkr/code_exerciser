import { describe, expect, it, beforeEach, vi } from 'vitest';

// localStorage isn't populated between tests automatically in jsdom, so
// reset it and re-import the store fresh each time to avoid state leaking
// across tests (the store module caches its initial load at import time).
beforeEach(() => {
  localStorage.clear();
  vi.resetModules();
});

async function freshProgressStore() {
  return await import('../../src/lib/stores/progress.js');
}

describe('Progress.getBadges', () => {
  it('reports a badge as earned only when every exercise carrying that tag is completed', async () => {
    const { Progress } = await freshProgressStore();
    const { exercises } = await import('../../src/lib/data/exercises.js');

    const mapExercises = exercises.filter((e) => e.functions.includes('map'));
    expect(mapExercises.length).toBeGreaterThan(0);

    // Complete all but one map exercise.
    mapExercises.slice(0, -1).forEach((e) => Progress.markCompleted(e.id));

    let badges = Progress.getBadges();
    let mapBadge = badges.find((b) => b.tag === 'map');
    expect(mapBadge.earned).toBe(false);
    expect(mapBadge.completedCount).toBe(mapExercises.length - 1);
    expect(mapBadge.total).toBe(mapExercises.length);

    // Complete the last one — badge should now be earned.
    Progress.markCompleted(mapExercises[mapExercises.length - 1].id);
    badges = Progress.getBadges();
    mapBadge = badges.find((b) => b.tag === 'map');
    expect(mapBadge.earned).toBe(true);
    expect(mapBadge.completedCount).toBe(mapExercises.length);
  });

  it('the Object pseudo-tag badge matches any Object.* tagged exercise', async () => {
    const { Progress } = await freshProgressStore();
    const { exercises } = await import('../../src/lib/data/exercises.js');

    const objectExercises = exercises.filter((e) =>
      e.functions.some((f) => f.startsWith('Object.'))
    );
    expect(objectExercises.length).toBeGreaterThan(0);

    objectExercises.forEach((e) => Progress.markCompleted(e.id));

    const badges = Progress.getBadges();
    const objectBadge = badges.find((b) => b.tag === 'Object');
    expect(objectBadge.earned).toBe(true);
    expect(objectBadge.total).toBe(objectExercises.length);
  });

  it('reports earned:false for a tag with zero completed exercises', async () => {
    const { Progress } = await freshProgressStore();

    const badges = Progress.getBadges();
    badges.forEach((badge) => {
      expect(badge.earned).toBe(false);
      expect(badge.completedCount).toBe(0);
    });
  });
});

describe('Progress markAttempted / markCompleted', () => {
  it('markAttempted sets attempted but not completed', async () => {
    const { Progress } = await freshProgressStore();
    Progress.markAttempted(1);
    const entry = Progress.getExercise(1);
    expect(entry.attempted).toBe(true);
    expect(entry.completed).toBe(false);
  });

  it('markCompleted sets both attempted and completed', async () => {
    const { Progress } = await freshProgressStore();
    Progress.markCompleted(1);
    const entry = Progress.getExercise(1);
    expect(entry.attempted).toBe(true);
    expect(entry.completed).toBe(true);
  });

  it('getExercise returns a default {attempted:false, completed:false} for an unknown id', async () => {
    const { Progress } = await freshProgressStore();
    const entry = Progress.getExercise(999999);
    expect(entry).toEqual({ attempted: false, completed: false });
  });
});

describe('Progress export/import', () => {
  it('round-trips exported data through importData', async () => {
    const { Progress } = await freshProgressStore();
    Progress.markCompleted(1);
    Progress.setDisplayName('Sean');

    const exported = Progress.exportData();

    localStorage.clear();
    vi.resetModules();
    const { Progress: FreshProgress } = await freshProgressStore();

    expect(FreshProgress.getDisplayName()).toBe('');
    const ok = FreshProgress.importData(exported);
    expect(ok).toBe(true);
    expect(FreshProgress.getDisplayName()).toBe('Sean');
    expect(FreshProgress.getExercise(1).completed).toBe(true);
  });

  it('importData returns false for invalid JSON', async () => {
    const { Progress } = await freshProgressStore();
    expect(Progress.importData('not json')).toBe(false);
  });
});
