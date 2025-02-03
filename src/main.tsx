import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { router } from './routes';
import './styles/main.scss';
import { OrgProvider } from './context/OrgContext';

createRoot(document.getElementById('root')!).render(
  //<StrictMode>
  <OrgProvider>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </OrgProvider>
  //</StrictMode>
);
