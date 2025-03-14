import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle } from 'lucide-react';

const ProcessSection: React.FC = () => {
  const { t } = useTranslation('hairTransplantation');

  // Get steps from translation
  const steps = t('processSection.steps', { returnObjects: true }) as any[];

  return (
    <div className="bg-gray-100 py-16 md:py-24">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light mb-3 md:text-5xl md:mb-4">{t('processSection.title')}</h2>
          <p className="text-base text-gray-600 font-light md:text-xl">
            {t('processSection.subtitle')}
          </p>
        </div>

        <div className="relative">
          {/* Vertical line connecting steps */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300 hidden md:block"></div>
          
          <div className="space-y-12 relative">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col md:flex-row">
                {/* Step number and icon */}
                <div className="flex-shrink-0 flex flex-col items-center md:items-start mb-4 md:mb-0 md:mr-6">
                  <div className="w-8 h-8 rounded-full bg-[#333333] text-white flex items-center justify-center font-light z-10">
                    {index + 1}
                  </div>
                  <div className="hidden md:block mt-2">
                    <CheckCircle className="h-6 w-6 text-[#333333]" />
                  </div>
                </div>
                
                {/* Step content */}
                <div className="bg-white rounded-xl p-6 shadow-md flex-grow">
                  <h3 className="text-xl font-light mb-2">{step.title}</h3>
                  <p className="text-gray-600 font-light">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessSection;
