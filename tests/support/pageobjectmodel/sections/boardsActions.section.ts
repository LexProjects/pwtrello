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
    boardTile = (boardName) => this.page.getByTitle(boardName).first();
    boardButton = (boardTitle) => this.page.getByRole('listitem').filter({hasText: boardTitle})
    boardMenu = (boardTitle) => this.page.locator('li').filter({ hasText: boardTitle }).getByLabel('Board actions menu');
    closeBoardOption = () => this.page.getByLabel('Close board');
    confirmCloseBoard = () => this.page.getByTestId('popover-close-board-confirm');
    permaDelBoard = () => this.page.getByTestId('close-board-delete-board-button');
    confirmPermaDelBoard = () => this.page.getByTestId('close-board-delete-board-confirm-button');
    viewClosedBoardsButton =() => this.page.getByRole('button', { name: 'View all closed boards' });
    noClosedBoardsMsg = () => this.page.getByTestId('no-boards-to-reopen');
    reopenBoardBtn = () => this.page.getByTestId('workspace-chooser-trigger-button');
    confirmReopenBtn =() => this.page.getByTestId('workspace-chooser-reopen-button');

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

    public async clickExistingBoard(boardName) {
        await this.boardTile(boardName).click();
    }

    public async clickBoardButton(boardTitle) {
        await this.boardButton(boardTitle).click();
    }

    public async clickBoardMenu(boardTitle) {
        await this.boardMenu(boardTitle).click();
    }

    public async clickCloseBoardOption() {
        await this.closeBoardOption().click();
    }

    public async clickConfirmClose() {
        await this.confirmCloseBoard().click();
    }

    public async clickPermanentlyDeleteBoard() {
        await this.permaDelBoard().click();
    }

    public async clickConfirmPermaDelete() {
        await this.confirmPermaDelBoard().click();
    }

    public async clickViewClosedBoardsButton() {
        await this.viewClosedBoardsButton().click();
    }

    public async clickReopenClosedBoardBtn(){
        await this.reopenBoardBtn().click();
    }

    public async clickConfirmReopenClosedBoardBtn(){
        await this.confirmReopenBtn().click();
    }

    //Assertions

    public async assertBoardName(boardName) {
        await expect(this.boardnameDisplay()).toHaveText(boardName);
    }
    
    public async assertNoClosedBoardsMsg(msg){
        await expect(this.noClosedBoardsMsg()).toContainText(msg);
    }
}