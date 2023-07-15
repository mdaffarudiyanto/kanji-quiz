import React, { useState, useEffect } from "react";
import EndScreen from "./EndScreen";

const Quiz = () => {
  const [quizData, setQuizData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionCount, setQuestionCount] = useState(9);
  const [scoreMessage, setScoreMessage] = useState("");

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch("http://localhost:9999/posts/");
        const data = await response.json();
        const filteredData = Object.keys(data).reduce((filtered, key) => {
          if (data[key].jlpt_new === 5) {
            filtered[key] = data[key];
          }
          return filtered;
        }, {});
        setQuizData(filteredData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuizData();
  }, []);

  useEffect(() => {
    if (quizData) {
      const questionKeys = Object.keys(quizData);
      const randomQuestion =
        questionKeys[Math.floor(Math.random() * questionKeys.length)];
      setCurrentQuestion(randomQuestion);
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
        }
      }, 1500);
    }
  };

  const handleLinkClick = () => {
    window.open(
      "https://www.amazon.co.jp/s?k=minano+nihongo+n5&crid=2E9RLUMS9MEH1&sprefix=mina+no+nihingo+%2Caps%2C186&ref=nb_sb_ss_sc_2_15",
      "_blank"
    );
  };

  const getScoreMessage = () => {
    if (score >= 0 && score <= 3) {
      return (
        <>
          <p>😭💀</p>
          <button onClick={handleLinkClick}>Get study mats fr..</button>
        </>
      );
    } else if (score >= 4 && score <= 7) {
      return "😗😎";
    } else if (score >= 8 && score <= 10) {
      return "🤓🤩";
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
  const wrongAnswers = getRandomWrongAnswers(quizData, correctAnswer, 3);
  const shuffledAnswers = shuffleArray([correctAnswer, ...wrongAnswers]);

  return (
    <div>
      <>
        <p>Kanji: {currentQuestion}</p>
        <div>
          {shuffledAnswers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(answer)}
              disabled={selectedAnswer !== null}
            >
              {answer}
            </button>
          ))}
        </div>
        {selectedAnswer && (
          <p>
            Your answer: {selectedAnswer}{" "}
            {selectedAnswer === correctAnswer ? "✅" : "❌"}
            {selectedAnswer !== correctAnswer && (
              <>
                <br />
                Correct Answer: {correctAnswer}
              </>
            )}
          </p>
        )}

        <p>Score: {score}</p>
        <p>Question Left: {questionCount}</p>
      </>
    </div>
  );
};

// Helper function to shuffle an array
const shuffleArray = (array) => {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

// Helper function to get random wrong answers from the database for answer options
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
