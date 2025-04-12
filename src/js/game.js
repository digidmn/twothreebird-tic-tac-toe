/**
 * TicTacToe game logic
 */
export class TicTacToe {
    constructor() {
        this.reset();
    }

    /**
     * Reset the game to initial state
     */
    reset() {
        // Initialize the board (empty cells represented by null)
        this.board = Array(9).fill(null);

        // X always starts
        this.currentPlayer = 'X';

        // Game status (in progress, win, tie)
        this.gameStatus = 'in progress';

        // Winner (X, O, or null)
        this.winner = null;

        // Winning cells (array of indices or null)
        this.winningCells = null;

        return this;
    }

    /**
     * Make a move on the board
     * @param {number} index - index of the cell (0-8)
     * @returns {boolean} - true if the move was valid, false otherwise
     */
    makeMove(index) {
        // Check if the game is already over or the cell is already filled
        if (this.gameStatus !== 'in progress' || this.board[index] !== null) {
            return false;
        }

        // Place the current player's mark on the board
        this.board[index] = this.currentPlayer;

        // Check for win or tie
        if (this.checkWin()) {
            this.gameStatus = 'win';
            this.winner = this.currentPlayer;
        } else if (this.checkTie()) {
            this.gameStatus = 'tie';
        } else {
            // Switch player
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        }

        return true;
    }

    /**
     * Check if there is a win on the board
     * @returns {boolean} - true if there is a win, false otherwise
     */
    checkWin() {
        const winPatterns = [
            [0, 1, 2], // Top row
            [3, 4, 5], // Middle row
            [6, 7, 8], // Bottom row
            [0, 3, 6], // Left column
            [1, 4, 7], // Middle column
            [2, 5, 8], // Right column
            [0, 4, 8], // Diagonal top-left to bottom-right
            [2, 4, 6]  // Diagonal top-right to bottom-left
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (
                this.board[a] !== null &&
                this.board[a] === this.board[b] &&
                this.board[a] === this.board[c]
            ) {
                // Store the winning cells
                this.winningCells = pattern;
                return true;
            }
        }

        return false;
    }

    /**
     * Check if the game is a tie
     * @returns {boolean} - true if the game is a tie, false otherwise
     */
    checkTie() {
        return this.board.every(cell => cell !== null);
    }

    /**
     * Get the current player (X or O)
     * @returns {string} - the current player
     */
    getCurrentPlayer() {
        return this.currentPlayer;
    }

    /**
     * Get the game status
     * @returns {string} - 'in progress', 'win', or 'tie'
     */
    getGameStatus() {
        return this.gameStatus;
    }

    /**
     * Get the winner (X, O, or null if no winner)
     * @returns {string|null} - the winner
     */
    getWinner() {
        return this.winner;
    }

    /**
     * Get the winning cells (array of indices or null if no winner)
     * @returns {Array|null} - array of winning cell indices or null
     */
    getWinningCells() {
        return this.winningCells ? [...this.winningCells] : null;
    }

    /**
     * Get the current state of the board
     * @returns {Array} - array of 9 cells, each containing X, O, or null
     */
    getBoard() {
        return [...this.board];
    }
}

// Export a singleton instance of the game
export const game = new TicTacToe();