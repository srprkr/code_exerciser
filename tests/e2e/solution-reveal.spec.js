import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

// daisyUI's .swap component visually overlays labeled <span> content on
// top of the actual checkbox, which intercepts pointer events aimed
// directly at the <input>. Click the wrapping <label> instead — that's
// how a real user interacts with it, and it correctly toggles the
// underlying checkbox via the native label/input association.
function toughItOutLabel(page) {
  return page.locator('.tough-it-out-toggle label.swap');
}

function toughItOutCheckbox(page) {
  return page.locator('.tough-it-out-toggle input[type="checkbox"]');
}

// daisyUI's .modal hides itself via opacity/pointer-events (not `display`),
// so Playwright's toBeHidden() heuristic doesn't reliably catch the closed
// state — the actual source of truth for a native <dialog> is its `open`
// attribute, which HTMLDialogElement.close() removes.
async function expectModalClosed(page) {
  await expect(page.locator('dialog.modal')).toHaveJSProperty('open', false);
}

test('solution block is hidden by default', async ({ page }) => {
  await expect(page.locator('.solution-block')).toBeHidden();
});

test('toggling "see solution" for the first time opens the look-it-up confirmation modal instead of revealing immediately', async ({ page }) => {
  await toughItOutLabel(page).click();

  const modal = page.locator('dialog.modal');
  await expect(modal).toBeVisible();
  await expect(page.locator('.solution-block')).toBeHidden();

  // The toggle itself should have snapped back to unchecked since the
  // modal hasn't been confirmed yet.
  await expect(toughItOutCheckbox(page)).not.toBeChecked();
});

test('confirming "Show me the solution" reveals the solution block and closes the modal', async ({ page }) => {
  await toughItOutLabel(page).click();
  await page.getByRole('button', { name: 'Show me the solution' }).click();

  await expectModalClosed(page);
  await expect(page.locator('.solution-block')).toBeVisible();
  await expect(toughItOutCheckbox(page)).toBeChecked();
});

test('canceling "Keep toughing it out" closes the modal without revealing the solution', async ({ page }) => {
  await toughItOutLabel(page).click();
  await page.getByRole('button', { name: 'Keep toughing it out' }).click();

  await expectModalClosed(page);
  await expect(page.locator('.solution-block')).toBeHidden();
  await expect(toughItOutCheckbox(page)).not.toBeChecked();
});

test('checking "don\'t ask again" skips the modal on future reveals within the session', async ({ page }) => {
  await toughItOutLabel(page).click();
  await page.locator('.modal-dismiss input[type="checkbox"]').check();
  await page.getByRole('button', { name: 'Show me the solution' }).click();
  await expect(page.locator('.solution-block')).toBeVisible();

  // Toggle off, then back on for the SAME exercise — should skip the modal now.
  await toughItOutLabel(page).click();
  await expect(page.locator('.solution-block')).toBeHidden();

  await toughItOutLabel(page).click();
  await expectModalClosed(page);
  await expect(page.locator('.solution-block')).toBeVisible();
});

test('solution visibility resets when navigating to the next exercise', async ({ page }) => {
  await toughItOutLabel(page).click();
  await page.getByRole('button', { name: 'Show me the solution' }).click();
  await expect(page.locator('.solution-block')).toBeVisible();

  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.locator('.solution-block')).toBeHidden();
  await expect(toughItOutCheckbox(page)).not.toBeChecked();
});

test('a correct Check answer reveals the solution automatically, without peeking first', async ({ page }) => {
  await expect(page.locator('.solution-block')).toBeHidden();

  const editor = page.locator('.cm-content');
  await editor.click();
  await page.keyboard.press('Control+End');
  await page.keyboard.type('\nlet doubled = oneToFive.map(n => n * 2);\nconsole.log(doubled);');
  await page.getByRole('button', { name: 'Check answer' }).click();

  await expect(page.locator('.check-result')).toHaveClass(/check-pass/);
  await expect(page.locator('.solution-block')).toBeVisible();

  // Since the pass happened without peeking first, it should still count
  // toward completion — the message should NOT contain the "won't count"
  // caveat, and the done checkmark should be showing.
  await expect(page.locator('.check-result')).not.toContainText("won't count");
  await expect(page.locator('.done-checkmark')).toBeVisible();
});

test('peeking at the solution before passing still shows correct, but does not count toward completion', async ({ page }) => {
  await toughItOutLabel(page).click();
  await page.getByRole('button', { name: 'Show me the solution' }).click();
  await expect(page.locator('.solution-block')).toBeVisible();

  const editor = page.locator('.cm-content');
  await editor.click();
  await page.keyboard.press('Control+End');
  await page.keyboard.type('\nlet doubled = oneToFive.map(n => n * 2);\nconsole.log(doubled);');
  await page.getByRole('button', { name: 'Check answer' }).click();

  await expect(page.locator('.check-result')).toHaveClass(/check-pass/);
  await expect(page.locator('.check-result')).toContainText("won't count");
  await expect(page.locator('.done-checkmark')).not.toBeVisible();
});

test('the solution <details> disclosure opens and closes independently once revealed', async ({ page }) => {
  await toughItOutLabel(page).click();
  await page.getByRole('button', { name: 'Show me the solution' }).click();

  const details = page.locator('.solution-block details');
  await expect(details).toHaveJSProperty('open', true);

  await details.locator('summary').click();
  await expect(details).toHaveJSProperty('open', false);
});
