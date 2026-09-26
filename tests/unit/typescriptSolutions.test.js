// @vitest-environment node
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';
import ts from 'typescript';
import { exercises } from '../../src/lib/data/typescript-exercises.js';
import { exercises as javascriptExercises } from '../../src/lib/data/javascript-exercises.js';
import { collectLibs, createCompiler } from '../../src/lib/grading/typescriptCompiler.js';
import { gradeRun } from '../../src/lib/grading/grade.js';
import { runCode, solutionCode } from './helpers/runSolution.js';

// The same strict check the browser runs (typescriptCompiler.js), with the
// lib .d.ts files read off disk instead of fetched by the worker.
const LIB_DIR = dirname(createRequire(import.meta.url).resolve('typescript'));
let compile;

beforeAll(async () => {
  const libs = await collectLibs((name) => {
    const path = join(LIB_DIR, name);
    return existsSync(path) ? readFileSync(path, 'utf8') : undefined;
  });
  compile = createCompiler(ts, libs);
});

function typeErrorsIn(code) {
  return compile(code).typeErrors.map((e) => `line ${e.line}: ${e.message}`);
}

async function runTypeScript(code) {
  const { js, typeErrors } = compile(code);
  return { ...(await runCode(js)), typeErrors };
}

describe('typescript reference solutions', () => {
  // Every problem shown under TypeScript must type-check under strict mode
  // AND produce its expected output — that's the bar for adding a `ts` key.
  it.each(exercises.map((exercise) => [exercise.id, exercise]))(
    'problem %i solution type-checks and matches its expected output',
    async (_id, exercise) => {
      const code = solutionCode(exercise);
      expect(typeErrorsIn(code)).toEqual([]);

      const payload = await runTypeScript(code);
      expect(gradeRun(payload, exercise.output), JSON.stringify(payload.allLogValues)).toBe(true);
    }
  );
});

describe('typescript exercise list', () => {
  // Ten, so the carousel reads a round 10 / 30 on problem 0.
  it('starts with the 10 intro problems, ids -9 through 0, in order', () => {
    const intro = exercises.filter((exercise) => exercise.intro);
    expect(intro.map((exercise) => exercise.id)).toEqual([-9, -8, -7, -6, -5, -4, -3, -2, -1, 0]);
    expect(exercises.slice(0, 10)).toEqual(intro);
    intro.forEach((exercise) => {
      expect(exercise.title).toBe(`Intro Problem ${exercise.id}`);
      expect(exercise.functions).toEqual(['types']);
    });
  });

  it('includes exactly the JavaScript problems that have a ts key, with overrides applied', () => {
    const ported = javascriptExercises.filter((exercise) => exercise.ts);
    expect(exercises.filter((exercise) => !exercise.intro).map((exercise) => exercise.id)).toEqual(
      ported.map((exercise) => exercise.id)
    );

    const problem20 = exercises.find((exercise) => exercise.id === 20);
    expect(problem20.sampleData).toContain('interface Product');
    // Fields the override leaves out fall back to the JavaScript problem's.
    expect(problem20.hint).toEqual(javascriptExercises.find((exercise) => exercise.id === 20).hint);
    expect(problem20).not.toHaveProperty('ts');
  });

  // A ported problem must practise a type a developer would really write, or
  // explicitly teach inference (with a hint saying so) — never repeat the
  // JavaScript unchanged.
  it('never ports a JavaScript problem as an unchanged repeat', () => {
    javascriptExercises
      .filter((exercise) => exercise.ts)
      .forEach((exercise) => {
        expect(Object.keys(exercise.ts), `problem ${exercise.id} has an empty ts override`).not.toEqual([]);
      });
  });
});

