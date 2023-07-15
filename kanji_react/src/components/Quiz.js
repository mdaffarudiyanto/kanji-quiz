import React, { useState, useEffect } from 'react';
import EndScreen from './EndScreen';

const Quiz = () => {
  const [quizData, setQuizData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch('http://localhost:9999/posts');
        const data = await response.json();
        setQuizData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuizData();
  }, [questionNumber]);

  const handleAnswerClick = (answer) => {
    if (!finished && selectedAnswer === null) {
      setSelectedAnswer(answer);

      const kanji = Object.keys(quizData)[questionNumber]; // Get the kanji for the current question
      if (answer === quizData[kanji].meanings[0]) {
        setScore((prevScore) => prevScore + 1);
      }

      setTimeout(() => {
        setSelectedAnswer(null);
        setQuestionNumber((prevNumber) => prevNumber + 1);
      }, 1500);

      if (questionNumber === 9) {
        setFinished(true);
      }
    }
  };

  if (!quizData) {
    return <div>Loading...</div>;
  }

  if (finished) {
    return <EndScreen score={score} setScore={setScore} setFinished={setFinished} />;
  }

  const kanji = Object.keys(quizData)[questionNumber]; // Get the kanji for the current question
  const correctAnswer = quizData[kanji].meanings[0];
  const shuffledAnswers = shuffleArray([correctAnswer, 'Option 2', 'Option 3', 'Option 4']);

  return (
    <div>
      <h2>Kanji Quiz</h2>
      <>
        <p>Question {questionNumber + 1}/10:</p>
        <p>Kanji: {kanji}</p>
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
            Your answer: {selectedAnswer}{' '}
            {selectedAnswer === correctAnswer ? '✅' : '❌'}
          </p>
        )}
        <p>Score: {score}</p>
      </>
    </div>
  );
};

// Helper function to shuffle the answer options array
const shuffleArray = (array) => {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export default Quiz;
