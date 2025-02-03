import React, { createContext, useContext, useState } from 'react';
import { AuthContextType } from '../types/auth';
import { authApi, userApi } from '../api';
import { LoggedInUser } from '../types';
import { useOrg } from './OrgContext';
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const loggedInUser = localStorage.getItem('user');
  const [user, setUser] = useState<LoggedInUser | null>(
    loggedInUser ? JSON.parse(loggedInUser) : null
  );
  const loggedInToken = localStorage.getItem('token');

  const [isAuthenticated, setIsAuthenticated] = useState(
    loggedInToken !== null
  );
  const { refreshBranches } = useOrg();
  const login = async (email: string, password: string) => {
    const response = await authApi.signIn({ email, password });
    if (response.status === 200) {
      console.log(response.data);
      setUser(response.data.user);
      setIsAuthenticated(true);
      const memberships = response.data.user.memberships;
      let orgId;
      if (memberships && memberships.length > 0) {
        orgId = memberships[0].orgId;
      }
      localStorage.setItem('orgId', orgId);
      refreshBranches();
    }
  };

  const logout = () => {
    // In development, immediately log back in as mock user
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const updateUser = async () => {
    const response = await userApi.get();
    if (response.status === 200) {
      console.log('response', response.data);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(response.data.user);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, updateUser, login, logout, isAuthenticated }}
    >
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
