import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useCookieConsent } from '../../contexts/CookieConsentContext';
import { Shield, BarChart, Target, Settings, X } from 'lucide-react';
import { textStyle, fontSize, fontWeight, textColor } from '../../utils/typography';

const CookieBanner: React.FC = () => {
  const { t } = useTranslation('cookies');
  const { 
    consent, 
    showBanner, 
    setConsent, 
    acceptAll, 
    acceptSelected, 
    openSettings 
  } = useCookieConsent();

  if (!showBanner) {
    return null;
  }

  // Handle checkbox change
  const handleCheckboxChange = (type: keyof typeof consent) => {
    if (type === 'essential') return; // Essential cookies cannot be disabled
    
    setConsent({
      ...consent,
      [type]: !consent[type]
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-white shadow-lg border-t border-gray-200 animate-slide-up">
      <div className="max-w-7xl mx-auto">
        {/* Close button for mobile */}
        <button 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 md:hidden"
          onClick={acceptSelected}
          aria-label="Close"
        >
          <X size={20} />
        </button>
        
        <div className="mb-4">
          <h2 className={`${textStyle.primaryHeading} text-[#7BA7C2] mb-2`}>
            {t('banner.title')}
          </h2>
          <p className={`${textStyle.bodyText} mb-4 pr-8 md:pr-0`}>
            {t('banner.description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Essential Cookies */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="flex items-start mb-2">
              <div className="mr-3 text-[#7BA7C2] mt-1">
                <Shield size={18} />
              </div>
              <div>
                <h3 className={`${textStyle.cardTitle} mb-1`}>{t('banner.essential.title')}</h3>
                <p className={`${fontSize.sm} ${textColor.medium}`}>
                  {t('banner.essential.description')}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end mt-3">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={consent.essential} 
                  disabled={true}
                  className="h-5 w-5 rounded border-gray-300 text-[#7BA7C2] focus:ring-[#7BA7C2] cursor-not-allowed opacity-70"
                  aria-label={t('banner.essential.title')}
                  title={t('banner.essential.title')}
                />
                <span className="sr-only">{t('banner.essential.title')}</span>
              </label>
            </div>
          </div>
          
          {/* Analytics Cookies */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="flex items-start mb-2">
              <div className="mr-3 text-[#7BA7C2] mt-1">
                <BarChart size={18} />
              </div>
              <div>
                <h3 className={`${textStyle.cardTitle} mb-1`}>{t('banner.analytics.title')}</h3>
                <p className={`${fontSize.sm} ${textColor.medium}`}>
                  {t('banner.analytics.description')}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end mt-3">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={consent.analytics} 
                  onChange={() => handleCheckboxChange('analytics')}
                  className="h-5 w-5 rounded border-gray-300 text-[#7BA7C2] focus:ring-[#7BA7C2] cursor-pointer"
                  aria-label={t('banner.analytics.title')}
                  title={t('banner.analytics.title')}
                />
                <span className="sr-only">{t('banner.analytics.title')}</span>
              </label>
            </div>
          </div>
          
          {/* Marketing Cookies */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="flex items-start mb-2">
              <div className="mr-3 text-[#7BA7C2] mt-1">
                <Target size={18} />
              </div>
              <div>
                <h3 className={`${textStyle.cardTitle} mb-1`}>{t('banner.marketing.title')}</h3>
                <p className={`${fontSize.sm} ${textColor.medium}`}>
                  {t('banner.marketing.description')}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end mt-3">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={consent.marketing} 
                  onChange={() => handleCheckboxChange('marketing')}
                  className="h-5 w-5 rounded border-gray-300 text-[#7BA7C2] focus:ring-[#7BA7C2] cursor-pointer"
                  aria-label={t('banner.marketing.title')}
                  title={t('banner.marketing.title')}
                />
                <span className="sr-only">{t('banner.marketing.title')}</span>
              </label>
            </div>
          </div>
          
          {/* Preference Cookies */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="flex items-start mb-2">
              <div className="mr-3 text-[#7BA7C2] mt-1">
                <Settings size={18} />
              </div>
              <div>
                <h3 className={`${textStyle.cardTitle} mb-1`}>{t('banner.preferences.title')}</h3>
                <p className={`${fontSize.sm} ${textColor.medium}`}>
                  {t('banner.preferences.description')}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end mt-3">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={consent.preferences} 
                  onChange={() => handleCheckboxChange('preferences')}
                  className="h-5 w-5 rounded border-gray-300 text-[#7BA7C2] focus:ring-[#7BA7C2] cursor-pointer"
                  aria-label={t('banner.preferences.title')}
                  title={t('banner.preferences.title')}
                />
                <span className="sr-only">{t('banner.preferences.title')}</span>
              </label>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 text-sm text-gray-500 mb-4 md:mb-0">
            <Link to="/datenschutz" className="hover:text-[#7BA7C2] transition-colors">
              {t('banner.footer.privacyPolicy')}
            </Link>
            <Link to="/impressum" className="hover:text-[#7BA7C2] transition-colors">
              {t('banner.footer.imprint')}
            </Link>
            <Link to="/agb" className="hover:text-[#7BA7C2] transition-colors">
              {t('banner.footer.terms')}
            </Link>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full md:w-auto">
            <button
              onClick={openSettings}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              {t('banner.buttons.settings')}
            </button>
            <button
              onClick={acceptSelected}
              className="px-4 py-2 border border-[#7BA7C2] rounded-md text-[#7BA7C2] hover:bg-[#7BA7C2]/5 transition-colors text-sm font-medium"
            >
              {t('banner.buttons.acceptSelected')}
            </button>
            <button
              onClick={acceptAll}
              className="px-4 py-2 bg-[#7BA7C2] border border-[#7BA7C2] rounded-md text-white hover:bg-[#6A96B1] transition-colors text-sm font-medium"
            >
              {t('banner.buttons.acceptAll')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
