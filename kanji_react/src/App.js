import React, { useState } from "react";
import Menu from "./components/Menu";
import Quiz from "./components/Quiz";
import { GameStateContext } from "./helpers/Contexts";

function App() {
  const [gameState, setGameState] = useState({ state: "menu", level: 5 });

  return (
    <div className="App">
      <h1>Kanji Quiz</h1>
      <GameStateContext.Provider value={{ gameState, setGameState }}>
        {gameState.state === "menu" ? <Menu /> : <Quiz />}
      </GameStateContext.Provider>
    </div>
  );
}

export default App;
