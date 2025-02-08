import React, { useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Container from './Container';
import CopyRights from './Copyrights';

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
    <div className="min-h-screen flex flex-col bg-[#F7F7F7]">
      {!isPublicPage && <Header />}
      <main className={`flex-1 w-full overflow-auto ${!isPublicPage ? 'container mx-auto px-4 pb-6 pt-0' : ''}`}>
        {!isPublicPage ? (
          <Container title={pageTitle}>
            <Outlet />
          </Container>
        ) : (
          <Outlet />
        )}
      </main>
      {!isPublicPage && (
        <CopyRights/>
      )}
      {!isPublicPage && (
        <footer className="sticky bottom-0 left-0 right-0 bg-[#F7F7F7]">
           
            <Footer />
        </footer>
        // </div>
      )}
    </div>
  );
};

export default Layout;
