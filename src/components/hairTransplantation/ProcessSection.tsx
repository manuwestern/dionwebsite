import React from 'react';
import { useTranslation } from 'react-i18next';

interface ProcessStep {
  image: string;
  title: string;
  description: string;
  number: number;
}

const ProcessSection: React.FC = () => {
  const { t } = useTranslation('hairTransplantation');

  // Images for each step
  const stepImages = [
    "/images/Haartransplantation_Planung.svg",
    "/images/Haartransplantation_Entnahme.svg",
    "/images/Haartransplantation_Einpflanzung.svg",
    "/images/Haartransplantation_Endergebnis.svg"
  ];

  // Get steps from translation
  const stepsData = t('processSection.steps', { returnObjects: true }) as any[];

  // Create process steps
  const processSteps: ProcessStep[] = stepsData.map((step, index) => ({
    image: stepImages[index],
    title: step.title,
    description: step.description,
    number: index + 1
  }));

  return (
    <section className="relative py-16 md:py-28 overflow-hidden bg-gray-100">
    
      
      {/* Content */}
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light mb-3 md:text-5xl md:mb-4">{t('processSection.title')}</h2>
          <p className="text-base text-gray-600 font-light md:text-xl max-w-3xl mx-auto mb-8">
            {t('processSection.subtitle')}
          </p>
        </div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100"
            >
              {/* Step Number and Title */}
              <div className="bg-gradient-to-r from-gray-50 to-white py-4 px-5 border-b border-gray-100">
                <div className="flex items-center">
                  <span className="text-[#333333] text-xl md:text-2xl font-light mr-3 opacity-70">
                    {step.number}
                  </span>
                  <div className="w-[1px] h-6 bg-gray-300 mx-3"></div>
                  <h3 className="text-base md:text-lg font-light text-gray-800">{step.title}</h3>
                </div>
              </div>
              
              {/* Step Content */}
              <div className="p-5">
                <div className="flex justify-center mb-6 py-2">
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="w-[60%] h-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                  />
                </div>
                <p className="text-sm md:text-base text-gray-700 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
