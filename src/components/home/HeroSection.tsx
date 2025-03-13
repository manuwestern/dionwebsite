import React from 'react';
import { useTranslation } from 'react-i18next';

const HeroSection: React.FC = () => {
  const { t } = useTranslation(['home', 'common']);

  return (
    <div className="relative bg-gray-50">
      <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-16">
        <div className="relative">
          {/* Image positioned on the right */}
          <div className="absolute right-0 top-0 w-[50%] h-full z-0">
            <img 
              src="/images/Dion_Model_Home.webp"
              alt="Haartransplantation Experte in der Dion Hair Clinic"
              className="w-full h-full object-contain object-right mix-blend-multiply"
              style={{ filter: 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))' }}
            />
          </div>
          
          {/* Text content that overlaps with the image */}
          <div className="relative z-10 max-w-[85%] md:max-w-[60%]">
            <h1 className="text-3xl font-light mb-2 md:text-5xl md:mb-3">
              {t('heroSection.title')}
              <span className="block text-2xl mt-1 text-gray-700 md:text-4xl font-light">
                {t('heroSection.subtitle')}
              </span>
            </h1>
            
            {/* SEO Welcome Text */}
            <p className="text-sm font-light text-gray-700 mb-6 md:text-base md:mb-8 text-left">
              {t('heroSection.welcomeText')}
            </p>
            
            <button className="mt-4 bg-[#333333] text-white px-6 py-3 rounded-lg hover:bg-[#444444] transition-colors text-sm font-light tracking-wider md:mt-6 md:px-8">
              {t('buttons.consultation', { ns: 'common' })}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
