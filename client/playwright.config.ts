import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    headless: true,
    baseURL: 'http://localhost:3000', // Change this to your app URL
    viewport: { width: 1280, height: 720 },
  },
  reporter: [['html', { outputFolder: 'playwright-report' }]],
});
