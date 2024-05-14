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

    public async createBasicBoard(boardName) {
        await this.BoardsActions.clickCreateBoardTile();
        await this.BoardsActions.enterBoardTitle(boardName);
        await this.BoardsActions.submitNewBoard();
        await this.BoardsActions.assertBoardName(boardName)
    }

    public async deleteExistingBoard(boardName) {
        await this.BoardsActions.clickExistingBoard(boardName);
        await this.BoardsActions.clickBoardMenu(boardName)
        await this.BoardsActions.clickCloseBoardOption();
        await this.BoardsActions.clickConfirmClose();
        await this.BoardsActions.permaDelBoard();
        await this.BoardsActions.confirmPermaDelBoard();
    }
} 