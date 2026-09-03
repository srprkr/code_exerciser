import { describe, expect, it, beforeEach } from 'vitest';
import { render, cleanup } from '@testing-library/svelte';
import App from '../../src/App.svelte';
import { currentView, currentExerciseIndex, activeFunctionFilters, activeDifficultyFilter } from '../../src/lib/stores/ui.js';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.setAttribute('data-theme', 'light');
  currentView.set('exercises');
  currentExerciseIndex.set(0);
  activeFunctionFilters.set(new Set());
  activeDifficultyFilter.set(null);
  cleanup();
});

describe('CodeEditor', () => {
  it('mounts a real CodeMirror instance into .code-editor', () => {
    const { container } = render(App);
    const editorHost = container.querySelector('.code-editor');
    expect(editorHost).toBeInTheDocument();
    // CodeMirror renders a .cm-editor root inside its parent once created.
    expect(editorHost.querySelector('.cm-editor')).toBeInTheDocument();
  });

  it('pre-loads the sample data into the editor doc for a fresh exercise', () => {
    const { container } = render(App);
    const content = container.querySelector('.cm-content');
    expect(content).toBeInTheDocument();
    // Problem 1's sample data should appear verbatim as locked starter text.
    expect(content.textContent).toContain('let');
  });

  it('shows Run and Check answer buttons', () => {
    const { getByText } = render(App);
    expect(getByText('Run')).toBeInTheDocument();
    expect(getByText('Check answer')).toBeInTheDocument();
  });
});
