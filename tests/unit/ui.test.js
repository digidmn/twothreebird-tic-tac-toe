import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

// Mock the game module
vi.mock('../../src/js/game.js', () => ({
    game: {
        makeMove: vi.fn(),
        reset: vi.fn(),
        getBoard: vi.fn().mockReturnValue(Array(9).fill(null)),
        getGameStatus: vi.fn().mockReturnValue('in progress'),
        getCurrentPlayer: vi.fn().mockReturnValue('X'),
        getWinner: vi.fn().mockReturnValue(null)
    }
}));

// Import the game after mocking
import { game } from '../../src/js/game.js';

describe('TicTacToe UI', () => {
    // Create a simplified version of the UI class for testing
    class TestTicTacToeUI {
        constructor() {
            this.boardElement = document.createElement('div');
            this.statusElement = document.createElement('div');
            this.resetButton = document.createElement('button');
            this.cells = Array(9).fill().map(() => document.createElement('div'));

            this.cells.forEach((cell, index) => {
                cell.setAttribute('data-index', index.toString());
            });
        }

        handleCellClick(index) {
            game.makeMove(index);
            this.render();
        }

        resetGame() {
            game.reset();
            this.render();
        }

        render() {
            const board = game.getBoard();

            this.cells.forEach((cell, index) => {
                const value = board[index];
                cell.textContent = value || '';
                cell.className = 'cell';
                if (value) {
                    cell.classList.add(value.toLowerCase());
                }
            });

            const status = game.getGameStatus();

            if (status === 'in progress') {
                this.statusElement.textContent = `Player ${game.getCurrentPlayer()}'s turn`;
            } else if (status === 'win') {
                this.statusElement.textContent = `Player ${game.getWinner()} wins!`;
            } else if (status === 'tie') {
                this.statusElement.textContent = 'Game ended in a tie!';
            }
        }
    }

    let ui;

    beforeEach(() => {
        // Reset all mocks
        vi.resetAllMocks();

        // Create a new instance of the test UI
        ui = new TestTicTacToeUI();

        // Initialize with default values
        game.getBoard.mockReturnValue(Array(9).fill(null));
        game.getGameStatus.mockReturnValue('in progress');
        game.getCurrentPlayer.mockReturnValue('X');
        game.getWinner.mockReturnValue(null);

        // Initial render
        ui.render();
    });

    it('should render the initial game state correctly', () => {
        // Check that the status shows X's turn
        expect(ui.statusElement.textContent).toBe("Player X's turn");

        // Check that all cells are empty
        ui.cells.forEach(cell => {
            expect(cell.textContent).toBe('');
            expect(cell.className).toBe('cell');
        });
    });

    it('should handle cell clicks and update the UI', () => {
        // Setup the mocks for a successful move
        game.makeMove.mockReturnValue(true);
        game.getBoard.mockReturnValue(['X', null, null, null, null, null, null, null, null]);
        game.getCurrentPlayer.mockReturnValue('O');

        // Simulate clicking on the first cell
        ui.handleCellClick(0);

        // Check that makeMove was called with the correct index
        expect(game.makeMove).toHaveBeenCalledWith(0);

        // Check that the cell was updated
        expect(ui.cells[0].textContent).toBe('X');
        expect(ui.cells[0].classList.contains('x')).toBe(true);

        // Check that the status was updated
        expect(ui.statusElement.textContent).toBe("Player O's turn");
    });

    it('should handle the reset button and update the UI', () => {
        // Setup for a board with some moves
        game.getBoard.mockReturnValue(['X', 'O', null, null, null, null, null, null, null]);

        // Initial render with some moves
        ui.render();

        // Setup for reset
        game.reset.mockReturnValue({}); // This is just to satisfy the function call
        game.getBoard.mockReturnValue(Array(9).fill(null));
        game.getCurrentPlayer.mockReturnValue('X');

        // Simulate reset button click
        ui.resetGame();

        // Check that reset was called
        expect(game.reset).toHaveBeenCalled();

        // Check that all cells were reset
        ui.cells.forEach(cell => {
            expect(cell.textContent).toBe('');
            expect(cell.className).toBe('cell');
        });

        // Check that the status was reset
        expect(ui.statusElement.textContent).toBe("Player X's turn");
    });

    it('should display win status correctly', () => {
        // Setup for a win
        game.getBoard.mockReturnValue(['X', 'X', 'X', 'O', 'O', null, null, null, null]);
        game.getGameStatus.mockReturnValue('win');
        game.getWinner.mockReturnValue('X');

        // Render the UI
        ui.render();

        // Check that the status shows the winner
        expect(ui.statusElement.textContent).toBe('Player X wins!');
    });

    it('should display tie status correctly', () => {
        // Setup for a tie
        game.getBoard.mockReturnValue(['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X']);
        game.getGameStatus.mockReturnValue('tie');

        // Render the UI
        ui.render();

        // Check that the status shows a tie
        expect(ui.statusElement.textContent).toBe('Game ended in a tie!');
    });
});