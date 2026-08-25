import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('profile page shows a hint that badges link to MDN', async ({ page }) => {
  await page.getByRole('button', { name: 'View profile' }).click();
  await expect(page.getByText('Click any badge to view its MDN documentation.')).toBeVisible();
});

test('each achievement badge with an MDN mapping links out to MDN in a new tab', async ({ page }) => {
  await page.getByRole('button', { name: 'View profile' }).click();
  const mapCard = page.locator('.achievement-card', { hasText: 'map' }).first();
  await expect(mapCard).toHaveAttribute('href', /developer\.mozilla\.org/);
  await expect(mapCard).toHaveAttribute('target', '_blank');
});

// The exercises page also has the (normally closed) look-it-up dialog in
// the DOM, so `dialog.modal` alone matches two elements — scope to the one
// containing the README's own heading text.
function readmeModal(page) {
  return page.locator('dialog.modal').filter({ hasText: "Deep Dive into JavaScript's Array Map function" });
}

test('the function reference docs button opens the README modal from the exercises page', async ({ page }) => {
  await page.getByRole('button', { name: 'Function reference docs' }).click();

  const modal = readmeModal(page);
  await expect(modal).toBeVisible();
});

test('the function reference docs button also opens the README modal from the profile page', async ({ page }) => {
  await page.getByRole('button', { name: 'View profile' }).click();
  await page.getByRole('button', { name: 'Function reference docs' }).click();

  const modal = readmeModal(page);
  await expect(modal).toBeVisible();
});

test('the README modal renders code blocks and closes via its close button', async ({ page }) => {
  await page.getByRole('button', { name: 'Function reference docs' }).click();
  const modal = readmeModal(page);

  await expect(modal.locator('pre code').first()).toBeVisible();

  await modal.getByLabel('Close').click();
  await expect(modal).toHaveJSProperty('open', false);
});
