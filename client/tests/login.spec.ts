import { test, expect } from '@playwright/test';

test('User can log in', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[name="email"]', 'john.doe@example.com');
    await page.fill('input[name="password"]', 'securePassword123');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/dashboard');
});
