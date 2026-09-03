import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

// Regression test: CodeEditor's rebuild effect referenced the theme store
// as a bare expression (`theme;`) instead of reading its value (`$theme;`),
// which doesn't register as a reactive dependency in Svelte 5 — so toggling
// the theme alone never rebuilt the editor. The dark oneDark background/
// syntax colors only ever got applied as a side effect of switching
// exercises (which DID trigger a rebuild), and then stuck around
// permanently even after toggling back to light, since nothing ever
// rebuilt the editor again on a pure theme change.
test('toggling the theme alone updates the editor background, without switching exercises', async ({ page }) => {
  const editor = page.locator('.cm-editor');

  const lightBg = await editor.evaluate((el) => getComputedStyle(el).backgroundColor);

  await page.getByLabel('Toggle day/night theme').click();
  const darkBg = await editor.evaluate((el) => getComputedStyle(el).backgroundColor);
  expect(darkBg).not.toBe(lightBg);

  await page.getByLabel('Toggle day/night theme').click();
  const backToLightBg = await editor.evaluate((el) => getComputedStyle(el).backgroundColor);
  expect(backToLightBg).toBe(lightBg);
});

test('toggling to dark then switching exercises then back to light leaves no residual dark styling', async ({ page }) => {
  const editor = page.locator('.cm-editor');
  const lightBg = await editor.evaluate((el) => getComputedStyle(el).backgroundColor);

  await page.getByLabel('Toggle day/night theme').click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByLabel('Toggle day/night theme').click();

  const finalBg = await editor.evaluate((el) => getComputedStyle(el).backgroundColor);
  expect(finalBg).toBe(lightBg);
});

test('syntax highlighting colors change with the theme and stay consistent across exercise switches', async ({ page }) => {
  const token = page.locator('.cm-content [class*="ͼ"]').first();
  const lightColor = await token.evaluate((el) => getComputedStyle(el).color);

  await page.getByLabel('Toggle day/night theme').click();
  const darkColor = await token.evaluate((el) => getComputedStyle(el).color);
  expect(darkColor).not.toBe(lightColor);

  await page.getByRole('button', { name: 'Next' }).click();
  const darkColorAfterNext = await page.locator('.cm-content [class*="ͼ"]').first().evaluate((el) => getComputedStyle(el).color);
  expect(darkColorAfterNext).toBe(darkColor);

  await page.getByLabel('Toggle day/night theme').click();
  const backToLightColor = await page.locator('.cm-content [class*="ͼ"]').first().evaluate((el) => getComputedStyle(el).color);
  expect(backToLightColor).toBe(lightColor);
});
