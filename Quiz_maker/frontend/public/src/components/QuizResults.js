import React from 'react';

const QuizResults = ({ score, total }) => (
  <div>
    <h2>Quiz Results</h2>
    <p>Your score is {score} out of {total}</p>
  </div>
);

export default QuizResults;

