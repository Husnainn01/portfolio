const { validationResult } = require('express-validator');
const Profile = require('../models/Profile');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

// Helper function to upload to Cloudinary
const uploadToCloudinary = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `portfolio/${folder}`,
        upload_preset: 'portfolio',
        resource_type: 'auto'
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

// @route   GET /api/profile
// @desc    Get profile information
// @access  Public
exports.getProfile = async (req, res) => {
  try {
    // There should only be one profile, so we'll find or create it
    const profile = await Profile.findOneOrCreate();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   PUT /api/profile
// @desc    Update profile information
// @access  Private
exports.updateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const {
    name,
    title,
    subtitle,
    bio,
    contactEmail,
    github,
    linkedin,
    twitter,
    website,
    instagram
  } = req.body;
  
  try {
    // Find or create profile
    let profile = await Profile.findOneOrCreate();
    
    // Build profile object
    const profileFields = {};
    if (name) profileFields.name = name;
    if (title) profileFields.title = title;
    if (subtitle) profileFields.subtitle = subtitle;
    if (bio) profileFields.bio = bio;
    if (contactEmail) profileFields.contactEmail = contactEmail;
    
    // Build social links object
    profileFields.socialLinks = {};
    if (github) profileFields.socialLinks.github = github;
    if (linkedin) profileFields.socialLinks.linkedin = linkedin;
    if (twitter) profileFields.socialLinks.twitter = twitter;
    if (website) profileFields.socialLinks.website = website;
    if (instagram) profileFields.socialLinks.instagram = instagram;
    
    // Handle profile picture upload
    if (req.file) {
      try {
        // Delete old picture from Cloudinary if it exists
        if (profile.cloudinaryId) {
          await cloudinary.uploader.destroy(profile.cloudinaryId);
        }
        
        // Upload new picture
        const result = await uploadToCloudinary(req.file.buffer, 'profile');
        profileFields.picture = result.secure_url;
        profileFields.cloudinaryId = result.public_id;
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        return res.status(400).json({ msg: 'Image upload failed' });
      }
    }
    
    // Update profile
    profile = await Profile.findByIdAndUpdate(
      profile._id,
      { $set: profileFields },
      { new: true }
    );
    
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   POST /api/profile/resume
// @desc    Upload resume
// @access  Private
exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'Please upload a PDF file' });
    }
    
    // Find profile
    let profile = await Profile.findOneOrCreate();
    
    try {
      // Delete old resume from Cloudinary if it exists
      if (profile.resumeCloudinaryId) {
        await cloudinary.uploader.destroy(profile.resumeCloudinaryId);
      }
      
      // Upload new resume
      const result = await uploadToCloudinary(req.file.buffer, 'resume');
      profile.resumeUrl = result.secure_url;
      profile.resumeCloudinaryId = result.public_id;
      await profile.save();
      
      res.json({ resumeUrl: profile.resumeUrl });
    } catch (uploadError) {
      console.error('Cloudinary upload error:', uploadError);
      return res.status(400).json({ msg: 'Resume upload failed' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};