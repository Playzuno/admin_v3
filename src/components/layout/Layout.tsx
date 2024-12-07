import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div
      className="min-h-screen flex flex-col overflow-x-hidden"
      // style={{ width: '86vw' }}
    >
      {!isLoginPage && <Header />}
      <main
        className={`flex-grow w-full ${!isLoginPage ? 'container mx-auto px-4 py-6' : ''}`}
      >
        <Outlet />
      </main>
      {!isLoginPage && <Footer />}
    </div>
  );
};

export default Layout;
