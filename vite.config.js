import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  // GitHub Pages serves this project repo from /code_exerciser/, so built
  // asset URLs need that prefix baked in or they'll 404 once deployed.
  base: '/code_exerciser/',
})
