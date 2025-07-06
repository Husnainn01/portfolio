'use client';

import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Grid,
  Avatar,
  Alert,
  CircularProgress,
  Divider,
  InputAdornment,
  Input
} from '@mui/material';
import {
  Save as SaveIcon,
  Person as PersonIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Language as WebsiteIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  Description as ResumeIcon
} from '@mui/icons-material';
import axios from 'axios';

interface Profile {
  _id: string;
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  contactEmail: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
    instagram?: string;
  };
  resumeUrl?: string;
  picture?: string;
}

export default function ProfileManagement() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [pictureFile, setPictureFile] = useState<File | null>(null);
  const [picturePreview, setPicturePreview] = useState<string | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeName, setResumeName] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    subtitle: '',
    bio: '',
    contactEmail: '',
    github: '',
    linkedin: '',
    twitter: '',
    website: '',
    instagram: ''
  });

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/profile`);
      const profileData = res.data;
      
      setProfile(profileData);
      setFormData({
        name: profileData.name || '',
        title: profileData.title || '',
        subtitle: profileData.subtitle || '',
        bio: profileData.bio || '',
        contactEmail: profileData.contactEmail || '',
        github: profileData.socialLinks?.github || '',
        linkedin: profileData.socialLinks?.linkedin || '',
        twitter: profileData.socialLinks?.twitter || '',
        website: profileData.socialLinks?.website || '',
        instagram: profileData.socialLinks?.instagram || '',
      });
      
      // Set picture preview if exists
      if (profileData.picture) {
        setPicturePreview(`${API_URL}${profileData.picture}`);
      }
      
      // Set resume name if exists
      if (profileData.resumeUrl) {
        setResumeName(profileData.resumeUrl.split('/').pop() || 'resume.pdf');
      }
      
      setError('');
    } catch (err: any) {
      console.error('Error fetching profile:', err);
      setError('Failed to fetch profile information');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [API_URL]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPictureFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setPicturePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setResumeFile(file);
      setResumeName(file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      // Create FormData object
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('title', formData.title);
      submitData.append('subtitle', formData.subtitle);
      submitData.append('bio', formData.bio);
      submitData.append('contactEmail', formData.contactEmail);
      submitData.append('github', formData.github || '');
      submitData.append('linkedin', formData.linkedin || '');
      submitData.append('twitter', formData.twitter || '');
      submitData.append('website', formData.website || '');
      submitData.append('instagram', formData.instagram || '');
      
      // Add picture if selected
      if (pictureFile) {
        submitData.append('picture', pictureFile);
      }

      const token = localStorage.getItem('token');
      await axios.put(`${API_URL}/api/profile`, submitData, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'multipart/form-data'
        }
      });

      // Upload resume if selected
      if (resumeFile) {
        const resumeData = new FormData();
        resumeData.append('resume', resumeFile);
        
        await axios.post(`${API_URL}/api/profile/resume`, resumeData, {
          headers: {
            'x-auth-token': token,
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      setSuccess('Profile updated successfully');
      fetchProfile();
      window.scrollTo(0, 0);
    } catch (err: any) {
      console.error('Error updating profile:', err);
      setError(err.response?.data?.msg || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading && !profile) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Profile Information
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Update your personal information and social links displayed on your portfolio.
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}

      <Paper sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar
                  src={picturePreview || undefined}
                  alt={formData.name}
                  sx={{ width: 150, height: 150, mb: 2 }}
                >
                  {!picturePreview && <PersonIcon sx={{ fontSize: 80 }} />}
                </Avatar>
                <Typography variant="subtitle1" gutterBottom>
                  Profile Picture
                </Typography>
                <Input
                  type="file"
                  id="picture-upload"
                  inputProps={{ accept: 'image/*' }}
                  onChange={handlePictureChange}
                  disableUnderline
                  sx={{ mt: 1 }}
                />
                <Box sx={{ mt: 4 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Resume
                  </Typography>
                  {resumeName && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Current: {resumeName}
                    </Typography>
                  )}
                  <Input
                    type="file"
                    id="resume-upload"
                    inputProps={{ accept: '.pdf' }}
                    onChange={handleResumeChange}
                    disableUnderline
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Typography variant="h6">Personal Information</Typography>
                
                <TextField
                  name="name"
                  label="Name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                />
                
                <TextField
                  name="title"
                  label="Title"
                  value={formData.title}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                />
                
                <TextField
                  name="subtitle"
                  label="Subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                />
                
                <TextField
                  name="bio"
                  label="Bio"
                  value={formData.bio}
                  onChange={handleChange}
                  fullWidth
                  required
                  multiline
                  rows={4}
                  variant="outlined"
                />
                
                <TextField
                  name="contactEmail"
                  label="Contact Email"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                  type="email"
                />
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="h6">Social Links</Typography>
                
                <TextField
                  name="github"
                  label="GitHub"
                  value={formData.github}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  placeholder="https://github.com/yourusername"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <GitHubIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                
                <TextField
                  name="linkedin"
                  label="LinkedIn"
                  value={formData.linkedin}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  placeholder="https://linkedin.com/in/yourusername"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LinkedInIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                
                <TextField
                  name="twitter"
                  label="Twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  placeholder="https://twitter.com/yourusername"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TwitterIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                
                <TextField
                  name="website"
                  label="Website"
                  value={formData.website}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  placeholder="https://yourwebsite.com"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <WebsiteIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                
                <TextField
                  name="instagram"
                  label="Instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  placeholder="https://instagram.com/yourusername"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <InstagramIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<SaveIcon />}
                    disabled={saving}
                    className="bg-blue-600 hover:bg-blue-700"
                    sx={{ px: 4, py: 1.2 }}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  );
} 