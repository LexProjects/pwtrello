import { expect, Page } from "@playwright/test";
import LoginActions from "../sections/loginActions.section";

export default class LoginPage
{
    page: Page;
    LoginActions:LoginActions;
    constructor(page: Page) {
        this.page = page
        this.LoginActions = new LoginActions(this.page);
    }

    //Variables
    // const loginTitle = "/Log in to continue - Log in with Atlassian account/"

    //Actions
    public async goto() {
        await this.page.goto("https://trello.com")
        await expect(this.page).toHaveTitle(/Trello/)

    }

    public async loginUser(email, password) {
        // const loginTitle = "/Log in to continue - Log in with Atlassian account/"
        await this.LoginActions.enterValidCredentials(email, password);
    }

    public async useInvalidEmail(invalidEmail){
        await this.LoginActions.enterInvalidCredentials(invalidEmail);
    }
    public async assertIncorrectLogin(){
        await this.LoginActions.assertIncorrectLoginError();
    }
} 