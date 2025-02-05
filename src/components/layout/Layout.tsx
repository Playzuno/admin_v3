import React, { useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Container from './Container';

interface LayoutContextType {
  pageTitle: string;
  setLayoutContext: (
    context: Partial<Omit<LayoutContextType, 'setLayoutContext'>>
  ) => void;
}

export const LayoutContext = React.createContext<LayoutContextType>({
  pageTitle: '',
  setLayoutContext: () => {},
});

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [layoutState, setLayoutState] = React.useState<
    Omit<LayoutContextType, 'setLayoutContext'>
  >({
    pageTitle: '',
  });

  const setLayoutContext = React.useCallback(
    (context: Partial<Omit<LayoutContextType, 'setLayoutContext'>>) => {
      setLayoutState(prev => ({ ...prev, ...context }));
    },
    []
  );

  return (
    <LayoutContext.Provider value={{ ...layoutState, setLayoutContext }}>
      {children}
    </LayoutContext.Provider>
  );
};

const Layout = () => {
  const location = useLocation();
  const { pageTitle } = useContext(LayoutContext);

  const publicPages = ['/login', '/forgot-password'];
  const isPublicPage = publicPages.includes(location.pathname);
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-[#F7F7F7]">
      {!isPublicPage && <Header />}
      <main
        className={`flex-grow w-full ${!isPublicPage ? 'container mx-auto px-4 pb-6 pt-0' : ''}`}
      >
        {!isPublicPage ? (
          <Container title={pageTitle}>
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
