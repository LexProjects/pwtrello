import { test, expect } from '@playwright/test';

test("Open homepage and verify title", async ({ page }) => {
    await page.goto('https://trello.com');
    await expect(page).toHaveTitle(/Trello/);
})

test("Login to trello using correct credentials", async ({page}) => {
    await page.goto('https://trello.com')
    await expect (page.getByTestId('bignav').getByRole('link', { name: 'Log in' })).toBeVisible();
    await page.getByTestId('bignav').getByRole('link', { name: 'Log in' }).click();
    await expect(page).toHaveTitle(/Log in to continue - Log in with Atlassian account/);
    await page.getByTestId('username').fill('lextestprojects@gmail.com');
    await page.locator('#login-submit').click();
    await expect (page.getByTestId('password')).toBeVisible();
    await page.getByTestId('password').fill('Thispassword123!');
    await page.locator('#login-submit').click();
    await expect(page).toHaveTitle(/Boards | Trello/)
})