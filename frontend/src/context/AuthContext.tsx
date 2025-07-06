'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Helper functions for cookie management
const setCookie = (name: string, value: string, days: number = 30) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};

const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
  
  console.log('🌐 AuthProvider initialized with API_URL:', API_URL);
  
  // Check token validity on mount and set auth state
  useEffect(() => {
    const initAuth = async () => {
      console.log('🔄 Initializing auth status check...');
      await checkAuthStatus();
      setLoading(false);
      console.log('✅ Auth initialization complete');
    };
    
    initAuth();
  }, []);
  
  const checkAuthStatus = async () => {
    try {
      console.log('🔍 Checking auth status...');
      // Get token from cookies (client-side only)
      if (typeof window !== 'undefined') {
        const token = getCookie('token');
        console.log('🎫 Token from cookies:', token ? 'Found' : 'Not found');
        
        if (!token) {
          console.log('❌ No token found, setting unauthenticated');
          setIsAuthenticated(false);
          setUser(null);
          return false;
        }
        
        // Verify token is valid
        const decoded = jwtDecode<{exp: number}>(token);
        const currentTime = Date.now() / 1000;
        console.log('⏰ Token expiry check:', { 
          tokenExp: decoded.exp, 
          currentTime, 
          isExpired: decoded.exp < currentTime 
        });
        
        if (decoded.exp < currentTime) {
          // Token expired
          console.log('⏰ Token expired, removing from cookies');
          deleteCookie('token');
          setIsAuthenticated(false);
          setUser(null);
          return false;
        }
        
        // Verify with backend
        console.log('📡 Verifying token with backend...');
        const response = await axios.get(`${API_URL}/api/auth/me`, {
          headers: {
            'x-auth-token': token
          }
        });
        
        console.log('📡 Backend response status:', response.status);
        if (response.status === 200) {
          console.log('✅ Auth verification successful, user:', response.data);
          setUser(response.data);
          setIsAuthenticated(true);
          return true;
        } else {
          console.log('❌ Auth verification failed');
          setIsAuthenticated(false);
          setUser(null);
          return false;
        }
      }
    } catch (error) {
      console.error('💥 Auth check failed:', error);
      deleteCookie('token');
      setIsAuthenticated(false);
      setUser(null);
      return false;
    }
    
    return false;
  };
  
  const login = async (email: string, password: string) => {
    try {
      console.log('🔐 AuthContext login called');
      console.log('📧 Login email:', email);
      console.log('🌐 API URL:', API_URL);
      console.log('📡 Making login request to:', `${API_URL}/api/auth/login`);
      
      const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      
      console.log('📡 Login response status:', response.status);
      console.log('📡 Login response data:', response.data);
      
      if (response.data && response.data.token) {
        console.log('🎫 Token received, saving to cookies');
        // Save token to cookies (matches middleware expectation)
        setCookie('token', response.data.token, 30);
        
        console.log('👤 Setting user data:', response.data.user);
        // Set authenticated user
        setUser(response.data.user);
        setIsAuthenticated(true);
        
        console.log('✅ Login successful, authentication state updated');
      } else {
        console.log('❌ No token in response');
        throw new Error('Authentication failed');
      }
    } catch (err: any) {
      console.error('💥 Login error in AuthContext:', err);
      console.error('💥 Error response:', err.response?.data);
      console.error('💥 Error status:', err.response?.status);
      console.error('💥 Error message:', err.message);
      throw new Error(err.response?.data?.msg || err.message || 'Login failed');
    }
  };
  
  const logout = () => {
    console.log('🚪 Logout called');
    deleteCookie('token');
    setUser(null);
    setIsAuthenticated(false);
    router.push('/admin/login');
  };
  
  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      loading, 
      login, 
      logout,
      checkAuthStatus 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 