import React, { useContext } from "react";
import "../App.css";
import "../EndScreen.css";
import { GameStateContext } from "../helpers/Contexts";

const EndScreen = ({ score, setFinished, scoreMessage }) => {
  const { setGameState } = useContext(GameStateContext);

  const restartQuiz = () => {
    setFinished(false); // Reset the finished state
    setGameState({ state: "menu", level: 5 }); // Reset the game state
  };

  const handleLinkClick = () => {
    window.open(
      "https://www.amazon.co.jp/s?k=minano+nihongo+n5&crid=2E9RLUMS9MEH1&sprefix=mina+no+nihingo+%2Caps%2C186&ref=nb_sb_ss_sc_2_15",
      "_blank"
    );
  };

  return (
    <div className="EndScreenContainer">
      <div className="EndScreen">
        <h1 className="QuizFinishedHeader">Quiz Finished</h1>
        <h1>{score} / 10</h1>
        {scoreMessage && <p className="emoji">{scoreMessage}</p>}
        <button className="btn-4" onClick={handleLinkClick}>check this out</button>
        <button className="btn-4" onClick={restartQuiz}>Restart Quiz</button>
      </div>
    </div>
  );
};

export default EndScreen;