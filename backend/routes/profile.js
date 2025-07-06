const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const profileController = require('../controllers/profileController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// @route   GET /api/profile
// @desc    Get profile information
// @access  Public
router.get('/', profileController.getProfile);

// @route   PUT /api/profile
// @desc    Update profile information
// @access  Private
router.put(
  '/',
  [
    auth,
    upload.single('picture'),
    [
      check('name', 'Name is required').not().isEmpty(),
      check('title', 'Title is required').not().isEmpty(),
      check('subtitle', 'Subtitle is required').not().isEmpty(),
      check('bio', 'Bio is required').not().isEmpty(),
      check('contactEmail', 'Contact email is required').isEmail()
    ]
  ],
  profileController.updateProfile
);

// @route   POST /api/profile/resume
// @desc    Upload resume
// @access  Private
router.post(
  '/resume',
  [auth, upload.single('resume')],
  profileController.uploadResume
);

module.exports = router; 