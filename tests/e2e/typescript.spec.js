import { expect, test } from '@playwright/test';
import { exercises } from '../../src/lib/data/typescript-exercises.js';

// Derived from the data so each new batch of ported problems doesn't break it.
const TOTAL = exercises.length;

const trigger = (page) => page.getByRole('button', { name: 'Select programming language' });
const position = (page) => page.getByText(/^\d+ \/ \d+$/);
const heading = (page) => page.locator('.exercise-title');

// The compiler is a real ~1MB download on first use in a fresh browser
// context (not mocked), so its first run gets a generous timeout.
const COMPILER_TIMEOUT = { timeout: 20000 };

async function switchToTypeScript(page) {
  await trigger(page).click();
  await page.getByRole('option', { name: 'TypeScript (Beta)' }).click();
  await page.mouse.move(5, 5);
  await expect(trigger(page)).toHaveText(/TypeScript/);
}

// Types below the locked sample data. One statement per line with no
// leading indentation, since CodeMirror auto-indents after each newline.
async function typeSolution(page, lines) {
  await page.locator('.cm-content').click();
  await page.keyboard.press('Control+End');
  await page.keyboard.type(lines.join('\n'));
}

// Problem -9's solution, typed and not.
const TYPED_TOTAL = [
  'function orderTotal(subtotal: number, shipping: number) { return subtotal + shipping; }',
  'console.log(orderTotal(Number(subtotalInput), Number(shippingInput)));'
];
const UNTYPED_TOTAL = [
  'function orderTotal(subtotal, shipping) { return subtotal + shipping; }',
  'console.log(orderTotal(Number(subtotalInput), Number(shippingInput)));'
];

test('the ten intro problems end on a round 10 / 30 at problem 0', async ({ page }) => {
  await page.goto('/?lang=typescript&exercise=0');
  await expect(heading(page)).toHaveText('Intro Problem 0');
  await expect(position(page)).toHaveText(`10 / ${TOTAL}`);
});

test('switching to TypeScript opens on the first intro problem, clearly labelled', async ({ page }) => {
  await page.goto('/');
  await switchToTypeScript(page);

  await expect(position(page)).toHaveText(`1 / ${TOTAL}`);
  await expect(heading(page)).toHaveText('Intro Problem -9');
  await expect(page.locator('.exercise .tags .badge', { hasText: /^intro$/ })).toBeVisible();
  await expect(page.locator('#function-filters .pill').first()).toHaveText('types');
});

test('the intro problems lead into the ported JavaScript problems, which drop the intro label', async ({ page }) => {
  await page.goto('/?lang=typescript&exercise=0');
  await expect(heading(page)).toHaveText('Intro Problem 0');

  await page.getByRole('button', { name: 'Next (→)' }).click();
  await expect(heading(page)).toHaveText('Problem 1');
  await expect(page.locator('.exercise .tags .badge', { hasText: /^intro$/ })).toHaveCount(0);
});

test('a ported problem shows its TypeScript sample data', async ({ page }) => {
  await page.goto('/?lang=typescript&exercise=20');
  await expect(heading(page)).toHaveText('Problem 20');
  await expect(page.locator('.cm-content')).toContainText('interface Product');
  await expect(page.locator('.cm-content')).toContainText('const bag: Product[]');
});

test('right output with type errors fails the check and says why', async ({ page }) => {
  await page.goto('/');
  await switchToTypeScript(page);

  await typeSolution(page, UNTYPED_TOTAL);
  await page.getByRole('button', { name: 'Check answer' }).click();

  await expect(page.getByText('The output is right, but there are type errors to fix first — see the console.')).toBeVisible(
    COMPILER_TIMEOUT
  );
  await expect(page.locator('.console-error').first()).toContainText(
    /^Type error \(line \d+\): Parameter 'subtotal' implicitly has an 'any' type\./
  );
  // The code still ran — seeing the output helps, just like tsc emitting.
  await expect(page.locator('.console-log')).toContainText('45');
  await expect(page.locator('.done-checkmark')).toBeHidden();
});

