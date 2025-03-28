import React, { createContext, useState, useEffect, useContext } from 'react';

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

  // Load consent from localStorage on mount
  useEffect(() => {
    const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (storedConsent) {
      try {
        const parsedConsent = JSON.parse(storedConsent);
        setConsentState(parsedConsent);
        setShowBanner(false); // Hide banner if consent is already given
      } catch (error) {
        console.error('Error parsing stored cookie consent:', error);
      }
    }
  }, []);

  // Set consent
  const setConsent = (newConsent: CookieConsent) => {
    // Ensure essential cookies are always true
    setConsentState({ ...newConsent, essential: true });
  };

  // Save consent to localStorage
  const saveConsent = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    setShowBanner(false);
    setShowSettings(false);
  };

  // Open settings
  const openSettings = () => {
    setShowSettings(true);
  };

  // Close settings
  const closeSettings = () => {
    setShowSettings(false);
  };

  // Accept all cookies
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
  };

  // Accept selected cookies
  const acceptSelected = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    setShowBanner(false);
    setShowSettings(false);
  };

  // Reset consent
  const resetConsent = () => {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    setConsentState({
      essential: true,
      analytics: false,
      marketing: false,
      preferences: false
    });
    setShowBanner(true);
  };

  return (
    <CookieConsentContext.Provider
      value={{
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
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
};

// Custom hook for using the cookie consent context
export const useCookieConsent = () => useContext(CookieConsentContext);

export default CookieConsentContext;
