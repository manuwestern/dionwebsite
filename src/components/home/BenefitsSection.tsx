import React from 'react';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const BenefitsSection: React.FC = () => {
  const { t } = useTranslation(['home', 'common']);

  // List of benefits to display with checkmarks
  const benefits = [
    'benefitsSection.benefits.0.title',
    'benefitsSection.benefits.1.title',
    'benefitsSection.benefits.2.title',
    'benefitsSection.benefits.3.title'
  ];

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-50 bg-size-200 animate-gradient-slow py-12 md:py-24">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl font-light mb-6 md:text-5xl">{t('benefitsSection.title')}</h2>
            
            <p className="text-gray-600 font-light mb-6">
              {t('benefitsSection.intro.paragraph1')}
            </p>
            
            <p className="text-gray-600 font-light mb-8">
              {t('benefitsSection.intro.paragraph2')}
            </p>
            
            {/* Benefits with Checkmarks */}
            <div className="flex justify-center md:justify-start mb-8">
              <div className="inline-block text-left max-w-xs">
                {benefits.map((benefitKey, index) => (
                  <div key={index} className="flex items-center gap-3 mb-4">
                    <div className="w-6 h-6 rounded-full bg-[#333333] flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 font-light">{t(benefitKey)}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* CTA Button - Centered in mobile, left-aligned in desktop */}
            <div className="flex justify-center md:justify-start">
              <button className="bg-[#333333] text-white px-6 py-3 rounded-lg hover:bg-[#444444] transition-colors text-sm font-light tracking-wider">
                {t('buttons.consultation', { ns: 'common' })}
              </button>
            </div>
          </div>
          
          {/* Right Column - Image */}
          <div className="w-full md:w-1/2 relative">
            <img 
              src="/images/Dion_Model_ThumbsUp.png"
              alt="Haartransplantation Experte in der Dion Hair Clinic - Natürliche Ergebnisse und modernste Technologien in Mönchengladbach"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