test('a correctly typed solution passes, shows the compiler status, and saves TypeScript progress', async ({ page }) => {
  await page.goto('/');
  await switchToTypeScript(page);

  const status = page.locator('.console-header span.console-label');
  await typeSolution(page, TYPED_TOTAL);
  await page.getByRole('button', { name: 'Check answer' }).click();

  await expect(status).toHaveText('Loading the TypeScript compiler…');
  await expect(page.getByText('Correct! That matches the expected output.')).toBeVisible(COMPILER_TIMEOUT);
  await expect(status).toHaveText('TypeScript compiler loaded successfully');
  await expect(page.locator('.console-error')).toHaveCount(0);
  await expect(page.locator('.done-checkmark')).toBeVisible();

  // Tracked like any other problem, under its own language and its real id.
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('exerciseProgress')));
  expect(saved.typescript['-9']).toEqual({ attempted: true, completed: true });
  expect(saved.javascript?.['-9']).toBeUndefined();
});

test('completed intro problems appear in the profile progress list with their intro label', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() =>
    localStorage.setItem('exerciseProgress', JSON.stringify({ typescript: { '-9': { attempted: true, completed: true } } }))
  );
  await page.goto('/?lang=typescript');

  await page.getByRole('button', { name: /profile/i }).first().click();
  await page.getByRole('button', { name: 'Completed' }).click();
  await expect(page.locator('.progress-list-link')).toHaveText(/^Intro Problem -9: Form inputs arrive as strings/);
});

test('the final intro challenge keeps its hint, linking to the TypeScript Handbook by name', async ({ page }) => {
  await page.goto('/?lang=typescript&exercise=0');
  await page.getByRole('button', { name: /hint/i }).click();

  const link = page.getByRole('link', { name: 'View on TypeScript Handbook' });
  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute('href', /typescriptlang\.org\/docs\/handbook\/2\/narrowing\.html/);
  // Not a tutorial problem, so the solution toggle is still there.
  await expect(page.locator('.tough-it-out-toggle')).toBeVisible();
  await expect(page.locator('.tutorial')).toHaveCount(0);
});

test('an intro tutorial explains the concept and shows the solution and output up front', async ({ page }) => {
  await page.goto('/?lang=typescript&exercise=-9');

  const tutorial = page.locator('.tutorial');
  await expect(tutorial).toContainText('"405", not 45');
  // The JavaScript and TypeScript snippets are both syntax-highlighted.
  await expect(tutorial.locator('.tutorial-body pre.tutorial-code').first().locator('.tok-keyword').first()).toHaveText('function');

  const solution = tutorial.locator('.tutorial-solution-code');
  await expect(solution).toContainText('function orderTotal(subtotal: number, shipping: number)');
  await expect(solution.locator('.tok-typeName').first()).toHaveText('number');
  await expect(tutorial.locator('.tutorial-solution .output')).toHaveText('45');

  await expect(tutorial.getByRole('link', { name: 'Read more on the TypeScript Handbook' })).toHaveAttribute(
    'href',
    /typescriptlang\.org\/docs\/handbook\/2\/everyday-types\.html/
  );
});

test('an intro tutorial replaces the solution toggle, the hint and the solution panel', async ({ page }) => {
  await page.goto('/?lang=typescript&exercise=-9');
  await expect(page.locator('.tutorial')).toBeVisible();

  await expect(page.locator('.tough-it-out-toggle')).toHaveCount(0);
  await expect(page.locator('.hint-trigger')).toHaveCount(0);
  await expect(page.locator('.solution-block')).toHaveCount(0);

  // Still has to be typed out and checked in the editor to count.
  await expect(page.locator('.cm-content')).not.toContainText('orderTotal');
  await expect(page.locator('.done-checkmark')).toBeHidden();
});

test("the tutorial's solution can't be selected, so it gets typed rather than pasted", async ({ page }) => {
  await page.goto('/?lang=typescript&exercise=-9');
  const solution = page.locator('.tutorial-solution-code');
  await expect(solution).toHaveCSS('user-select', 'none');

  await solution.dblclick();
  expect(await page.evaluate(() => window.getSelection().toString())).toBe('');
});

test('tutorial code is readable in dark mode', async ({ page }) => {
  await page.goto('/?lang=typescript&exercise=-9');
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  // One Dark's keyword violet, not the light theme's #708.
  await expect(page.locator('.tutorial-solution-code .tok-keyword').first()).toHaveCSS('color', 'rgb(198, 120, 221)');
});
