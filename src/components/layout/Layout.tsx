import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Container from './Container';

const Layout = () => {
  const location = useLocation();
  const publicPages = ['/login', '/forgot-password'];
  const isPublicPage = publicPages.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-[#F7F7F7]">
      {!isPublicPage && <Header />}
      <main
        className={`flex-grow w-full ${!isPublicPage ? 'container mx-auto px-4 pb-6 pt-2' : ''}`}
      >
        {!isPublicPage ? (
          <Container title="Dashboard">
            <Outlet />
          </Container>
        ) : (
          <Outlet />
        )}
      </main>
      {!isPublicPage && <Footer />}
    </div>
  );
};

export default Layout;
