import { describe, expect, it } from 'vitest';
import { getLanguageData, isKnownLanguage, DEFAULT_LANGUAGE } from '../../src/lib/data/languages.js';

// Every language module must export this shape, since the registry's callers
// (filters, badges, progress, carousel) destructure it blindly.
const REQUIRED_EXPORTS = [
  'exercises',
  'CORE_FUNCTIONS',
  'SECONDARY_FUNCTIONS',
  'KNOWN_FUNCTIONS',
  'DIFFICULTIES',
  'exerciseHasFunction',
  'DOC_SITE_NAME',
  'KNOWN_FUNCTION_DOC_LINKS'
];

describe('language registry', () => {
  it('registers javascript and python', () => {
    expect(isKnownLanguage('javascript')).toBe(true);
    expect(isKnownLanguage('python')).toBe(true);
  });

  it('does not register languages that have no exercise module yet', () => {
    expect(isKnownLanguage('rust')).toBe(false);
    expect(isKnownLanguage('ruby')).toBe(false);
  });

  it('falls back to the default language rather than throwing on an unknown id', () => {
    // A stale ?lang= or persisted value must degrade to JavaScript, not blank
    // the page.
    expect(getLanguageData('rust')).toBe(getLanguageData(DEFAULT_LANGUAGE));
    expect(getLanguageData(undefined)).toBe(getLanguageData(DEFAULT_LANGUAGE));
  });

  it.each(['javascript', 'python'])('%s exposes the full module shape', (language) => {
    const data = getLanguageData(language);
    REQUIRED_EXPORTS.forEach((name) => expect(data[name]).toBeDefined());
    expect(data.KNOWN_FUNCTIONS).toEqual([...data.CORE_FUNCTIONS, ...data.SECONDARY_FUNCTIONS]);
  });

  it.each(['javascript', 'python'])('%s gives every known tag a docs link', (language) => {
    const { KNOWN_FUNCTIONS, KNOWN_FUNCTION_DOC_LINKS } = getLanguageData(language);
    const missing = KNOWN_FUNCTIONS.filter((fn) => !KNOWN_FUNCTION_DOC_LINKS[fn]);
    expect(missing).toEqual([]);
  });

  it.each(['javascript', 'python'])('%s exercises all have unique ids', (language) => {
    const ids = getLanguageData(language).exercises.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('python exercise set', () => {
  const python = getLanguageData('python');

  it('reserves ten ids per core tag, seeded at the head of each block', () => {
    // Ids encode their tag block: 1-10 is CORE_FUNCTIONS[0], 11-20 is [1], etc.
    // This is what lets later problems fill a block without shifting ids that
    // progress is already stored against.
    python.exercises.forEach((exercise) => {
      const blockIndex = Math.floor((exercise.id - 1) / 10);
      const expectedTag = python.CORE_FUNCTIONS[blockIndex];
      expect(
        python.exerciseHasFunction(exercise, expectedTag),
        `Problem ${exercise.id} should carry its block's core tag "${expectedTag}", got [${exercise.functions}]`
      ).toBe(true);
    });
  });

  it('has all nine core blocks reserved, at least their seed problem present', () => {
    expect(python.CORE_FUNCTIONS).toHaveLength(9);
    const seedIds = python.CORE_FUNCTIONS.map((_tag, i) => i * 10 + 1);
    const presentIds = new Set(python.exercises.map((e) => e.id));
    seedIds.forEach((id) => expect(presentIds.has(id), `Block seed id ${id} is missing`).toBe(true));
  });

  it('fills each block contiguously from its first id, with no gaps', () => {
    // A block can be partially filled (this set grows incrementally), but
    // whatever's there must be contiguous from the block's head — a gap
    // would mean some id doesn't correspond to its block's "next slot",
    // which is exactly what the reserved-block scheme exists to prevent.
    const idsByBlock = new Map();
    python.exercises.forEach((exercise) => {
      const blockIndex = Math.floor((exercise.id - 1) / 10);
      if (!idsByBlock.has(blockIndex)) idsByBlock.set(blockIndex, []);
      idsByBlock.get(blockIndex).push(exercise.id);
    });

    idsByBlock.forEach((ids, blockIndex) => {
      const sorted = [...ids].sort((a, b) => a - b);
      const blockStart = blockIndex * 10 + 1;
      sorted.forEach((id, i) => {
        const expectedId = blockStart + i;
        expect(
          id,
          `Block ${blockIndex} (${python.CORE_FUNCTIONS[blockIndex]}) has a gap: expected id ${expectedId}, got ${id}`
        ).toBe(expectedId);
      });
    });
  });

  it('never exceeds a block\'s reserved ten ids', () => {
    const countByBlock = new Map();
    python.exercises.forEach((exercise) => {
      const blockIndex = Math.floor((exercise.id - 1) / 10);
      countByBlock.set(blockIndex, (countByBlock.get(blockIndex) ?? 0) + 1);
    });

    countByBlock.forEach((count, blockIndex) => {
      expect(
        count,
        `Block ${blockIndex} (${python.CORE_FUNCTIONS[blockIndex]}) has ${count} problems, over its reserved 10`
      ).toBeLessThanOrEqual(10);
    });
  });

  it('gives every problem a hint, since Python is the unfamiliar language here', () => {
    python.exercises.forEach((exercise) => {
      expect(exercise.hint?.text, `Problem ${exercise.id} is missing a hint`).toBeTruthy();
    });
  });

  it('keeps hints free of JavaScript comparisons', () => {
    // Problems should teach Python on its own terms rather than transliterating
    // JavaScript idioms, so hints must not lean on JS equivalents. Matches the
    // actual JS terms ("spread syntax"/"spread operator"), not the ordinary
    // English verb "spread(s)" used to describe what Python's own */** do.
    python.exercises.forEach((exercise) => {
      expect(
        exercise.hint.text,
        `Problem ${exercise.id}'s hint explains Python via JavaScript`
      ).not.toMatch(/javascript|\.map\(|\.filter\(|template literal|spread (syntax|operator)/i);
    });
  });

  it('asks for a single answer per problem', () => {
    // One print() per solution: a solution that prints a list of unrelated
    // results is contorting itself to fit one-value grading rather than
    // showing how the idiom is really written.
    python.exercises.forEach((exercise) => {
      const printCount = (exercise.solution.match(/\bprint\(/g) || []).length;
      expect(printCount, `Problem ${exercise.id} should print exactly one result`).toBe(1);
    });
  });

  it('every exercise has the fields the UI renders', () => {
    python.exercises.forEach((exercise) => {
      expect(exercise.title, `id ${exercise.id}`).toBeTruthy();
      expect(exercise.question, `id ${exercise.id}`).toBeTruthy();
      expect(exercise.sampleData, `id ${exercise.id}`).toBeTruthy();
      expect(exercise.solution, `id ${exercise.id}`).toBeTruthy();
      expect(exercise.output, `id ${exercise.id}`).toBeDefined();
      expect(exercise.functions.length, `id ${exercise.id}`).toBeGreaterThan(0);
      expect(['easy', 'medium', 'hard']).toContain(exercise.difficulty);
    });
  });

  it('only tags exercises with tags the filter bar can show', () => {
    // A tag not in KNOWN_FUNCTIONS would be unreachable from the filter pills.
    // 'any'/'all' are the exception: they roll up into the 'any/all' pill.
    const selectable = new Set([...python.KNOWN_FUNCTIONS, 'any', 'all']);
    python.exercises.forEach((exercise) => {
      exercise.functions.forEach((fn) => {
        expect(selectable.has(fn), `Problem ${exercise.id} has unknown tag "${fn}"`).toBe(true);
      });
    });
  });

  it('keeps the core set import-free so the runtime needs no packages', () => {
    // Pyodide would have to fetch packages before running any solution that
    // imports one; the core blocks are deliberately all builtins/syntax.
    python.exercises.forEach((exercise) => {
      expect(exercise.solution, `Problem ${exercise.id}`).not.toMatch(/^\s*(import|from)\s/m);
    });
  });

  it('rolls any and all into a single any/all badge', () => {
    const anyAll = python.exercises.find((e) => e.id === 61);
    expect(python.exerciseHasFunction(anyAll, 'any/all')).toBe(true);
    expect(python.CORE_FUNCTIONS).toContain('any/all');
    expect(python.CORE_FUNCTIONS).not.toContain('any');
  });

  it('treats dict as a pseudo-tag matching dict.* methods', () => {
    const fake = { functions: ['dict.items'] };
    expect(python.exerciseHasFunction(fake, 'dict')).toBe(true);
    expect(python.exerciseHasFunction({ functions: ['sorted'] }, 'dict')).toBe(false);
  });
});
