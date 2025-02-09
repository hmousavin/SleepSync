import { test, expect } from '@playwright/test';

test.fixme('User can add a sleep log', async ({ page }) => {
    await page.goto('/sleep-logs');
  
    await page.fill('input[name="sleep_start"]', '2025-02-05T22:00');
    await page.fill('input[name="sleep_end"]', '2025-02-06T06:00');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('.sleep-log-item')).toContainText('8 hours');
});