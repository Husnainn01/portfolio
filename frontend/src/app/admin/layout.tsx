'use client';

import React, { useState, ReactNode } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Chip,
  Paper,
  alpha,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  DesignServices as ProjectsIcon,
  Psychology as SkillsIcon,
  Person as ProfileIcon,
  Logout as LogoutIcon,
  Launch as LaunchIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

const drawerWidth = 280;

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { logout, user } = useAuth();

  // Skip protected layout for login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin', description: 'Overview & Analytics' },
    { text: 'Projects', icon: <ProjectsIcon />, path: '/admin/projects', description: 'Manage Portfolio' },
    { text: 'Skills', icon: <SkillsIcon />, path: '/admin/skills', description: 'Technical Skills' },
    { text: 'Profile', icon: <ProfileIcon />, path: '/admin/profile', description: 'Personal Info' },
  ];

  const drawer = (
    <Box sx={{ 
      height: '100%', 
      background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
      color: 'white',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <Box sx={{ p: 3, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '1.2rem'
          }}>
            P
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="bold" sx={{ lineHeight: 1.2 }}>
              Portfolio
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.7 }}>
              Admin Panel
            </Typography>
          </Box>
        </Box>
        
        {/* User Info */}
        <Paper elevation={0} sx={{ 
          p: 2, 
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ 
              width: 36, 
              height: 36, 
              bgcolor: 'rgba(255,255,255,0.2)',
              fontSize: '0.9rem',
              fontWeight: 'bold'
            }}>
              {user?.username?.charAt(0).toUpperCase() || 'A'}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="subtitle2" fontWeight="medium" noWrap>
                {user?.username || 'Admin'}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                Administrator
              </Typography>
            </Box>
            <Chip 
              label="Online" 
              size="small" 
              sx={{ 
                bgcolor: 'rgba(76, 175, 80, 0.2)', 
                color: '#4caf50',
                fontWeight: 'bold',
                fontSize: '0.7rem'
              }} 
            />
          </Box>
        </Paper>
      </Box>

      {/* Navigation */}
      <Box sx={{ flex: 1, px: 2, py: 2 }}>
        <Typography variant="overline" sx={{ 
          px: 2, 
          py: 1, 
          opacity: 0.6, 
          fontSize: '0.7rem',
          fontWeight: 'bold',
          letterSpacing: '0.5px'
        }}>
          MAIN MENU
        </Typography>
        <List sx={{ p: 0 }}>
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                <Link href={item.path} passHref style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                  <ListItemButton 
                    selected={isActive}
                    sx={{
                      borderRadius: 2,
                      mx: 1,
                      transition: 'all 0.2s ease',
                      '&.Mui-selected': {
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          transform: 'translateX(4px)',
                        }
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.08)',
                        transform: 'translateX(4px)',
                      }
                    }}
                  >
                    <ListItemIcon sx={{ 
                      color: isActive ? 'white' : 'rgba(255,255,255,0.7)',
                      minWidth: 40
                    }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.text}
                      secondary={item.description}
                      primaryTypographyProps={{
                        fontWeight: isActive ? 'bold' : 'medium',
                        fontSize: '0.9rem'
                      }}
                      secondaryTypographyProps={{
                        fontSize: '0.7rem',
                        color: isActive ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.5)'
                      }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Footer */}
      <Box sx={{ p: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <ListItem disablePadding>
          <ListItemButton 
            onClick={logout}
            sx={{
              borderRadius: 2,
              '&:hover': {
                backgroundColor: 'rgba(244, 67, 54, 0.1)',
                color: '#f44336'
              }
            }}
          >
            <ListItemIcon sx={{ color: 'rgba(255,255,255,0.7)', minWidth: 40 }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Logout" 
              primaryTypographyProps={{
                fontWeight: 'medium',
                fontSize: '0.9rem'
              }}
            />
          </ListItemButton>
        </ListItem>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', gap: 0 }}>
      <CssBaseline />
      
      {/* Top Bar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          color: '#1a1a2e',
          zIndex: 1300
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box>
              <Typography variant="h6" fontWeight="bold" sx={{ lineHeight: 1.2 }}>
                {menuItems.find((item) => item.path === pathname)?.text || 'Dashboard'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {menuItems.find((item) => item.path === pathname)?.description || 'Admin Panel'}
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton size="small" sx={{ color: 'text.secondary' }}>
              <NotificationsIcon />
            </IconButton>
            <IconButton size="small" sx={{ color: 'text.secondary' }}>
              <SettingsIcon />
            </IconButton>
            <Button 
              variant="outlined" 
              size="small"
              href="/" 
              target="_blank"
              startIcon={<LaunchIcon />}
              sx={{ 
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 'medium'
              }}
            >
              View Site
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth,
            border: 'none'
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth,
            border: 'none',
            position: 'fixed',
            height: '100%'
          },
        }}
        open
      >
        {drawer}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: '#f8fafc',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Toolbar />
        <Box sx={{ 
          p: { xs: 2, sm: 3 },
          width: '100%'
        }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
} 