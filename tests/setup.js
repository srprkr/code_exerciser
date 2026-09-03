import '@testing-library/jest-dom/vitest';

// jsdom doesn't implement the Web Animations API, which Svelte's
// svelte/transition helpers (fly, slide, fade, ...) use under the hood.
// The animation itself is untestable here regardless (real easing/timing
// needs a real browser — see the Playwright suite), so this stub just
// lets components using transitions mount without throwing.
if (typeof Element !== 'undefined' && !Element.prototype.animate) {
  Element.prototype.animate = function animate() {
    return {
      finished: Promise.resolve(),
      cancel() {},
      finish() {},
      play() {},
      pause() {},
      addEventListener() {},
      removeEventListener() {}
    };
  };
}
