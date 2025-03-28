import React from 'react';
import { CookieConsentProvider } from '../../contexts/CookieConsentContext';
import CookieBanner from './CookieBanner';
import CookieSettings from './CookieSettings';

/**
 * CookieConsent Component
 * 
 * Diese Komponente dient als Wrapper für den Cookie-Consent-Mechanismus.
 * Sie enthält den CookieConsentProvider, der den Zustand der Cookie-Einstellungen verwaltet,
 * sowie die CookieBanner- und CookieSettings-Komponenten, die die Benutzeroberfläche darstellen.
 */
const CookieConsent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <CookieConsentProvider>
      {children}
      <CookieBanner />
      <CookieSettings />
    </CookieConsentProvider>
  );
};

export default CookieConsent;
