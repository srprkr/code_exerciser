import { expect, test } from '@playwright/test';

const trigger = (page) => page.getByRole('button', { name: 'Select programming language' });
const position = (page) => page.getByText(/^\d+ \/ \d+$/);

async function switchTo(page, label) {
  await trigger(page).click();
  await page.getByRole('option', { name: label }).click();
  // Park the cursor away from the filter pills so hover styling can't be
  // mistaken for an active filter.
  await page.mouse.move(5, 5);
  await expect(trigger(page)).toHaveText(new RegExp(label));
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('switching to Python swaps the exercise set and the filter tags', async ({ page }) => {
  await expect(position(page)).toHaveText('1 / 140');
  await expect(page.locator('#function-filters .pill', { hasText: 'reduce' })).toBeVisible();

  await switchTo(page, 'Python');

  await expect(position(page)).toHaveText('1 / 9');
  await expect(page.locator('#function-filters .pill').first()).toHaveText('list-comprehension');
  // A JavaScript-only tag must not survive the switch.
  await expect(page.locator('#function-filters .pill', { hasText: /^spread$/ })).toHaveCount(0);
});

test('switching languages clears filters that the new language cannot show', async ({ page }) => {
  await page.locator('#function-filters .pill', { hasText: 'reduce' }).first().click();
  await expect(page.locator('#clear-filters')).toBeVisible();

  await switchTo(page, 'Python');

  // 'reduce' is a JavaScript tag; leaving it active would strand the user on
  // an empty carousel with a pill the new language never renders.
  await expect(page.locator('#clear-filters')).toBeHidden();
  await expect(page.locator('#function-filters .pill.btn-active')).toHaveCount(0);
  await expect(position(page)).toHaveText('1 / 9');
});

test('Run and Check report that no Python runtime exists, rather than a JS error', async ({ page }) => {
  await switchTo(page, 'Python');

  await page.getByRole('button', { name: 'Run' }).click();
  await expect(page.locator('.console-error')).toContainText('No Python runtime is wired up yet');
  // A JS SyntaxError leaking through would mean the guard was bypassed.
  await expect(page.locator('.console-error')).not.toContainText('SyntaxError');

  await page.getByRole('button', { name: 'Check answer' }).click();
  await expect(page.locator('.console-error')).toContainText('No Python runtime is wired up yet');
});

test('the selected language survives a page reload', async ({ page }) => {
  await switchTo(page, 'Python');
  await page.reload();

  await expect(trigger(page)).toHaveText(/Python/);
  await expect(position(page)).toHaveText('1 / 9');
});

test('the editor highlights Python syntax, not JavaScript', async ({ page }) => {
  // '#' starts a comment in Python but is meaningless in JavaScript, so it
  // only produces a highlighted token in Python mode.
  async function commentSpanCount() {
    await page.locator('.cm-content').click();
    await page.keyboard.press('Control+End');
    await page.keyboard.type('\n# a comment here');
    return page.evaluate(() => {
      const line = [...document.querySelectorAll('.cm-content .cm-line')].find((l) =>
        l.textContent.includes('# a comment here')
      );
      return line ? line.querySelectorAll('span').length : -1;
    });
  }

  await expect(page.locator('.cm-content')).toHaveAttribute('data-language', 'javascript');
  expect(await commentSpanCount()).toBe(0);

  await switchTo(page, 'Python');
  await expect(page.locator('.cm-content')).toHaveAttribute('data-language', 'python');
  expect(await commentSpanCount()).toBeGreaterThan(0);
});

test('progress is tracked separately per language for colliding ids', async ({ page }) => {
  // Both languages have a problem with id 1.
  await page.locator('.cm-content').click();
  await page.keyboard.press('Control+End');
  await page.keyboard.type('\nlet doubled = oneToFive.map(n => n * 2);\nconsole.log(doubled);');
  await page.getByRole('button', { name: 'Check answer' }).click();
  await expect(page.locator('.done-checkmark')).toBeVisible();

  await switchTo(page, 'Python');
  // Python problem 1 shares the id but must not inherit the completion.
  await expect(page.locator('.done-checkmark')).toBeHidden();

  await switchTo(page, 'JavaScript');
  await expect(page.locator('.done-checkmark')).toBeVisible();
});

test('in-session drafts do not leak between languages sharing an id', async ({ page }) => {
  const marker = 'const jsOnlyDraft = 1;';
  await page.locator('.cm-content').click();
  await page.keyboard.press('Control+End');
  await page.keyboard.type(`\n${marker}`);
  await expect(page.locator('.cm-content')).toContainText(marker);

  await switchTo(page, 'Python');
  await expect(page.locator('.cm-content')).not.toContainText(marker);
  await expect(page.locator('.cm-content')).toContainText('the quick brown fox');

  await switchTo(page, 'JavaScript');
  await expect(page.locator('.cm-content')).toContainText(marker);
});

test('a ?lang= deep link opens the right language and problem', async ({ page }) => {
  await page.goto('/?lang=python&exercise=11');

  await expect(trigger(page)).toHaveText(/Python/);
  await expect(page.getByText(/Problem 11$/)).toBeVisible();
});

test('an unknown ?lang= falls back to JavaScript instead of blanking the page', async ({ page }) => {
  await page.goto('/?lang=rust');

  await expect(trigger(page)).toHaveText(/JavaScript/);
  await expect(position(page)).toHaveText('1 / 140');
});

test('achievements swap to the Python tag set and its docs links', async ({ page }) => {
  await switchTo(page, 'Python');
  await page.getByLabel('View profile').click();

  await expect(page.getByText('Click any badge to view its Python docs documentation.')).toBeVisible();
  await expect(page.locator('.achievement-card-label', { hasText: 'list-comprehension' })).toBeVisible();
  await expect(page.locator('.achievement-card-label', { hasText: /^spread$/ })).toHaveCount(0);

  const link = page.locator('a.achievement-card').first();
  await expect(link).toHaveAttribute('href', /docs\.python\.org/);
});

test('the progress summary counts only the active language', async ({ page }) => {
  await switchTo(page, 'Python');
  await page.getByLabel('View profile').click();

  await expect(page.getByText(/0 \/ 9 problems completed/)).toBeVisible();
});

test('the hint links out to the Python docs for that problem\'s idiom', async ({ page }) => {
  await switchTo(page, 'Python');
  await page.getByRole('button', { name: /See hint/ }).click();

  const link = page.getByRole('link', { name: 'View on Python docs' });
  await expect(link).toBeVisible();
  // Derived from the problem's own tag, not stored per problem.
  await expect(link).toHaveAttribute(
    'href',
    'https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions'
  );
});

test('the same hint on a JavaScript problem still points at MDN', async ({ page }) => {
  await page.goto('/?exercise=21');
  await page.getByRole('button', { name: /See hint/ }).click();

  const link = page.getByRole('link', { name: 'View on MDN' });
  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute('href', /developer\.mozilla\.org/);
});

test('the function reference book icon shows the Python idioms doc, not the JS one', async ({ page }) => {
  await switchTo(page, 'Python');
  await page.getByRole('button', { name: 'Function reference docs' }).click();

  const modal = page.locator('dialog.modal').filter({ hasText: 'Python Idioms Reference' });
  await expect(modal).toBeVisible();
  await expect(modal).not.toContainText("JavaScript Reference");
  await expect(modal.locator('pre code').first()).toBeVisible();
});

test('the reference doc updates after switching languages, close then reopen', async ({ page }) => {
  // ReadmeModal is a single persistent instance for the whole session (not
  // remounted per open), so this only passes if its content is reactive to
  // the language store rather than computed once at initial mount.
  const openModal = () => page.getByRole('button', { name: 'Function reference docs' }).click();
  const closeModal = () => page.locator('dialog.modal[open]').getByLabel('Close').click();

  await openModal();
  await expect(page.locator('dialog.modal[open]')).toContainText("JavaScript Reference");
  await closeModal();

  await switchTo(page, 'Python');
  await openModal();
  await expect(page.locator('dialog.modal[open]')).toContainText('Python Idioms Reference');
  await closeModal();

  await switchTo(page, 'JavaScript');
  await openModal();
  await expect(page.locator('dialog.modal[open]')).toContainText("JavaScript Reference");
});
