import { expect, Page } from "@playwright/test";
import BoardsActions from "../sections/boardsActions.section";

export default class BoardsPage {
    page: Page;
    BoardsActions:BoardsActions;
    constructor(page: Page) {
        this.page = page
        this.BoardsActions = new BoardsActions(this.page)
    }

    //Locators
    accountInfoSection = () => this.page.getByTestId('account-menu-account-section')

    //Actions

    public async assertProfileInfo(email) {
        await expect(this.page).toHaveTitle(/Boards | Trello/)
        await this.BoardsActions.clickAccountMenu();
        await expect(this.accountInfoSection()).toContainText(email);
    }
} 