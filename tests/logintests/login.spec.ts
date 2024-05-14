import { test } from '../fixtures/basePage'
import { expect } from '@playwright/test';

test("Open homepage and verify title", async ({ page }) => {
    await page.goto('https://trello.com');
    await expect(page).toHaveTitle(/Trello/);
})

test("Login to trello using correct credentials", async ({ loginPage, boardsPage }) => {
    await loginPage.goto();
    await loginPage.loginUser("lextestprojects@gmail.com","Thispassword123!");
    await boardsPage.assertProfileInfo("lextestprojects@gmail.com");
})
test("Login to trello using incorrect email", async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.loginUser("lextestpro@gmail.com","Thispassword123!");
    await loginPage.assertIncorrectLogin()
})

test("Login to trello using invalid email", async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.useInvalidEmail("lextestprojects");
})

test("Login to trello using incorrect password", async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.loginUser("lextestpro@gmail.com","Thispassword123!!");
    await loginPage.assertIncorrectLogin()})