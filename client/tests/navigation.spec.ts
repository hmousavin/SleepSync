import { test, expect } from "@playwright/test";

test.describe("SleepSync Navigation Tests", () => {
  
    test.fixme("navigates to home if an active login found", async ({ page }) => {
    });

    test.fixme("navigates to getting-started if an active login didn't found", async ({ page }) => {
    });

    test.fixme("navigates to to sign-up by selecting that", async ({ page }) => {
    });

    test.fixme("navigates to to sign-in by selecting that", async ({ page }) => {
    });

    test.fixme("navigates to check-up after sign-up", async ({ page }) => {
    });

    test.fixme("navigates to home after successfull login", async ({ page }) => {
    });

    test.fixme("navigates to select alarm time when the user immediately push SleepNow", async ({ page }) => {
    });

    test.fixme("navigates to sleeping after the alert is selected or skipped", async ({ page }) => {
        // the alarm, alarm sound, and sleep sound should be visible         
    });

    test.fixme("navigates to home after sleep is done and checking the mood", async ({ page }) => {
    });

    test.fixme("navigates to journal by selecting that", async ({ page }) => {
    });

    test.fixme("navigates to reports by selecting that", async ({ page }) => {
    });

//   test("navigates to to Settings and update preferences", async ({ page }) => {
//     await page.goto("http://localhost:3000");

//     // Navigate to Settings page
//     await page.locator('a[href="/settings"]').click();
    
//     // Verify that Settings page loads
//     await expect(page).toHaveURL(/.*settings/);
//     await expect(page.locator("h1")).toHaveText("Settings");

//     // Simulate a settings change
//     await page.locator('input[name="darkMode"]').check();
    
//     // Verify the toggle works
//     await expect(page.locator('input[name="darkMode"]')).toBeChecked();
//   });

//   test("should show 404 page for invalid routes", async ({ page }) => {
//     await page.goto("http://localhost:3000/nonexistentpage");

//     // Ensure a 404 or error message is displayed
//     await expect(page.locator("h1")).toHaveText("404 - Page Not Found");
//   });
});