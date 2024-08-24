import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const QuizTaking = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  useEffect(() => {
    const fetchQuiz = async () => {
      const res = await axios.get(`/api/quizzes/${id}`);
      setQuiz(res.data);
    };
    fetchQuiz();
  }, [id]);

  const handleAnswerSelect = (index) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = index;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleSubmitQuiz = () => {
    const correctAnswers = quiz.questions.map((q) => q.correctAnswer);
    const score = selectedAnswers.reduce((acc, answer, index) => {
      if (answer === correctAnswers[index]) {
        return acc + 1;
      }
      return acc;
    }, 0);
    alert(`You scored ${score} out of ${quiz.questions.length}`);
  };

  if (!quiz) return <div>Loading...</div>;

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div>
      <h2>{quiz.title}</h2>
      <h3>{currentQuestion.question}</h3>
      {currentQuestion.options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleAnswerSelect(index)}
        >
          {option}
        </button>
      ))}
      {currentQuestionIndex < quiz.questions.length - 1 ? (
        <button onClick={handleNextQuestion}>Next</button>
      ) : (
        <button onClick={handleSubmitQuiz}>Submit</button>
      )}
    </div>
  );
};

export default QuizTaking;
