import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCookieConsent } from '../../contexts/CookieConsentContext';
import { 
  Shield, 
  BarChart, 
  Target, 
  Settings, 
  X, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';
import { textStyle, fontSize, fontWeight, textColor } from '../../utils/typography';

const CookieSettings: React.FC = () => {
  const { t } = useTranslation('cookies');
  const { 
    consent, 
    showSettings, 
    setConsent, 
    saveConsent, 
    closeSettings 
  } = useCookieConsent();

  // State for expanded sections
  const [expandedSections, setExpandedSections] = useState<{
    essential: boolean;
    analytics: boolean;
    marketing: boolean;
    preferences: boolean;
  }>({
    essential: false,
    analytics: false,
    marketing: false,
    preferences: false
  });

  if (!showSettings) {
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

  // Toggle section expansion
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className={`${textStyle.primaryHeading} text-[#7BA7C2]`}>
            {t('settings.title')}
          </h2>
          <button 
            className="text-gray-500 hover:text-gray-700"
            onClick={closeSettings}
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <p className={`${textStyle.bodyText} mb-8`}>
            {t('settings.description')}
          </p>
          
          {/* Essential Cookies */}
          <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
            <div 
              className="bg-gray-50 p-4 flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('essential')}
            >
              <div className="flex items-center">
                <div className="mr-3 text-[#7BA7C2]">
                  <Shield size={20} />
                </div>
                <div>
                  <h3 className={`${textStyle.cardTitle}`}>{t('banner.essential.title')}</h3>
                </div>
              </div>
              <div className="flex items-center">
                <label className="flex items-center mr-4">
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
                {expandedSections.essential ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </div>
            
            {expandedSections.essential && (
              <div className="p-4 border-t border-gray-200">
                <p className={`${textStyle.bodyText} mb-4`}>
                  {t('banner.essential.description')}
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className={`${fontSize.base} ${fontWeight.medium} mb-2`}>{t('settings.cookieDetails')}</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('settings.cookieName')}</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('settings.cookiePurpose')}</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('settings.cookieDuration')}</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('settings.cookieProvider')}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-2 text-sm text-gray-700">{t('settings.essentialCookies.session.name')}</td>
                          <td className="px-4 py-2 text-sm text-gray-700">{t('settings.essentialCookies.session.purpose')}</td>
                          <td className="px-4 py-2 text-sm text-gray-700">{t('settings.essentialCookies.session.duration')}</td>
                          <td className="px-4 py-2 text-sm text-gray-700">{t('settings.essentialCookies.session.provider')}</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm text-gray-700">{t('settings.essentialCookies.csrf.name')}</td>
                          <td className="px-4 py-2 text-sm text-gray-700">{t('settings.essentialCookies.csrf.purpose')}</td>
                          <td className="px-4 py-2 text-sm text-gray-700">{t('settings.essentialCookies.csrf.duration')}</td>
                          <td className="px-4 py-2 text-sm text-gray-700">{t('settings.essentialCookies.csrf.provider')}</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm text-gray-700">{t('settings.essentialCookies.consent.name')}</td>
                          <td className="px-4 py-2 text-sm text-gray-700">{t('settings.essentialCookies.consent.purpose')}</td>
                          <td className="px-4 py-2 text-sm text-gray-700">{t('settings.essentialCookies.consent.duration')}</td>
                          <td className="px-4 py-2 text-sm text-gray-700">{t('settings.essentialCookies.consent.provider')}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Analytics Cookies */}
          <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
            <div 
              className="bg-gray-50 p-4 flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('analytics')}
            >
              <div className="flex items-center">
                <div className="mr-3 text-[#7BA7C2]">
                  <BarChart size={20} />
                </div>
                <div>
                  <h3 className={`${textStyle.cardTitle}`}>{t('banner.analytics.title')}</h3>
                </div>
              </div>
              <div className="flex items-center">
                <label className="flex items-center mr-4">
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
                {expandedSections.analytics ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </div>
            
            {expandedSections.analytics && (
              <div className="p-4 border-t border-gray-200">
                <p className={`${textStyle.bodyText} mb-4`}>
                  {t('banner.analytics.description')}
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className={`${fontSize.base} ${fontWeight.medium} mb-2`}>{t('settings.cookieDetails')}</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('settings.cookieName')}</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('settings.cookiePurpose')}</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('settings.cookieDuration')}</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('settings.cookieProvider')}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-2 text-sm text-gray-700">{t('settings.analyticsCookies.ga.name')}</td>
                          <td className="px-4 py-2 text-sm text-gray-700">{t('settings.analyticsCookies.ga.purpose')}</td>
                          <td className="px-4 py-2 text-sm text-gray-700">{t('settings.analyticsCookies.ga.duration')}</td>
                          <td className="px-4 py-2 text-sm text-gray-700">{t('settings.analyticsCookies.ga.provider')}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Marketing Cookies */}
          <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
            <div 
              className="bg-gray-50 p-4 flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('marketing')}
            >
              <div className="flex items-center">
                <div className="mr-3 text-[#7BA7C2]">
                  <Target size={20} />
                </div>
                <div>
                  <h3 className={`${textStyle.cardTitle}`}>{t('banner.marketing.title')}</h3>
                </div>
              </div>
              <div className="flex items-center">
                <label className="flex items-center mr-4">
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
                {expandedSections.marketing ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </div>
            
            {expandedSections.marketing && (
              <div className="p-4 border-t border-gray-200">
                <p className={`${textStyle.bodyText} mb-4`}>
                  {t('banner.marketing.description')}
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className={`${fontSize.base} ${fontWeight.medium} mb-2`}>{t('settings.cookieDetails')}</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('settings.cookieName')}</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('settings.cookiePurpose')}</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('settings.cookieDuration')}</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('settings.cookieProvider')}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-2 text-sm text-gray-700">{t('settings.marketingCookies.fb.name')}</td>
                          <td className="px-4 py-2 text-sm text-gray-700">{t('settings.marketingCookies.fb.purpose')}</td>
                          <td className="px-4 py-2 text-sm text-gray-700">{t('settings.marketingCookies.fb.duration')}</td>
                          <td className="px-4 py-2 text-sm text-gray-700">{t('settings.marketingCookies.fb.provider')}</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm text-gray-700">{t('settings.marketingCookies.ig.name')}</td>
                          <td className="px-4 py-2 text-sm text-gray-700">{t('settings.marketingCookies.ig.purpose')}</td>
                          <td className="px-4 py-2 text-sm text-gray-700">{t('settings.marketingCookies.ig.duration')}</td>
                          <td className="px-4 py-2 text-sm text-gray-700">{t('settings.marketingCookies.ig.provider')}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Preference Cookies */}
          <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
            <div 
              className="bg-gray-50 p-4 flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('preferences')}
            >
              <div className="flex items-center">
                <div className="mr-3 text-[#7BA7C2]">
                  <Settings size={20} />
                </div>
                <div>
                  <h3 className={`${textStyle.cardTitle}`}>{t('banner.preferences.title')}</h3>
                </div>
              </div>
              <div className="flex items-center">
                <label className="flex items-center mr-4">
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
                {expandedSections.preferences ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </div>
            
            {expandedSections.preferences && (
              <div className="p-4 border-t border-gray-200">
                <p className={`${textStyle.bodyText} mb-4`}>
                  {t('banner.preferences.description')}
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className={`${fontSize.base} ${fontWeight.medium} mb-2`}>{t('settings.cookieDetails')}</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('settings.cookieName')}</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('settings.cookiePurpose')}</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('settings.cookieDuration')}</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('settings.cookieProvider')}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-2 text-sm text-gray-700">{t('settings.preferencesCookies.language.name')}</td>
                          <td className="px-4 py-2 text-sm text-gray-700">{t('settings.preferencesCookies.language.purpose')}</td>
                          <td className="px-4 py-2 text-sm text-gray-700">{t('settings.preferencesCookies.language.duration')}</td>
                          <td className="px-4 py-2 text-sm text-gray-700">{t('settings.preferencesCookies.language.provider')}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="sticky bottom-0 bg-white z-10 p-6 border-t border-gray-200 flex justify-end">
          <div className="flex space-x-3">
            <button
              onClick={closeSettings}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              {t('banner.buttons.close')}
            </button>
            <button
              onClick={saveConsent}
              className="px-4 py-2 bg-[#7BA7C2] border border-[#7BA7C2] rounded-md text-white hover:bg-[#6A96B1] transition-colors text-sm font-medium"
            >
              {t('banner.buttons.save')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieSettings;
