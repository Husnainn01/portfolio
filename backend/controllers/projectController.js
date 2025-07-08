const { validationResult } = require('express-validator');
const Project = require('../models/Project');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

// Helper function to create slug from title
const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

// Helper function to upload to Cloudinary
const uploadToCloudinary = (buffer) => {
  console.log('🔧 uploadToCloudinary called with buffer size:', buffer.length);
  
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'Home/personal',
        transformation: [
          { width: 800, height: 600, crop: 'limit' },
          { quality: 'auto' }
        ]
      },
      (error, result) => {
        if (error) {
          console.error('❌ Cloudinary stream error:', error);
          return reject(error);
        }
        console.log('✅ Cloudinary stream success:', {
          url: result.secure_url,
          public_id: result.public_id
        });
        resolve(result);
      }
    );
    
    console.log('📡 Piping buffer to Cloudinary...');
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

// @route   GET /api/projects
// @desc    Get all projects
// @access  Public
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/projects/featured
// @desc    Get featured projects
// @access  Public
exports.getFeaturedProjects = async (req, res) => {
  try {
    const projects = await Project.find({ featured: true })
                                 .sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/projects/:slug
// @desc    Get project by slug
// @access  Public
exports.getProjectBySlug = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   POST /api/projects
// @desc    Create a project
// @access  Private
exports.createProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const { title, description, tech, demoUrl, githubUrl, category, status, featured, order } = req.body;
    
    // Generate a slug from the title
    const slug = createSlug(title);
    
    // Check if slug already exists
    const existingProject = await Project.findOne({ slug });
    if (existingProject) {
      return res.status(400).json({ msg: 'A project with this title already exists' });
    }
    
    // Create project object
    const projectData = {
      title,
      slug,
      description,
      tech: tech.split(',').map(item => item.trim()),
      category,
      status: status || 'Live',
      featured: featured === 'true',
      order: order || 0
    };
    
    // Add optional fields if they exist
    if (demoUrl) projectData.demoUrl = demoUrl;
    if (githubUrl) projectData.githubUrl = githubUrl;
    
    // Handle image upload
    if (req.file) {
      console.log('📤 File received for upload:', {
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size
      });
      
      try {
        console.log('🔄 Starting Cloudinary upload...');
        const result = await uploadToCloudinary(req.file.buffer);
        console.log('✅ Cloudinary upload successful:', {
          secure_url: result.secure_url,
          public_id: result.public_id,
          folder: result.folder
        });
        
        projectData.image = result.secure_url;
        projectData.cloudinaryId = result.public_id;
      } catch (uploadError) {
        console.error('❌ Cloudinary upload error:', uploadError);
        return res.status(400).json({ msg: 'Image upload failed', error: uploadError.message });
      }
    } else {
      console.log('⚠️ No file received in request');
      
      // For Live projects, image is required
      if (projectData.status === 'Live') {
        return res.status(400).json({ msg: 'Image is required for Live projects' });
      }
      
      // For non-Live projects, set a placeholder or leave empty
      projectData.image = '';
    }
    
    const project = new Project(projectData);
    await project.save();
    
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   PUT /api/projects/:id
// @desc    Update a project
// @access  Private
exports.updateProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const { title, description, tech, demoUrl, githubUrl, category, status, featured, order } = req.body;
    
    // Find project
    let project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    
    // Build project object
    const projectFields = {};
    if (title) {
      projectFields.title = title;
      projectFields.slug = createSlug(title);
      
      // Check if new slug already exists (for a different project)
      if (projectFields.slug !== project.slug) {
        const existingProject = await Project.findOne({ 
          slug: projectFields.slug,
          _id: { $ne: project._id }
        });
        
        if (existingProject) {
          return res.status(400).json({ msg: 'A project with this title already exists' });
        }
      }
    }
    if (description) projectFields.description = description;
    if (tech) projectFields.tech = tech.split(',').map(item => item.trim());
    if (category) projectFields.category = category;
    if (status) projectFields.status = status;
    if (featured !== undefined) projectFields.featured = featured === 'true';
    if (order !== undefined) projectFields.order = order;
    if (demoUrl) projectFields.demoUrl = demoUrl;
    if (githubUrl) projectFields.githubUrl = githubUrl;
    
    // Handle image upload
    if (req.file) {
      try {
        // Delete old image from Cloudinary if it exists
        if (project.cloudinaryId) {
          await cloudinary.uploader.destroy(project.cloudinaryId);
        }
        
        // Upload new image
        const result = await uploadToCloudinary(req.file.buffer);
        projectFields.image = result.secure_url;
        projectFields.cloudinaryId = result.public_id;
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        return res.status(400).json({ msg: 'Image upload failed' });
      }
    }
    
    // Update project
    project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: projectFields },
      { new: true }
    );
    
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   DELETE /api/projects/:id
// @desc    Delete a project
// @access  Private
exports.deleteProject = async (req, res) => {
  try {
    // Find project
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    
    // Delete image from Cloudinary if exists
    if (project.cloudinaryId) {
      await cloudinary.uploader.destroy(project.cloudinaryId);
    }
    
    // Delete project
    await Project.findByIdAndDelete(req.params.id);
    
    res.json({ msg: 'Project removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}; 