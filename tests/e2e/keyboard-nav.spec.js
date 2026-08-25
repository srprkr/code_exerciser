import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('ArrowRight/ArrowLeft cycle to the next/previous problem when focus is outside the editor', async ({ page }) => {
  await expect(page.locator('.exercise-title')).toHaveText(/Problem 1$/);

  await page.keyboard.press('ArrowRight');
  await expect(page.locator('.exercise-title')).toHaveText(/Problem 2$/);

  await page.keyboard.press('ArrowLeft');
  await expect(page.locator('.exercise-title')).toHaveText(/Problem 1$/);
});

test('ArrowLeft from problem 1 wraps around to the last problem', async ({ page }) => {
  await expect(page.locator('.exercise-title')).toHaveText(/Problem 1$/);
  await page.keyboard.press('ArrowLeft');
  await expect(page.locator('.carousel-counter')).toHaveText(/140 \/ 140/);
});

test('Shift+ArrowRight skips forward 10 problems', async ({ page }) => {
  await page.keyboard.press('Shift+ArrowRight');
  await expect(page.locator('.exercise-title')).toHaveText(/Problem 11$/);
});

test('Shift+ArrowLeft skips backward 10 problems, wrapping from the start', async ({ page }) => {
  await page.keyboard.press('Shift+ArrowLeft');
  await expect(page.locator('.carousel-counter')).toHaveText(/131 \/ 140/);
});

test('arrow keys do NOT navigate while the code editor has focus (cursor movement instead)', async ({ page }) => {
  await expect(page.locator('.exercise-title')).toHaveText(/Problem 1$/);

  const editor = page.locator('.cm-content');
  await editor.click();
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('ArrowRight');

  await expect(page.locator('.exercise-title')).toHaveText(/Problem 1$/);
});

test('the skip-10 buttons are visible with the full unfiltered list and move by 10', async ({ page }) => {
  const forwardSkip = page.getByRole('button', { name: 'Forward 10 problems' });
  await expect(forwardSkip).toBeVisible();

  await forwardSkip.click();
  await expect(page.locator('.exercise-title')).toHaveText(/Problem 11$/);

  await page.getByRole('button', { name: 'Back 10 problems' }).click();
  await expect(page.locator('.exercise-title')).toHaveText(/Problem 1$/);
});

test('the skip-10 buttons are hidden once filters narrow the list below 10', async ({ page }) => {
  // hard + spread narrows the exercise list to 5 (well below the skip
  // amount), a stable combination checked directly against the dataset.
  await page.getByRole('button', { name: 'spread', exact: true }).click();
  await page.getByRole('button', { name: 'hard', exact: true }).click();

  const count = Number((await page.locator('.carousel-counter').textContent()).match(/\/\s*(\d+)/)[1]);
  expect(count).toBeLessThan(10);

  await expect(page.getByRole('button', { name: 'Forward 10 problems' })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Back 10 problems' })).toHaveCount(0);
});
