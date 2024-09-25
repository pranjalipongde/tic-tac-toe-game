import React from "react";
import Cell from "./Cell";

// handle the layout of the game-grid
const Board = ({ board, onCellClick }) => {
  return (
    <div
      className="board"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${board.length}, 1fr)`,
        gridAutoRows: "1fr",
        width: `${board.length * 80}px`,
        height: `${board.length * 80}px`,
      }}
    >
      {/* map over board and create cell foe each position */}
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            value={cell}
            onClick={() => onCellClick(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  );
};

export default Board;
