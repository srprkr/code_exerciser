import { expect, test } from '@playwright/test';

// Appends code after the exercise's locked sample data, the same way the
// other grading tests do.
async function typeSolution(page, code) {
  const editor = page.locator('.cm-content');
  await editor.click();
  await page.keyboard.press('Control+End');
  await page.keyboard.type(code);
}

async function checkAnswer(page) {
  await page.getByRole('button', { name: 'Check answer' }).click();
  const checkResult = page.locator('.check-result');
  await expect(checkResult).toBeVisible();
  return checkResult;
}

test('a setTimeout solution is graded after the timer fires, not before', async ({ page }) => {
  await page.goto('/?exercise=141');
  await typeSolution(page, '\nsetTimeout(() => console.log(message), 100);');

  await expect(await checkAnswer(page)).toHaveClass(/check-pass/);
});

test('top-level await works and is graded once the promise settles', async ({ page }) => {
  await page.goto('/?exercise=151');
  await typeSolution(page, '\nconsole.log(await getGreeting());');

  await expect(await checkAnswer(page)).toHaveClass(/check-pass/);
});

test('fetch is served by the practice API', async ({ page }) => {
  await page.goto('/?exercise=161');
  await typeSolution(page, '\nconst res = await fetch(API + "/users");\nconsole.log((await res.json()).length);');

  await expect(await checkAnswer(page)).toHaveClass(/check-pass/);
});

test('an un-awaited fetch chain is still waited on before grading', async ({ page }) => {
  await page.goto('/?exercise=161');
  await typeSolution(page, '\nfetch(API + "/users").then(res => res.json()).then(users => console.log(users.length));');

  await expect(await checkAnswer(page)).toHaveClass(/check-pass/);
});

test('fetching any other host fails like a network error', async ({ page }) => {
  await page.goto('/?exercise=161');
  await typeSolution(page, '\nawait fetch("https://example.org/users");');

  await page.getByRole('button', { name: 'Run' }).click();
  await expect(page.locator('.console-error').first()).toContainText('Failed to fetch');
});

test('a never-cleared setInterval stops at the time limit instead of hanging', async ({ page }) => {
  await page.goto('/?exercise=141');
  await typeSolution(page, '\nsetInterval(() => {}, 100);\nconsole.log(message);');

  await page.getByRole('button', { name: 'Check answer' }).click();
  await expect(page.locator('.console-error').first()).toContainText('Stopped waiting after 5s', { timeout: 10000 });
  await expect(page.locator('.check-result')).toBeVisible();
});

test('an async exercise shows its hint with an MDN link', async ({ page }) => {
  await page.goto('/?exercise=158');
  await page.getByRole('button', { name: /See hint/ }).click();

  const link = page.locator('.hint-popover a', { hasText: 'View on MDN' });
  await expect(link).toHaveAttribute('href', /Promise\/allSettled$/);
});
