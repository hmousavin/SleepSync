import { test, expect } from "@playwright/test";

const URL = "localhost";
const PORT = "5173";

const localEndpoint = `http://${URL}:${PORT}`;

test.describe("SleepSync Navigation Tests", () => {
    
    test("navigates to onboarding if an active not found", async ({ page }) => {
        await page.goto(localEndpoint);

        await expect(page).toHaveURL("/onboarding")
        await expect(page.locator("h1")).toHaveText("Let's Get Started!");
    });
    
    test("navigates to home if an active login found", async ({ page }) => {
        await page.goto(localEndpoint);

        await expect(page).toHaveURL("/")
        await expect(page.locator("h1")).toHaveText("Welcome back, User");
    });

    test("navigates to to sign-up by selecting that", async ({ page }) => {
        await page.goto(`${localEndpoint}/sign-up`);

        await expect(page).toHaveURL("/sign-up")
        await expect(page.locator("h1")).toHaveText("Create an account");
    });

    test("navigates to to sign-in by selecting that", async ({ page }) => {
        await page.goto(`${localEndpoint}/sign-in`);

        await expect(page).toHaveURL("/sign-in")
        await expect(page.locator("h1")).toHaveText("Welcome back");
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