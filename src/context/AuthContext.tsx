import React, { createContext, useContext, useState } from 'react';
import { AuthContextType } from '../types/auth';
import { authApi } from '../api';
import { User } from '../types';
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const loggedInUser = localStorage.getItem('user');
  const [user, setUser] = useState<User | null>(
    loggedInUser ? JSON.parse(loggedInUser) : null
  );
  const loggedInToken = localStorage.getItem('token');

  const [isAuthenticated, setIsAuthenticated] = useState(
    loggedInToken !== null
  );

  const login = async (email: string, password: string) => {
    const response = await authApi.signIn({ email, password });
    if (response.status === 200) {
      console.log(response.data);
      setUser(response.data.user);
      setIsAuthenticated(true);
    }
  };

  const logout = () => {
    // In development, immediately log back in as mock user
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
