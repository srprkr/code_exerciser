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

  it('opens the listbox on click, listing every language with TypeScript beside JavaScript', async () => {
    const { getByRole, getAllByRole } = render(LanguageSelect);
    getByRole('button', { name: 'Select programming language' }).click();
    await tick();

    const options = getAllByRole('option');
    expect(options.map((o) => o.textContent.trim())).toEqual(['JavaScript', 'TypeScript (Beta)', 'Python (Beta)']);
    expect(getByRole('button', { name: 'Select programming language' })).toHaveAttribute('aria-expanded', 'true');
  });

  it('marks the active language selected, with every language selectable', async () => {
    const { getByRole, getAllByRole } = render(LanguageSelect);
    getByRole('button', { name: 'Select programming language' }).click();
    await tick();

    const [javascript, typescript, python] = getAllByRole('option');
    expect(javascript).toHaveAttribute('aria-selected', 'true');
    expect(javascript).toHaveAttribute('aria-disabled', 'false');
    expect(typescript).toHaveAttribute('aria-selected', 'false');
    expect(typescript).toHaveAttribute('aria-disabled', 'false');
    expect(python).toHaveAttribute('aria-selected', 'false');
    expect(python).toHaveAttribute('aria-disabled', 'false');
  });

  it('choosing python switches the language and closes the list', async () => {
    const { getByRole, getAllByRole, queryByRole } = render(LanguageSelect);
    getByRole('button', { name: 'Select programming language' }).click();
    await tick();

    getAllByRole('option')[2].click();
    await tick();

    expect(queryByRole('listbox')).not.toBeInTheDocument();
    expect(getByRole('button', { name: 'Select programming language' })).toHaveTextContent('Python');
  });

  it('choosing typescript switches the language and closes the list', async () => {
    const { getByRole, getAllByRole, queryByRole } = render(LanguageSelect);
    getByRole('button', { name: 'Select programming language' }).click();
    await tick();

    getAllByRole('option')[1].click();
    await tick();

    expect(queryByRole('listbox')).not.toBeInTheDocument();
    expect(getByRole('button', { name: 'Select programming language' })).toHaveTextContent('TypeScript');
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
