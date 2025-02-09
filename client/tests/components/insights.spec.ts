import { test, expect } from '@playwright/test';

test.fixme('User can view insights', async ({ page }) => {
    await page.goto('/insights');
  
    await expect(page.locator('.insight-item')).toHaveCount(1);
});