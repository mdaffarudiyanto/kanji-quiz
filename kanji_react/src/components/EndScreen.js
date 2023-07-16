import React, { useContext } from "react";
import "../App.css";
import { GameStateContext } from "../helpers/Contexts";

const EndScreen = ({ score, setFinished, scoreMessage }) => {
  const { setGameState } = useContext(GameStateContext);

  const restartQuiz = () => {
    setFinished(false); // Reset the finished state
    setGameState({ state: "menu", level: 5 }); // Reset the game state
  };

  return (
    <div className="EndScreen">
      <h1>Quiz Finished</h1>
      <h1>{score} / 10</h1>
      {scoreMessage && <p>Score Message: {scoreMessage}</p>}
      <button onClick={restartQuiz}>Restart Quiz</button>
    </div>
  );
};

export default EndScreen;
