// Self-hosting Pyodide means the runtime it needs at load time (the WASM
// binary, the packed Python stdlib, and its package manifest) has to be
// served as static assets rather than pulled from a CDN. Vite only copies
// files that live under public/ as-is, so this copies just what's needed
// for a browser ESM load out of node_modules/pyodide into public/pyodide/
// — skipping the README, both console.html demo pages, the UMD build (only
// the ESM entry is used), and .map/.d.ts files, which together are most of
// the package's ~14MB but none of which the running app needs.
//
// Runs on `npm install` (see package.json's postinstall) so a fresh clone
// or CI checkout has these before the dev server or build ever needs them.
// public/pyodide/ is gitignored — regenerate it here rather than committing
// ~10MB of binary that node_modules already has a copy of.
import { existsSync, mkdirSync, copyFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.dirname(fileURLToPath(import.meta.url)) + '/..';
const SOURCE_DIR = path.join(ROOT, 'node_modules/pyodide');
const DEST_DIR = path.join(ROOT, 'public/pyodide');

const FILES = ['pyodide.mjs', 'pyodide.asm.mjs', 'pyodide.asm.wasm', 'pyodide-lock.json', 'python_stdlib.zip'];

if (!existsSync(SOURCE_DIR)) {
  console.error('node_modules/pyodide not found — run `npm install` first.');
  process.exit(1);
}

mkdirSync(DEST_DIR, { recursive: true });

for (const file of FILES) {
  copyFileSync(path.join(SOURCE_DIR, file), path.join(DEST_DIR, file));
}

console.log(`Copied ${FILES.length} Pyodide runtime files to public/pyodide/`);
