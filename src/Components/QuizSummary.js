import React from 'react';
import { getMessage } from '../data/messages';
import { UserAnswersContainer } from './UserAnswersCotainer';

export const QuizSummary = ({
  numberCorrect,
  numberTotal,
  reTakeQuiz,
  getNextQuiz,
  numberTimesAttempted,
  userAnswers,
}) => {
  const message = numberCorrect > 0 ? getMessage() : '';

  return (
    <div>
      <div className="mainSummary">
        You got {numberCorrect} out of {numberTotal} right.
      </div>
      <div className="subSummary">{message}</div>
      {numberTimesAttempted > 0 && (
        <div className="reAttemptedText">
          You've attempted the quiz {numberTimesAttempted}{' '}
          <span>{numberTimesAttempted > 1 ? 'times' : 'time'}</span>
        </div>
      )}
      <UserAnswersContainer userAnswers={userAnswers} />
      <div className="buttonContainer">
        <button className="nextButton" onClick={getNextQuiz}>
          Next
        </button>
        <button className="reTakeButton" onClick={reTakeQuiz}>
          Retake
        </button>
      </div>
    </div>
  );
};
