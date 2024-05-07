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
    await page.getByTestId('header-member-menu-button').click();
    await expect(page.getByTestId('account-menu-account-section')).toContainText('lextestprojects@gmail.com');
})

test("Login to trello using incorrect email", async ({page}) => {
    await page.goto('https://trello.com')
    await expect (page.getByTestId('bignav').getByRole('link', { name: 'Log in' })).toBeVisible();
    await page.getByTestId('bignav').getByRole('link', { name: 'Log in' }).click();
    await expect(page).toHaveTitle(/Log in to continue - Log in with Atlassian account/);
    await page.getByTestId('username').fill('lextestpro@gmail.com');
    await page.locator('#login-submit').click();
    await expect (page.getByTestId('password')).toBeVisible();
    await page.getByTestId('password').fill('Thispassword123!');
    await page.locator('#login-submit').click();
    await expect (page.getByTestId('form-error--content')).toHaveText('Incorrect email address and / or password. If you recently migrated your Trello account to an Atlassian account, you will need to use your Atlassian account password. Alternatively, you can get help logging in.');
})

test("Login to trello using invalid email", async ({page}) => {
    await page.goto('https://trello.com')
    await expect (page.getByTestId('bignav').getByRole('link', { name: 'Log in' })).toBeVisible();
    await page.getByTestId('bignav').getByRole('link', { name: 'Log in' }).click();
    await expect(page).toHaveTitle(/Log in to continue - Log in with Atlassian account/);
    await page.getByTestId('username').fill('lextestprojects');
    await page.locator('#login-submit').click();
    // page.on('dialog', async (alert) => {
    //     expect(alert.type()).toContain("alert")
    //     expect(alert.message()).toContain("2Gebruik een '@' in het e-mailadres. In 'lextestprojects' ontbreekt een'@'.")
    // })
    await expect (page.getByTestId('password')).toBeHidden();
})

test("Login to trello using incorrect password", async ({page}) => {
    await page.goto('https://trello.com')
    await expect (page.getByTestId('bignav').getByRole('link', { name: 'Log in' })).toBeVisible();
    await page.getByTestId('bignav').getByRole('link', { name: 'Log in' }).click();
    await expect(page).toHaveTitle(/Log in to continue - Log in with Atlassian account/);
    await page.getByTestId('username').fill('lextestprojects@gmail.com');
    await page.locator('#login-submit').click();
    await expect (page.getByTestId('password')).toBeVisible();
    await page.getByTestId('password').fill('Thispassword');
    await page.locator('#login-submit').click();
    await expect (page.getByTestId('form-error--content')).toHaveText('Incorrect email address and / or password. If you recently migrated your Trello account to an Atlassian account, you will need to use your Atlassian account password. Alternatively, you can get help logging in.');
})