import { test, expect } from '@playwright/test';

test.describe('Tic Tac Toe Game', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the game page before each test
        await page.goto('/');
    });

    test('should display the game board and initial status', async ({ page }) => {
        // Check page title
        await expect(page).toHaveTitle('Tic Tac Toe');

        // Check game status
        const statusElement = page.locator('#game-status');
        await expect(statusElement).toHaveText("Player X's turn");

        // Check that the board has 9 cells
        const cells = page.locator('.cell');
        await expect(cells).toHaveCount(9);

        // Check that all cells are empty
        for (let i = 0; i < 9; i++) {
            await expect(cells.nth(i)).toHaveText('');
        }

        // Check that reset button exists
        const resetButton = page.locator('#reset-button');
        await expect(resetButton).toBeVisible();
        await expect(resetButton).toHaveText('Reset Game');
    });

    test('should allow players to make moves alternately', async ({ page }) => {
        const cells = page.locator('.cell');
        const statusElement = page.locator('#game-status');

        // First move: X
        await cells.nth(0).click();
        await expect(cells.nth(0)).toHaveText('X');
        await expect(cells.nth(0)).toHaveClass(/cell x/);
        await expect(statusElement).toHaveText("Player O's turn");

        // Second move: O
        await cells.nth(4).click();
        await expect(cells.nth(4)).toHaveText('O');
        await expect(cells.nth(4)).toHaveClass(/cell o/);
        await expect(statusElement).toHaveText("Player X's turn");

        // Third move: X
        await cells.nth(1).click();
        await expect(cells.nth(1)).toHaveText('X');
        await expect(statusElement).toHaveText("Player O's turn");
    });

    test('should not allow clicking on an already filled cell', async ({ page }) => {
        const cells = page.locator('.cell');
        const statusElement = page.locator('#game-status');

        // First move: X takes cell 0
        await cells.nth(0).click();
        await expect(cells.nth(0)).toHaveText('X');
        await expect(statusElement).toHaveText("Player O's turn");

        // Try to click on the same cell again
        await cells.nth(0).click();
        await expect(cells.nth(0)).toHaveText('X'); // Still X
        await expect(statusElement).toHaveText("Player O's turn"); // Still O's turn
    });

    test('should detect a win and display the winner', async ({ page }) => {
        const cells = page.locator('.cell');
        const statusElement = page.locator('#game-status');

        // Make moves for X to win in the top row
        await cells.nth(0).click(); // X in top-left
        await cells.nth(3).click(); // O in middle-left
        await cells.nth(1).click(); // X in top-middle
        await cells.nth(4).click(); // O in center
        await cells.nth(2).click(); // X in top-right (X wins)

        // Check win status
        await expect(statusElement).toHaveText('Player X wins!');

        // Try to make another move (should not be allowed)
        await cells.nth(5).click();
        await expect(cells.nth(5)).toHaveText(''); // Cell should remain empty
    });

    test('should detect a tie and display the message', async ({ page }) => {
        const cells = page.locator('.cell');
        const statusElement = page.locator('#game-status');

        // Make moves for a tie game:
        // X | O | X
        // X | O | O
        // O | X | X
        await cells.nth(0).click(); // X in top-left
        await cells.nth(1).click(); // O in top-middle
        await cells.nth(2).click(); // X in top-right
        await cells.nth(4).click(); // O in center
        await cells.nth(3).click(); // X in middle-left
        await cells.nth(5).click(); // O in middle-right
        await cells.nth(7).click(); // X in bottom-middle
        await cells.nth(6).click(); // O in bottom-left
        await cells.nth(8).click(); // X in bottom-right

        // Check tie status
        await expect(statusElement).toHaveText('Game ended in a tie!');
    });

    test('should reset the game when reset button is clicked', async ({ page }) => {
        const cells = page.locator('.cell');
        const statusElement = page.locator('#game-status');
        const resetButton = page.locator('#reset-button');

        // Make some moves
        await cells.nth(0).click(); // X
        await cells.nth(1).click(); // O

        // Click reset button
        await resetButton.click();

        // Check if the game is reset
        await expect(statusElement).toHaveText("Player X's turn");

        // Check that all cells are empty
        for (let i = 0; i < 9; i++) {
            await expect(cells.nth(i)).toHaveText('');
            await expect(cells.nth(i)).not.toHaveClass(/x|o/);
        }
    });

    test('should be responsive on mobile devices', async ({ page }) => {
        // Resize the viewport to mobile dimensions
        await page.setViewportSize({ width: 375, height: 667 });

        // Check that all elements are visible
        await expect(page.locator('h1')).toBeVisible();
        await expect(page.locator('#game-status')).toBeVisible();
        await expect(page.locator('#game-board')).toBeVisible();
        await expect(page.locator('#reset-button')).toBeVisible();

        // Check that the game board fits within the viewport
        const boardBoundingBox = await page.locator('#game-board').boundingBox();
        expect(boardBoundingBox.width).toBeLessThanOrEqual(375);

        // Test basic functionality works on mobile
        const cells = page.locator('.cell');
        await cells.nth(0).click();
        await expect(cells.nth(0)).toHaveText('X');
    });
});