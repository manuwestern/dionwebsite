import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { fontSize, fontWeight } from '../../utils/typography';
import { useTheme } from '../../utils/ThemeProvider';

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation('common');
  const [isScrolled, setIsScrolled] = useState(false);
  const { activeTheme } = useTheme();

  // Handle scroll effect to match TopBar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center gap-4">
      <button 
        className={`group flex items-center gap-1.5 transition-all duration-300 ${
          i18n.language === 'de' 
            ? `${fontWeight.medium}` 
            : `${fontWeight.light} hover:text-gray-700`
        }`}
        style={{ 
          color: i18n.language === 'de' ? activeTheme.textPrimary : activeTheme.textSecondary
        }}
        onClick={() => changeLanguage('de')}
        aria-label="Deutsch"
      >
        <div className={`relative overflow-hidden rounded-sm w-6 h-4 border border-gray-200/50 ${
          i18n.language === 'de' ? 'shadow-sm' : ''
        }`}>
          <img 
            src="/de.svg" 
            alt="Deutsch" 
            className={`w-full h-full object-cover transition-transform duration-300 ${
              i18n.language === 'de' ? 'scale-110' : 'group-hover:scale-110'
            }`} 
          />
        </div>
        <span className={`${fontSize.sm} tracking-wide`}>{t('language.german')}</span>
      </button>
      
      <div className={`h-4 w-px ${isScrolled ? 'bg-gray-200' : 'bg-gray-300'}`}></div>
      
      <button 
        className={`group flex items-center gap-1.5 transition-all duration-300 ${
          i18n.language === 'en' 
            ? `${fontWeight.medium}` 
            : `${fontWeight.light} hover:text-gray-700`
        }`}
        style={{ 
          color: i18n.language === 'en' ? activeTheme.textPrimary : activeTheme.textSecondary
        }}
        onClick={() => changeLanguage('en')}
        aria-label="English"
      >
        <div className={`relative overflow-hidden rounded-sm w-6 h-4 border border-gray-200/50 ${
          i18n.language === 'en' ? 'shadow-sm' : ''
        }`}>
          <img 
            src="/gb.svg" 
            alt="English" 
            className={`w-full h-full object-cover transition-transform duration-300 ${
              i18n.language === 'en' ? 'scale-110' : 'group-hover:scale-110'
            }`} 
          />
        </div>
        <span className={`${fontSize.sm} tracking-wide`}>{t('language.english')}</span>
      </button>
    </div>
  );
};

export default LanguageSwitcher;
