'use client';

import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Alert,
  CircularProgress,
  Divider
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  DragIndicator as DragIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import axios from 'axios';

interface Skill {
  _id: string;
  name: string;
  items: string[];
  order: number;
}

export default function SkillsManagement() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [skillName, setSkillName] = useState('');
  const [skillItem, setSkillItem] = useState('');
  const [skillItems, setSkillItems] = useState<string[]>([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/api/skills`, {
        headers: {
          'x-auth-token': token
        }
      });
      // Sort by order
      setSkills(res.data.sort((a: Skill, b: Skill) => a.order - b.order));
      setError('');
    } catch (err: any) {
      setError('Failed to fetch skills');
      console.error('Error fetching skills:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, [API_URL]);

  const handleOpenDialog = (skill?: Skill) => {
    if (skill) {
      // Edit mode
      setEditingSkill(skill);
      setSkillName(skill.name);
      setSkillItems([...skill.items]);
    } else {
      // Add mode
      setEditingSkill(null);
      setSkillName('');
      setSkillItems([]);
    }
    setSkillItem('');
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleAddItem = () => {
    if (skillItem.trim() && !skillItems.includes(skillItem.trim())) {
      setSkillItems([...skillItems, skillItem.trim()]);
      setSkillItem('');
    }
  };

  const handleItemKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddItem();
    }
  };

  const handleDeleteItem = (itemToDelete: string) => {
    setSkillItems(skillItems.filter(item => item !== itemToDelete));
  };

  const handleSave = async () => {
    if (!skillName.trim()) {
      setError('Skill name is required');
      return;
    }

    if (skillItems.length === 0) {
      setError('At least one skill item is required');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const skillData = {
        name: skillName.trim(),
        items: skillItems.join(','),
        order: editingSkill?.order || skills.length
      };

      if (editingSkill) {
        // Update existing skill
        await axios.put(`${API_URL}/api/skills/${editingSkill._id}`, skillData, {
          headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json'
          }
        });
        setSuccess('Skill updated successfully');
      } else {
        // Create new skill
        await axios.post(`${API_URL}/api/skills`, skillData, {
          headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json'
          }
        });
        setSuccess('Skill added successfully');
      }

      fetchSkills();
      handleCloseDialog();
      
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Failed to save skill');
      console.error('Error saving skill:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (skill: Skill) => {
    if (!window.confirm(`Are you sure you want to delete "${skill.name}"?`)) {
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/api/skills/${skill._id}`, {
        headers: {
          'x-auth-token': token
        }
      });
      
      setSuccess('Skill deleted successfully');
      fetchSkills();
      
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (err: any) {
      setError('Failed to delete skill');
      console.error('Error deleting skill:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Skills
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Add Skill
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}

      {loading && skills.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          {skills.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                No skills added yet
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Click the "Add Skill" button to add your first skill
              </Typography>
            </Paper>
          ) : (
            <List sx={{ bgcolor: 'background.paper' }}>
              {skills.map((skill, index) => (
                <React.Fragment key={skill._id}>
                  {index > 0 && <Divider component="li" />}
                  <ListItem
                    secondaryAction={
                      <Box>
                        <IconButton edge="end" aria-label="edit" onClick={() => handleOpenDialog(skill)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(skill)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                  >
                    <DragIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <ListItemText
                      primary={skill.name}
                      secondary={
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                          {skill.items.map((item, i) => (
                            <Chip key={i} label={item} size="small" />
                          ))}
                        </Box>
                      }
                    />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          )}
        </Box>
      )}

      {/* Add/Edit Skill Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>{editingSkill ? 'Edit Skill' : 'Add New Skill'}</DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Skill Category Name"
            fullWidth
            variant="outlined"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Typography variant="subtitle2" gutterBottom>
            Skills
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TextField
              label="Add Skill Item"
              value={skillItem}
              onChange={(e) => setSkillItem(e.target.value)}
              onKeyDown={handleItemKeyDown}
              fullWidth
              variant="outlined"
              size="small"
            />
            <Button 
              onClick={handleAddItem} 
              variant="contained" 
              sx={{ ml: 1, height: 40 }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <AddIcon />
            </Button>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {skillItems.map((item, index) => (
              <Chip
                key={index}
                label={item}
                onDelete={() => handleDeleteItem(item)}
              />
            ))}
            {skillItems.length === 0 && (
              <Typography variant="body2" color="text.secondary">
                No skill items added yet
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} startIcon={<SaveIcon />} variant="contained" className="bg-blue-600 hover:bg-blue-700">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
} 