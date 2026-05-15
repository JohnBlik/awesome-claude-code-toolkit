// Verifies that portfolio.html works when opened via file:// — same path
// the user will use when double-clicking the file.
import { chromium } from 'playwright';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const filePath = path.resolve(new URL('..', import.meta.url).pathname, 'portfolio.html');
const fileUrl = pathToFileURL(filePath).toString();
console.log(`Opening: ${fileUrl}`);

const failures = [];
const consoleErrors = [];
function record(name, ok, info = '') {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${info ? ' — ' + info : ''}`);
  if (!ok) failures.push(name);
}
const isResourceError = (text) =>
  /Failed to load resource|ERR_CERT|ERR_NAME_NOT_RESOLVED|ERR_FILE_NOT_FOUND|favicon|fonts\.googleapis|fonts\.gstatic|WebGL/i.test(
    text
  );

const browser = await chromium.launch();
try {
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 820 } });
  const page = await ctx.newPage();
  page.on('console', (msg) => {
    if (msg.type() !== 'error') return;
    if (isResourceError(msg.text())) return;
    consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => consoleErrors.push(`pageerror: ${err.message}`));

  const resp = await page.goto(fileUrl, { waitUntil: 'load', timeout: 30_000 });
  // file:// responses have no status code, but goto returns null on success — accept both
  record('Loads via file://', resp === null || resp.ok());
  await page.waitForTimeout(2000);

  record('Title set', /lukas voss/i.test(await page.title()), await page.title());

  const h1 = await page.getByRole('heading', { level: 1 }).first().innerText();
  record('Hero renders', /design.*build/i.test(h1), h1.replace(/\s+/g, ' '));

  // Hero snapshot before we start scrolling (Hero uses scroll-driven opacity)
  await page.screenshot({ path: '/tmp/single-file-hero.png' });

  // Verify each section renders
  for (const id of ['about', 'services', 'portfolio', 'process', 'testimonials', 'pricing', 'contact']) {
    await page.locator(`section#${id}`).scrollIntoViewIfNeeded({ timeout: 8000 }).catch(() => {});
    await page.waitForTimeout(250);
    record(`Section #${id} visible`, await page.locator(`section#${id}`).isVisible().catch(() => false));
  }

  // Open a portfolio modal
  await page.locator('section#portfolio').scrollIntoViewIfNeeded();
  const card = page.locator('section#portfolio button[aria-label^="Open project"]').first();
  if ((await card.count()) > 0) {
    await card.click();
    await page.waitForTimeout(500);
    record('Portfolio modal opens', (await page.getByRole('dialog').count()) > 0);
    await page.keyboard.press('Escape');
  }

  // Full-page snapshot
  await page.evaluate(() => window.scrollTo({ top: 0 }));
  await page.waitForTimeout(800);
  await page.screenshot({ path: '/tmp/single-file-full.png', fullPage: true });

  record('No JS console errors', consoleErrors.length === 0, consoleErrors.slice(0, 3).join(' | '));
} finally {
  await browser.close();
}

console.log('---');
console.log(`Failures: ${failures.length}`);
if (failures.length > 0) {
  console.log(failures.map((f) => ' - ' + f).join('\n'));
  process.exit(1);
} else {
  console.log('All checks passed.');
}
