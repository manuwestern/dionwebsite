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
      <Navigation />
      <main>
        {children}
      </main>
      <FooterSection />
    </div>
  );
};

export default Layout;
