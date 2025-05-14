import { createBrowserRouter } from 'react-router-dom';
import Layout, { LayoutProvider } from '../components/layout/Layout';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import Dashboard from '../pages/Dashboard';
import RolesPage from '../pages/RolesPage';
import ProductPage from '../pages/ProductPage';
import ProfilePage from '../pages/ProfilePage';
import TransactionHistoryPage from '../pages/TransactionHistoryPage';
import TeamPage from '../pages/TeamPage';
import PlansPage from '../pages/PlansPage';
import RewardsPage from '../pages/RewardsPage';
import QRCodePage from '../pages/QRCodePage';
import BrandPage from '../pages/BrandPage';
import BrandProfilePage from '../pages/BrandProfilePage';
import ComponentSink from '../pages/ComponentSink';
import NotFound from '../pages/NotFound';
import PrivateRoute from '../components/auth/PrivateRoute';
import EndUserPage from '../pages/EndUserPage';
import BrandListPage from '@/pages/BrandListPage';
import TrainingPage from '@/pages/TrainingPage';
export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <LayoutProvider>
        <Layout />
      </LayoutProvider>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute title="Dashboard">
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'roles',
        element: (
          <PrivateRoute title="Roles">
            <RolesPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'products',
        element: (
          <PrivateRoute title="Products">
            <ProductPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'train/:branchId/:productId',
        element: (
          <PrivateRoute title="Training">
            <TrainingPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute title="Profile">
            <ProfilePage />
          </PrivateRoute>
        ),
      },
      {
        path: 'transactions',
        element: (
          <PrivateRoute title="Transactions">
            <TransactionHistoryPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'team',
        element: (
          <PrivateRoute title="Team">
            <TeamPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'end-users',
        element: (
          <PrivateRoute title="End Users">
            <EndUserPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'plans',
        element: (
          <PrivateRoute title="Plans">
            <PlansPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'rewards',
        element: (
          <PrivateRoute title="Rewards">
            <RewardsPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'qr-code',
        element: (
          <PrivateRoute title="QR Code">
            <QRCodePage />
          </PrivateRoute>
        ),
      },
      {
        path: 'brand',
        element: (
          <PrivateRoute title="Brand">
            <BrandPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'brands',
        element: (
          <PrivateRoute title="Brand List">
            <BrandListPage />
          </PrivateRoute>
        ),
      },
      {
        path: 'brand/profile',
        element: (
          <PrivateRoute title="Brand Profile">
            <BrandProfilePage />
          </PrivateRoute>
        ),
      },
      {
        path: 'component-sink',
        element: <ComponentSink />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
