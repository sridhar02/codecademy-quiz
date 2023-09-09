export const getShuffledArr = arr => {
  const newArr = arr.slice();
  for (let i = newArr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr;
};

export const formatQuizzes = quizzes => {
  let formattedQuizzes = [];
  for (const quiz of quizzes) {
    formattedQuizzes.push({
      title: quiz.title,
      questions: formatQuestions(quiz.questions),
    });
  }
  return formattedQuizzes;
};

export const formatQuestions = questions => {
  let formattedQuestions = [];
  for (const question of questions) {
    formattedQuestions.push({
      text: question.text,
      correctAnswer: question.correctAnswer,
      answers: getShuffledArr([
        ...question.incorrectAnswers,
        question.correctAnswer,
      ]),
    });
  }

  return formattedQuestions;
};
