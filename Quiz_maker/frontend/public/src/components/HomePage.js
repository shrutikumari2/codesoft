import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div>
    <h1>Welcome to Quiz Maker</h1>
    <Link to="/create">Create a Quiz</Link>
    <Link to="/quizzes">Take a Quiz</Link>
  </div>
);

export default HomePage;
