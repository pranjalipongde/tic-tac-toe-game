import { useState } from "react";
import "./App.css";
import Game from "./components/Game";

function App() {
  // states to manage the grid size, win streak and hwether the game start or not
  const [gridSize, setGridSize] = useState(3);
  const [winStreak, setWinStreak] = useState(3);
  const [startGame, setStartGame] = useState(false);

  // func to handle start of game
  const handleStart = () => {
    // checks if win strak is valid or not, else get error message
    if (gridSize >= winStreak) {
      // reset the game by setting startGame to false & then true to re-render the game component
      setStartGame(false);
      setTimeout(() => setStartGame(true), 0);
    } else {
      alert("Win streak must be less than or equal to grid size!");
    }
  };

  return (
    <div className="App">
      <div className="settings">
        <h1>Customise Your Tic-Tac-Toe Game</h1>

        <div>
          <label>Grid Size (n) :</label>
          <input
            type="number"
            value={gridSize}
            onChange={(e) => setGridSize(Number(e.target.value))}
            min="3"
            max="10"
          />
        </div>

        <div>
          <label>Win Streak (m):</label>
          <input
            type="number"
            value={winStreak}
            onChange={(e) => setWinStreak(Number(e.target.value))}
            min="3"
            max={gridSize}
          />

          <button onClick={handleStart}>Start Game</button>
        </div>
      </div>

      {/* conditionally render the game once it starts */}
      {startGame && (
        <div className="game-container">
          <h2>Let's Play Tic-Tac-Toe</h2>
          <Game gridSize={gridSize} winStreak={winStreak} />
        </div>
      )}
    </div>
  );
}

export default App;
