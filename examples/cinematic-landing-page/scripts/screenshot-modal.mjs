import { chromium } from 'playwright';

const URL = process.env.SMOKE_URL ?? 'http://127.0.0.1:5173/';

const browser = await chromium.launch();
try {
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1700);

  await page.locator('section#portfolio').scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: '/tmp/portfolio-grid.png' });

  const firstCard = page.locator('section#portfolio button[aria-label^="Open project"]').first();
  await firstCard.click();
  await page.waitForTimeout(700);
  await page.screenshot({ path: '/tmp/portfolio-modal.png' });

  await page.keyboard.press('Escape');
  await page.waitForTimeout(700);

  await page.locator('section#contact').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/contact.png' });

  console.log('Saved: /tmp/portfolio-grid.png, /tmp/portfolio-modal.png, /tmp/contact.png');
} finally {
  await browser.close();
}
