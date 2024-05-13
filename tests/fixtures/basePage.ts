import { test as base } from "@playwright/test";
import LoginPage from "../support/pageobjectmodel/pages/login.page";
import BoardsPage from "../support/pageobjectmodel/pages/boards.page";

export const test = base.extend<{ loginPage: LoginPage; boardsPage: BoardsPage }>
    ({
        //Define a fixture
        loginPage: async ({ page }, use) => {
            await use(new LoginPage(page));
        },
        boardsPage: async ({ page }, use) => {
            await use(new BoardsPage(page));
        },

    })