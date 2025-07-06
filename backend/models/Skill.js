const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  items: {
    type: [String],
    required: true
  },
  order: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Skill', SkillSchema); 