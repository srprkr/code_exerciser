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

// The whole reason this is a custom listbox rather than a native <select>:
// a native popup always spans the trigger's full border-box width, so it
// overhangs the flat run of a pill-shaped border by one cap-radius each side.
test('the popup aligns with the flat section of the pill, not its rounded caps', async ({ page }) => {
  await trigger(page).click();

  const triggerBox = await trigger(page).boundingBox();
  const listBox = await page.getByRole('listbox').boundingBox();
  const capRadius = triggerBox.height / 2;

  expect(listBox.x).toBeCloseTo(triggerBox.x + capRadius, 0);
  expect(listBox.width).toBeCloseTo(triggerBox.width - capRadius * 2, 0);
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
