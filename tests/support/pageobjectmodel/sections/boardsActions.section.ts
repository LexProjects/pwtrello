import { Page, expect } from "@playwright/test";

export default class BoardsActions {
    page: Page;

    constructor(page: Page) {
        this.page = page
    }
    //Locators
    accountMenuButton = () => this.page.getByTestId("header-member-menu-button");
    createBoardTile = () => this.page.getByTestId("create-board-tile");
    createBoardTitle = () => this.page.getByTestId("create-board-title-input");

    submitBoardButton = () => this.page.getByTestId("create-board-submit-button");
    boardnameDisplay = () => this.page.getByTestId("board-name-display");
    boardTile = (boardName) => this.page.getByRole('link', { name: boardName });
    boardMenu = (boardName) => this.page.locator('li').filter({ hasText: boardName }).getByLabel('Board actions menu');
    closeBoardOption = () => this.page.getByLabel('Close board');
    confirmCloseBoard = () => this.page.getByTestId('popover-close-board-confirm');
    permaDelBoard = () => this.page.getByTestId('close-board-delete-board-button');
    confirmPermaDelBoard = () => this.page.getByTestId('close-board-delete-board-confirm-button');

    //Actions
    public async clickAccountMenu() {
        await this.accountMenuButton().click();
    }

    public async clickCreateBoardTile() {
        await this.createBoardTile().click();
    }

    public async enterBoardTitle(boardName) {
        await this.createBoardTitle().fill(boardName);
    }

    public async submitNewBoard() {
        await this.submitBoardButton().click();
    }

    public async assertBoardName(boardName) {
        await expect(this.boardnameDisplay()).toHaveText(boardName);
    }

    public async clickExistingBoard(boardName) {
        await this.boardTile(boardName).click();
    }

    public async clickBoardMenu(boardName) {
        await this.boardMenu(boardName).click();
    }

    public async clickCloseBoardOption() {
        await this.closeBoardOption().click();
    }

    public async clickConfirmClose() {
        await this.confirmCloseBoard().click();
    }

    public async permanentlyDeleteBoard() {
        await this.permaDelBoard().click();
    }

    public async clickConfirmPermaDelete() {
        await this.confirmPermaDelBoard().click();
    }
}