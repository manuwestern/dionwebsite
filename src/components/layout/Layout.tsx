import React, { ReactNode } from 'react';
import TopBar from './TopBar';
import Navigation from './Navigation';
import FooterSection from './FooterSection';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white font-montserrat overflow-x-hidden">
      <TopBar />
      <div className="block md:hidden relative">
        <div className="absolute top-0 left-0 right-0 z-50">
          <Navigation />
        </div>
        <main>
          {children}
        </main>
      </div>
      <div className="hidden md:block">
        <Navigation />
        <main>
          {children}
        </main>
      </div>
      <FooterSection />
    </div>
  );
};

export default Layout;
