// A fake fetch() for the fetch exercises, serving a tiny fixed API at
// MOCK_API_BASE. Real network requests from the sandboxed iframe would be
// flaky (offline, CORS, a public API changing its data), so graded
// problems get deterministic responses instead.
//
// createMockFetch is inlined into the sandbox's srcdoc via toString(), so
// it must stay fully self-contained: no imports, no references to
// anything outside its own body except the `data` and `hooks` it's given
// and browser globals (Response, DOMException, URL).

export const MOCK_API_BASE = 'https://api.example.com';

export const MOCK_API_DATA = {
  users: [
    { id: 1, name: 'Ana Kim', email: 'ana@example.com' },
    { id: 2, name: 'Sam Ortiz', email: 'sam@example.com' },
    { id: 3, name: 'Luis Fernandez', email: 'luis@example.com' },
    { id: 4, name: 'Priya Shah', email: 'priya@example.com' }
  ],
  todos: [
    { id: 1, title: 'Buy groceries', completed: true },
    { id: 2, title: 'Walk the dog', completed: false },
    { id: 3, title: 'Pay rent', completed: true },
    { id: 4, title: 'Fix the bike', completed: false },
    { id: 5, title: 'Read a book', completed: false }
  ],
  posts: [
    { id: 1, userId: 1, title: 'Hello world', likes: 12 },
    { id: 2, userId: 1, title: 'Async tips', likes: 30 },
    { id: 3, userId: 2, title: 'Fetch basics', likes: 7 },
    { id: 4, userId: 3, title: 'Promise chains', likes: 18 },
    { id: 5, userId: 3, title: 'Timers explained', likes: 4 },
    { id: 6, userId: 1, title: 'Error handling', likes: 21 }
  ],
  productPages: [
    ['Keyboard', 'Mouse', 'Monitor'],
    ['Webcam', 'Headset', 'Microphone'],
    ['Desk Lamp']
  ]
};

// hooks.start()/hooks.end() bracket every request so the sandbox knows a
// fetch is still in flight and doesn't report "done" before it settles.
// hooks.setTimeout is the sandbox's *unwrapped* timer, so the mock's own
// latency isn't double-counted as a user timer.
export function createMockFetch(base, data, hooks) {
  const DEFAULT_DELAY = 50;
  const SLOW_DELAY = 1000;

  function json(status, body) {
    return new Response(JSON.stringify(body), {
      status,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  function route(method, url, headers, body) {
    const path = url.pathname.replace(/\/+$/, '');
    let match;

    if (method === 'GET' && path === '/users') return json(200, data.users);

    if (method === 'GET' && (match = path.match(/^\/users\/(\d+)$/))) {
      const user = data.users.find((u) => u.id === Number(match[1]));
      return user ? json(200, user) : json(404, { error: 'User not found' });
    }

    if (method === 'GET' && path === '/todos') return json(200, data.todos);

    if (method === 'GET' && path === '/posts') {
      const userId = url.searchParams.get('userId');
      const posts = userId === null ? data.posts : data.posts.filter((p) => p.userId === Number(userId));
      return json(200, posts);
    }

    if (method === 'POST' && path === '/posts') {
      const contentType = headers.get('Content-Type') || '';
      if (!contentType.includes('application/json')) {
        return json(415, { error: 'Expected Content-Type: application/json' });
      }
      let parsed;
      try {
        parsed = JSON.parse(body);
      } catch {
        return json(400, { error: 'Body must be valid JSON' });
      }
      return json(201, { id: 101, ...parsed });
    }

    if (method === 'GET' && path === '/products') {
      const page = Number(url.searchParams.get('page') || 1);
      const names = data.productPages[page - 1];
      if (!names) return json(404, { error: 'Page not found' });
      const nextPage = page < data.productPages.length ? page + 1 : null;
      return json(200, { page, products: names.map((name) => ({ name })), nextPage });
    }

    if (method === 'GET' && path === '/slow') return json(200, { message: 'Finally!' });

    return json(404, { error: 'Not found' });
  }

  return function fetch(input, options = {}) {
    let url;
    try {
      url = new URL(String(input), base);
    } catch {
      return Promise.reject(new TypeError('Failed to fetch: invalid URL'));
    }
    if (url.origin !== base) {
      return Promise.reject(
        new TypeError(`Failed to fetch: the practice sandbox only serves ${base}`)
      );
    }

    const method = (options.method || 'GET').toUpperCase();
    const headers = new Headers(options.headers || {});
    const signal = options.signal;
    const delay = url.pathname.replace(/\/+$/, '') === '/slow' ? SLOW_DELAY : DEFAULT_DELAY;

    if (signal && signal.aborted) return Promise.reject(signal.reason);

    hooks.start();
    return new Promise((resolve, reject) => {
      let settled = false;
      const finish = (fn, value) => {
        if (settled) return;
        settled = true;
        hooks.end();
        fn(value);
      };

      const onAbort = () => finish(reject, signal.reason);
      if (signal) signal.addEventListener('abort', onAbort, { once: true });

      hooks.setTimeout(() => {
        if (signal) signal.removeEventListener('abort', onAbort);
        finish(resolve, route(method, url, headers, options.body));
      }, delay);
    });
  };
}
