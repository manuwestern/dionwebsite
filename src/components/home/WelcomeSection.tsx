import React from 'react';
import { useTranslation } from 'react-i18next';

const WelcomeSection: React.FC = () => {
  const { t } = useTranslation('home');

  return (
    <div className="bg-white py-16 md:py-24">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-base text-gray-700 font-light leading-relaxed md:text-xl">
            {t('heroSection.welcomeText')}
          </p>
          <div className="mt-8">
            <button className="inline-block bg-[#333333] text-white px-6 py-3 rounded-lg hover:bg-[#444444] transition-colors text-sm font-light tracking-wider">
              {t('buttons.moreInfo', { ns: 'common' })}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
