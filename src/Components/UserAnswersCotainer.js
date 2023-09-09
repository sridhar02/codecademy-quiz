import React from 'react';

export const UserAnswersContainer = ({ userAnswers }) => {
  return (
    <div className="userContainer">
      {userAnswers.map(({ questionTitle, userAnswer, correct }, index) => {
        return (
          <div className="questionContainer" key={questionTitle}>
            <div className="question">
              <div className="questionText">{questionTitle}</div>
              <span className={correct ? 'correctAnswer' : 'incorrectAnswer'}>
                {userAnswer}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
