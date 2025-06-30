import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PromotionConfig } from '../components/layout/PromotionPopup';

// Function to get promotion configurations based on language
export const getPromotionConfigs = (t: any): Record<string, PromotionConfig> => {
  return {
    hair: {
      treatmentType: 'hair',
      title: t('promotionPopup.title'),
      subtitle: t('promotionPopup.subtitles.hair'),
      originalPrice: 3499,
      discountPrice: 2499,
      benefits: [
        t('promotionPopup.benefits.maxGrafts')
      ],
      therapyCount: 3,
      therapyValue: 750,
      testimonial: {
        text: t('promotionPopup.testimonial.hair.text'),
        author: t('promotionPopup.testimonial.hair.author')
      },
      whatsAppMessage: t('promotionPopup.whatsAppMessages.hair')
    },
    eyebrow: {
      treatmentType: 'eyebrow',
      title: t('promotionPopup.title'),
      subtitle: t('promotionPopup.subtitles.eyebrow'),
      originalPrice: 2499,
      discountPrice: 1499,
      benefits: [
        t('promotionPopup.benefits.naturalEyebrows')
      ],
      therapyCount: 2,
      therapyValue: 500,
      testimonial: {
        text: t('promotionPopup.testimonial.eyebrow.text'),
        author: t('promotionPopup.testimonial.eyebrow.author')
      },
      whatsAppMessage: t('promotionPopup.whatsAppMessages.eyebrow')
    },
    beard: {
      treatmentType: 'beard',
      title: t('promotionPopup.title'),
      subtitle: t('promotionPopup.subtitles.beard'),
      originalPrice: 3499,
      discountPrice: 2499,
      benefits: [
        t('promotionPopup.benefits.maxGrafts')
      ],
      therapyCount: 3,
      therapyValue: 750,
      testimonial: {
        text: t('promotionPopup.testimonial.hair.text'),
        author: t('promotionPopup.testimonial.hair.author')
      },
      whatsAppMessage: t('promotionPopup.whatsAppMessages.beard')
    }
  };
};

interface SummerPromotionContextType {
  showPopup: boolean;
  isClosing: boolean;
  openPopup: () => void;
  closePopup: () => void;
  hasSeenPopup: boolean;
  currentTreatmentType: 'hair' | 'eyebrow' | 'beard' | null;
  getCurrentConfig: () => PromotionConfig | null;
}

const SummerPromotionContext = createContext<SummerPromotionContextType | undefined>(undefined);

interface SummerPromotionProviderProps {
  children: ReactNode;
}

export const SummerPromotionProvider: React.FC<SummerPromotionProviderProps> = ({ 
  children
}) => {
  const location = useLocation();
  const { t } = useTranslation(['layout']);
  const [showPopup, setShowPopup] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [hasSeenPopup, setHasSeenPopup] = useState(false);
  const [currentTreatmentType, setCurrentTreatmentType] = useState<'hair' | 'eyebrow' | 'beard' | null>(null);
  const promotionConfigs = getPromotionConfigs(t);
  
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
      localStorage.removeItem('dion_summer_promotion_seen');
      const hasSeenPromotionPopup = localStorage.getItem('dion_summer_promotion_seen');
      
      // Immer das Popup anzeigen, unabhängig vom localStorage-Wert
      // Show popup after 2 seconds
      const timer = setTimeout(() => {
        setShowPopup(true);
        try {
          // Kommentiert aus, damit das Popup bei jedem Seitenbesuch erscheint (nur zu Testzwecken)
          // localStorage.setItem('dion_summer_promotion_seen', 'true');
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
    // Get fresh translations every time
    const configs = getPromotionConfigs(t);
    return configs[currentTreatmentType];
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
    <SummerPromotionContext.Provider value={value}>
      {children}
    </SummerPromotionContext.Provider>
  );
};

export const useSummerPromotion = (): SummerPromotionContextType => {
  const context = useContext(SummerPromotionContext);
  if (context === undefined) {
    throw new Error('useSummerPromotion must be used within a SummerPromotionProvider');
  }
  return context;
};

export default SummerPromotionContext;
