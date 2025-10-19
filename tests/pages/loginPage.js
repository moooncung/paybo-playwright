export default class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = 'input[name="email"], #username';
    this.passwordInput = 'input[name="password"], #password';
    this.submitButton = 'button[type="submit"], input[type="submit"]';
    this.successMarker = '[href*="dashboard"], .dashboard';
    this.errorMarker = '.login-error, .alert-danger';
  }

  async goto() {
    console.log('🌐 Navigating to Paybo login page...');
    await this.page.goto('/login', { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForSelector(this.emailInput, { timeout: 10000 });
    console.log('✅ Page loaded:', await this.page.url());
  }

  async fillEmail(email) {
    await this.page.fill(this.emailInput, email);
  }

  async fillPassword(password) {
    await this.page.fill(this.passwordInput, password);
  }

  async submit() {
    await this.page.waitForSelector(this.submitButton, { timeout: 10000 });
    const btn = await this.page.$(this.submitButton);
    if (btn) {
      await Promise.all([
        this.page.waitForLoadState('networkidle'),
        btn.click(),
      ]);
    } else {
      await this.page.press(this.passwordInput, 'Enter');
    }
  }

  async login(
    email,
    password,
    { waitForSuccess = true, timeout = 15000 } = {}
  ) {
    await this.goto();
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.submit();

    if (waitForSuccess) {
      try {
        await Promise.race([
          this.page.waitForURL('**/dashboard**', { timeout }),
          this.page.waitForSelector(this.successMarker, { timeout }),
        ]);
      } catch (e) {
        console.warn(
          '⚠️ Tidak berhasil mendeteksi halaman dashboard:',
          e.message
        );
      }
    }
  }

  async hasLoginError() {
    return !!(await this.page.$(this.errorMarker));
  }
}
