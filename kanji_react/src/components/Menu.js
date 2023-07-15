import "../App.css";
import { useContext, useState } from "react";
import { GameStateContext } from "../helpers/Contexts";


function Menu() {
  const { setGameState } = useContext(GameStateContext);
  const [selectedLevel, setSelectedLevel] = useState(5); // Default JLPT level is N5

  const handleLevelChange = (event) => {
    setSelectedLevel(Number(event.target.value));
  };

  const startQuiz = () => {
    setGameState({ state: "playing", level: selectedLevel });
  };

  return (
    <div className="Menu">
      <select value={selectedLevel} onChange={handleLevelChange}>
        <option value={5}>N5</option>
        <option value={4}>N4</option>
        <option value={3}>N3</option>
        <option value={2}>N2</option>
        <option value={1}>N1</option>
      </select>
      <button onClick={startQuiz}>Start Quiz</button>
    </div>
  );
}

export default Menu;