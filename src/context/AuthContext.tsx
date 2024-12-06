import React, { createContext, useContext, useState } from 'react';
import { AuthContextType, User } from '../types/auth';

const AuthContext = createContext<AuthContextType | null>(null);

// Development mock user
const MOCK_USER: User = {
  id: '1',
  email: 'dev@example.com',
  name: 'Development User',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // In development, start with the mock user already logged in
  const [user, setUser] = useState<User | null>(MOCK_USER);

  const login = async (email: string, password: string) => {
    // In development, always succeed and use mock user
    setUser(MOCK_USER);
  };

  const logout = () => {
    // In development, immediately log back in as mock user
    setUser(MOCK_USER);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: true }}>
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