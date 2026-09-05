import { expect, test } from '@playwright/test';

const trigger = (page) => page.getByRole('button', { name: 'Select programming language' });

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('title shows a language dropdown defaulted to JavaScript', async ({ page }) => {
  await expect(trigger(page)).toBeVisible();
  await expect(trigger(page)).toHaveText(/JavaScript/);
  await expect(trigger(page)).toHaveAttribute('aria-expanded', 'false');
  await expect(page.getByText('Exerciser')).toBeVisible();
});

test('both shipped languages are listed and selectable', async ({ page }) => {
  await trigger(page).click();

  const options = page.getByRole('option');
  await expect(options).toHaveCount(2);
  await expect(options.nth(0)).toHaveText('JavaScript');
  await expect(options.nth(1)).toHaveText('Python');
  await expect(options.nth(0)).toHaveAttribute('aria-disabled', 'false');
  await expect(options.nth(1)).toHaveAttribute('aria-disabled', 'false');

  // Rust and Ruby are planned but have no exercise module, so they must not
  // appear at all rather than appearing as dead entries.
  await expect(options.filter({ hasText: /Rust|Ruby/ })).toHaveCount(0);
});

test('choosing Python updates the trigger and closes the list', async ({ page }) => {
  await trigger(page).click();
  await page.getByRole('option', { name: 'Python' }).click();

  await expect(page.getByRole('listbox')).toBeHidden();
  await expect(trigger(page)).toHaveText(/Python/);
  await expect(trigger(page)).toHaveAttribute('aria-expanded', 'false');
});

// The popup spans the trigger's full width edge-to-edge, so it's never
// narrower than the pill above it — combined with the trigger being pinned
// to the widest language's width (see the test below), this is what
// guarantees the popup is always wide enough for "JavaScript", even while a
// shorter language like "Python" is the one currently selected.
test('the popup spans the trigger\'s full width, edge to edge', async ({ page }) => {
  await trigger(page).click();

  const triggerBox = await trigger(page).boundingBox();
  const listBox = await page.getByRole('listbox').boundingBox();

  expect(listBox.x).toBeCloseTo(triggerBox.x, 0);
  expect(listBox.width).toBeCloseTo(triggerBox.width, 0);
});

// "Python" is shorter than "JavaScript" — without pinning, the trigger (and
// so the popup, which sizes off it) would shrink when Python is selected,
// leaving too little room to comfortably show "JavaScript" as an option.
test('the trigger and popup stay pinned to the widest language\'s width regardless of selection', async ({
  page
}) => {
  const jsWidth = (await trigger(page).boundingBox()).width;

  await trigger(page).click();
  await page.getByRole('option', { name: 'Python' }).click();
  const pythonWidth = (await trigger(page).boundingBox()).width;

  expect(pythonWidth).toBeCloseTo(jsWidth, 0);

  await trigger(page).click();
  const listBoxWidth = (await page.getByRole('listbox').boundingBox()).width;
  expect(listBoxWidth).toBeCloseTo(jsWidth, 0);

  // The option text itself must fit comfortably, not just the container —
  // guards against a container-only fix that still clips or wraps the text.
  const jsOption = page.getByRole('option', { name: 'JavaScript' });
  const optionBox = await jsOption.boundingBox();
  const textWidth = await jsOption.evaluate((el) => {
    const range = document.createRange();
    range.selectNodeContents(el);
    return range.getBoundingClientRect().width;
  });
  expect(textWidth).toBeLessThan(optionBox.width);
});

test('the popup is themed from the app tokens in both light and dark', async ({ page }) => {
  await trigger(page).click();
  const listbox = page.getByRole('listbox');

  // Light theme tokens: --color-bg #ffffff / --color-text #222222.
  await expect(listbox).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  await expect(listbox).toHaveCSS('color', 'rgb(34, 34, 34)');
  // Body copy, not the h1's oversized extrabold title font.
  await expect(listbox).toHaveCSS('font-size', '16px');
  await expect(listbox).toHaveCSS('font-weight', '400');

  await page.keyboard.press('Escape');
  await page.getByLabel('Toggle day/night theme').click();
  await trigger(page).click();

  // Dark theme tokens: --color-bg #1d232a / --color-text #e5e7eb.
  await expect(listbox).toHaveCSS('background-color', 'rgb(29, 35, 42)');
  await expect(listbox).toHaveCSS('color', 'rgb(229, 231, 235)');
});

test('the selected option is marked so the active language is identifiable', async ({ page }) => {
  await trigger(page).click();
  await expect(page.getByRole('option').nth(0)).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('option').nth(1)).toHaveAttribute('aria-selected', 'false');

  await page.getByRole('option', { name: 'Python' }).click();
  await trigger(page).click();

  await expect(page.getByRole('option').nth(0)).toHaveAttribute('aria-selected', 'false');
  await expect(page.getByRole('option').nth(1)).toHaveAttribute('aria-selected', 'true');
});

test('opens with the keyboard and closes on Escape, returning focus to the trigger', async ({ page }) => {
  await trigger(page).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('listbox')).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(page.getByRole('listbox')).toBeHidden();
  await expect(trigger(page)).toBeFocused();
});

test('arrow keys move the active option without leaking to exercise navigation', async ({ page }) => {
  const position = page.getByText(/^1 \/ \d+$/);
  await expect(position).toBeVisible();

  await trigger(page).click();
  const listbox = page.getByRole('listbox');

  // Down moves the active option onto Python...
  await page.keyboard.press('ArrowDown');
  await expect(listbox).toHaveAttribute('aria-activedescendant', 'language-option-python');
  await page.keyboard.press('ArrowUp');
  await expect(listbox).toHaveAttribute('aria-activedescendant', 'language-option-javascript');

  // ...and Left/Right must not reach keyboardNav.js's document-level handler,
  // which would otherwise step the exercise behind the open dropdown.
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowLeft');
  await expect(page.getByText(/^1 \/ \d+$/)).toBeVisible();
});

test('clicking outside closes the dropdown', async ({ page }) => {
  await trigger(page).click();
  await expect(page.getByRole('listbox')).toBeVisible();

  await page.getByText('Exerciser').click();
  await expect(page.getByRole('listbox')).toBeHidden();
});
