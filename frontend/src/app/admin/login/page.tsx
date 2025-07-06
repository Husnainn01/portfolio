'use client';

import React, { useState, FormEvent } from 'react';
import { Card, CardContent, TextField, Button, Typography, Box, Alert, CssBaseline } from '@mui/material';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('🔥 Login form submitted!');
    console.log('📧 Email:', email);
    console.log('🔒 Password length:', password.length);
    
    setError('');
    
    if (!email || !password) {
      console.log('❌ Validation failed: Missing email or password');
      setError('Please enter both email and password');
      return;
    }
    
    try {
      console.log('🚀 Starting login process...');
      setLoading(true);
      
      console.log('📡 Calling login function from AuthContext...');
      await login(email, password);
      
      console.log('✅ Login successful! Redirecting to /admin...');
      router.push('/admin');
    } catch (err: any) {
      console.error('💥 Login error caught:', err);
      console.error('💥 Error message:', err.message);
      console.error('💥 Full error object:', err);
      setError(err.message || 'Failed to log in');
    } finally {
      console.log('🏁 Login process finished, setting loading to false');
      setLoading(false);
    }
  };

  console.log('🔄 LoginPage rendered. Current state:', {
    email: email.substring(0, 3) + '...',
    passwordLength: password.length,
    loading,
    error
  });

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
          padding: 2,
        }}
      >
        <Card sx={{ maxWidth: 400, width: '100%', boxShadow: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold' }}>
              Admin Login
            </Typography>
            
            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
            
            <form onSubmit={handleSubmit}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{ mb: 3 }}
              />
              <Button 
                variant="contained" 
                type="submit" 
                fullWidth 
                disabled={loading}
                onClick={() => console.log('🖱️ Login button clicked!')}
                sx={{ 
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  backgroundColor: '#1976d2',
                  '&:hover': {
                    backgroundColor: '#1565c0'
                  }
                }}
              >
                {loading ? 'Logging in...' : 'LOGIN'}
              </Button>
            </form>
            
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Admin Panel Access Only
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                Test Credentials: admin@portfolio.com / admin123
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
} 