import { chromium, firefox, webkit } from '@playwright/test';

const engines = { chromium, firefox, webkit };

for (const [name, launcher] of Object.entries(engines)) {
  const browser = await launcher.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173');
  await page.waitForSelector('.cm-editor', { timeout: 10000 });

  const box = await page.locator('.code-editor').boundingBox();

  const startX = box.x + box.width - 5;
  const startY = box.y + box.height - 5;
  await page.mouse.move(startX, startY);
  await page.mouse.down();
  await page.mouse.move(startX, startY + 100, { steps: 10 });
  await page.mouse.up();
  await page.waitForTimeout(300);

  const boxAfter = await page.locator('.code-editor').boundingBox();

  console.log(`${name}: before=${box.width}x${box.height} after=${boxAfter.width}x${boxAfter.height} widthChanged=${box.width !== boxAfter.width} heightChanged=${box.height !== boxAfter.height}`);

  await browser.close();
}
