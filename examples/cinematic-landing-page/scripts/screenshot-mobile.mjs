import { chromium, devices } from 'playwright';

const URL = process.env.SMOKE_URL ?? 'http://127.0.0.1:5173/';

const browser = await chromium.launch();
try {
  const ctx = await browser.newContext({
    ...devices['iPhone 14 Pro'],
  });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1600);
  await page.screenshot({ path: '/tmp/landing-mobile-hero.png' });
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight / 2 }));
  await page.waitForTimeout(800);
  await page.screenshot({ path: '/tmp/landing-mobile-mid.png' });
  console.log('Saved /tmp/landing-mobile-hero.png and /tmp/landing-mobile-mid.png');
} finally {
  await browser.close();
}
