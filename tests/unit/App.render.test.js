import { describe, expect, it, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/svelte';
import App from '../../src/App.svelte';
import { currentView, currentExerciseIndex, activeFunctionFilters, activeDifficultyFilter } from '../../src/lib/stores/ui.js';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.setAttribute('data-theme', 'light');
  // ui.js's stores are module-level singletons shared across tests in this
  // file — reset them explicitly so one test's navigation doesn't leak into
  // the next (Vitest does not reset ES module state between tests).
  currentView.set('exercises');
  currentExerciseIndex.set(0);
  activeFunctionFilters.set(new Set());
  activeDifficultyFilter.set(null);
  cleanup();
});

describe('App', () => {
  it('mounts without throwing and shows the first exercise', () => {
    render(App);
    expect(screen.getByText('Coding function practice')).toBeInTheDocument();
    expect(screen.getByText(/Problem 1$/)).toBeInTheDocument();
  });

  it('renders a question and tags for the first exercise', () => {
    render(App);
    expect(screen.getByText(/1 \/ \d+/)).toBeInTheDocument();
  });

  it('navigates to the next exercise on click', async () => {
    const { getByText } = render(App);
    const nextButton = getByText('Next').closest('button');
    nextButton.click();
    await new Promise((r) => setTimeout(r, 0));
    expect(getByText(/Problem 2$/)).toBeInTheDocument();
  });

  it('switches to the profile view and back', async () => {
    const { getByLabelText, getByText } = render(App);
    getByLabelText('View profile').click();
    await new Promise((r) => setTimeout(r, 0));
    expect(getByText('Achievements')).toBeInTheDocument();
    expect(getByText(/'s Profile$/)).toBeInTheDocument();

    getByLabelText('Back to exercises').click();
    await new Promise((r) => setTimeout(r, 0));
    expect(getByText(/Problem 1$/)).toBeInTheDocument();
  });
});
