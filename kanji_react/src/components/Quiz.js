import "../Quiz.css";
import React, { useState, useEffect, useContext } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "./firebase"; // Make sure to replace './firebase-config' with the actual path to your Firebase configuration file
import EndScreen from "./EndScreen";
import { GameStateContext } from "../helpers/Contexts";
import ScoreBelow from "../img/peace-out.gif";
import Score4To7Image from "../img/rizz.gif";
import Score8To10Image from "../img/nerd-nerdy.gif";

const Quiz = () => {
  const { gameState } = useContext(GameStateContext);
  const { level } = gameState;
  const [quizData, setQuizData] = useState(null);

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionCount, setQuestionCount] = useState(9);
  const [scoreMessage, setScoreMessage] = useState("");
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  // useEffect(() => {
  //   const fetchQuizData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:9999/posts/");
  //       const data = await response.json();
  //       const filteredData = Object.keys(data).reduce((filtered, key) => {
  //         if (data[key].jlpt_new === level) {
  //           filtered[key] = data[key];
  //         }
  //         return filtered;
  //       }, {});
  //       setQuizData(filteredData);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchQuizData();
  // }, [level]);

  useEffect(() => {
    const fetchQuizData = async () => {
      const db = getDatabase(app);
      const quizRef = ref(db, "posts");

      onValue(
        quizRef,
        (snapshot) => {
          const data = snapshot.val();
          const filteredData = Object.keys(data).reduce((filtered, key) => {
            if (data[key].jlpt_new === level) {
              filtered[key] = data[key];
            }
            return filtered;
          }, {});
          setQuizData(filteredData);
        },
        {
          onlyOnce: true,
        }
      );
    };

    fetchQuizData();
  }, [level]);

  useEffect(() => {
    if (quizData) {
      const questionKeys = Object.keys(quizData);
      const randomQuestion =
        questionKeys[Math.floor(Math.random() * questionKeys.length)];
      setCurrentQuestion(randomQuestion);

      const correctAnswer = quizData[randomQuestion].meanings[0];
      const wrongAnswers = getRandomWrongAnswers(quizData, correctAnswer, 3);
      const shuffledArray = shuffleArray([correctAnswer, ...wrongAnswers]);
      setShuffledAnswers(shuffledArray);
    }
  }, [quizData]);

  const handleAnswerClick = (answer) => {
    if (!finished && selectedAnswer === null && questionCount > -1) {
      setSelectedAnswer(answer);

      const correctAnswer = quizData[currentQuestion].meanings[0];
      if (answer === correctAnswer) {
        setScore((prevScore) => prevScore + 1);
      }

      setTimeout(() => {
        setSelectedAnswer(null);
        const questionKeys = Object.keys(quizData);
        const currentQuestionIndex = questionKeys.indexOf(currentQuestion);
        const nextQuestionIndex = currentQuestionIndex + 1;
        setQuestionCount((prevCount) => prevCount - 1);

        if (nextQuestionIndex === questionKeys.length || questionCount === 0) {
          setFinished(true);
          setScoreMessage(getScoreMessage());
        } else {
          setCurrentQuestion(questionKeys[nextQuestionIndex]);

          const correctAnswer =
            quizData[questionKeys[nextQuestionIndex]].meanings[0];
          const wrongAnswers = getRandomWrongAnswers(
            quizData,
            correctAnswer,
            3
          );
          const shuffledArray = shuffleArray([correctAnswer, ...wrongAnswers]);
          setShuffledAnswers(shuffledArray);
        }
      }, 1500);
    }
  };

  const getScoreMessage = () => {
    if (score >= 0 && score <= 3) {
      return (
        <>
          <img
            src={ScoreBelow}
            alt="Your score is low"
            className="quiz-image"
          />
        </>
      );
    } else if (score >= 4 && score <= 7) {
      // Show the image for score 4-7
      return (
        <img
          src={Score4To7Image}
          alt="Your score is between 4 and 7"
          className="quiz-image"
        />
      );
    } else if (score >= 8 && score <= 10) {
      // Show the image for score 8-10
      return (
        <img
          src={Score8To10Image}
          alt="Your score is between 8 and 10"
          className="quiz-image"
        />
      );
    }
    return "";
  };

  if (!quizData || !currentQuestion) {
    return <div>Loading...</div>;
  }

  if (finished) {
    return (
      <EndScreen
        score={score}
        setScore={setScore}
        setFinished={setFinished}
        scoreMessage={scoreMessage}
      />
    );
  }

  const correctAnswer = quizData[currentQuestion].meanings[0];

  return (
    <div className="Quiz">
      <div className="answer-section">
        {shuffledAnswers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(answer)}
            disabled={selectedAnswer !== null}
          >
            {answer}
          </button>
        ))}
        <div className="kanji-overlay">
          <p className="kanji-text">{currentQuestion}</p>
        </div>
      </div>
      {selectedAnswer && (
        <div className="feedback-section">
          <p>
            Your answer: {selectedAnswer}{" "}
            {selectedAnswer === correctAnswer ? "✅" : "❌"}
          </p>
          {selectedAnswer !== correctAnswer && (
            <p>Correct Answer: {correctAnswer}</p>
          )}
        </div>
      )}
      <div className="score-section">
        <p>Score: {score}</p>
        <p>Questions Left: {questionCount}</p>
      </div>
    </div>
  );
};

const shuffleArray = (array) => {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const getRandomWrongAnswers = (quizData, correctAnswer, count) => {
  const allQuestions = Object.keys(quizData);
  const wrongAnswers = [];

  while (wrongAnswers.length < count) {
    const randomQuestion =
      allQuestions[Math.floor(Math.random() * allQuestions.length)];
    const randomMeaning = quizData[randomQuestion].meanings[0];

    if (
      randomMeaning !== correctAnswer &&
      !wrongAnswers.includes(randomMeaning)
    ) {
      wrongAnswers.push(randomMeaning);
    }
  }

  return wrongAnswers;
};

export default Quiz;
