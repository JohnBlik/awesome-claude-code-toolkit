// Playwright smoke test for the freelancer portfolio.
// Covers: rendering, accessibility, navigation interactions, portfolio modal,
// pricing toggle, testimonials carousel, contact form validation, mobile menu,
// reduced-motion fallback, and console-error monitoring.
import { chromium } from 'playwright';

const URL = process.env.SMOKE_URL ?? 'http://127.0.0.1:5173/';

const failures = [];
const consoleErrors = [];

function record(name, ok, info = '') {
  const status = ok ? 'PASS' : 'FAIL';
  console.log(`${status}  ${name}${info ? ' — ' + info : ''}`);
  if (!ok) failures.push(name);
}

const isResourceError = (text) =>
  /Failed to load resource|ERR_CERT|ERR_NAME_NOT_RESOLVED|ERR_INTERNET_DISCONNECTED|WebGL/i.test(text);

const browser = await chromium.launch();
try {
  const ctx = await browser.newContext({
    viewport: { width: 1366, height: 820 },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();

  page.on('console', (msg) => {
    if (msg.type() !== 'error') return;
    const text = msg.text();
    if (isResourceError(text)) return;
    consoleErrors.push(text);
  });
  page.on('pageerror', (err) => consoleErrors.push(`pageerror: ${err.message}`));

  const resp = await page.goto(URL, { waitUntil: 'networkidle', timeout: 30_000 });
  record('Loads index', resp?.ok() ?? false, `status=${resp?.status()}`);

  await page.waitForTimeout(1700);

  // Title + skip link
  record('Document title set', /lukas voss/i.test(await page.title()), await page.title());
  record(
    'Skip link exists',
    (await page.getByRole('link', { name: /skip to content/i }).count()) > 0
  );

  // Hero
  const h1 = await page.getByRole('heading', { level: 1 }).first().innerText();
  record('Hero h1 renders', /design.*build/i.test(h1));

  // Typewriter visible (gradient text inside h1)
  await page.waitForTimeout(900);
  const h1After = await page.getByRole('heading', { level: 1 }).first().innerText();
  record(
    'Typewriter is producing text',
    h1After.length >= h1.length || h1After.length > 20,
    `len=${h1After.length}`
  );

  // Sections visible
  for (const id of ['about', 'services', 'portfolio', 'process', 'testimonials', 'pricing', 'contact']) {
    await page.locator(`section#${id}`).scrollIntoViewIfNeeded({ timeout: 8000 }).catch(() => {});
    await page.waitForTimeout(350);
    const visible = await page.locator(`section#${id}`).first().isVisible().catch(() => false);
    record(`Section #${id} visible`, visible);
  }

  // About skill bars rendered
  await page.locator('section#about').scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  const skillsCount = await page.locator('section#about').getByText(/%/).count();
  record('About skill bars rendered', skillsCount >= 4, `count=${skillsCount}`);

  // Portfolio filter + modal
  await page.locator('section#portfolio').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  const portfolioSection = page.locator('section#portfolio');
  const webAppFilter = portfolioSection.getByRole('button', { name: 'Web app', exact: true });
  if ((await webAppFilter.count()) > 0) {
    await webAppFilter.first().click();
    await page.waitForTimeout(450);
    record(
      'Portfolio filter clickable',
      (await webAppFilter.first().getAttribute('aria-pressed')) === 'true'
    );
    await portfolioSection.getByRole('button', { name: 'All', exact: true }).click();
    await page.waitForTimeout(300);
  } else {
    record('Portfolio filter clickable', false);
  }

  const firstCard = page.locator('section#portfolio button[aria-label^="Open project"]').first();
  if ((await firstCard.count()) > 0) {
    await firstCard.click();
    await page.waitForTimeout(600);
    const dialog = page.getByRole('dialog');
    record('Portfolio modal opens', (await dialog.count()) > 0);

    await page.keyboard.press('Escape');
    // Wait beyond AnimatePresence exit (~300ms) plus buffer
    await page.waitForTimeout(1200);
    record('Portfolio modal closes via Escape', (await dialog.count()) === 0);
  } else {
    record('Portfolio modal opens', false);
  }

  // Testimonials carousel — click next, verify the active tab changed
  await page.locator('section#testimonials').scrollIntoViewIfNeeded();
  await page.waitForTimeout(450);
  const nextBtn = page.getByRole('button', { name: /next testimonial/i });
  const tabsSel = 'section#testimonials [role="tab"]';
  if ((await nextBtn.count()) > 0) {
    const findActive = async () => {
      const tabs = await page.locator(tabsSel).all();
      for (let i = 0; i < tabs.length; i++) {
        if ((await tabs[i].getAttribute('aria-selected')) === 'true') return i;
      }
      return -1;
    };
    const beforeIdx = await findActive();
    await nextBtn.click();
    await page.waitForTimeout(900);
    const afterIdx = await findActive();
    record(
      'Testimonials carousel advances',
      afterIdx !== beforeIdx && afterIdx !== -1,
      `before=${beforeIdx} after=${afterIdx}`
    );
  } else {
    record('Testimonials carousel advances', false);
  }

  // Pricing toggle
  await page.locator('section#pricing').scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const monthlyBtn = page.getByRole('tab', { name: /monthly retainer/i });
  if ((await monthlyBtn.count()) > 0) {
    await monthlyBtn.click();
    await page.waitForTimeout(350);
    record('Pricing monthly toggle', (await monthlyBtn.getAttribute('aria-selected')) === 'true');
  } else {
    record('Pricing monthly toggle', false);
  }

  // Contact form validation
  await page.locator('section#contact').scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const sendBtn = page.getByRole('button', { name: /send message/i });
  if ((await sendBtn.count()) > 0) {
    await sendBtn.click();
    await page.waitForTimeout(250);
    const hasError = (await page.getByText(/Please share your name/i).count()) > 0;
    record('Contact form shows validation errors', hasError);

    // Fill correctly and submit
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="message"]', 'Hello, I would like to discuss a project.');
    await sendBtn.click();
    await page.waitForTimeout(400);
    const success = (await page.getByText(/message on the way/i).count()) > 0;
    record('Contact form submits successfully', success);
  } else {
    record('Contact form submits successfully', false);
  }

  // Theme toggle
  const themeBtn = page.getByRole('button', { name: /switch to light mode/i });
  if ((await themeBtn.count()) > 0) {
    const before = await page.locator('html').getAttribute('class');
    await themeBtn.first().click();
    await page.waitForTimeout(250);
    const after = await page.locator('html').getAttribute('class');
    record('Theme toggle changes html class', before !== after, `${before} -> ${after}`);
  } else {
    record('Theme toggle changes html class', false);
  }

  // Mobile menu
  const mctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    deviceScaleFactor: 2,
  });
  const mpage = await mctx.newPage();
  mpage.on('pageerror', (err) => consoleErrors.push(`mobile pageerror: ${err.message}`));
  await mpage.goto(URL, { waitUntil: 'networkidle' });
  await mpage.waitForTimeout(1700);
  const menuBtn = mpage.getByRole('button', { name: /open menu/i });
  if ((await menuBtn.count()) > 0) {
    await menuBtn.first().click();
    await mpage.waitForTimeout(400);
    const closeBtn = mpage.getByRole('button', { name: /close menu/i });
    record('Mobile menu opens', (await closeBtn.count()) > 0);
  } else {
    record('Mobile menu opens', false);
  }
  await mctx.close();

  // Reduced motion
  const ctx2 = await browser.newContext({
    viewport: { width: 1366, height: 820 },
    reducedMotion: 'reduce',
  });
  const page2 = await ctx2.newPage();
  page2.on('pageerror', (err) => consoleErrors.push(`reduced-motion pageerror: ${err.message}`));
  const r2 = await page2.goto(URL, { waitUntil: 'networkidle' });
  record('Reduced-motion variant loads', r2?.ok() ?? false);
  await page2.waitForTimeout(1700);
  const h1Reduced = await page2.getByRole('heading', { level: 1 }).count();
  record('Reduced-motion variant renders hero', h1Reduced > 0);
  await ctx2.close();

  // Screenshots
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(400);
  await page.screenshot({ path: '/tmp/portfolio-hero.png' });
  await page.screenshot({ path: '/tmp/portfolio-full.png', fullPage: true });
  console.log('Screenshots saved: /tmp/portfolio-hero.png, /tmp/portfolio-full.png');

  record(
    'No JS console errors',
    consoleErrors.length === 0,
    consoleErrors.slice(0, 3).join(' | ')
  );
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