// Each intro problem (and each ported problem teaching a specific type
// feature) is built so skipping the concept it teaches is a type error —
// otherwise it would pass on output alone and teach nothing. The
// JavaScript solutions to 16 and 19 are here too: they're why those two
// problems needed a TypeScript override.
const TYPE_MISTAKES = [
  [-9, 'unannotated parameters', 'function orderTotal(subtotal, shipping) { return subtotal + shipping; }\nconsole.log(orderTotal(Number(subtotalInput), Number(shippingInput)));'],
  [-9, 'passing the form strings without converting them', 'function orderTotal(subtotal: number, shipping: number) { return subtotal + shipping; }\nconsole.log(orderTotal(subtotalInput, shippingInput));'],
  [-6, 'calling a string method without narrowing', 'console.log(orderIds.map((id: OrderId) => "#" + id.toUpperCase()));'],
  [-5, 'a misspelled literal case', 'const position = { x: 0, y: 0 };\nfor (const move of moves) { switch (move) { case "rigth": position.x++; break; } }\nconsole.log(position);'],
  [-4, 'using an optional property as if it were always set', 'console.log(profiles.map(profile => profile.nickname.length));'],
  [-3, 'reading a property of a possibly-undefined result', 'const found = books.find(book => book.pages < 300);\nconsole.log(found.title);'],
  [-2, 'a Record missing one of its keys', 'const counts: Record<Fruit, number> = { apple: 0, cherry: 0 };\nfor (const fruit of order) counts[fruit]++;\nconsole.log(counts);'],
  [4, 'sorting a readonly parameter in place', 'function squares(nums: readonly number[]) { nums.sort(); return nums.map(num => num ** 2); }\nconsole.log(squares(fibonacci));'],
  [15, 'using a possibly-undefined max as a number', 'function max(nums: number[]): number | undefined { return nums.length ? Math.max(...nums) : undefined; }\nconsole.log(max(oneToFive) + 0);'],
  [-1, 'reading a field another union member owns', 'console.log(shapes.map(shape => shape.radius));'],
  // Since TS 5.5 a simple check like typeof x === "number" infers its own
  // predicate, so the mistake here is one inference can't cover: proving an
  // unknown is a whole Product.
  [0, 'filtering without a type predicate', 'console.log(rows.filter(row => typeof row === "object" && row !== null && "price" in row).map(row => row.name));']
];

describe('typescript problems reject skipping the types', () => {
  it.each(TYPE_MISTAKES)('problem %i: %s is a type error that fails the check', async (id, _mistake, wrongSolution) => {
    const exercise = exercises.find((ex) => ex.id === id);
    const code = solutionCode({ ...exercise, solution: wrongSolution });
    expect(typeErrorsIn(code)).not.toEqual([]);

    const payload = await runTypeScript(code).catch(() => ({ hasLastLogValue: false, typeErrors: ['threw'] }));
    expect(gradeRun(payload, exercise.output)).toBe(false);
  });

  it.each([16, 19])('problem %i: the untyped JavaScript solution fails the strict check', (id) => {
    const javascriptExercise = javascriptExercises.find((ex) => ex.id === id);
    const exercise = exercises.find((ex) => ex.id === id);
    expect(typeErrorsIn(solutionCode({ ...exercise, solution: javascriptExercise.solution }))).not.toEqual([]);
  });
});

describe('typescriptCompiler', () => {
  it('reports type errors with line numbers over the whole document', () => {
    expect(compile('const a = 1;\nconst b: string = a;\n').typeErrors).toEqual([
      { line: 2, message: "Type 'number' is not assignable to type 'string'." }
    ]);
  });

  it('allows top-level await and strips the module marker so the sandbox can run it', () => {
    const { js, typeErrors } = compile('const n: number = await Promise.resolve(2);\nconsole.log(n);\n');
    expect(typeErrors).toEqual([]);
    expect(js).not.toMatch(/export/);
    expect(js).toContain('await Promise.resolve(2)');
  });

  it("doesn't clash user variables with lib.dom globals like name", () => {
    expect(compile('let name = 5;\nconsole.log(name);\n').typeErrors).toEqual([]);
  });

  it('still emits JavaScript when there are type errors, like tsc', () => {
    const { js, typeErrors } = compile('const x: number = "hi";\nconsole.log(x);\n');
    expect(typeErrors).toHaveLength(1);
    expect(js).toContain('console.log(x)');
  });
});
