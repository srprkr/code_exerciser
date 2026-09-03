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

test('python is listed but not selectable until its content ships', async ({ page }) => {
  await trigger(page).click();

  const options = page.getByRole('option');
  await expect(options).toHaveCount(2);
  await expect(options.nth(0)).toHaveAttribute('aria-disabled', 'false');
  await expect(options.nth(1)).toHaveText('Python');
  await expect(options.nth(1)).toHaveAttribute('aria-disabled', 'true');

  // Playwright's actionability check reads the option as disabled, which is
  // itself the assertion that it reaches the accessibility tree as disabled.
  await expect(options.nth(1)).toBeDisabled();

  // Forced past that check, the click still has to be a no-op: the list stays
  // open and the language is unchanged.
  await options.nth(1).click({ force: true });
  await expect(page.getByRole('listbox')).toBeVisible();
  await expect(trigger(page)).toHaveText(/JavaScript/);
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

test('the disabled python option is muted rather than full-contrast', async ({ page }) => {
  await trigger(page).click();

  // --color-text-muted #666666, distinct from the enabled option's #222222.
  await expect(page.getByRole('option').nth(1)).toHaveCSS('color', 'rgb(102, 102, 102)');
  await expect(page.getByRole('option').nth(0)).toHaveCSS('color', 'rgb(34, 34, 34)');
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
