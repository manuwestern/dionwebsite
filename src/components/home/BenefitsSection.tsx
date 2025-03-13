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
    <div className="bg-gray-100 py-12 md:py-24">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-light mb-6 md:text-5xl">{t('benefitsSection.title')}</h2>
            
            <p className="text-gray-600 font-light mb-6">
              {t('benefitsSection.intro.paragraph1')}
            </p>
            
            <p className="text-gray-600 font-light mb-8">
              {t('benefitsSection.intro.paragraph2')}
            </p>
            
            {/* Benefits with Checkmarks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefitKey, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#333333] flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 font-light">{t(benefitKey)}</span>
                </div>
              ))}
            </div>
            
            {/* CTA Button */}
            <button className="bg-[#333333] text-white px-6 py-3 rounded-lg hover:bg-[#444444] transition-colors text-sm font-light tracking-wider">
              {t('buttons.consultation', { ns: 'common' })}
            </button>
          </div>
          
          {/* Right Column - Image with Overlay */}
          <div className="w-full md:w-1/2 relative">
            <img 
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Haartransplantation Experte"
              className="w-full rounded-2xl shadow-xl h-auto"
            />
            
            {/* Overlay Message */}
            <div className="absolute bottom-6 right-6 bg-[#333333] bg-opacity-90 text-white p-6 rounded-xl max-w-xs shadow-lg">
              <p className="font-light">
                {t('benefitsSection.overlay')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
