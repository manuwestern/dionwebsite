import React, { createContext, useState, useEffect, useContext } from 'react';
import { initConsentMode, updateConsentState, loadGTM } from '../utils/gtm-consent';

// Define cookie consent types
export interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

// Define context type
interface CookieConsentContextType {
  consent: CookieConsent;
  showBanner: boolean;
  showSettings: boolean;
  setConsent: (consent: CookieConsent) => void;
  saveConsent: () => void;
  openSettings: () => void;
  closeSettings: () => void;
  acceptAll: () => void;
  acceptSelected: () => void;
  resetConsent: () => void;
}

// Create context with default values
const CookieConsentContext = createContext<CookieConsentContextType>({
  consent: {
    essential: true,
    analytics: false,
    marketing: false,
    preferences: false
  },
  showBanner: true,
  showSettings: false,
  setConsent: () => {},
  saveConsent: () => {},
  openSettings: () => {},
  closeSettings: () => {},
  acceptAll: () => {},
  acceptSelected: () => {},
  resetConsent: () => {}
});

// Cookie consent storage key
const COOKIE_CONSENT_KEY = 'dion-cookie-consent';

// Provider component
export const CookieConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State for cookie consent
  const [consent, setConsentState] = useState<CookieConsent>({
    essential: true, // Essential cookies are always required
    analytics: false,
    marketing: false,
    preferences: false
  });

  // State for showing banner and settings
  const [showBanner, setShowBanner] = useState<boolean>(true);
  const [showSettings, setShowSettings] = useState<boolean>(false);

// Initialize consent mode, load GTM, and load consent from localStorage on mount
  useEffect(() => {
    // Initialize Google Consent Mode
    initConsentMode();
    
    // Load GTM unabhängig von der Cookie-Einwilligung
    // Die Tracking-Funktionen werden durch den Consent Mode gesteuert
    loadGTM();
    
    try {
      const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (storedConsent) {
        try {
          const parsedConsent = JSON.parse(storedConsent);
          setConsentState(parsedConsent);
          setShowBanner(false); // Hide banner if consent is already given
          
          // Update consent state in GTM
          updateConsentState(parsedConsent);
        } catch (error) {
          console.error('Error parsing stored cookie consent:', error);
        }
      }
    } catch (error) {
      // Handle case where localStorage is not available (e.g., private browsing)
      console.error('Error accessing localStorage:', error);
    }
  }, []);

  // Set consent
  const setConsent = (newConsent: CookieConsent) => {
    // Ensure essential cookies are always true
    setConsentState({ ...newConsent, essential: true });
  };

  // Save consent to localStorage and update GTM
  const saveConsent = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    setShowBanner(false);
    setShowSettings(false);
    
    // Update consent state in GTM
    updateConsentState(consent);
  };

  // Open settings
  const openSettings = () => {
    setShowSettings(true);
  };

  // Close settings
  const closeSettings = () => {
    setShowSettings(false);
  };

  // Accept all cookies and update GTM
  const acceptAll = () => {
    const allConsent: CookieConsent = {
      essential: true,
      analytics: true,
      marketing: true,
      preferences: true
    };
    setConsentState(allConsent);
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(allConsent));
    setShowBanner(false);
    setShowSettings(false);
    
    // Update consent state in GTM
    updateConsentState(allConsent);
  };

  // Accept selected cookies and update GTM
  const acceptSelected = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    setShowBanner(false);
    setShowSettings(false);
    
    // Update consent state in GTM
    updateConsentState(consent);
  };

  // Reset consent and update GTM
  const resetConsent = () => {
    const defaultConsent: CookieConsent = {
      essential: true,
      analytics: false,
      marketing: false,
      preferences: false
    };
    
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    setConsentState(defaultConsent);
    setShowBanner(true);
    
    // Update consent state in GTM
    updateConsentState(defaultConsent);
    
    // GTM is still loaded, but with restricted consent
  };

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = React.useMemo(() => ({
    consent,
    showBanner,
    showSettings,
    setConsent,
    saveConsent,
    openSettings,
    closeSettings,
    acceptAll,
    acceptSelected,
    resetConsent
  }), [consent, showBanner, showSettings]);

  return (
    <CookieConsentContext.Provider value={contextValue}>
      {children}
    </CookieConsentContext.Provider>
  );
};

// Custom hook for using the cookie consent context
export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
};

export default CookieConsentContext;
