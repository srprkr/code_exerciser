import { expect, test } from '@playwright/test';

test('a logged Set shows like devtools and grades as an array of its values', async ({ page }) => {
  await page.goto('/?exercise=176');
  const editor = page.locator('.cm-content');
  await editor.click();
  await page.keyboard.press('Control+End');
  await page.keyboard.type('\nconsole.log(new Set(word));');

  await page.getByRole('button', { name: 'Check answer' }).click();

  // JSON alone would print {} for a Set.
  await expect(page.locator('.console-log')).toContainText('Set(4) {"m", "i", "s", "p"}');
  await expect(page.locator('.check-result')).toHaveClass(/check-pass/);
});

test('Set is a visible core pill while the async tags sit under "Show more"', async ({ page }) => {
  await page.goto('/');
  const pill = (name) => page.locator('#function-filters .pill', { hasText: new RegExp(`^${name}$`) });

  await expect(pill('Set')).toBeVisible();
  for (const tag of ['setTimeout', 'async-await', 'fetch']) {
    await expect(pill(tag)).toBeHidden();
  }

  await page.getByRole('button', { name: 'Show 9 more' }).click();
  for (const tag of ['setTimeout', 'async-await', 'fetch']) {
    await expect(pill(tag)).toBeVisible();
  }
});

test('the Array vs Set timing problem reliably finds Set faster in a real browser', async ({ page }) => {
  await page.goto('/?exercise=173');
  const editor = page.locator('.cm-content');
  await editor.click();
  await page.keyboard.press('Control+End');
  await page.keyboard.type(
    '\nlet t = performance.now(); lookups.filter(id => orderIds.includes(id)); const arrayMs = performance.now() - t;' +
      '\nt = performance.now(); const s = new Set(orderIds); lookups.filter(id => s.has(id)); const setMs = performance.now() - t;' +
      '\nconsole.log("Array: " + arrayMs.toFixed(1) + "ms");' +
      '\nconsole.log("Set: " + setMs.toFixed(1) + "ms");' +
      '\nconsole.log(setMs < arrayMs ? "Set" : "Array");'
  );

  await page.getByRole('button', { name: 'Check answer' }).click();
  await expect(page.locator('.check-result')).toHaveClass(/check-pass/);
  await expect(page.locator('.console-log')).toContainText(/Array: [\d.]+ms/);
});
