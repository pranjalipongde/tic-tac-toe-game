import React, { useState } from "react";
import Board from "./Board";

const Game = ({ gridSize, winStreak }) => {
  const [currentPlayer, setCurrentPlayer] = useState("X"); // track current player (X or O)

  // initialize board as gridSize*gridSize
  const [board, setBoard] = useState(
    Array(gridSize)
      .fill(null)
      .map(() => Array(gridSize).fill(null))
  );

  // track if game is over
  const [gameOver, setGameOver] = useState(false);

  // track the winner or draw the game
  const [winner, setWinner] = useState(null);

  // func to check win condition
  const checkWin = (newBoard, row, col) => {
    const directions = [
      { row: 0, col: 1 }, // Horizontal
      { row: 1, col: 0 }, // Vertical
      { row: 1, col: 1 }, // Diagonal top-left to bottom-right
      { row: 1, col: -1 }, // Diagonal top-right to bottom-left
    ];

    // check if cell is within grid boundry
    const inBounds = (r, c) => r >= 0 && r < gridSize && c >= 0 && c < gridSize;

    // count cells in the specified direction-for win checking
    const countInDirection = (rDir, cDir) => {
      let count = 1;
      let r = row + rDir;
      let c = col + cDir;

      // count in +ve direction
      while (inBounds(r, c) && newBoard[r][c] === currentPlayer) {
        count++;
        r += rDir;
        c += cDir;
      }

      // count in -ve direction
      r = row - rDir;
      c = col - cDir;

      while (inBounds(r, c) && newBoard[r][c] === currentPlayer) {
        count++;
        r -= rDir;
        c -= cDir;
      }

      return count;
    };

    // check if any direction meets win streak
    return directions.some(
      (direction) => countInDirection(direction.row, direction.col) >= winStreak
    );
  };

  // handle click on cell
  const handleCellClick = (row, col) => {
    // check if game is over
    if (board[row][col] || gameOver) return;

    // create new board with updated cell value
    const newBoard = board.map((rowArr, rIndex) =>
      rowArr.map((cell, cIndex) =>
        rIndex === row && cIndex === col ? currentPlayer : cell
      )
    );

    setBoard(newBoard); //update board state

    // check if current move results in win
    if (checkWin(newBoard, row, col)) {
      setWinner(currentPlayer);
      setGameOver(true);
    } else if (newBoard.flat().every((cell) => cell !== null)) {
      setWinner("Draw"); //if all cell filled then its draw
      setGameOver(true);
    } else {
      // switch to other player
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  return (
    <div className="game">
      <h3>Current Player: {currentPlayer}</h3>
      <Board board={board} onCellClick={handleCellClick} />
      {gameOver && (
        <p>{winner === "Draw" ? "It's a Draw!😢" : `Winner: ${winner} 🏆`}</p>
      )}
    </div>
  );
};

export default Game;
