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
  it('registers javascript, typescript and python', () => {
    expect(isKnownLanguage('javascript')).toBe(true);
    expect(isKnownLanguage('typescript')).toBe(true);
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

  it.each(['javascript', 'typescript', 'python'])('%s exposes the full module shape', (language) => {
    const data = getLanguageData(language);
    REQUIRED_EXPORTS.forEach((name) => expect(data[name]).toBeDefined());
    expect(data.KNOWN_FUNCTIONS).toEqual([...data.CORE_FUNCTIONS, ...data.SECONDARY_FUNCTIONS]);
  });

  it.each(['javascript', 'typescript', 'python'])('%s gives every known tag a docs link', (language) => {
    const { KNOWN_FUNCTIONS, KNOWN_FUNCTION_DOC_LINKS } = getLanguageData(language);
    const missing = KNOWN_FUNCTIONS.filter((fn) => !KNOWN_FUNCTION_DOC_LINKS[fn]);
    expect(missing).toEqual([]);
  });

  it.each(['javascript', 'typescript', 'python'])('%s exercises all have unique ids', (language) => {
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

describe('javascript exercise set', () => {
  it('problem 20 expects a number, not the string toFixed returns', () => {
    // toFixed(2) yields '150.50' (a string); the grader compares strictly, so
    // the expected output is the Number()-converted value and the hint says so.
    const exercise = getLanguageData('javascript').exercises.find((ex) => ex.id === 20);
    expect(exercise.output).toBe(150.5);
    expect(exercise.solution).toMatch(/Number\(/);
    expect(exercise.hint.text).toMatch(/Number\(\)/);
  });

  it('keeps the original core tags in order, with Set as the only addition', () => {
    const js = getLanguageData('javascript');
    expect(js.CORE_FUNCTIONS).toEqual([
      'map', 'filter', 'reduce', 'sort', 'spread', 'destructure', 'template-literal', 'some', 'every', 'Set'
    ]);
  });

  it('files the async tags under "Show more", after the original secondary tags', () => {
    const js = getLanguageData('javascript');
    expect(js.SECONDARY_FUNCTIONS).toEqual([
      'find', 'findIndex', 'includes', 'flat', 'flatMap', 'Object', 'setTimeout', 'async-await', 'fetch'
    ]);
  });

  it.each([
    ['setTimeout', 141, 10],
    ['async-await', 151, 10],
    ['fetch', 161, 10],
    ['Set', 171, 20]
  ])('%s has an MDN link and a block of problems starting at id %i', (tag, firstId, count) => {
    const js = getLanguageData('javascript');
    expect(js.KNOWN_FUNCTION_DOC_LINKS[tag]).toMatch(/^https:\/\/developer\.mozilla\.org\//);

    const block = js.exercises.filter((ex) => ex.id >= firstId && ex.id < firstId + count);
    expect(block).toHaveLength(count);
    block.forEach((ex) => {
      expect(ex.functions, `id ${ex.id}`).toContain(tag);
      // Every new problem has a hint, and so a docs link in its popover.
      expect(ex.hint?.text, `id ${ex.id}`).toBeTruthy();
      if (ex.hint.mdnUrl) expect(ex.hint.mdnUrl).toMatch(/^https:\/\/developer\.mozilla\.org\//);
    });
  });
});

describe('typescript exercise set', () => {
  const typescript = getLanguageData('typescript');
  const js = getLanguageData('javascript');

  it('leads its tags with types, then only the JavaScript tags its problems use', () => {
    expect(typescript.CORE_FUNCTIONS[0]).toBe('types');
    // Only map/filter/reduce problems are ported so far — no empty filter pills.
    expect(typescript.CORE_FUNCTIONS).toEqual(['types', 'map', 'filter', 'reduce']);
    typescript.KNOWN_FUNCTIONS.slice(1).forEach((tag) => {
      expect(js.KNOWN_FUNCTIONS).toContain(tag);
      expect(typescript.exercises.some((ex) => typescript.exerciseHasFunction(ex, tag)), tag).toBe(true);
    });
  });

  it('links the types tag to the TypeScript Handbook and names each link\'s site by its URL', () => {
    expect(typescript.KNOWN_FUNCTION_DOC_LINKS.types).toMatch(/^https:\/\/www\.typescriptlang\.org\/docs\/handbook\//);
    expect(typescript.docSiteNameFor(typescript.KNOWN_FUNCTION_DOC_LINKS.types)).toBe('TypeScript Handbook');
    expect(typescript.docSiteNameFor(typescript.KNOWN_FUNCTION_DOC_LINKS.map)).toBe('MDN');
  });

  it('makes intro problems -9 through -1 tutorials, with a Handbook link and no hint', () => {
    const tutorials = typescript.exercises.filter((ex) => ex.intro && ex.id < 0);
    expect(tutorials).toHaveLength(9);
    tutorials.forEach((ex) => {
      expect(ex.tutorial, `id ${ex.id}`).toBeTruthy();
      expect(ex.docUrl, `id ${ex.id}`).toMatch(/^https:\/\/www\.typescriptlang\.org\/docs\/handbook\//);
      // The tutorial replaces the hint (and the solution toggle).
      expect(ex.hint, `id ${ex.id}`).toBeUndefined();
    });
  });

  it('keeps problem 0 as the final challenge: no tutorial, a normal hint', () => {
    const challenge = typescript.exercises.find((ex) => ex.id === 0);
    expect(challenge.tutorial).toBeUndefined();
    expect(challenge.hint.text).toBeTruthy();
    expect(challenge.hint.mdnUrl).toMatch(/^https:\/\/www\.typescriptlang\.org\//);
  });

  it('opens with the numbers-as-strings bug that types prevent', () => {
    const opener = typescript.exercises[0];
    expect(opener.id).toBe(-9);
    expect(opener.tutorial).toContain('"405", not 45');
    expect(opener.output).toBe(45);
  });

  it('only uses js/ts code fences in tutorials, so every snippet is highlighted', () => {
    typescript.exercises
      .filter((ex) => ex.tutorial)
      .forEach((ex) => {
        const fences = [...ex.tutorial.matchAll(/^~~~(\w*)$/gm)].map((m) => m[1]).filter(Boolean);
        expect(fences.length, `id ${ex.id}`).toBeGreaterThan(0);
        fences.forEach((lang) => expect(['js', 'ts'], `id ${ex.id}`).toContain(lang));
      });
  });

  it('asks for a single answer per problem', () => {
    typescript.exercises.forEach((ex) => {
      const logCount = (ex.solution.match(/console\.log\(/g) || []).length;
      expect(logCount, `Problem ${ex.id} should log exactly one result`).toBe(1);
    });
  });
});
