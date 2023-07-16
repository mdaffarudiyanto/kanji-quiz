import "../Menu.css";
import { useContext } from "react";
import { GameStateContext } from "../helpers/Contexts";

function Menu() {
  const { setGameState } = useContext(GameStateContext);

  const startQuiz = (level) => {
    setGameState({ state: "playing", level });
  };

  return (
    <div className="Menu">
      <h2 className="Menu-intro">Choose Your Level:</h2>
      <div>
        <button onClick={() => startQuiz(5)}>N5</button>
        <button onClick={() => startQuiz(4)}>N4</button>
        <button onClick={() => startQuiz(3)}>N3</button>
        <button onClick={() => startQuiz(2)}>N2</button>
        <button onClick={() => startQuiz(1)}>N1</button>
      </div>
    </div>
  );
}

export default Menu;
