'use client';

import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  StarBorder as StarBorderIcon,
  Star as StarIcon
} from '@mui/icons-material';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Project {
  _id: string;
  title: string;
  description: string;
  slug: string;
  category: string;
  tech: string[];
  featured: boolean;
  image: string;
}

export default function ProjectsManagement() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

  const fetchProjects = async () => {
    setLoading(true);
    try {
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
      const res = await axios.get(`${API_URL}/api/projects`, {
        headers: {
          'x-auth-token': token
        }
      });
      setProjects(res.data);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Failed to fetch projects');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [API_URL]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
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
      await axios.delete(`${API_URL}/api/projects/${id}`, {
        headers: {
          'x-auth-token': token
        }
      });
      setSuccessMessage('Project deleted successfully');
      fetchProjects();
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Failed to delete project');
      console.error('Error deleting project:', err);
    }
  };

  const handleToggleFeatured = async (project: Project) => {
    try {
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
      await axios.put(
        `${API_URL}/api/projects/${project._id}`,
        {
          ...project,
          featured: !project.featured
        },
        {
          headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json'
          }
        }
      );
      
      setSuccessMessage(`Project ${project.featured ? 'removed from' : 'added to'} featured projects`);
      fetchProjects();
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Failed to update project');
      console.error('Error updating project:', err);
    }
  };

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Projects
        </Typography>
        <Link href="/admin/projects/new">
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            className="bg-blue-600 hover:bg-blue-700"
          >
            New Project
          </Button>
        </Link>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      {successMessage && <Alert severity="success" sx={{ mb: 3 }}>{successMessage}</Alert>}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 650 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Technologies</TableCell>
                  <TableCell>Featured</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projects.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No projects found. Add your first project!
                    </TableCell>
                  </TableRow>
                ) : (
                  projects.map((project) => (
                    <TableRow key={project._id} hover>
                      <TableCell>
                        {project.image ? (
                          <Box
                            component="img"
                            sx={{
                              width: 60,
                              height: 40,
                              objectFit: 'cover',
                              borderRadius: 1
                            }}
                            src={project.image}
                            alt={project.title}
                            onError={(e: any) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              width: 60,
                              height: 40,
                              backgroundColor: '#f0f0f0',
                              borderRadius: 1,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '12px',
                              color: '#666'
                            }}
                          >
                            No Image
                          </Box>
                        )}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'medium' }}>{project.title}</TableCell>
                      <TableCell>
                        <Chip 
                          label={project.category} 
                          size="small" 
                          sx={{ backgroundColor: '#e2e8f0' }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {project.tech.slice(0, 3).map((tech, index) => (
                            <Chip 
                              key={index} 
                              label={tech} 
                              size="small" 
                              sx={{ backgroundColor: '#f3f4f6' }} 
                            />
                          ))}
                          {project.tech.length > 3 && (
                            <Chip 
                              label={`+${project.tech.length - 3}`} 
                              size="small" 
                              variant="outlined" 
                            />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <IconButton 
                          onClick={() => handleToggleFeatured(project)}
                          color={project.featured ? 'primary' : 'default'}
                          size="small"
                        >
                          {project.featured ? <StarIcon /> : <StarBorderIcon />}
                        </IconButton>
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <Link href={`/projects/${project.slug}`} target="_blank" passHref>
                            <IconButton size="small">
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                          </Link>
                          <Link href={`/admin/projects/${project.slug}`} passHref>
                            <IconButton size="small" color="primary">
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Link>
                          <IconButton 
                            size="small" 
                            color="error" 
                            onClick={() => handleDelete(project._id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </div>
  );
} 