import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import RolesPage from '../pages/RolesPage';
import ProductPage from '../pages/ProductPage';
import ProfilePage from '../pages/ProfilePage';
import TransactionHistoryPage from '../pages/TransactionHistoryPage';
import TeamPage from '../pages/TeamPage';
import PlansPage from '../pages/PlansPage';
import NotFound from '../pages/NotFound';
import PrivateRoute from '../components/auth/PrivateRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'roles',
        element: (
          <PrivateRoute>
            <RolesPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'products',
        element: (
          <PrivateRoute>
            <ProductPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        ),
      },
      {
        path: 'transactions',
        element: (
          <PrivateRoute>
            <TransactionHistoryPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'team',
        element: (
          <PrivateRoute>
            <TeamPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'plans',
        element: (
          <PrivateRoute>
            <PlansPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);