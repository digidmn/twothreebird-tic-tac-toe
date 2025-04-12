import { describe, it, expect, beforeEach } from 'vitest';
import { TicTacToe } from '../../src/js/game.js';

describe('TicTacToe Game Logic', () => {
    let game;

    beforeEach(() => {
        game = new TicTacToe();
    });

    it('should initialize with empty board and player X', () => {
        expect(game.getBoard()).toEqual(Array(9).fill(null));
        expect(game.getCurrentPlayer()).toBe('X');
        expect(game.getGameStatus()).toBe('in progress');
        expect(game.getWinner()).toBe(null);
    });

    it('should allow valid moves and switch players', () => {
        // X makes a move
        expect(game.makeMove(0)).toBe(true);
        expect(game.getBoard()[0]).toBe('X');
        expect(game.getCurrentPlayer()).toBe('O');

        // O makes a move
        expect(game.makeMove(1)).toBe(true);
        expect(game.getBoard()[1]).toBe('O');
        expect(game.getCurrentPlayer()).toBe('X');
    });

    it('should prevent moves on occupied cells', () => {
        // X makes a move on cell 0
        game.makeMove(0);

        // O tries to make a move on the same cell
        expect(game.makeMove(0)).toBe(false);
        expect(game.getBoard()[0]).toBe('X');
        expect(game.getCurrentPlayer()).toBe('O');
    });

    it('should detect a horizontal win', () => {
        // X makes moves to win horizontally (top row)
        game.makeMove(0); // X in top-left
        game.makeMove(3); // O in middle-left
        game.makeMove(1); // X in top-middle
        game.makeMove(4); // O in center
        game.makeMove(2); // X in top-right

        expect(game.getGameStatus()).toBe('win');
        expect(game.getWinner()).toBe('X');
    });

    it('should detect a vertical win', () => {
        // O makes moves to win vertically (middle column)
        game.makeMove(0); // X in top-left
        game.makeMove(1); // O in top-middle
        game.makeMove(3); // X in middle-left
        game.makeMove(4); // O in center
        game.makeMove(8); // X in bottom-right
        game.makeMove(7); // O in bottom-middle

        expect(game.getGameStatus()).toBe('win');
        expect(game.getWinner()).toBe('O');
    });

    it('should detect a diagonal win', () => {
        // X makes moves to win diagonally (top-left to bottom-right)
        game.makeMove(0); // X in top-left
        game.makeMove(1); // O in top-middle
        game.makeMove(4); // X in center
        game.makeMove(2); // O in top-right
        game.makeMove(8); // X in bottom-right

        expect(game.getGameStatus()).toBe('win');
        expect(game.getWinner()).toBe('X');
    });

    it('should detect a tie', () => {
        // Game resulting in a tie:
        // X | O | X
        // X | O | O
        // O | X | X
        game.makeMove(0); // X in top-left
        game.makeMove(1); // O in top-middle
        game.makeMove(2); // X in top-right
        game.makeMove(4); // O in center
        game.makeMove(3); // X in middle-left
        game.makeMove(5); // O in middle-right
        game.makeMove(7); // X in bottom-middle
        game.makeMove(6); // O in bottom-left
        game.makeMove(8); // X in bottom-right

        expect(game.getGameStatus()).toBe('tie');
        expect(game.getWinner()).toBe(null);
    });

    it('should not allow moves after game is over', () => {
        // X makes moves to win horizontally (top row)
        game.makeMove(0); // X in top-left
        game.makeMove(3); // O in middle-left
        game.makeMove(1); // X in top-middle
        game.makeMove(4); // O in center
        game.makeMove(2); // X in top-right (X wins)

        // Try to make a move after game is over
        expect(game.makeMove(5)).toBe(false);
        expect(game.getBoard()[5]).toBe(null);
    });

    it('should reset the game correctly', () => {
        // Make some moves
        game.makeMove(0);
        game.makeMove(1);

        // Reset the game
        game.reset();

        // Check if the game is reset correctly
        expect(game.getBoard()).toEqual(Array(9).fill(null));
        expect(game.getCurrentPlayer()).toBe('X');
        expect(game.getGameStatus()).toBe('in progress');
        expect(game.getWinner()).toBe(null);
    });
});