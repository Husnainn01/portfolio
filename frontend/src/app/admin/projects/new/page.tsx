'use client';

import React, { useState } from 'react';
import {
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Alert,
  CircularProgress,
  Chip,
  Input
} from '@mui/material';
import { ArrowBack, Save, Add } from '@mui/icons-material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewProject() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [techInput, setTechInput] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    status: 'Live',
    tech: [] as string[],
    featured: false,
    demoUrl: '',
    githubUrl: ''
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: any) => {
    setFormData(prev => ({ ...prev, category: e.target.value }));
  };

  const handleStatusChange = (e: any) => {
    setFormData(prev => ({ ...prev, status: e.target.value }));
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, featured: e.target.checked }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTechInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTechInput(e.target.value);
  };

  const handleAddTech = () => {
    if (techInput.trim() && !formData.tech.includes(techInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tech: [...prev.tech, techInput.trim()]
      }));
      setTechInput('');
    }
  };

  const handleTechKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTech();
    }
  };

  const handleDeleteTech = (techToDelete: string) => {
    setFormData(prev => ({
      ...prev,
      tech: prev.tech.filter(tech => tech !== techToDelete)
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Only require image for Live projects
    if (!imageFile && formData.status === 'Live') {
      setError('Please select a project image for Live projects');
      setLoading(false);
      return;
    }

    if (formData.tech.length === 0) {
      setError('Please add at least one technology');
      setLoading(false);
      return;
    }

    try {
      // Create FormData object to send image with other data
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('category', formData.category);
      submitData.append('status', formData.status);
      submitData.append('tech', formData.tech.join(','));
      submitData.append('featured', String(formData.featured));
      
      if (formData.demoUrl) {
        submitData.append('demoUrl', formData.demoUrl);
      }
      
      if (formData.githubUrl) {
        submitData.append('githubUrl', formData.githubUrl);
      }
      
      // Only append image if it exists
      if (imageFile) {
        submitData.append('image', imageFile);
      }

      // Helper function to get token from cookies
      const getCookie = (name: string): string | null => {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) === ' ') c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
      };

      const token = getCookie('token');
      await axios.post(`${API_URL}/api/projects`, submitData, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'multipart/form-data'
        }
      });

      // Redirect after successful creation
      router.push('/admin/projects');
    } catch (err: any) {
      console.error('Error creating project:', err);
      setError(err.response?.data?.msg || 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    'Frontend',
    'Backend',
    'Full Stack',
    'Mobile',
    'Web',
    'UI/UX',
    'DevOps',
    'Machine Learning',
    'Game',
    'Other'
  ];

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          New Project
        </Typography>
        <Link href="/admin/projects">
          <Button 
            variant="outlined" 
            startIcon={<ArrowBack />}
          >
            Back to Projects
          </Button>
        </Link>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Paper sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Title and Category */}
            <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
              <TextField
                name="title"
                label="Project Title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
              />
              
              <FormControl required fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  value={formData.category}
                  onChange={handleSelectChange}
                  label="Category"
                >
                  {categories.map(category => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl required fullWidth>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  id="status"
                  value={formData.status}
                  onChange={handleStatusChange}
                  label="Status"
                >
                  <MenuItem value="Live">Live</MenuItem>
                  <MenuItem value="In Development">In Development</MenuItem>
                  <MenuItem value="Coming Soon">Coming Soon</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="On Hold">On Hold</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Description */}
            <TextField
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              required
              multiline
              rows={4}
              variant="outlined"
            />

            {/* Tech Stack */}
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Technologies
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TextField
                  label="Add Technology"
                  value={techInput}
                  onChange={handleTechInputChange}
                  onKeyDown={handleTechKeyDown}
                  fullWidth
                  variant="outlined"
                />
                <Button 
                  onClick={handleAddTech} 
                  variant="contained" 
                  sx={{ ml: 1, height: 56 }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Add />
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.tech.map((tech, index) => (
                  <Chip
                    key={index}
                    label={tech}
                    onDelete={() => handleDeleteTech(tech)}
                    sx={{ m: 0.5 }}
                  />
                ))}
                {formData.tech.length === 0 && (
                  <Typography variant="body2" color="text.secondary">
                    No technologies added yet
                  </Typography>
                )}
              </Box>
            </Box>

            {/* URLs */}
            <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
              <TextField
                name="demoUrl"
                label="Demo URL"
                value={formData.demoUrl}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                placeholder="https://example.com"
              />
              
              <TextField
                name="githubUrl"
                label="GitHub URL"
                value={formData.githubUrl}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                placeholder="https://github.com/username/repo"
              />
            </Box>

            {/* Image Upload */}
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Project Image
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Input
                  type="file"
                  id="image-upload"
                  inputProps={{ accept: 'image/*' }}
                  onChange={handleImageChange}
                  disableUnderline
                />
                {imagePreview && (
                  <Box sx={{ mt: 2 }}>
                    <img
                      src={imagePreview}
                      alt="Project preview"
                      style={{ 
                        maxWidth: '100%', 
                        maxHeight: '200px',
                        objectFit: 'contain',
                        borderRadius: '4px'
                      }}
                    />
                  </Box>
                )}
              </Box>
            </Box>

            {/* Featured Switch */}
            <FormControlLabel
              control={
                <Switch
                  checked={formData.featured}
                  onChange={handleSwitchChange}
                  name="featured"
                  color="primary"
                />
              }
              label="Featured Project"
            />

            {/* Submit Button */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                className="bg-blue-600 hover:bg-blue-700"
                startIcon={<Save />}
                disabled={loading}
                sx={{ px: 4, py: 1.2 }}
              >
                {loading ? 'Saving...' : 'Save Project'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </>
  );
} 