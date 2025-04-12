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
        this.winningLine = document.getElementById('winning-line');

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
     * Draw the winning line through the winning cells
     * @param {Array} winningCells - array of indices of winning cells
     */
    drawWinningLine(winningCells) {
        // Hide the line if there are no winning cells
        if (!winningCells) {
            this.winningLine.classList.add('hidden');
            return;
        }

        // Get the positions of the first and last winning cells
        const firstCell = this.cells[winningCells[0]].getBoundingClientRect();
        const lastCell = this.cells[winningCells[2]].getBoundingClientRect();

        // Get the position of the board
        const boardRect = this.boardElement.getBoundingClientRect();

        // Calculate the start and end points of the line relative to the board
        const startX = firstCell.left - boardRect.left + firstCell.width / 2;
        const startY = firstCell.top - boardRect.top + firstCell.height / 2;
        const endX = lastCell.left - boardRect.left + lastCell.width / 2;
        const endY = lastCell.top - boardRect.top + lastCell.height / 2;

        // Calculate the length and angle of the line
        const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);

        // Position the line
        this.winningLine.style.left = `${startX}px`;
        this.winningLine.style.top = `${startY}px`;
        this.winningLine.style.width = `${length}px`;
        this.winningLine.style.transform = `rotate(${angle}deg)`;

        // Apply the winning player's color to the line
        const winner = game.getWinner();
        this.winningLine.style.backgroundColor = winner === 'X' ? '#e74c3c' : '#3498db';

        // Show the line
        this.winningLine.classList.remove('hidden');
    }

    /**
     * Update the UI to reflect the current game state
     */
    render() {
        // Get the current state of the game
        const board = game.getBoard();
        const status = game.getGameStatus();
        const winningCells = game.getWinningCells();

        // Update the cells
        this.cells.forEach((cell, index) => {
            const value = board[index];
            cell.textContent = value || '';

            // Reset classes
            cell.classList.remove('x', 'o', 'winner');

            // Add class for X or O
            if (value) {
                cell.classList.add(value.toLowerCase());

                // Add winner class if this cell is part of the winning line
                if (winningCells && winningCells.includes(index)) {
                    cell.classList.add('winner');
                }
            }
        });

        // Update game status
        let statusText = '';

        if (status === 'in progress') {
            statusText = `Player ${game.getCurrentPlayer()}'s turn`;
        } else if (status === 'win') {
            statusText = `Player ${game.getWinner()} wins!`;
        } else if (status === 'tie') {
            statusText = 'Game ended in a tie!';
        }

        this.statusElement.textContent = statusText;

        // Draw the winning line if there's a winner
        if (status === 'win') {
            // Use setTimeout to ensure all cell positions are updated before drawing the line
            setTimeout(() => this.drawWinningLine(winningCells), 50);
        } else {
            // Hide the winning line if the game is in progress or a tie
            this.winningLine.classList.add('hidden');
        }
    }
}

// Initialize the UI when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToeUI();
});