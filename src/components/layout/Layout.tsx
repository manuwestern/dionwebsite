import React, { ReactNode, useState, useEffect } from 'react';
import TopBar from './TopBar';
import Navigation from './Navigation';
import FooterSection from './FooterSection';
import CacheResetButton from '../common/CacheResetButton';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [showCacheButton, setShowCacheButton] = useState(false);
  
  // Zeige den Cache-Reset-Button nach einer Verzögerung an, wenn die Seite geladen wurde
  // Dies hilft Benutzern, die möglicherweise auf 404-Fehler stoßen
  useEffect(() => {
    // Prüfe, ob es sich um eine Produktionsumgebung handelt
    if (process.env.NODE_ENV === 'production') {
      // Zeige den Button nach 5 Sekunden an, damit er nicht sofort erscheint
      const timer = setTimeout(() => {
        setShowCacheButton(true);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
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
      
      {/* Cache-Reset-Button */}
      {showCacheButton && <CacheResetButton />}
    </div>
  );
};

export default Layout;
