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

    public async permanentlyDeleteBoard(boardTitle) {
        // await this.BoardsActions.clickExistingBoard(boardName);
        await this.BoardsActions.clickBoardButton(boardTitle);
        await this.BoardsActions.clickBoardMenu(boardTitle);
        await this.BoardsActions.clickCloseBoardOption();
        await this.BoardsActions.clickConfirmClose();
        await this.BoardsActions.clickPermanentlyDeleteBoard();
        await this.BoardsActions.clickConfirmPermaDelete();
    }


    public async DeleteBoard(boardTitle) {
        // await this.BoardsActions.clickExistingBoard(boardName);
        await this.BoardsActions.clickBoardButton(boardTitle);
        await this.BoardsActions.clickBoardMenu(boardTitle);
        await this.BoardsActions.clickCloseBoardOption();
        await this.BoardsActions.clickConfirmClose();
    }

    public async reopenDeletedBoard() {
        await this.BoardsActions.clickReopenClosedBoardBtn();
        await this.BoardsActions.clickConfirmReopenClosedBoardBtn();
    }

    //Assertions
    public async assertBoardName(boardName) {
        await this.BoardsActions.assertBoardName(boardName);
    }

    public async assertNoClosedBoards(msg) {
        await this.BoardsActions.clickViewClosedBoardsButton();
        await this.BoardsActions.assertNoClosedBoardsMsg(msg);
    }

} 