import { test, expect } from "@playwright/test";
const apiKey = process.env.API_KEY;
const apiToken = process.env.API_TOKEN

test.describe('delete existing boards from Trello database', () => {
    test('Delete boards until none are left', async ({ request }) => {
        let boardId = "";

        while (true) {
            // Retrieve the list of boards from the Trello API
            const response = await request.get(`https://api.trello.com/1/members/me/boards/?key=${apiKey}&token=${apiToken}`);

            // Ensure the request was successful
            expect(response.status()).toBe(200);

            // Parse the response body as JSON
            const respBody = JSON.parse(await response.text());

            // Check if there are any boards to delete
            if (respBody.length > 0) {
                // Get the ID of the first board in the list
                boardId = respBody[0].id;
                console.log("Deleting board:", boardId);

            //     // Delete the board using its ID
                const deleteResponse = await request.delete(`https://api.trello.com/1/boards/${boardId}?key=${apiKey}&token=${apiToken}`);

            //     // Ensure the board was successfully deleted
                expect(deleteResponse.status()).toBe(200);

                console.log('Board deleted:', boardId);
            } else {
                console.log('No more boards found. Exiting loop.');
                break; // Exit the loop if no more boards are found
            }
        }
    });
});
