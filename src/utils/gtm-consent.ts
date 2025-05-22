/**
 * Google Tag Manager Consent Management Utility
 * 
 * Diese Datei enthält Hilfsfunktionen für die Verwaltung der Einwilligung
 * im Zusammenhang mit Google Tag Manager und dem Consent Mode.
 */

import { CookieConsent } from '../contexts/CookieConsentContext';

// GTM Container ID
const GTM_CONTAINER_ID = 'GTM-WW72RWCM';

/**
 * Initialisiert den Google Consent Mode mit Standardwerten
 * Alle Consent-Typen werden standardmäßig auf 'denied' gesetzt
 */
export const initConsentMode = (): void => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    
    // Consent Mode v2 initialisieren
    window.dataLayer.push(['consent', 'default', {
      ad_storage: 'denied',
      analytics_storage: 'denied',
      functionality_storage: 'denied',
      personalization_storage: 'denied',
      security_storage: 'granted', // Sicherheitsrelevante Cookies sind immer erlaubt
      wait_for_update: 500 // Warte 500ms auf Update, bevor Tags ausgeführt werden
    }]);
  }
};

/**
 * Aktualisiert den Consent-Status basierend auf den Cookie-Einstellungen
 * @param consent Die aktuellen Cookie-Einstellungen
 */
export const updateConsentState = (consent: CookieConsent): void => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    
    // Consent Mode v2 aktualisieren
    window.dataLayer.push(['consent', 'update', {
      ad_storage: consent.marketing ? 'granted' : 'denied',
      analytics_storage: consent.analytics ? 'granted' : 'denied',
      functionality_storage: consent.preferences ? 'granted' : 'denied',
      personalization_storage: consent.preferences ? 'granted' : 'denied',
      security_storage: 'granted' // Sicherheitsrelevante Cookies sind immer erlaubt
    }]);
  }
};

/**
 * Lädt das Google Tag Manager Script dynamisch
 * Diese Funktion wird immer aufgerufen, unabhängig von der Cookie-Einwilligung
 * Die eigentlichen Tracking-Funktionen werden durch den Consent Mode gesteuert
 */
export const loadGTM = (): void => {
  if (typeof window !== 'undefined' && !window.gtmLoaded) {
    // Markiere GTM als geladen, um doppeltes Laden zu vermeiden
    window.gtmLoaded = true;
    
    // GTM Script dynamisch laden
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`;
    
    // GTM Initialization Code
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });
    
    // Script zum Dokument hinzufügen
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode?.insertBefore(script, firstScript);
    
    // Noscript iframe für Benutzer ohne JavaScript
    const noscript = document.createElement('noscript');
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`;
    iframe.height = '0';
    iframe.width = '0';
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';
    
    noscript.appendChild(iframe);
    document.body.insertBefore(noscript, document.body.firstChild);
  }
};

/**
 * Erweitert die Window-Schnittstelle um die gtmLoaded-Eigenschaft
 */
declare global {
  interface Window {
    gtmLoaded?: boolean;
  }
}
