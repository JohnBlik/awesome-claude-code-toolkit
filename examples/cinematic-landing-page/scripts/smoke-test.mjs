// Lightweight Playwright smoke test against the running dev server.
// Verifies: rendering, no console errors, navigation interactions, accessibility basics.
import { chromium } from 'playwright';

const URL = process.env.SMOKE_URL ?? 'http://127.0.0.1:5173/';

const errors = [];
const failures = [];

function record(name, ok, info = '') {
  const status = ok ? 'PASS' : 'FAIL';
  console.log(`${status}  ${name}${info ? ' — ' + info : ''}`);
  if (!ok) failures.push(name);
}

const browser = await chromium.launch();
try {
  const ctx = await browser.newContext({
    viewport: { width: 1366, height: 820 },
    deviceScaleFactor: 1,
    reducedMotion: 'no-preference',
  });
  const page = await ctx.newPage();

  // Only treat JS errors as fatal; network/resource errors are environment-dependent.
  const isResourceError = (text) =>
    /Failed to load resource|ERR_CERT|ERR_NAME_NOT_RESOLVED|ERR_INTERNET_DISCONNECTED/i.test(
      text
    );
  page.on('console', (msg) => {
    if (msg.type() !== 'error') return;
    const text = msg.text();
    if (isResourceError(text)) return;
    errors.push(text);
  });
  page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`));

  const resp = await page.goto(URL, { waitUntil: 'networkidle', timeout: 30_000 });
  record('Loads index', resp?.ok() ?? false, `status=${resp?.status()}`);

  // Wait past the loader
  await page.waitForTimeout(1500);

  // Skip-link present and reachable
  const skipLink = page.getByRole('link', { name: /skip to content/i });
  record('Skip-to-content link exists', (await skipLink.count()) > 0);

  // Hero
  const heroHeading = await page.getByRole('heading', { level: 1 }).first().innerText();
  record('Hero h1 renders', /speed of light/i.test(heroHeading), `text="${heroHeading.replace(/\s+/g, ' ')}"`);

  // Title is set
  const title = await page.title();
  record('Document title set', /aurora/i.test(title), title);

  // Each section anchor renders
  for (const id of ['features', 'stats', 'testimonials', 'pricing', 'faq']) {
    const sel = `section#${id}`;
    await page.locator(sel).scrollIntoViewIfNeeded({ timeout: 8000 }).catch(() => {});
    await page.waitForTimeout(400);
    const visible = await page.locator(sel).first().isVisible().catch(() => false);
    record(`Section #${id} visible`, visible);
  }

  // FAQ interaction
  await page.locator('section#faq').scrollIntoViewIfNeeded();
  const faqButtons = page.locator('section#faq button[aria-expanded]');
  const faqCount = await faqButtons.count();
  record('FAQ has multiple items', faqCount >= 3, `count=${faqCount}`);
  if (faqCount >= 2) {
    // Find a closed button first
    let toggled = false;
    for (let i = 0; i < faqCount; i++) {
      const btn = faqButtons.nth(i);
      const expanded = await btn.getAttribute('aria-expanded');
      if (expanded === 'false') {
        await btn.click();
        await page.waitForTimeout(450);
        const newExpanded = await btn.getAttribute('aria-expanded');
        record(`FAQ button ${i} toggles`, newExpanded === 'true');
        toggled = true;
        break;
      }
    }
    if (!toggled) record('FAQ button toggles', false, 'no closed item found');
  }

  // Pricing billing pill toggle
  await page.locator('section#pricing').scrollIntoViewIfNeeded();
  const monthlyBtn = page.getByRole('button', { name: 'Monthly' });
  await monthlyBtn.click();
  await page.waitForTimeout(300);
  const pressedMonthly = await monthlyBtn.getAttribute('aria-pressed');
  record('Pricing toggle to Monthly', pressedMonthly === 'true');

  // Theme toggle (light)
  const themeBtn = page.getByRole('button', { name: /switch to light mode/i });
  const themeBtnCount = await themeBtn.count();
  if (themeBtnCount > 0) {
    const htmlBefore = await page.locator('html').getAttribute('class');
    await themeBtn.first().click();
    await page.waitForTimeout(250);
    const htmlAfter = await page.locator('html').getAttribute('class');
    record(
      'Theme toggle changes html class',
      (htmlBefore?.includes('dark') ?? false) !== (htmlAfter?.includes('dark') ?? false),
      `${htmlBefore} -> ${htmlAfter}`
    );
    // Toggle back to dark
    const back = page.getByRole('button', { name: /switch to dark mode/i });
    if ((await back.count()) > 0) await back.first().click();
  } else {
    record('Theme toggle exists', false);
  }

  // Reduced motion run (re-render in reduced mode)
  const ctx2 = await browser.newContext({
    viewport: { width: 1366, height: 820 },
    reducedMotion: 'reduce',
  });
  const page2 = await ctx2.newPage();
  page2.on('pageerror', (err) => errors.push(`reduced-motion pageerror: ${err.message}`));
  const r2 = await page2.goto(URL, { waitUntil: 'networkidle' });
  record('Reduced-motion variant loads', r2?.ok() ?? false);
  await page2.waitForTimeout(1500);
  const reducedHero = await page2.getByRole('heading', { level: 1 }).count();
  record('Reduced-motion variant renders hero', reducedHero > 0);
  await ctx2.close();

  // Mobile viewport sanity
  const mctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    deviceScaleFactor: 2,
  });
  const mpage = await mctx.newPage();
  mpage.on('pageerror', (err) => errors.push(`mobile pageerror: ${err.message}`));
  const mr = await mpage.goto(URL, { waitUntil: 'networkidle' });
  record('Mobile variant loads', mr?.ok() ?? false);
  await mpage.waitForTimeout(1500);
  const menuBtn = mpage.getByRole('button', { name: /open menu/i });
  if ((await menuBtn.count()) > 0) {
    await menuBtn.first().click();
    await mpage.waitForTimeout(400);
    const closeBtn = mpage.getByRole('button', { name: /close menu/i });
    record('Mobile menu opens', (await closeBtn.count()) > 0);
  } else {
    record('Mobile menu button visible', false);
  }
  await mctx.close();

  // Screenshots
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(400);
  await page.screenshot({ path: '/tmp/landing-hero.png', fullPage: false });
  await page.screenshot({ path: '/tmp/landing-full.png', fullPage: true });
  console.log('Screenshots saved: /tmp/landing-hero.png, /tmp/landing-full.png');

  record('No console errors', errors.length === 0, errors.slice(0, 5).join(' | '));
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
