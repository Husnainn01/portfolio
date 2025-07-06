'use client';

import React, { useEffect, useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Paper, 
  Box,
  CircularProgress,
  Avatar,
  Chip,
  LinearProgress,
  Button,
  Container
} from '@mui/material';
import { 
  Dashboard as DashboardIcon, 
  DesignServices as ProjectsIcon, 
  Psychology as SkillsIcon,
  Email as EmailIcon,
  TrendingUp as TrendingUpIcon,
  Code as CodeIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Analytics as AnalyticsIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import axios from 'axios';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';

interface DashboardStats {
  projectsCount: number;
  skillsCount: number;
  messagesCount: number;
  loading: boolean;
}

export default function AdminDashboard() {
  console.log('🏠 Admin Dashboard page loaded successfully!');
  
  const [stats, setStats] = useState<DashboardStats>({
    projectsCount: 0,
    skillsCount: 0,
    messagesCount: 0,
    loading: true
  });

  const { user } = useAuth();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

  useEffect(() => {
    const fetchStats = async () => {
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
        
        // Get projects count
        const projectsRes = await axios.get(`${API_URL}/api/projects`, {
          headers: {
            'x-auth-token': token
          }
        });
        
        // Get skills count
        const skillsRes = await axios.get(`${API_URL}/api/skills`, {
          headers: {
            'x-auth-token': token
          }
        });
        
        setStats({
          projectsCount: projectsRes.data.length,
          skillsCount: skillsRes.data.length,
          messagesCount: 12, // Mock data for now
          loading: false
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, [API_URL]);

  if (stats.loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '60vh',
        gap: 2
      }}>
        <CircularProgress size={40} thickness={4} />
        <Typography variant="body1" color="text.secondary">
          Loading dashboard...
        </Typography>
      </Box>
    );
  }

  const welcomeTime = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const quickStats = [
    {
      title: 'Total Projects',
      value: stats.projectsCount,
      change: '+12%',
      changeType: 'positive',
      icon: <ProjectsIcon sx={{ fontSize: 24 }} />,
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      link: '/admin/projects'
    },
    {
      title: 'Skills Listed',
      value: stats.skillsCount,
      change: '+8%',
      changeType: 'positive',
      icon: <SkillsIcon sx={{ fontSize: 24 }} />,
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      link: '/admin/skills'
    },
    {
      title: 'Portfolio Views',
      value: '2.4k',
      change: '+23%',
      changeType: 'positive',
      icon: <VisibilityIcon sx={{ fontSize: 24 }} />,
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      link: '/admin/analytics'
    },
    {
      title: 'Contact Messages',
      value: stats.messagesCount,
      change: '+5%',
      changeType: 'positive',
      icon: <EmailIcon sx={{ fontSize: 24 }} />,
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      link: '/admin/messages'
    }
  ];

  const quickActions = [
    { title: 'Add New Project', icon: <AddIcon />, link: '/admin/projects/new', color: '#1976d2' },
    { title: 'Update Skills', icon: <EditIcon />, link: '/admin/skills', color: '#9c27b0' },
    { title: 'Edit Profile', icon: <EditIcon />, link: '/admin/profile', color: '#f57c00' },
    { title: 'View Analytics', icon: <AnalyticsIcon />, link: '/admin/analytics', color: '#388e3c' }
  ];

  return (
    <Box sx={{ maxWidth: 1920, mx: 'auto' }}>
      {/* Header with action button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h5" fontWeight="bold">
            Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Overview & Analytics
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          sx={{ borderRadius: 2, textTransform: 'none' }}
        >
          Add New Project
        </Button>
      </Box>

      {/* Welcome Banner */}
      <Paper 
        elevation={0} 
        sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          p: 3,
          mb: 4,
          borderRadius: 2,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
            <Avatar 
              sx={{ 
                width: 64, 
                height: 64, 
                bgcolor: 'rgba(255,255,255,0.2)',
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}
            >
              {user?.username?.charAt(0).toUpperCase() || 'A'}
            </Avatar>
            <Box>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {welcomeTime()}, {user?.username || 'Admin'}!
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Welcome back to your portfolio dashboard
              </Typography>
            </Box>
          </Box>
          <Typography variant="body1" sx={{ opacity: 0.8, maxWidth: '600px' }}>
            Manage your portfolio content, track performance, and showcase your work to the world.
          </Typography>
        </Box>
        
        {/* Background decoration */}
        <Box sx={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          zIndex: 0
        }} />
      </Paper>

      {/* Stats Cards - 4 in a row */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
        {quickStats.map((stat, index) => (
          <Box key={index} sx={{ flex: '1 1 calc(25% - 18px)', minWidth: '250px' }}>
            <Link href={stat.link} style={{ textDecoration: 'none' }}>
              <Card 
                sx={{ 
                  height: '100%',
                  background: stat.color,
                  color: 'white',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 20px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ 
                      p: 1.5, 
                      borderRadius: 2, 
                      bgcolor: 'rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      {stat.icon}
                    </Box>
                    <Chip 
                      label={stat.change} 
                      size="small"
                      sx={{ 
                        bgcolor: 'rgba(255,255,255,0.2)', 
                        color: 'white',
                        fontWeight: 'bold'
                      }} 
                    />
                  </Box>
                  <Typography variant="h3" fontWeight="bold" gutterBottom>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {stat.title}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Box>
        ))}
      </Box>

      {/* Content Grid - 2/3 + 1/3 Layout */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
        {/* Quick Actions Panel - 2/3 Width */}
        <Box sx={{ flex: '2 1 600px', minWidth: '300px' }}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: '1px solid #e0e0e0' }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {quickActions.map((action, index) => (
                <Box key={index} sx={{ flex: '1 1 calc(50% - 8px)', minWidth: '250px' }}>
                  <Link href={action.link} style={{ textDecoration: 'none' }}>
                    <Paper 
                      elevation={0}
                      sx={{ 
                        p: 2.5,
                        borderRadius: 2,
                        border: '1px solid #e0e0e0',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
                          borderColor: action.color
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{
                          p: 1,
                          borderRadius: 1,
                          bgcolor: `${action.color}15`,
                          color: action.color,
                          display: 'flex',
                          alignItems: 'center'
                        }}>
                          {action.icon}
                        </Box>
                        <Typography variant="subtitle1" fontWeight="medium">
                          {action.title}
                        </Typography>
                      </Box>
                    </Paper>
                  </Link>
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>

        {/* Portfolio Tips - 1/3 Width */}
        <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: '1px solid #e0e0e0', height: '100%' }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
              Portfolio Tips
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                { icon: <CodeIcon />, text: 'Keep your projects updated with latest technologies', color: '#1976d2' },
                { icon: <TrendingUpIcon />, text: 'Add detailed descriptions to showcase your skills', color: '#388e3c' },
                { icon: <VisibilityIcon />, text: 'Use high-quality images for better presentation', color: '#f57c00' }
              ].map((tip, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box sx={{
                    p: 0.5,
                    borderRadius: 1,
                    bgcolor: `${tip.color}15`,
                    color: tip.color,
                    display: 'flex',
                    alignItems: 'center',
                    mt: 0.5
                  }}>
                    {tip.icon}
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {tip.text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>
      </Box>

      {/* Portfolio Completion Section */}
      <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 2, border: '1px solid #e0e0e0' }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
          Portfolio Completion
        </Typography>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Box sx={{ flex: '1 1 300px', minWidth: '250px' }}>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">Projects</Typography>
                <Typography variant="body2" fontWeight="bold">
                  {stats.projectsCount > 0 ? '100%' : '0%'}
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={stats.projectsCount > 0 ? 100 : 0} 
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>
          </Box>
          <Box sx={{ flex: '1 1 300px', minWidth: '250px' }}>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">Skills</Typography>
                <Typography variant="body2" fontWeight="bold">
                  {stats.skillsCount > 0 ? '100%' : '0%'}
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={stats.skillsCount > 0 ? 100 : 0} 
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>
          </Box>
          <Box sx={{ flex: '1 1 300px', minWidth: '250px' }}>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">Profile</Typography>
                <Typography variant="body2" fontWeight="bold">85%</Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={85} 
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
} 