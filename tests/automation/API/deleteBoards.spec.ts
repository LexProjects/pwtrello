import { test, expect } from "@playwright/test";

const apiKey = process.env.API_KEY;
const apiToken = process.env.API_TOKEN

test.describe('delete existing board', () => {
    let boardId = "";
    test.beforeEach('Should delete board with retreived id', async ({ request }) => {
        const response = await request.get(`https://api.trello.com/1/members/me/boards/?key=${apiKey}&token=${apiToken}`)

        expect(response.status()).toBe(200)
        const respBody = JSON.parse(await response.text())
        if (respBody.length > 0) {
            boardId = respBody[0].id;
            console.log(" inside: ", boardId)
        } else {
            throw new Error('No boards found');
        }
    });

    test('Delete retreived board', async ({ request }) => {
        const response = await request.delete(`https://api.trello.com/1/boards/${boardId}?key=${apiKey}&token=${apiToken}`)
        expect(response.status()).toBe(200)
        console.log('Board ID outside: ', boardId);
    }
    );

});
