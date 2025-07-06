const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  tech: {
    type: [String],
    required: true
  },
  image: {
    type: String,
    required: true
  },
  cloudinaryId: {
    type: String
  },
  demoUrl: {
    type: String
  },
  githubUrl: {
    type: String
  },
  category: {
    type: String,
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', ProjectSchema); 