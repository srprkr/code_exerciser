import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('navigating to profile and back preserves the current exercise position', async ({ page }) => {
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.locator('.exercise-title')).toHaveText(/Problem 3$/);

  await page.getByRole('button', { name: 'View profile' }).click();
  await expect(page.getByText('Achievements')).toBeVisible();

  await page.getByRole('button', { name: 'Back to exercises' }).click();
  await expect(page.locator('.exercise-title')).toHaveText(/Problem 3$/);
});

test('completing an exercise updates the profile achievements and progress list live', async ({ page }) => {
  const editor = page.locator('.cm-content');
  await editor.click();
  await page.keyboard.press('Control+End');
  await page.keyboard.type('\nlet doubled = oneToFive.map(n => n * 2);\nconsole.log(doubled);');
  await page.getByRole('button', { name: 'Check answer' }).click();
  await expect(page.locator('.check-result')).toHaveClass(/check-pass/);

  await page.getByRole('button', { name: 'View profile' }).click();
  await expect(page.getByText(/1 \/ \d+ problems completed/)).toBeVisible();
  await expect(page.getByText(/Problem 1:/)).toBeVisible();
});

test('clicking a progress-list item jumps to that exercise', async ({ page }) => {
  const editor = page.locator('.cm-content');
  await editor.click();
  await page.keyboard.press('Control+End');
  await page.keyboard.type('\nlet doubled = oneToFive.map(n => n * 2);\nconsole.log(doubled);');
  await page.getByRole('button', { name: 'Check answer' }).click();
  await expect(page.locator('.check-result')).toHaveClass(/check-pass/);

  await page.getByRole('button', { name: 'View profile' }).click();
  await page.getByText(/Problem 1:/).click();

  await expect(page.locator('.exercise-title')).toHaveText(/Problem 1$/);
});
