import React from 'react';
import { useTranslation } from 'react-i18next';

const HeroSection: React.FC = () => {
  const { t } = useTranslation(['home', 'common']);

  return (
    <div className="relative bg-gray-50">
      <div className="w-full max-w-7xl mx-auto px-4 pt-8 pb-[30vh] md:pt-20 md:pb-0">
        <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="w-full text-center md:text-left md:max-w-xl z-10">
            <h1 className="text-4xl font-light mb-3 md:text-5xl md:mb-4">
              {t('heroSection.title')}
              <span className="block text-2xl mt-2 text-gray-600 md:text-4xl font-light">
                {t('heroSection.subtitle')}
              </span>
            </h1>
            
            {/* SEO Welcome Text */}
            <p className="text-sm font-light text-gray-600 mb-6 md:text-base md:mb-8 text-left">
              {t('heroSection.welcomeText')}
            </p>
            
            <button className="w-full mt-6 bg-[#333333] text-white px-6 py-3 rounded-lg hover:bg-[#444444] transition-colors text-sm font-light tracking-wider md:w-auto md:mt-8 md:px-8">
              {t('buttons.consultation', { ns: 'common' })}
            </button>
          </div>
          <div className="absolute right-0 top-[40%] w-[75%] md:static md:w-[500px]">
            <img 
              src="/images/Dion_Model_Home.webp"
              alt="Haartransplantation Experte in der Dion Hair Clinic"
              className="w-full h-auto mix-blend-multiply"
              style={{ filter: 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
