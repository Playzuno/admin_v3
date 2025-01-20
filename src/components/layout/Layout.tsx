import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import PlainContainer from '../containers/PlainContainer';

const Layout = () => {
  const location = useLocation();
  const publicPages = ['/login', '/forgot-password'];
  const isPublicPage = publicPages.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {!isPublicPage && <Header />}
      <main
        className={`flex-grow w-full ${!isPublicPage ? 'container mx-auto px-4 py-6' : ''}`}
      >
        {!isPublicPage ? (
          <PlainContainer>
            <Outlet />
          </PlainContainer>
        ) : (
          <Outlet />
        )}
      </main>
      {!isPublicPage && <Footer />}
    </div>
  );
};

export default Layout;
