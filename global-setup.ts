import { Browser, chromium, expect, Page } from "@playwright/test";

async function globalSetup() {
    const browser: Browser =await chromium.launch({ headless: false});
    const context = await browser.newContext();
    const page: Page =await context.newPage();
    await page.goto("https://trello.com");
    await page.getByTestId("bignav").getByRole("link", { name: "Log in" }).click();
    await page.getByTestId("username").fill("lextestprojects@gmail.com");
    await page.locator('#login-submit').click();
    await page.getByTestId('password').fill("Thispassword123!");
    await page.locator('#login-submit').click();
    await expect(page.getByTestId("header-member-menu-avatar")).toBeVisible({ timeout: 15000});
    

    //Save the state of the webpage 
    await page.context().storageState({ path: "./LoginAuth.json"});

    await browser.close();
}

export default globalSetup;