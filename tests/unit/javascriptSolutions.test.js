// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { exercises } from '../../src/lib/data/javascript-exercises.js';
import { gradeRun } from '../../src/lib/grading/grade.js';
import { runSolution } from './helpers/runSolution.js';

describe('javascript reference solutions', () => {
  // Every solution must pass its own Check answer — problem 20 once shipped
  // an output its solution couldn't produce (a toFixed string vs a number).
  it.concurrent.each(exercises.map((exercise) => [exercise.id, exercise]))(
    'problem %i solution matches its expected output',
    async (_id, exercise) => {
      const payload = await runSolution(exercise);
      expect(gradeRun(payload, exercise.output), JSON.stringify(payload.allLogValues)).toBe(true);
    }
  );
});

// Each async/timer/Set problem is written so the classic mistake it teaches
// about produces different output — these confirm the mistake really fails
// rather than passing by accident.
const COMMON_MISTAKES = [
  [146, 'var instead of let', 'for (var i = 0; i < count; i++) { setTimeout(() => console.log(i), 50); }'],
  [150, 'no debounce', 'simulateTyping(search);'],
  [152, 'forgetting to await', 'async function double(n) { return n * 2; }\nconsole.log(double(input));'],
  [156, 'forEach with an async callback', 'steps.forEach(async step => console.log(await runStep(step)));'],
  [157, 'map with an async callback, no Promise.all', 'console.log(ids.map(async id => (await getUser(id)).name));'],
  [159, 'Promise.race instead of Promise.any', 'try { console.log(await Promise.race(mirrors.map(download))); } catch (err) { console.log(err.message); }'],
  [161, 'logging the Response instead of its JSON', 'const res = await fetch(`${API}/users`);\nconsole.log(res.length);'],
  [164, 'not checking res.ok', 'const user = await (await fetch(`${API}/users/${userId}`)).json();\nconsole.log(user.name);'],
  [165, 'forgetting the query parameter', 'const posts = await (await fetch(`${API}/posts`)).json();\nconsole.log(posts.reduce((sum, p) => sum + p.likes, 0));'],
  [166, 'no Content-Type header', 'const created = await (await fetch(`${API}/posts`, { method: "POST", body: JSON.stringify(newPost) })).json();\nconsole.log(`Created post ${created.id}: ${created.title}`);'],
  [170, 'only fetching the first page', 'const data = await (await fetch(`${API}/products?page=1`)).json();\nconsole.log(data.products.map(p => p.name));'],
  [185, 'only ever adding, never deleting', 'const selected = new Set();\nfor (const id of clicks) selected.add(id);\nconsole.log([...selected]);'],
  [186, 'deduping objects with new Set()', 'console.log([...new Set(products)].map(p => p.name));']
];

describe('javascript problems reject their common mistakes', () => {
  it.concurrent.each(COMMON_MISTAKES)('problem %i: %s fails', async (id, _mistake, wrongSolution) => {
    const exercise = exercises.find((ex) => ex.id === id);
    const payload = await runSolution({ ...exercise, solution: wrongSolution });
    expect(gradeRun(payload, exercise.output)).toBe(false);
  });
});

describe('logged Sets', () => {
  it('grade as an array of their values, so logging the Set itself passes', async () => {
    const exercise = exercises.find((ex) => ex.id === 176);
    const payload = await runSolution({ ...exercise, solution: 'console.log(new Set(word));' });
    expect(gradeRun(payload, exercise.output)).toBe(true);
  });
});
