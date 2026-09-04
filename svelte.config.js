import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

// vitePreprocess() is auto-detected by @sveltejs/vite-plugin-svelte's own
// svelte() call in vite.config.js — it doesn't need wiring in there too.
// This is what lets a component use <style lang="scss"> (needs the `sass`
// package installed; nothing else to configure).
/** @type {import("@sveltejs/vite-plugin-svelte").SvelteConfig} */
export default {
  preprocess: vitePreprocess()
}
