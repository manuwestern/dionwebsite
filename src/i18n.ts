import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import commonDE from './locales/common/de.json';
import commonEN from './locales/common/en.json';
import layoutDE from './locales/layout/de.json';
import layoutEN from './locales/layout/en.json';
import homeDE from './locales/home/de.json';
import homeEN from './locales/home/en.json';
import hairTransplantationDE from './locales/hairTransplantation/de.json';
import hairTransplantationEN from './locales/hairTransplantation/en.json';
import beardTransplantationDE from './locales/beardTransplantation/de.json';
import beardTransplantationEN from './locales/beardTransplantation/en.json';
import eyebrowTransplantationDE from './locales/eyebrowTransplantation/de.json';
import eyebrowTransplantationEN from './locales/eyebrowTransplantation/en.json';
import hairLossTherapyDE from './locales/hairLossTherapy/de.json';
import hairLossTherapyEN from './locales/hairLossTherapy/en.json';
import clinicDE from './locales/clinic/de.json';
import clinicEN from './locales/clinic/en.json';
import contactDE from './locales/contact/de.json';
import contactEN from './locales/contact/en.json';
import imprintDE from './locales/imprint/de.json';
import imprintEN from './locales/imprint/en.json';
import privacyDE from './locales/privacy/de.json';
import privacyEN from './locales/privacy/en.json';
import termsDE from './locales/terms/de.json';
import termsEN from './locales/terms/en.json';
import cookiesDE from './locales/cookies/de.json';
import cookiesEN from './locales/cookies/en.json';
import knowledgeDE from './locales/knowledge/de.json';
import knowledgeEN from './locales/knowledge/en.json';
import pricesDE from './locales/prices/de.json';
import pricesEN from './locales/prices/en.json';
import newsletterDE from './locales/newsletter/de.json';
import newsletterEN from './locales/newsletter/en.json';

const resources = {
  de: {
    common: commonDE,
    layout: layoutDE,
    home: homeDE,
    hairTransplantation: hairTransplantationDE,
    beardTransplantation: beardTransplantationDE,
    eyebrowTransplantation: eyebrowTransplantationDE,
    hairLossTherapy: hairLossTherapyDE,
    clinic: clinicDE,
    contact: contactDE,
    imprint: imprintDE,
    privacy: privacyDE,
    terms: termsDE,
    cookies: cookiesDE,
    knowledge: knowledgeDE,
    prices: pricesDE,
    newsletter: newsletterDE
  },
  en: {
    common: commonEN,
    layout: layoutEN,
    home: homeEN,
    hairTransplantation: hairTransplantationEN,
    beardTransplantation: beardTransplantationEN,
    eyebrowTransplantation: eyebrowTransplantationEN,
    hairLossTherapy: hairLossTherapyEN,
    clinic: clinicEN,
    contact: contactEN,
    imprint: imprintEN,
    privacy: privacyEN,
    terms: termsEN,
    cookies: cookiesEN,
    knowledge: knowledgeEN,
    prices: pricesEN,
    newsletter: newsletterEN
  }
};

i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next
  .use(initReactI18next)
  // init i18next
  .init({
    resources,
    fallbackLng: 'de',
    // lng: 'de', // Removed forcing German as default language
    debug: false, // Set to true for development
    detection: {
      // Order of language detection - prioritize path and cookie over browser settings
      order: ['path', 'cookie', 'localStorage', 'navigator'],
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage', 'cookie']
    },
    
    // have a common namespace used around the full app
    ns: ['common', 'layout', 'home', 'hairTransplantation', 'beardTransplantation', 'eyebrowTransplantation', 'hairLossTherapy', 'clinic', 'contact', 'imprint', 'privacy', 'terms', 'cookies', 'knowledge', 'prices', 'newsletter'],
    defaultNS: 'common',
    
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
  });

// Add a language change listener to update floating buttons
i18n.on('languageChanged', (lng: string) => {
  // Update floating buttons if the global function exists
  if (window.FloatingButtons && typeof window.FloatingButtons.updateTexts === 'function') {
    window.FloatingButtons.updateTexts(lng);
  }
});

export default i18n;
