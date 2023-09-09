import React, { useEffect, useState } from 'react';

export const QuestionContainer = ({ question, trackAnswer }) => {
  const { text, correctAnswer, answers } = question;

  const [message, setMessage] = useState('');
  const [answerChosen, setAnswerChosen] = useState('');

  const baseStyle = {
    paddingLeft: '8px',
    textAlign: 'left',
    paddingTop: '4px',
    paddingBottom: '4px',
    alignContent: 'center',
    verticalAlign: 'middle',
    marginBottom: '10px',
  };

  const buttonBaseStyle = {
    border: 'none',
    background: 'none',
    outline: 'none',
    display: 'flex',
    fontSize: '18px',
  };

  const correctStyle = {
    border: '2px solid green',
  };

  const incorrectStyle = {
    border: '2px solid red',
    textDecoration: 'line-through',
  };

  function getOptionStyle(showSuccess, showMistake) {
    if (showSuccess) return { ...baseStyle, ...correctStyle };
    if (showMistake) return { ...baseStyle, ...incorrectStyle };
    return baseStyle;
  }

  function getButtonStyle(isDisabled) {
    return {
      ...buttonBaseStyle,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
    };
  }

  const handleAnswerClick = answerSelected => {
    setAnswerChosen(answerSelected);
    trackAnswer(text, answerSelected, correctAnswer);
    if (answerSelected === correctAnswer) {
      setMessage('Correct');
    } else {
      setMessage('Incorrect');
    }
  };

  useEffect(() => {
    setMessage('');
    setAnswerChosen('');
  }, [question]);

  return (
    <div style={{ border: '0px solid blue' }}>
      <h2>{text}</h2>
      {answers.map((answer, index) => {
        const letter = String.fromCharCode(65 + index);
        const isCorrect = answer === correctAnswer;
        const isChosen = answer === answerChosen;
        const showSuccess = answerChosen && isCorrect;
        const showMistake = isChosen && !isCorrect;

        return (
          <div key={index} style={getOptionStyle(showSuccess, showMistake)}>
            <button
              onClick={() => handleAnswerClick(answer)}
              disabled={answerChosen}
              style={getButtonStyle(answerChosen)}
            >
              <p className="">{letter}.</p>
              <p className="answerText">{answer}</p>
            </button>
          </div>
        );
      })}
      {answerChosen && message && <div className="message">{message}</div>}
    </div>
  );
};
