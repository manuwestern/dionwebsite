import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { PromotionConfig } from '../components/layout/PromotionPopup';

// Promotion configurations for different treatment types
export const promotionConfigs: Record<string, PromotionConfig> = {
  hair: {
    treatmentType: 'hair',
    title: 'Frühjahrsaktion',
    subtitle: 'Limitiertes Angebot zur Haartransplantation',
    originalPrice: 3499,
    discountPrice: 2499,
    benefits: [
      'Maximale Anzahl an Grafts inklusive'
    ],
    therapyCount: 3,
    therapyValue: 750,
    testimonial: {
      text: 'Die Haartransplantation bei Dion Hair Clinic war die beste Entscheidung. Das Ergebnis übertrifft alle meine Erwartungen!',
      author: 'Michael K., zufriedener Patient'
    },
    whatsAppMessage: 'Hallo, ich interessiere mich für das Frühjahrsangebot (Haartransplantation für 2499€).'
  },
  eyebrow: {
    treatmentType: 'eyebrow',
    title: 'Frühjahrsaktion',
    subtitle: 'Limitiertes Angebot zur Augenbrauentransplantation',
    originalPrice: 2499,
    discountPrice: 1499,
    benefits: [
      'Natürlich aussehende, dichte Augenbrauen'
    ],
    therapyCount: 2,
    therapyValue: 500,
    testimonial: {
      text: 'Meine Augenbrauentransplantation bei Dion Hair Clinic hat mein Gesicht komplett verändert. Ich bin begeistert von dem natürlichen Ergebnis!',
      author: 'Sandra L., zufriedene Patientin'
    },
    whatsAppMessage: 'Hallo, ich interessiere mich für das Frühjahrsangebot (Augenbrauentransplantation für 1499€).'
  }
};

interface SpringPromotionContextType {
  showPopup: boolean;
  isClosing: boolean;
  openPopup: () => void;
  closePopup: () => void;
  hasSeenPopup: boolean;
  currentTreatmentType: 'hair' | 'eyebrow' | 'beard' | null;
  getCurrentConfig: () => PromotionConfig | null;
}

const SpringPromotionContext = createContext<SpringPromotionContextType | undefined>(undefined);

interface SpringPromotionProviderProps {
  children: ReactNode;
}

export const SpringPromotionProvider: React.FC<SpringPromotionProviderProps> = ({ 
  children
}) => {
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [hasSeenPopup, setHasSeenPopup] = useState(false);
  const [currentTreatmentType, setCurrentTreatmentType] = useState<'hair' | 'eyebrow' | 'beard' | null>(null);
  
  // Determine current treatment type based on route
  useEffect(() => {
    console.log('Current location:', location.pathname);
    
    if (location.pathname.includes('augenbrauentransplantation')) {
      console.log('Setting treatment type to eyebrow');
      setCurrentTreatmentType('eyebrow');
    } else if (location.pathname.includes('barthaartransplantation')) {
      console.log('Setting treatment type to beard');
      setCurrentTreatmentType('beard');
    } else {
      console.log('Setting treatment type to hair');
      setCurrentTreatmentType('hair');
    }
  }, [location]);
  
  // Check localStorage on mount to see if user has already seen the popup
  useEffect(() => {
    try {
      // Für Testzwecke: Zurücksetzen des localStorage-Wertes, damit das Popup immer angezeigt wird
      localStorage.removeItem('dion_spring_promotion_seen');
      const hasSeenPromotionPopup = localStorage.getItem('dion_spring_promotion_seen');
      
      // Immer das Popup anzeigen, unabhängig vom localStorage-Wert
      // Show popup after 2 seconds
      const timer = setTimeout(() => {
        setShowPopup(true);
        try {
          // Kommentiert aus, damit das Popup bei jedem Seitenbesuch erscheint (nur zu Testzwecken)
          // localStorage.setItem('dion_spring_promotion_seen', 'true');
          setHasSeenPopup(true);
        } catch (error) {
          console.error('Error saving to localStorage:', error);
        }
      }, 2000);
      
      return () => clearTimeout(timer);
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
  
  const getCurrentConfig = (): PromotionConfig | null => {
    if (!currentTreatmentType || !promotionConfigs[currentTreatmentType]) {
      return null;
    }
    return promotionConfigs[currentTreatmentType];
  };
  
  // Memoize context value to prevent unnecessary re-renders
  const value = React.useMemo(() => ({
    showPopup,
    isClosing,
    openPopup,
    closePopup,
    hasSeenPopup,
    currentTreatmentType,
    getCurrentConfig
  }), [
    showPopup,
    isClosing,
    hasSeenPopup,
    currentTreatmentType
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
