import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: [['html', { outputFolder: 'playwright-report' }]],
  use: {
    browserName: 'chromium',
    launchOptions: {
        args: ['--ignore-certificate-errors']
    },
    headless: true,
    baseURL: 'http://127.0.0.1:5173', // Change this to your app URL
    viewport: { width: 1280, height: 720 },
  },
});
