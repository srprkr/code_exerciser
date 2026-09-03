import { describe, expect, it, beforeEach } from 'vitest';
import { render, cleanup } from '@testing-library/svelte';
import LanguageSelect from '../../src/lib/components/LanguageSelect.svelte';
import { currentLanguage } from '../../src/lib/stores/language.js';

beforeEach(() => {
  currentLanguage.set('javascript');
  cleanup();
});

const tick = () => new Promise((r) => setTimeout(r, 0));

describe('LanguageSelect', () => {
  it('renders a closed trigger showing the current language', () => {
    const { getByRole, queryByRole } = render(LanguageSelect);
    const trigger = getByRole('button', { name: 'Select programming language' });

    expect(trigger).toHaveTextContent('JavaScript');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('opens the listbox on click, showing javascript and python', async () => {
    const { getByRole, getAllByRole } = render(LanguageSelect);
    getByRole('button', { name: 'Select programming language' }).click();
    await tick();

    const options = getAllByRole('option');
    expect(options.map((o) => o.textContent.trim())).toEqual(['JavaScript', 'Python']);
    expect(getByRole('button', { name: 'Select programming language' })).toHaveAttribute('aria-expanded', 'true');
  });

  it('marks the active language selected and python as disabled but present', async () => {
    const { getByRole, getAllByRole } = render(LanguageSelect);
    getByRole('button', { name: 'Select programming language' }).click();
    await tick();

    const [javascript, python] = getAllByRole('option');
    expect(javascript).toHaveAttribute('aria-selected', 'true');
    expect(javascript).toHaveAttribute('aria-disabled', 'false');
    expect(python).toHaveAttribute('aria-selected', 'false');
    expect(python).toHaveAttribute('aria-disabled', 'true');
  });

  it('clicking the disabled python option does not change the language or close the list', async () => {
    const { getByRole, getAllByRole } = render(LanguageSelect);
    getByRole('button', { name: 'Select programming language' }).click();
    await tick();

    getAllByRole('option')[1].click();
    await tick();

    expect(getByRole('listbox')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Select programming language' })).toHaveTextContent('JavaScript');
  });

  it('clicking an available option selects it and closes the list', async () => {
    const { getByRole, getAllByRole, queryByRole } = render(LanguageSelect);
    getByRole('button', { name: 'Select programming language' }).click();
    await tick();

    getAllByRole('option')[0].click();
    await tick();

    expect(queryByRole('listbox')).not.toBeInTheDocument();
    expect(getByRole('button', { name: 'Select programming language' })).toHaveTextContent('JavaScript');
  });
});
