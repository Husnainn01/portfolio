const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const projectController = require('../controllers/projectController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// @route   GET /api/projects
// @desc    Get all projects
// @access  Public
router.get('/', projectController.getProjects);

// @route   GET /api/projects/featured
// @desc    Get featured projects
// @access  Public
router.get('/featured', projectController.getFeaturedProjects);

// @route   GET /api/projects/:slug
// @desc    Get project by slug
// @access  Public
router.get('/:slug', projectController.getProjectBySlug);

// @route   POST /api/projects
// @desc    Create a project
// @access  Private
router.post(
  '/',
  [
    auth,
    upload.single('image'),
    [
      check('title', 'Title is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('tech', 'Technologies are required').not().isEmpty(),
      check('category', 'Category is required').not().isEmpty()
    ]
  ],
  projectController.createProject
);

// @route   PUT /api/projects/:id
// @desc    Update a project
// @access  Private
router.put(
  '/:id',
  [
    auth,
    upload.single('image')
  ],
  projectController.updateProject
);

// @route   DELETE /api/projects/:id
// @desc    Delete a project
// @access  Private
router.delete('/:id', auth, projectController.deleteProject);

module.exports = router; 