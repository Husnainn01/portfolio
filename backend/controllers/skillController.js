const { validationResult } = require('express-validator');
const Skill = require('../models/Skill');

// @route   GET /api/skills
// @desc    Get all skills
// @access  Public
exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ order: 1 });
    res.json(skills);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/skills/:id
// @desc    Get skill by ID
// @access  Public
exports.getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    
    if (!skill) {
      return res.status(404).json({ msg: 'Skill not found' });
    }
    
    res.json(skill);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Skill not found' });
    }
    res.status(500).send('Server error');
  }
};

// @route   POST /api/skills
// @desc    Create a skill
// @access  Private
exports.createSkill = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const { name, items, order } = req.body;
    
    // Check if skill with same name exists
    const existingSkill = await Skill.findOne({ name });
    if (existingSkill) {
      return res.status(400).json({ msg: 'Skill with this name already exists' });
    }
    
    // Create new skill
    const skill = new Skill({
      name,
      items: items.split(',').map(item => item.trim()),
      order: order || 0
    });
    
    await skill.save();
    
    res.json(skill);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   PUT /api/skills/:id
// @desc    Update a skill
// @access  Private
exports.updateSkill = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const { name, items, order } = req.body;
    
    // Find skill
    let skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ msg: 'Skill not found' });
    }
    
    // Check if skill with new name exists (for a different skill)
    if (name && name !== skill.name) {
      const existingSkill = await Skill.findOne({ 
        name,
        _id: { $ne: skill._id }
      });
      
      if (existingSkill) {
        return res.status(400).json({ msg: 'Skill with this name already exists' });
      }
    }
    
    // Build skill object
    const skillFields = {};
    if (name) skillFields.name = name;
    if (items) skillFields.items = items.split(',').map(item => item.trim());
    if (order !== undefined) skillFields.order = order;
    
    // Update skill
    skill = await Skill.findByIdAndUpdate(
      req.params.id,
      { $set: skillFields },
      { new: true }
    );
    
    res.json(skill);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   DELETE /api/skills/:id
// @desc    Delete a skill
// @access  Private
exports.deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    
    if (!skill) {
      return res.status(404).json({ msg: 'Skill not found' });
    }
    
    await Skill.findByIdAndRemove(req.params.id);
    
    res.json({ msg: 'Skill removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}; 