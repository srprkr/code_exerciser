import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Run executes code and shows console output', async ({ page }) => {
  // Problem 1's locked sample data + a correct one-line solution appended
  // after it. Click at the end of the editor content and type.
  const editor = page.locator('.cm-content');
  await editor.click();
  await page.keyboard.press('Control+End');
  await page.keyboard.type('\nconsole.log("hello from the sandbox");');

  await page.getByRole('button', { name: 'Run' }).click();

  const consoleOutput = page.locator('.console-log');
  await expect(consoleOutput).toContainText('hello from the sandbox');
});

test('Check answer marks a correct solution as passed and completes the exercise', async ({ page }) => {
  // Problem 1: map over numbers, double each value. Solution text mirrors
  // exercise-data.js's id:1 solution/output exactly.
  const editor = page.locator('.cm-content');
  await editor.click();
  await page.keyboard.press('Control+End');
  await page.keyboard.type('\nlet doubled = oneToFive.map(n => n * 2);\nconsole.log(doubled);');

  await page.getByRole('button', { name: 'Check answer' }).click();

  const checkResult = page.locator('.check-result');
  await expect(checkResult).toBeVisible();
  await expect(checkResult).toHaveClass(/check-pass/);
  await expect(checkResult).toContainText('Correct');

  // A correct pass should reveal the solution block and show the done checkmark.
  await expect(page.locator('.done-checkmark')).toBeVisible();
});

test('Check answer marks an incorrect solution as failed', async ({ page }) => {
  const editor = page.locator('.cm-content');
  await editor.click();
  await page.keyboard.press('Control+End');
  await page.keyboard.type('\nconsole.log("definitely wrong");');

  await page.getByRole('button', { name: 'Check answer' }).click();

  const checkResult = page.locator('.check-result');
  await expect(checkResult).toBeVisible();
  await expect(checkResult).toHaveClass(/check-fail/);
  await expect(page.locator('.done-checkmark')).not.toBeVisible();
});

test('a multi-log loop exercise (id 70 style) can pass via the all-logs fallback', async ({ page }) => {
  await page.goto('/?exercise=70');

  const editor = page.locator('.cm-content');
  await editor.click();
  await page.keyboard.press('Control+End');
  await page.keyboard.type(
    '\nfor (let {id, name} of users10) {\n  console.log(`${id}: ${name}`);\n}'
  );

  await page.getByRole('button', { name: 'Check answer' }).click();

  const checkResult = page.locator('.check-result');
  await expect(checkResult).toBeVisible();
  await expect(checkResult).toHaveClass(/check-pass/);
});
