import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Problem 21 is one of the few with a hint.
  await page.goto('/?exercise=21');
});

test('the hint popover has a dimmed backdrop behind it', async ({ page }) => {
  await page.getByRole('button', { name: /See hint/ }).click();

  const backdropColor = await page.evaluate(() => {
    const popover = document.querySelector('.hint-popover');
    return getComputedStyle(popover, '::backdrop').backgroundColor;
  });

  expect(backdropColor).toBe('rgba(0, 0, 0, 0.5)');
});

test('the close button dismisses the hint without overlapping its text', async ({ page }) => {
  await page.getByRole('button', { name: /See hint/ }).click();
  const popover = page.locator('.hint-popover');
  await expect(popover).toBeVisible();

  const closeButton = popover.getByRole('button', { name: 'Close' });
  const closeBox = await closeButton.boundingBox();
  const popoverBox = await popover.boundingBox();

  // The close button must sit fully inside the popover's own bounds —
  // guards the reserved right-padding that keeps it clear of the hint text.
  expect(closeBox.x).toBeGreaterThanOrEqual(popoverBox.x);
  expect(closeBox.x + closeBox.width).toBeLessThanOrEqual(popoverBox.x + popoverBox.width);

  await closeButton.click();
  await expect(popover).toBeHidden();
});

test('clicking outside the hint dismisses it too (native popover light-dismiss)', async ({ page }) => {
  await page.getByRole('button', { name: /See hint/ }).click();
  await expect(page.locator('.hint-popover')).toBeVisible();

  await page.mouse.click(10, 10);
  await expect(page.locator('.hint-popover')).toBeHidden();
});

// Handled explicitly in ExerciseHint.svelte rather than left to the native
// popover's own Escape-dismiss — that's spec'd behavior, but not every
// browser/embedded Chromium build (e.g. VS Code's Simple Browser) implements
// it, so this is a real behavior this component owns, not just a native freebie.
test('Escape dismisses the hint', async ({ page }) => {
  await page.getByRole('button', { name: /See hint/ }).click();
  await expect(page.locator('.hint-popover')).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(page.locator('.hint-popover')).toBeHidden();
});
