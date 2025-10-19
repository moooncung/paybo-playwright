// playwright.config.js
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './tests',
  testMatch: ['**/tests/**/*.js', '!**/tests/{pages,utils,fixtures}/**/*.js'],
  testIgnore: ['**/pages/**', '**/utils/**', '**/fixtures/**'],
  fullyParallel: false,
  workers: 1,
  reporter: [
    ['list'],
    ['html', { open: 'always' }], // generate folder "playwright-report"
  ],
  outputDir: 'test-results',

  use: {
    baseURL: 'https://bo-dev-p1.paybo.io',
    launchOptions: {
      args: [
        '--disable-blink-features=AutomationControlled',
        '--disable-features=IsolateOrigins,site-per-process',
        '--disable-site-isolation-trials',
        '--disable-web-security',
        '--no-sandbox',
      ],
      // headless: false,
    },
    ignoreHTTPSErrors: true,
    bypassCSP: true,
    contextOptions: { javaScriptEnabled: true },
    actionTimeout: 30000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    // { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
