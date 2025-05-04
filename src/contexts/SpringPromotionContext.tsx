import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SpringPromotionContextType {
  showPopup: boolean;
  isClosing: boolean;
  openPopup: () => void;
  closePopup: () => void;
  hasSeenPopup: boolean;
}

const SpringPromotionContext = createContext<SpringPromotionContextType | undefined>(undefined);

interface SpringPromotionProviderProps {
  children: ReactNode;
}

export const SpringPromotionProvider: React.FC<SpringPromotionProviderProps> = ({ 
  children
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [hasSeenPopup, setHasSeenPopup] = useState(false);
  
  // Check localStorage on mount to see if user has already seen the popup
  useEffect(() => {
    try {
      const hasSeenPromotionPopup = localStorage.getItem('dion_spring_promotion_seen');
      
      if (hasSeenPromotionPopup === 'true') {
        setHasSeenPopup(true);
      } else {
        // Show popup after 15 seconds if user hasn't seen it before
        const timer = setTimeout(() => {
          setShowPopup(true);
          try {
            localStorage.setItem('dion_spring_promotion_seen', 'true');
            setHasSeenPopup(true);
          } catch (error) {
            console.error('Error saving to localStorage:', error);
          }
        }, 15000);
        
        return () => clearTimeout(timer);
      }
    } catch (error) {
      // Handle case where localStorage is not available (e.g., private browsing)
      console.error('Error accessing localStorage:', error);
    }
  }, []);
  
  const openPopup = () => {
    setShowPopup(true);
  };
  
  const closePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowPopup(false);
      setIsClosing(false);
    }, 300);
  };
  
  // Memoize context value to prevent unnecessary re-renders
  const value = React.useMemo(() => ({
    showPopup,
    isClosing,
    openPopup,
    closePopup,
    hasSeenPopup
  }), [
    showPopup,
    isClosing,
    hasSeenPopup
  ]);
  
  return (
    <SpringPromotionContext.Provider value={value}>
      {children}
    </SpringPromotionContext.Provider>
  );
};

export const useSpringPromotion = (): SpringPromotionContextType => {
  const context = useContext(SpringPromotionContext);
  if (context === undefined) {
    throw new Error('useSpringPromotion must be used within a SpringPromotionProvider');
  }
  return context;
};

export default SpringPromotionContext;
