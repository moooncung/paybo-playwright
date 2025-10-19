import { test as base, expect } from '@playwright/test';

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.addInitScript(() => {
      try {
        Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
      } catch (e) {}

      try {
        // Hapus proteksi context menu
        Object.defineProperty(window, 'oncontextmenu', {
          get: () => null,
          set: () => {},
        });
      } catch (e) {}

      try {
        window.addEventListener(
          'keydown',
          function (e) {
            try {
              e.stopImmediatePropagation();
            } catch (er) {}
          },
          true
        );
      } catch (e) {}

      try {
        // Nonaktifkan alert / confirm / prompt
        window.alert = () => {};
        window.confirm = () => true;
        window.prompt = () => null;
      } catch (e) {}

      try {
        // Nonaktifkan console noisy functions (opsional)
        // Jangan matikan semuanya bila butuh debugging.
        console.log = () => {};
        console.warn = () => {};
        console.error = () => {};
      } catch (e) {}

      try {
        // Block attempts to close the window (some anti-devtool scripts call window.close())
        window.close = () => console.warn('[Bypass] window.close blocked');
      } catch (e) {}
    });

    // Attach helpful debugging listeners (optional)
    page.on('console', (msg) => console.log('🖥️ Console:', msg.text()));
    page.on('response', (res) => console.log('📡', res.status(), res.url()));
    page.on('requestfailed', (req) =>
      console.log('❌ FAILED:', req.url(), req.failure()?.errorText)
    );

    // Optionally set a stable user agent for all pages in this context (can also be done in config)
    // await page.context().setExtraHTTPHeaders({ 'User-Agent': '...custom UA...' });

    await use(page);
  },
});

export { expect };
