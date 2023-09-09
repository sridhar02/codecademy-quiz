import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { QuizContainer } from './Components/QuizContainer';
import { getQuizzes } from './data/quizzes';

import './styles.css';
import { formatQuizzes } from './Utils';

const App = () => {
  const [error, setError] = useState(null);
  const [quizzes, setQuizzes] = useState(null);
  const [activeQuizIndex, setActiveQuizIndex] = useState(0);

  const fetchData = async () => {
    try {
      const quizzes = (await getQuizzes()) || [];
      const formattedQuizzes = formatQuizzes(quizzes);

      setError(null);
      setQuizzes(formattedQuizzes);
    } catch (error) {
      console.error('Failed to fetch data:', error);

      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const nextQuiz = () => {
    const nextQuizIndex =
      activeQuizIndex + 1 < quizzes.length ? activeQuizIndex + 1 : 0;
    setActiveQuizIndex(nextQuizIndex);
  };

  return (
    <div className="app">
      <h1>Multiple Choice Quizzes | Codecademy</h1>
      {!quizzes && !error && <div>The quiz will load shortly</div>}

      {error && <div>We're sorry. There seems to have an error!</div>}

      {quizzes && (
        <QuizContainer
          quiz={quizzes[activeQuizIndex]}
          title={quizzes[activeQuizIndex].title}
          questions={quizzes[activeQuizIndex].questions}
          nextQuiz={nextQuiz}
        />
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
