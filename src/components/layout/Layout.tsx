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
      <div className="block md:hidden">
        <Navigation />
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
