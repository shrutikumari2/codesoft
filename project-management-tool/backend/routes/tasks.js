const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { name, description, projectId, assignedTo, deadline } = req.body;
  const task = new Task({ name, description, project: projectId, assignedTo, deadline });
  await task.save();
  res.send(task);
});

router.get('/:projectId', auth, async (req, res) => {
  const tasks = await Task.find({ project: req.params.projectId });
  res.send(tasks);
});

router.put('/:id', auth, async (req, res) => {
  const { status } = req.body;
  const task = await Task.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.send(task);
});

module.exports = router;
