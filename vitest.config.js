import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  resolve: {
    // Forces Vitest to resolve Svelte's client build instead of its
    // SSR/server build when running under jsdom (component tests, e.g.
    // @testing-library/svelte, need the client build's mount()).
    conditions: process.env.VITEST ? ['browser'] : []
  },
  test: {
    environment: 'jsdom',
    include: ['tests/unit/**/*.test.js'],
    setupFiles: ['tests/setup.js']
  }
});
