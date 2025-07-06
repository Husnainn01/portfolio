const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  subtitle: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    required: true
  },
  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String,
    website: String,
    instagram: String
  },
  resumeUrl: {
    type: String
  },
  resumeCloudinaryId: {
    type: String
  },
  picture: {
    type: String
  },
  cloudinaryId: {
    type: String
  }
});

// Singleton pattern - there should be only one profile document
ProfileSchema.statics.findOneOrCreate = async function() {
  const profile = await this.findOne();
  if (profile) {
    return profile;
  }
  
  return this.create({
    name: 'John Doe',
    title: 'Full Stack Developer',
    subtitle: 'Building exceptional digital experiences',
    bio: 'I specialize in creating robust, scalable applications with modern tech stacks.',
    contactEmail: 'john.doe@example.com',
    socialLinks: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    }
  });
};

module.exports = mongoose.model('Profile', ProfileSchema); 