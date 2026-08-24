import { expect, test } from '@playwright/test';

test('done checkmark is hidden for an unattempted exercise', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.done-checkmark')).not.toBeVisible();
});

test('done checkmark appears immediately after a correct Check answer, without reload', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.done-checkmark')).not.toBeVisible();

  const editor = page.locator('.cm-content');
  await editor.click();
  await page.keyboard.press('Control+End');
  await page.keyboard.type('\nlet doubled = oneToFive.map(n => n * 2);\nconsole.log(doubled);');
  await page.getByRole('button', { name: 'Check answer' }).click();

  await expect(page.locator('.done-checkmark')).toBeVisible();
});

test('done checkmark persists across navigation and a page reload', async ({ page }) => {
  await page.goto('/');
  const editor = page.locator('.cm-content');
  await editor.click();
  await page.keyboard.press('Control+End');
  await page.keyboard.type('\nlet doubled = oneToFive.map(n => n * 2);\nconsole.log(doubled);');
  await page.getByRole('button', { name: 'Check answer' }).click();
  await expect(page.locator('.done-checkmark')).toBeVisible();

  // Navigate away and back within the same session.
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.locator('.done-checkmark')).not.toBeVisible();
  await page.getByRole('button', { name: 'Previous' }).click();
  await expect(page.locator('.done-checkmark')).toBeVisible();

  // A fresh page load should read the same completed state back from localStorage.
  await page.reload();
  await expect(page.locator('.done-checkmark')).toBeVisible();
});

test('checkmark visibility survives a theme toggle', async ({ page }) => {
  await page.goto('/');
  const editor = page.locator('.cm-content');
  await editor.click();
  await page.keyboard.press('Control+End');
  await page.keyboard.type('\nlet doubled = oneToFive.map(n => n * 2);\nconsole.log(doubled);');
  await page.getByRole('button', { name: 'Check answer' }).click();
  await expect(page.locator('.done-checkmark')).toBeVisible();

  await page.getByLabel('Toggle day/night theme').click();
  await expect(page.locator('.done-checkmark')).toBeVisible();
});
