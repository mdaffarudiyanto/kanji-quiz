import React, { useState } from "react";
import Menu from "./components/Menu";
import Quiz from "./components/Quiz";
import { GameStateContext } from "./helpers/Contexts";
import CartoonyTextAnimation from "./CartoonyTextAnimation"; 

function App() {
  const [gameState, setGameState] = useState({ state: "menu", level: 5 });
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  return (
    <div className="App">
      <CartoonyTextAnimation />
      <GameStateContext.Provider
        value={{
          gameState,
          setGameState,
          score,
          setScore,
          finished,
          setFinished,
        }}
      >
        {gameState.state === "menu" ? <Menu /> : <Quiz />}
      </GameStateContext.Provider>
    </div>
  );
}

export default App;
