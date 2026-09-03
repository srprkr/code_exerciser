# Coding Function Practice

[![Netlify Status](https://api.netlify.com/api/v1/badges/d1b0c93e-cc6c-4f9a-8080-b626b981ffa2/deploy-status)](https://app.netlify.com/projects/functioncodepractice/deploys)

A 140-exercise JavaScript practice site covering `map`/`filter`/`reduce`/`sort`/`spread`/destructuring/template literals/`find`/`some`/`every`/`Object.*`, with an in-browser CodeMirror editor and sandboxed grading. Progress, achievements, and profile data are stored entirely in `localStorage` — no backend.

See [ARRAY_METHODS_DEEP_DIVE.md](./ARRAY_METHODS_DEEP_DIVE.md) for the `map`/`filter`/`reduce` reference doc also available in-app via the book icon in the top nav.

## Development

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build
npm run test      # Vitest unit tests
npm run test:e2e  # Playwright e2e tests (chromium/firefox/webkit)
```
