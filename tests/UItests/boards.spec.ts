import { test } from "../fixtures/basePage";
import { expect } from "@playwright/test";

test("add new board to profile", async ({loginPage, boardsPage}) => {
    await loginPage.goto();
    await boardsPage.createBasicBoard("My new basic Board")
})

test("Delete new board", async ({ loginPage, boardsPage }) => {
    await loginPage.goto();
    await boardsPage.deleteExistingBoard("My new basic Board")
})