import React from "react";

// represents each square in the grid
const Cell = ({ value, onClick }) => {
  return (
    <div className="cell" onClick={onClick}>
      {/* display X, O , or null */}
      {value}
    </div>
  );
};

export default Cell;
