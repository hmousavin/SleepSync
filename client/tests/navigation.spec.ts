import { test, expect } from "@playwright/test";

async function signUp(page) {
    await page.route('**/api/register', async route => {
        const jsonResponse = { success: true, token: "mocked_token", message: "Account created!" };
        route.fulfill({
          status: 200,
          body: JSON.stringify(jsonResponse),
        });
    });
    
    await page.goto(`/sign-up`);
    await page.fill('input[name="fullname"]', "John Doe");
    await page.fill('input[name="email"]', "johndoe@provider.com");
    await page.fill('input[name="password"]', "SecurePass123");
    await page.click('button:text("Create Account")');
}

async function login(page) {
    await page.context().addInitScript(() => {
        sessionStorage.setItem("authToken", "mocked_token");
    });
}

test.beforeEach(async ({ context }) => {
    await context.addInitScript(() => {
        sessionStorage.clear();
    });
});

test.describe("SleepSync Navigation Tests", () => {
    test("redirects to onboarding if no active session", async ({ page }) => {
        await page.goto("/");

        await expect(page).toHaveURL("/onboarding")
        await expect(page.locator("h1")).toHaveText("Let's Get Started!");
    });
    
    test("sign-up flow navigates to assessment", async ({ page }) => {
        await signUp(page);

        await page.waitForURL("/assessment");
    });

    test("redirects to home if logged in", async ({ page }) => {
        await login(page);
        
        await page.goto("/");

        await expect(page).toHaveURL("/")
        await expect(page.locator("h1")).toHaveText("Welcome back, User");
    });

    test.fixme("navigates to select alarm time when the user immediately push SleepNow", async ({ page }) => {
        await login(page);
        
        await page.goto("/assessment");
        await page.click('button:text("Complete Assessment")'); // Example action
        
        await expect(page).toHaveURL("/alarm-selection");
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

    test("404 page appears for invalid routes", async ({ page }) => {
        await page.goto("/nonexistentpage");
        await expect(page.locator("h1")).toHaveText("404 - Page Not Found");
    });
});