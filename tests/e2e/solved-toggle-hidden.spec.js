import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('the tough-it-out toggle is visible for an unsolved problem', async ({ page }) => {
  await expect(page.locator('.tough-it-out-toggle')).toBeVisible();
});

test('the tough-it-out toggle disappears once the problem is solved, without auto-revealing the solution block', async ({ page }) => {
  const editor = page.locator('.cm-content');
  await editor.click();
  await page.keyboard.press('Control+End');
  await page.keyboard.type('\nlet doubled = oneToFive.map(n => n * 2);\nconsole.log(doubled);');
  await page.getByRole('button', { name: 'Check answer' }).click();

  await expect(page.locator('.check-result')).toHaveClass(/check-pass/);
  await expect(page.locator('.tough-it-out-toggle')).toHaveCount(0);
});

test('reloading a solved problem keeps the toggle hidden', async ({ page }) => {
  const editor = page.locator('.cm-content');
  await editor.click();
  await page.keyboard.press('Control+End');
  await page.keyboard.type('\nlet doubled = oneToFive.map(n => n * 2);\nconsole.log(doubled);');
  await page.getByRole('button', { name: 'Check answer' }).click();
  await expect(page.locator('.check-result')).toHaveClass(/check-pass/);

  await page.reload();
  await expect(page.locator('.tough-it-out-toggle')).toHaveCount(0);
});

test('navigating from a solved problem to an unsolved one brings the toggle back', async ({ page }) => {
  const editor = page.locator('.cm-content');
  await editor.click();
  await page.keyboard.press('Control+End');
  await page.keyboard.type('\nlet doubled = oneToFive.map(n => n * 2);\nconsole.log(doubled);');
  await page.getByRole('button', { name: 'Check answer' }).click();
  await expect(page.locator('.check-result')).toHaveClass(/check-pass/);
  await expect(page.locator('.tough-it-out-toggle')).toHaveCount(0);

  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.locator('.tough-it-out-toggle')).toBeVisible();
});
