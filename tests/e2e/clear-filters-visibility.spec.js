import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Clear filters is hidden when no filters are active', async ({ page }) => {
  await expect(page.getByRole('button', { name: 'Clear filters' })).toHaveCount(0);
});

test('Clear filters appears once a function filter is selected, and hides again after clearing', async ({ page }) => {
  await page.getByRole('button', { name: 'map', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Clear filters' })).toBeVisible();

  await page.getByRole('button', { name: 'Clear filters' }).click();
  await expect(page.getByRole('button', { name: 'Clear filters' })).toHaveCount(0);
});

test('Clear filters appears once a difficulty filter is selected', async ({ page }) => {
  await page.getByRole('button', { name: 'easy', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Clear filters' })).toBeVisible();
});

test('deselecting the only active filter hides Clear filters again', async ({ page }) => {
  const mapPill = page.getByRole('button', { name: 'map', exact: true });
  await mapPill.click();
  await expect(page.getByRole('button', { name: 'Clear filters' })).toBeVisible();

  await mapPill.click(); // toggle back off
  await expect(page.getByRole('button', { name: 'Clear filters' })).toHaveCount(0);
});
