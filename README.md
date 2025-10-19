# 🎭 Paybo Automation Testing dengan Playwright

Automation testing project untuk Paybo menggunakan Playwright dengan struktur Page Object Model (POM) dan best practices.

## 📋 Prerequisites

- Node.js v16+ 
- npm atau yarn
- Git

## 🚀 Setup Instructions

### 1. Clone Repository
```bash
git clone <repository-url>
cd paybo-automation
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
```bash
# Buat file .env dari template
cp .env.example .env

# Edit .env dan masukkan credentials
# PAYBO_EMAIL=demo_psp3@mail.com
# PAYBO_PASSWORD=E8rP4qA3
```

### 4. Jalankan Test

**Jalankan semua test:**
```bash
npm test
```

**Jalankan test dengan UI mode (recommended):**
```bash
npm run test:ui
```

**Jalankan test dalam mode headed (browser visible):**
```bash
npm run test:headed
```

**Jalankan test dengan debug mode:**
```bash
npm run test:debug
```

**Lihat test report:**
```bash
npm run test:report
```

## 📁 Project Structure

```
paybo-automation/
├── tests/
│   ├── auth/
│   │   └── login.spec.js              # Test cases untuk login
│   ├── pages/
│   │   └── login.page.js              # Page Object Model
│   └── fixtures/
│       └── test.fixtures.js           # Shared fixtures & test data
├── playwright.config.js               # Playwright configuration
├── package.json
├── .env.example                       # Environment template
├── .gitignore
└── README.md
```

## 📝 Page Object Model Structure

## 🔧 Configuration

### playwright.config.js

**Key Configurations:**
- **testDir**: `./tests` - Lokasi test files
- **timeout**: 30 seconds per test
- **retries**: 0 pada local, 2 pada CI
- **workers**: Parallel execution di CI
- **reporters**: HTML, JSON, JUnit format
- **screenshot**: Hanya on failure
- **video**: Retain on failure

**Supported Browsers:**
- Chromium
- Firefox
- WebKit (Safari)

## 📊 Reports

Setelah test selesai, reports tersedia di:

- **HTML Report**: `playwright-report/index.html`
- **JSON Report**: `test-results/results.json`
- **JUnit Report**: `test-results/results.xml`

## 🔒 Security

- Credentials disimpan di `.env` (tidak di source code)
- `.env` di-exclude dari git via `.gitignore`
- Gunakan `process.env` untuk access credentials
- Jangan hardcode sensitive data

## 🛠️ Troubleshooting

### Error: Cannot find module 'dotenv'
```bash
npm install dotenv
```

### Playwright browser tidak terinstall
```bash
npx playwright install
```

### Timeout pada navigation
- Pastikan URL endpoint benar
- Cek network connectivity
- Increase timeout dalam config

### Selector tidak ditemukan
- Gunakan `npx playwright codegen` untuk generate selectors
- Inspect element di browser untuk verify selector

## 🚦 CI/CD Integration

Untuk GitHub Actions, tambahkan `.github/workflows/test.yml`:

```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
    test:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v3
            - uses: actions/setup-node@v3
                with:
                node-version: 18
            - run: npm ci
            - run: npm test
```

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Test API](https://playwright.dev/docs/api/class-test)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)

## 📧 Support

Untuk pertanyaan atau issues, buat issue di repository atau hubungi team QA.

---

**Created At**: October 2025
**Playwright Version**: v1.40.0+