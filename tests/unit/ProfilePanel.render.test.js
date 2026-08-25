import { describe, expect, it, beforeEach } from 'vitest';
import { render, cleanup } from '@testing-library/svelte';
import App from '../../src/App.svelte';
import {
  currentView,
  currentExerciseIndex,
  activeFunctionFilters,
  activeDifficultyFilter
} from '../../src/lib/stores/ui.js';
import { Progress } from '../../src/lib/stores/progress.js';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.setAttribute('data-theme', 'light');
  currentView.set('exercises');
  currentExerciseIndex.set(0);
  activeFunctionFilters.set(new Set());
  activeDifficultyFilter.set(null);
  cleanup();
});

describe('ProfilePanel', () => {
  it('shows the progress summary and completed-tab list reflecting real progress', async () => {
    Progress.markCompleted(1);
    currentView.set('profile');

    const { getByText, getAllByText } = render(App);
    expect(getByText(/1 \/ 140 problems completed/)).toBeInTheDocument();
    expect(getAllByText(/Problem 1:/).length).toBeGreaterThan(0);
  });

  it('switching tabs shows different exercises', async () => {
    Progress.markCompleted(1);
    Progress.markAttempted(2);
    currentView.set('profile');

    const { getByText, queryByText } = render(App);

    // Default tab is "Completed" — should show problem 1, not problem 2.
    expect(getByText(/Problem 1:/)).toBeInTheDocument();
    expect(queryByText(/Problem 2:/)).not.toBeInTheDocument();

    getByText('Attempted').click();
    await new Promise((r) => setTimeout(r, 0));
    expect(getByText(/Problem 2:/)).toBeInTheDocument();
    expect(queryByText(/Problem 1:/)).not.toBeInTheDocument();
  });

  it('clicking a progress-list exercise jumps to it and switches back to the exercises view (fixes the position-reset bug)', async () => {
    Progress.markCompleted(5);
    currentView.set('profile');

    const { getByText } = render(App);
    getByText(/Problem 5:/).click();
    await new Promise((r) => setTimeout(r, 0));

    expect(getByText(/Problem 5$/)).toBeInTheDocument();
  });

  it('navigating to profile and back preserves the current exercise index', async () => {
    currentExerciseIndex.set(4); // Problem 5, 0-indexed
    const { getByLabelText, getByText } = render(App);
    expect(getByText(/Problem 5$/)).toBeInTheDocument();

    getByLabelText('View profile').click();
    await new Promise((r) => setTimeout(r, 0));
    getByLabelText('Back to exercises').click();
    await new Promise((r) => setTimeout(r, 0));

    expect(getByText(/Problem 5$/)).toBeInTheDocument();
  });

  it('renders achievement badges with earned/total counts', async () => {
    currentView.set('profile');
    const { getAllByText } = render(App);
    // At least one badge should show a "N / total" status for an unearned tag.
    expect(getAllByText(/0 \/ \d+/).length).toBeGreaterThan(0);
  });

  it('editing the display name persists and updates the heading', async () => {
    currentView.set('profile');
    const { getByLabelText, getByText, container } = render(App);

    getByLabelText('Edit display name').click();
    await new Promise((r) => setTimeout(r, 0));

    const input = container.querySelector('.profile-heading-input');
    expect(input).toBeInTheDocument();
    input.value = 'Sean';
    input.dispatchEvent(new Event('input'));

    getByLabelText('Edit display name').click();
    await new Promise((r) => setTimeout(r, 0));

    expect(getByText(/Sean's Profile/)).toBeInTheDocument();
    expect(Progress.getDisplayName()).toBe('Sean');
  });
});
