import { expect, test } from '@playwright/test';

// Exactly what the currently-deployed (pre-multi-language) site's "Copy my
// progress" produces: exerciseProgress is the old flat { exerciseId: entry }
// shape, and there is no `language` field — that key doesn't exist in the
// old build. This is what an active user has saved right now and would
// paste into "Import progress" after this branch deploys.
const OLD_SITE_EXPORT = JSON.stringify({
  exerciseProgress: JSON.stringify({
    1: { attempted: true, completed: true },
    21: { attempted: true, completed: true }
  }),
  displayName: 'Sean',
  theme: 'light'
});

async function openImportPanel(page) {
  await page.getByLabel('View profile').click();
  await page.getByText('Sync across browsers').click();
  await page.getByLabel('Import progress').click();
}

test('pasting an old pre-multi-language export restores JS progress under JavaScript', async ({ page }) => {
  await page.goto('/');
  await openImportPanel(page);

  await page.getByPlaceholder('Paste your copied progress here…').fill(OLD_SITE_EXPORT);
  await page.getByRole('button', { name: 'Import', exact: true }).click();

  await page.waitForURL('**'); // the import triggers a full reload
  await page.waitForLoadState();

  await expect(page.getByLabel('Select programming language')).toHaveText(/JavaScript/);

  await page.getByLabel('View profile').click();
  await expect(page.getByText(/2 \/ 140 problems completed/)).toBeVisible();
  await expect(page.getByText("Sean's Profile")).toBeVisible();

  await page.getByRole('button', { name: 'Completed' }).click();
  await expect(page.getByText(/Problem 1:/)).toBeVisible();
  await expect(page.getByText(/Problem 21:/)).toBeVisible();
});

test('importing an old JS-only export does not wipe out this browser\'s Python progress', async ({ page }) => {
  await page.goto('/');

  // Give this browser some Python progress first, via the real UI —
  // Check answer on Python problem 1's actual solution.
  await page.getByRole('button', { name: 'Select programming language' }).click();
  await page.getByRole('option', { name: 'Python' }).click();
  const editor = page.locator('.cm-content');
  await editor.click();
  await page.keyboard.press('Control+End');
  await page.keyboard.type(
    '\nlong_words = [word for word in sentence.split() if len(word) > 4]\nprint(long_words)'
  );
  await page.getByRole('button', { name: 'Check answer' }).click();
  await expect(page.locator('.done-checkmark')).toBeVisible({ timeout: 20000 });

  await openImportPanel(page);
  await page.getByPlaceholder('Paste your copied progress here…').fill(OLD_SITE_EXPORT);
  await page.getByRole('button', { name: 'Import', exact: true }).click();
  await page.waitForLoadState();

  // The old export carries no `language` field, so importing doesn't force
  // a switch — this browser was on Python before the import and stays
  // there, with the Python completion from before the import still intact.
  await expect(page.getByLabel('Select programming language')).toHaveText(/Python/);
  await expect(page.locator('.done-checkmark')).toBeVisible();

  // And the imported JS progress landed safely in the background, ready
  // whenever this browser switches to JavaScript.
  await page.getByRole('button', { name: 'Select programming language' }).click();
  await page.getByRole('option', { name: 'JavaScript' }).click();
  await page.getByLabel('View profile').click();
  await expect(page.getByText(/2 \/ 140 problems completed/)).toBeVisible();
});

test('a garbled paste is rejected with a clear message, without touching existing progress', async ({ page }) => {
  await page.goto('/');
  const editor = page.locator('.cm-content');
  await editor.click();
  await page.keyboard.press('Control+End');
  await page.keyboard.type('\nlet doubled = oneToFive.map(n => n * 2);\nconsole.log(doubled);');
  await page.getByRole('button', { name: 'Check answer' }).click();
  await expect(page.locator('.done-checkmark')).toBeVisible();

  await openImportPanel(page);
  await page.getByPlaceholder('Paste your copied progress here…').fill('this is not json');
  await page.getByRole('button', { name: 'Import', exact: true }).click();

  await expect(page.getByText("That doesn't look like valid progress data")).toBeVisible();
  await page.getByLabel('Back to exercises').click();
  await expect(page.locator('.done-checkmark')).toBeVisible();
});
