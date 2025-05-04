import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation('common');

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    
    // Update floating buttons text if the global function exists
    if (window.FloatingButtons && typeof window.FloatingButtons.updateTexts === 'function') {
      window.FloatingButtons.updateTexts(lng);
    }
  };

  return (
    <div className="flex justify-center w-full md:w-auto md:justify-start gap-3">
      <button 
        className={`flex items-center gap-1.5 text-sm transition-all duration-200 px-2 py-1 rounded hover:bg-[#2a2a2a] ${
          i18n.language === 'de' 
            ? 'text-white font-medium' 
            : 'text-gray-400 font-light hover:text-gray-200'
        }`}
        onClick={() => changeLanguage('de')}
        aria-label="Sprache auf Deutsch umstellen"
      >
        <img src="/de.svg" alt="" className="w-5 h-3.5 rounded-sm shadow-sm" /> 
        <span>{t('language.german')}</span>
      </button>
      <button 
        className={`flex items-center gap-1.5 text-sm transition-all duration-200 px-2 py-1 rounded hover:bg-[#2a2a2a] ${
          i18n.language === 'en' 
            ? 'text-white font-medium' 
            : 'text-gray-400 font-light hover:text-gray-200'
        }`}
        onClick={() => changeLanguage('en')}
        aria-label="Switch language to English"
      >
        <img src="/gb.svg" alt="" className="w-5 h-3.5 rounded-sm shadow-sm" /> 
        <span>{t('language.english')}</span>
      </button>
    </div>
  );
};

export default LanguageSwitcher;
