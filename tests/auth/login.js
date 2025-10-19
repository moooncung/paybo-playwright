import { test, expect } from '../../setupTests.js';
import LoginPage from '../pages/loginPage.js';

test.describe('Paybo Login Automation', () => {
  const EMAIL = process.env.PAYBO_EMAIL;
  const PASSWORD = process.env.PAYBO_PASSWORD;

  test.beforeEach(async ({ page }) => {
    console.log('🌐 Navigating to Paybo login page...');
    await page.goto('/login', { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(/login/);
    console.log('✅ Page loaded:', page.url());
  });

  test('TC001 - Login dengan credentials yang valid', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(EMAIL, PASSWORD);

    await expect(page).toHaveURL(/dashboard/);
    console.log('✅ Login berhasil - URL:', page.url());
  });

  test('TC002 - Verifikasi elemen di halaman login', async ({ page }) => {
    await expect(page.locator('input[name="email"], #username')).toBeVisible();
    await expect(
      page.locator('input[name="password"], #password')
    ).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();

    console.log('✅ Semua elemen di halaman login ditemukan');
  });

  test('TC003 - Login gagal dengan password salah', async ({ page }) => {
    console.log('📧 Memasukkan email:', EMAIL);
    await page.fill('input[name="email"]', EMAIL);

    console.log('🔑 Memasukkan password yang salah');
    await page.fill('input[name="password"]', 'wrongpassword123');

    console.log('✅ Klik tombol login');
    await page.click('button[type="submit"]');

    const errorMessage = page.locator(
      '[class*="error"], [role="alert"], .alert-danger'
    );
    await expect(errorMessage).toBeVisible({ timeout: 5000 });

    console.log('✅ Error message ditampilkan');
  });
});
