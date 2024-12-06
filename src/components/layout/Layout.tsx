import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="min-h-screen flex flex-col">
      {!isLoginPage && <Header />}
      <main className={`flex-grow ${!isLoginPage ? 'max-w-7xl mx-auto py-6 sm:px-6 lg:px-8' : ''}`}>
        <Outlet />
      </main>
      {!isLoginPage && <Footer />}
    </div>
  );
};

export default Layout;