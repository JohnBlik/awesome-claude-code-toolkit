import { chromium } from 'playwright';

const URL = process.env.SMOKE_URL ?? 'http://127.0.0.1:5173/';

const browser = await chromium.launch();
try {
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 820 } });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'load' });

  const metrics = await page.evaluate(() => {
    const navEntries = performance.getEntriesByType('navigation');
    const nav = navEntries[0];
    const fcp = performance.getEntriesByName('first-contentful-paint')[0];
    return {
      dom: nav ? nav.domContentLoadedEventEnd - nav.startTime : null,
      load: nav ? nav.loadEventEnd - nav.startTime : null,
      fcp: fcp ? fcp.startTime : null,
      transfer:
        performance
          .getEntriesByType('resource')
          .reduce((sum, r) => sum + (r.transferSize || 0), 0) +
        (nav ? nav.transferSize || 0 : 0),
    };
  });

  console.log('Performance metrics:');
  console.log(`  FCP            : ${metrics.fcp?.toFixed(0)} ms`);
  console.log(`  DOMContentLoaded: ${metrics.dom?.toFixed(0)} ms`);
  console.log(`  load           : ${metrics.load?.toFixed(0)} ms`);
  console.log(`  total transfer : ${(metrics.transfer / 1024).toFixed(1)} KB`);
} finally {
  await browser.close();
}
