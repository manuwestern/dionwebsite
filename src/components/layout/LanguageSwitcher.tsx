import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation('common');

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex gap-4">
      <button 
        className={`flex items-center gap-1 text-sm ${i18n.language === 'de' ? 'font-medium' : 'font-light'}`}
        onClick={() => changeLanguage('de')}
      >
        <img src="/de.svg" alt="Deutsch" className="w-6 h-4" /> 
        {t('language.german')}
      </button>
      <button 
        className={`flex items-center gap-1 text-sm ${i18n.language === 'en' ? 'font-medium' : 'font-light'}`}
        onClick={() => changeLanguage('en')}
      >
        <img src="/gb.svg" alt="English" className="w-6 h-4" /> 
        {t('language.english')}
      </button>
    </div>
  );
};

export default LanguageSwitcher;
