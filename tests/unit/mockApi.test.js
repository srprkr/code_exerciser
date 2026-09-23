// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { MOCK_API_BASE, MOCK_API_DATA, createMockFetch } from '../../src/lib/grading/mockApi.js';

function makeFetch() {
  const counts = { started: 0, ended: 0 };
  const fetch = createMockFetch(MOCK_API_BASE, MOCK_API_DATA, {
    start: () => counts.started++,
    end: () => counts.ended++,
    setTimeout
  });
  return { fetch, counts };
}

describe('mock fetch API', () => {
  it('serves the user list and single users', async () => {
    const { fetch } = makeFetch();
    const users = await (await fetch(`${MOCK_API_BASE}/users`)).json();
    expect(users).toHaveLength(4);

    const res = await fetch(`${MOCK_API_BASE}/users/2`);
    expect(res.ok).toBe(true);
    expect((await res.json()).name).toBe('Sam Ortiz');
  });

  it('returns a 404 (not a rejection) for an unknown user or path', async () => {
    const { fetch } = makeFetch();
    const missingUser = await fetch(`${MOCK_API_BASE}/users/99`);
    expect(missingUser.ok).toBe(false);
    expect(missingUser.status).toBe(404);

    expect((await fetch(`${MOCK_API_BASE}/nope`)).status).toBe(404);
  });

  it('filters posts by the userId query parameter', async () => {
    const { fetch } = makeFetch();
    const posts = await (await fetch(`${MOCK_API_BASE}/posts?userId=3`)).json();
    expect(posts.map((p) => p.id)).toEqual([4, 5]);
  });

  it('creates a post only when the body is sent as JSON', async () => {
    const { fetch } = makeFetch();
    const body = JSON.stringify({ title: 'Hi', userId: 1 });

    const created = await fetch(`${MOCK_API_BASE}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body
    });
    expect(created.status).toBe(201);
    expect(await created.json()).toEqual({ id: 101, title: 'Hi', userId: 1 });

    const noHeader = await fetch(`${MOCK_API_BASE}/posts`, { method: 'POST', body });
    expect(noHeader.status).toBe(415);
  });

  it('paginates products until nextPage is null', async () => {
    const { fetch } = makeFetch();
    const first = await (await fetch(`${MOCK_API_BASE}/products`)).json();
    expect(first.nextPage).toBe(2);
    const last = await (await fetch(`${MOCK_API_BASE}/products?page=3`)).json();
    expect(last.nextPage).toBeNull();
  });

  it('rejects with the signal reason when aborted mid-request', async () => {
    const { fetch, counts } = makeFetch();
    const controller = new AbortController();
    const request = fetch(`${MOCK_API_BASE}/slow`, { signal: controller.signal });
    setTimeout(() => controller.abort(), 20);

    await expect(request).rejects.toMatchObject({ name: 'AbortError' });
    // An aborted request must still count as finished, or the sandbox
    // would wait on it until the run's time limit.
    expect(counts).toEqual({ started: 1, ended: 1 });
  });

  it('rejects like a network failure for any other host', async () => {
    const { fetch, counts } = makeFetch();
    await expect(fetch('https://jsonplaceholder.typicode.com/users')).rejects.toThrow(TypeError);
    expect(counts.started).toBe(0);
  });

  it('brackets every completed request with start/end hooks', async () => {
    const { fetch, counts } = makeFetch();
    await Promise.all([fetch(`${MOCK_API_BASE}/users`), fetch(`${MOCK_API_BASE}/todos`)]);
    expect(counts).toEqual({ started: 2, ended: 2 });
  });

  it('stays self-contained so it can be inlined into the sandbox via toString()', () => {
    // Rebuild the function from its source text alone, the way sandbox.js
    // does — any reference to module scope would throw here.
    const rebuilt = new Function(`return (${createMockFetch.toString()})`)();
    expect(typeof rebuilt(MOCK_API_BASE, MOCK_API_DATA, { start() {}, end() {}, setTimeout })).toBe('function');
  });
});
