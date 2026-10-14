import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // When the app first opens, check if they already logged in before
  useEffect(() => {
    const savedToken = localStorage.getItem('devshelf_token');
    const savedUser = localStorage.getItem('devshelf_user');

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { token: receivedToken, id, userName, email: userEmail } = response.data;
    const userData = { id, userName, email: userEmail };

    setToken(receivedToken);
    setUser(userData);
    localStorage.setItem('devshelf_token', receivedToken);
    localStorage.setItem('devshelf_user', JSON.stringify(userData));

    return response.data;
  };

  const register = async (userName, email, password) => {
    const response = await api.post('/auth/register', { userName, email, password });
    return response.data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('devshelf_token');
    localStorage.removeItem('devshelf_user');
  };

  const value = { user, token, isAuthenticated: !!token, loading, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}