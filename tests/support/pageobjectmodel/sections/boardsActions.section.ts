import { Page } from "@playwright/test";

export default class BoardsActions {
    page: Page;

    constructor(page: Page) {
        this.page = page
    }
    //Locators
    accountMenuButton = () => this.page.getByTestId('header-member-menu-button');
    //Actions
    public async clickAccountMenu() {
        await this.accountMenuButton().click()
    }

}