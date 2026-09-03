import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Ctrl+Enter runs the code while the editor has focus', async ({ page }) => {
  const editor = page.locator('.cm-content');
  await editor.click();
  await page.keyboard.press('Control+End');
  await page.keyboard.type('\nconsole.log("hello from shortcut");');

  await page.keyboard.press('Control+Enter');

  await expect(page.locator('.console-log')).toContainText('hello from shortcut');
});

test('Ctrl+Shift+Enter checks the answer while the editor has focus', async ({ page }) => {
  const editor = page.locator('.cm-content');
  await editor.click();
  await page.keyboard.press('Control+End');
  await page.keyboard.type('\nlet doubled = oneToFive.map(n => n * 2);\nconsole.log(doubled);');

  await page.keyboard.press('Control+Shift+Enter');

  await expect(page.locator('.check-result')).toHaveClass(/check-pass/);
});

test('Ctrl+Enter does not insert a newline into the editor', async ({ page }) => {
  const editor = page.locator('.cm-content');
  await editor.click();
  await page.keyboard.press('Control+End');
  const before = await editor.textContent();

  await page.keyboard.press('Control+Enter');

  const after = await editor.textContent();
  expect(after).toBe(before);
});

test('Ctrl+Enter runs the code even when focus is elsewhere on the page (e.g. a button)', async ({ page }) => {
  const editor = page.locator('.cm-content');
  await editor.click();
  await page.keyboard.press('Control+End');
  await page.keyboard.type('\nconsole.log("ran from outside the editor");');

  // Move focus off the editor onto a plain button before triggering the shortcut.
  await page.getByRole('button', { name: 'Previous' }).focus();

  await page.keyboard.press('Control+Enter');

  await expect(page.locator('.console-log')).toContainText('ran from outside the editor');
});

test('Ctrl+Shift+Enter checks the answer even when focus is elsewhere on the page', async ({ page }) => {
  const editor = page.locator('.cm-content');
  await editor.click();
  await page.keyboard.press('Control+End');
  await page.keyboard.type('\nlet doubled = oneToFive.map(n => n * 2);\nconsole.log(doubled);');

  await page.getByRole('button', { name: 'Previous' }).focus();
  await page.keyboard.press('Control+Shift+Enter');

  await expect(page.locator('.check-result')).toHaveClass(/check-pass/);
});
