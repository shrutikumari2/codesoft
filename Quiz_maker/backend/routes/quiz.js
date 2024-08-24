const express = require('express');
const auth = require('../middleware/auth');
const Quiz = require('../models/Quiz');
const router = express.Router();

router.post('/create', auth, async (req, res) => {
  const { title, questions } = req.body;
  const quiz = new Quiz({ title, questions, createdBy: req.user._id });
  await quiz.save();
  res.send(quiz);
});

router.get('/', async (req, res) => {
  const quizzes = await Quiz.find().populate('createdBy', 'name');
  res.send(quizzes);
});

router.get('/:id', async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  res.send(quiz);
});

module.exports = router;
