/**
 * Google Tag Manager Utility
 * 
 * Diese Datei enthält Hilfsfunktionen für die Interaktion mit dem Google Tag Manager
 * und dem DataLayer. Sie ermöglicht das Tracking von Seitenaufrufen, Ereignissen und
 * benutzerdefinierten Daten.
 */

// Typdefinitionen für den DataLayer
interface DataLayerObject {
  event?: string;
  [key: string]: any;
}

// Typdefinitionen für Behandlungstypen (für dynamisches Remarketing)
export enum TreatmentType {
  HAIR_TRANSPLANT = 'hair_transplant',
  BEARD_TRANSPLANT = 'beard_transplant',
  EYEBROW_TRANSPLANT = 'eyebrow_transplant',
  HAIR_LOSS_THERAPY = 'hair_loss_therapy'
}

/**
 * Initialisiert den DataLayer, falls er noch nicht existiert
 */
export const initDataLayer = (): void => {
  window.dataLayer = window.dataLayer || [];
};

/**
 * Sendet Daten an den DataLayer
 * @param obj Das Objekt, das an den DataLayer gesendet werden soll
 */
export const pushToDataLayer = (obj: DataLayerObject): void => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(obj);
  }
};

/**
 * Trackt einen Seitenaufruf
 * @param path Der Pfad der Seite
 * @param title Der Titel der Seite
 */
export const trackPageView = (path: string, title: string): void => {
  pushToDataLayer({
    event: 'pageview',
    page: {
      path,
      title
    }
  });
};

/**
 * Trackt ein Ereignis
 * @param category Die Kategorie des Ereignisses (z.B. 'Contact', 'Navigation')
 * @param action Die Aktion des Ereignisses (z.B. 'Click', 'Submit')
 * @param label Ein optionales Label für das Ereignis
 * @param value Ein optionaler numerischer Wert für das Ereignis
 */
export const trackEvent = (
  category: string, 
  action: string, 
  label?: string, 
  value?: number
): void => {
  pushToDataLayer({
    event: 'interaction',
    eventCategory: category,
    eventAction: action,
    eventLabel: label,
    eventValue: value
  });
};

/**
 * Trackt einen Behandlungsaufruf für dynamisches Remarketing
 * @param treatmentType Der Typ der Behandlung
 * @param treatmentName Der Name der Behandlung
 * @param price Der optionale Preis der Behandlung
 */
export const trackTreatmentView = (
  treatmentType: TreatmentType,
  treatmentName: string,
  price?: number
): void => {
  pushToDataLayer({
    event: 'view_item',
    ecommerce: {
      items: [{
        item_id: treatmentType,
        item_name: treatmentName,
        price: price || 0,
        item_category: 'Treatment'
      }]
    }
  });
};

/**
 * Trackt eine Conversion mit erweiterten Conversion-Daten
 * @param conversionLabel Das Conversion-Label aus Google Ads
 * @param email Die E-Mail-Adresse des Benutzers (wird gehasht)
 * @param phone Die optionale Telefonnummer des Benutzers
 * @param firstName Der optionale Vorname des Benutzers
 * @param lastName Der optionale Nachname des Benutzers
 */
export const trackEnhancedConversion = async (
  conversionLabel: string,
  email: string,
  phone?: string,
  firstName?: string,
  lastName?: string
): Promise<void> => {
  try {
    // E-Mail-Adresse hashen für Enhanced Conversions
    const hashedEmail = await hashEmail(email);
    
    pushToDataLayer({
      event: 'enhanced_conversion',
      conversionLabel,
      user_data: {
        email_address: hashedEmail,
        phone_number: phone,
        first_name: firstName,
        last_name: lastName
      }
    });
  } catch (error) {
    console.error('Enhanced conversion tracking failed:', error);
  }
};

/**
 * Hasht eine E-Mail-Adresse für Enhanced Conversions
 * @param email Die zu hashende E-Mail-Adresse
 * @returns Die gehashte E-Mail-Adresse
 */
export const hashEmail = async (email: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(email.trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

/**
 * Trackt einen Formular-Submit
 * @param formName Der Name des Formulars
 * @param formData Die Formulardaten
 */
export const trackFormSubmission = (
  formName: string,
  formData: Record<string, any>
): void => {
  pushToDataLayer({
    event: 'form_submission',
    formName,
    formData: {
      ...formData,
      // Entferne sensible Daten
      email: formData.email ? 'redacted' : undefined,
      phone: formData.phone ? 'redacted' : undefined
    }
  });
};

/**
 * Trackt einen Telefonanruf
 * @param phoneNumber Die Telefonnummer
 * @param location Der Ort des Telefon-Links (z.B. 'header', 'footer', 'contact')
 */
export const trackPhoneCall = (
  phoneNumber: string,
  location: string
): void => {
  trackEvent('Contact', 'Phone Call', location);
};

/**
 * Trackt die Scroll-Tiefe
 * Sollte in einem useEffect-Hook verwendet werden
 */
export const useScrollTracking = (): (() => void) => {
  if (typeof window !== 'undefined') {
    let scrolled25 = false;
    let scrolled50 = false;
    let scrolled75 = false;
    let scrolled100 = false;
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight * 100;
      
      if (scrollPercent >= 25 && !scrolled25) {
        trackEvent('Scroll', 'Scroll Depth', '25%');
        scrolled25 = true;
      }
      if (scrollPercent >= 50 && !scrolled50) {
        trackEvent('Scroll', 'Scroll Depth', '50%');
        scrolled50 = true;
      }
      if (scrollPercent >= 75 && !scrolled75) {
        trackEvent('Scroll', 'Scroll Depth', '75%');
        scrolled75 = true;
      }
      if (scrollPercent >= 90 && !scrolled100) {
        trackEvent('Scroll', 'Scroll Depth', '100%');
        scrolled100 = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }
  
  // Leere Cleanup-Funktion für den Fall, dass window nicht definiert ist (SSR)
  return () => {};
};
