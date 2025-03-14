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

const resources = {
  de: {
    common: commonDE,
    layout: layoutDE,
    home: homeDE,
    hairTransplantation: hairTransplantationDE
  },
  en: {
    common: commonEN,
    layout: layoutEN,
    home: homeEN,
    hairTransplantation: hairTransplantationEN
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
    ns: ['common', 'layout', 'home', 'hairTransplantation'],
    defaultNS: 'common',
    
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
  });

export default i18n;
