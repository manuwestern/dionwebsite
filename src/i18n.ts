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
    contact: contactDE
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
    contact: contactEN
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
    debug: false, // Set to true for development
    
    // have a common namespace used around the full app
    ns: ['common', 'layout', 'home', 'hairTransplantation', 'beardTransplantation', 'eyebrowTransplantation', 'hairLossTherapy', 'clinic', 'contact'],
    defaultNS: 'common',
    
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
  });

export default i18n;
