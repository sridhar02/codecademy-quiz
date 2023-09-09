import React, { useEffect, useState } from 'react';
import { QuestionContainer } from './QuestionContainer';
import { QuizSummary } from './QuizSummary';

export const QuizContainer = ({ quiz, title, questions = [], nextQuiz }) => {
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [numQuesAnswered, setNumQuesAnswered] = useState(0);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const [numAttempted, setNumAttempted] = useState(0);
  const [userSelections, setUserSelections] = useState([]);

  const quizLength = questions.length;

  useEffect(() => {
    resetQuiz();
  }, [quiz]);

  // useEffect(() => {
  //   if (numQuesAnswered === quizLength) {
  //     setQuizComplete(true);
  //   }
  // }, [numQuesAnswered, quizLength]);

  const getNextQuestion = () => {
    setActiveQuestionIndex(activeQuestionIndex + 1);
    setShowNext(false);
  };

  const trackAnswer = (questionTitle, answerSelected, correctAnswer) => {
    setShowNext(true);
    if (answerSelected === correctAnswer) {
      setScore(score + 1);
    }
    setNumQuesAnswered(numQuesAnswered + 1);
    setUserSelections(prevState => [
      ...prevState,
      {
        questionTitle,
        userAnswer: answerSelected,
        correct: answerSelected === correctAnswer,
      },
    ]);
  };

  const resetQuiz = () => {
    setQuizComplete(false);
    setActiveQuestionIndex(0);
    setNumQuesAnswered(0);
    setScore(0);
    setShowNext(false);
    setUserSelections([]);
  };

  const reTakeQuiz = () => {
    setNumAttempted(numAttempted + 1);
    resetQuiz();
  };

  const currentQuestion = questions ? questions[activeQuestionIndex] : null;

  return (
    <div>
      <h1>{title}</h1>
      {!quizComplete &&
      Array.isArray(questions) &&
      questions.length > activeQuestionIndex ? (
        <>
          <QuestionContainer
            question={currentQuestion}
            trackAnswer={trackAnswer}
          />
          {showNext && (
            <button
              className="nextButton"
              type="button"
              disabled={activeQuestionIndex === numQuesAnswered}
              onClick={() => getNextQuestion()}
            >
              {' '}
              Next
            </button>
          )}
        </>
      ) : (
        <QuizSummary
          numberCorrect={score}
          numberTotal={quizLength}
          getNextQuiz={nextQuiz}
          reTakeQuiz={reTakeQuiz}
          numberTimesAttempted={numAttempted}
          userAnswers={userSelections}
        />
      )}
    </div>
  );
};
