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

  await expect(position(page)).toHaveText('1 / 36');
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
  await expect(position(page)).toHaveText('1 / 36');
});

// Pyodide's first load in a fresh browser context pays the real ~1-2s WASM +
// stdlib fetch cost (self-hosted from public/pyodide/, not mocked) — these
// assertions get a generous timeout rather than racing the default 5s.
const PYODIDE_TIMEOUT = { timeout: 20000 };

test('the Python runtime status shows next to Console while loading, then confirms once loaded', async ({ page }) => {
  await switchTo(page, 'Python');

  // "Console" and the status text share the .console-label class but differ
  // in tag (strong vs span), so scope by tag rather than relying on order.
  const status = page.locator('.console-header span.console-label');
  const header = page.locator('.console-header');

  // Not visible at all until a run is actually attempted.
  await expect(status).toHaveCount(0);

  const editor = page.locator('.cm-content');
  await editor.click();
  await page.keyboard.press('Control+End');
  await page.keyboard.type('\nprint(sentence)');
  await page.getByRole('button', { name: 'Run' }).click();

  await expect(status).toHaveText('Loading the Python runtime…');
  // Same line as "Console", not a line in the console log body.
  await expect(header).toContainText('Console');
  await expect(page.locator('.console-log')).not.toContainText('Loading the Python runtime');

  await expect(status).toHaveText('Python runtime loaded successfully', PYODIDE_TIMEOUT);

  // Running again must not flicker back to "loading" — the runtime is
  // already warm in the worker for the rest of the page session.
  await page.getByRole('button', { name: 'Run' }).click();
  await page.waitForTimeout(300);
  await expect(status).toHaveText('Python runtime loaded successfully');
});

test('the Python runtime status never shows on a JavaScript problem', async ({ page }) => {
  await page.getByRole('button', { name: 'Run' }).click();
  await expect(page.locator('.console-log')).not.toBeEmpty();
  await expect(page.locator('.console-header .console-label')).toHaveCount(1); // just "Console"
});

test('Run executes real Python and prints the actual result', async ({ page }) => {
  await switchTo(page, 'Python');

  const editor = page.locator('.cm-content');
  await editor.click();
  await page.keyboard.press('Control+End');
  await page.keyboard.type(
    '\nlong_words = [word for word in sentence.split() if len(word) > 4]\nprint(long_words)'
  );

  await page.getByRole('button', { name: 'Run' }).click();

  await expect(page.locator('.console-log')).toContainText('quick', PYODIDE_TIMEOUT);
  await expect(page.locator('.console-error')).toHaveCount(0);
});

test('Check answer passes a correct Python solution and marks it complete', async ({ page }) => {
  await switchTo(page, 'Python');

  const editor = page.locator('.cm-content');
  await editor.click();
  await page.keyboard.press('Control+End');
  // Problem 1's actual solution, from python-exercises.js.
  await page.keyboard.type(
    '\nlong_words = [word for word in sentence.split() if len(word) > 4]\nprint(long_words)'
  );

  await page.getByRole('button', { name: 'Check answer' }).click();

  await expect(page.getByText('Correct! That matches the expected output.')).toBeVisible(PYODIDE_TIMEOUT);
  await expect(page.locator('.done-checkmark')).toBeVisible();
});

test('Check answer fails an incorrect Python solution without crashing', async ({ page }) => {
  await switchTo(page, 'Python');

  const editor = page.locator('.cm-content');
  await editor.click();
  await page.keyboard.press('Control+End');
  await page.keyboard.type('\nprint([1, 2, 3])');

  await page.getByRole('button', { name: 'Check answer' }).click();

  await expect(page.getByText("Not quite — that doesn't match the expected output yet.")).toBeVisible(
    PYODIDE_TIMEOUT
  );
  await expect(page.locator('.done-checkmark')).toBeHidden();
});

test('a Python runtime error shows the real traceback, not a generic failure', async ({ page }) => {
  await switchTo(page, 'Python');

  const editor = page.locator('.cm-content');
  await editor.click();
  await page.keyboard.press('Control+End');
  await page.keyboard.type('\nprint(this_name_does_not_exist)');

  await page.getByRole('button', { name: 'Run' }).click();

  // A failed run also has no successful print to report, so a second
  // "no output" line follows the traceback — assert on the traceback
  // specifically rather than the console as a whole.
  await expect(page.locator('.console-error').first()).toContainText('NameError', PYODIDE_TIMEOUT);
  // ...and confirms the earlier fix: that follow-up message should read
  // print(...), not the JS sandbox's console.log(...) wording.
  await expect(page.locator('.console-error').last()).toContainText('print(...)');
});

test('the selected language survives a page reload', async ({ page }) => {
  await switchTo(page, 'Python');
  await page.reload();

  await expect(trigger(page)).toHaveText(/Python/);
  await expect(position(page)).toHaveText('1 / 36');
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

  await expect(page.getByText(/0 \/ 36 problems completed/)).toBeVisible();
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
