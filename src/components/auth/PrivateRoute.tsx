import React, { createContext, useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutContext } from '../layout/Layout';

interface RouteContextType {
  title: string;
}

export const RouteContext = createContext<RouteContextType>({ title: '' });
export const useRouteContext = () => useContext(RouteContext);

interface PrivateRouteProps {
  children: React.ReactNode;
  title: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, title }) => {
  const { isAuthenticated } = useAuth();
  // const location = useLocation();

  const { setLayoutContext } = useContext(LayoutContext);

  useEffect(() => {
    setLayoutContext({
      pageTitle: title,
    });

    // Cleanup on unmount
    return () => {
      setLayoutContext({
        pageTitle: '',
      });
    };
  }, [title, setLayoutContext]);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return (
    <RouteContext.Provider value={{ title }}>{children}</RouteContext.Provider>
  );
};

export default PrivateRoute;
