const express = require('express');
const Project = require('../models/Project');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { name, description } = req.body;
  const project = new Project({ name, description, owner: req.user._id });
  await project.save();
  res.send(project);
});

router.get('/', auth, async (req, res) => {
  const projects = await Project.find({ owner: req.user._id });
  res.send(projects);
});

router.get('/:id', auth, async (req, res) => {
  const project = await Project.findById(req.params.id).populate('tasks');
  res.send(project);
});

module.exports = router;
