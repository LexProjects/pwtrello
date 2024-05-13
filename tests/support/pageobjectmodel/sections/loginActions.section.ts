import { Page,expect } from "@playwright/test";

export default class LoginActions {
    page: Page;

    constructor(page: Page) {
        this.page = page
    }
    //Locators
    loginButton = () => this.page.getByTestId('bignav').getByRole('link', { name: 'Log in' });
    usernameTextbox = () => this.page.getByTestId('username');
    submitButton = () => this.page.locator('#login-submit');
    passwordTextbox = () => this.page.getByTestId('password');
    errorMessage = () => this.page.getByTestId('form-error--content');
    //Actions

    public async enterValidCredentials(email, password) {
        await this.loginButton().click(); 
        await expect(this.page).toHaveTitle('Log in to continue - Log in with Atlassian account');
        await this.usernameTextbox().fill(email);
        await expect(this.passwordTextbox()).toBeHidden();
        await this.submitButton().click(); 
        await this.passwordTextbox().fill(password);
        await this.submitButton().click(); 
    }

    public async enterInvalidCredentials(invalidEmail) {
        await this.loginButton().click(); 
        await expect(this.page).toHaveTitle('Log in to continue - Log in with Atlassian account');
        await this.usernameTextbox().fill(invalidEmail);
        await this.submitButton().click();
        await expect(this.passwordTextbox()).toBeHidden();
    }
    public async assertIncorrectLoginError(){
        await expect(this.errorMessage()).toBeVisible()
    }
}