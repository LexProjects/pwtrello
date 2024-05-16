import { test } from "../../fixtures/basePage"

test("add new board to profile", async ({loginPage, boardsPage}) => {
    const randomNumber = Math.floor(Math.random() * 1000)
    const boardTitle = 'Board #' + randomNumber
    await loginPage.goto();
    await boardsPage.createBasicBoard(boardTitle)
})

test("Delete new board", async ({ loginPage, boardsPage }) => {
    const randomNumber = Math.floor(Math.random() * 1000)
    const boardTitle = 'Board #' + randomNumber
    await loginPage.goto();
    await boardsPage.createBasicBoard(boardTitle)
    await boardsPage.permanentlyDeleteBoard(boardTitle)
    await boardsPage.assertNoClosedBoards('No boards have been closed');
})

test("Reopen deleted board", async ({ loginPage, boardsPage }) => {
    const randomNumber = Math.floor(Math.random() * 1000)
    const boardTitle = 'Board #' + randomNumber
    await loginPage.goto();
    await boardsPage.createBasicBoard(boardTitle);
    await boardsPage.DeleteBoard(boardTitle)
    await boardsPage.reopenDeletedBoard();
    await boardsPage.assertBoardName(boardTitle);
})



