import { game } from './game.js';

/**
 * UI Controller for the Tic Tac Toe game
 */
class TicTacToeUI {
    constructor() {
        // Get DOM elements
        this.boardElement = document.getElementById('game-board');
        this.statusElement = document.getElementById('game-status');
        this.resetButton = document.getElementById('reset-button');

        // Get all cell elements
        this.cells = Array.from(document.querySelectorAll('.cell'));

        // Bind event handlers
        this.bindEvents();

        // Initial render
        this.render();
    }

    /**
     * Bind event handlers to DOM elements
     */
    bindEvents() {
        // Add click event listeners to cells
        this.cells.forEach(cell => {
            cell.addEventListener('click', () => {
                const index = parseInt(cell.getAttribute('data-index'));
                this.handleCellClick(index);
            });
        });

        // Add click event listener to reset button
        this.resetButton.addEventListener('click', () => {
            this.resetGame();
        });
    }

    /**
     * Handle click on a cell
     * @param {number} index - index of the clicked cell
     */
    handleCellClick(index) {
        // Make move and render if successful
        if (game.makeMove(index)) {
            this.render();
        }
    }

    /**
     * Reset the game
     */
    resetGame() {
        game.reset();
        this.render();
    }

    /**
     * Update the UI to reflect the current game state
     */
    render() {
        // Update the cells
        this.cells.forEach((cell, index) => {
            const value = game.getBoard()[index];
            cell.textContent = value || '';

            // Reset classes
            cell.classList.remove('x', 'o');

            // Add class for X or O
            if (value) {
                cell.classList.add(value.toLowerCase());
            }
        });

        // Update game status
        const status = game.getGameStatus();
        let statusText = '';

        if (status === 'in progress') {
            statusText = `Player ${game.getCurrentPlayer()}'s turn`;
        } else if (status === 'win') {
            statusText = `Player ${game.getWinner()} wins!`;
        } else if (status === 'tie') {
            statusText = 'Game ended in a tie!';
        }

        this.statusElement.textContent = statusText;
    }
}

// Initialize the UI when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToeUI();
});