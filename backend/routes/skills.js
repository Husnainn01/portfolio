const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const skillController = require('../controllers/skillController');
const auth = require('../middleware/auth');

// @route   GET /api/skills
// @desc    Get all skills
// @access  Public
router.get('/', skillController.getSkills);

// @route   GET /api/skills/:id
// @desc    Get skill by ID
// @access  Public
router.get('/:id', skillController.getSkillById);

// @route   POST /api/skills
// @desc    Create a skill
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('items', 'Items are required').not().isEmpty()
    ]
  ],
  skillController.createSkill
);

// @route   PUT /api/skills/:id
// @desc    Update a skill
// @access  Private
router.put('/:id', auth, skillController.updateSkill);

// @route   DELETE /api/skills/:id
// @desc    Delete a skill
// @access  Private
router.delete('/:id', auth, skillController.deleteSkill);

module.exports = router; 