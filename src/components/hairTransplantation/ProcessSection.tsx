import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle } from 'lucide-react';

interface ProcessStep {
  image: string;
  title: string;
  description: string;
  number: number;
}

const ProcessSection: React.FC = () => {
  const { t } = useTranslation('hairTransplantation');
  const [activeStep, setActiveStep] = useState(0);

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
    <section className="relative py-16 md:py-28 overflow-hidden">
      {/* Content */}
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light mb-3 md:text-5xl md:mb-4">{t('processSection.title')}</h2>
          <p className="text-base text-gray-600 font-light md:text-xl max-w-3xl mx-auto">
            {t('processSection.subtitle')}
          </p>
        </div>

        {/* Timeline Navigation - Desktop */}
        <div className="hidden md:block mb-12">
          <div className="relative flex justify-between">
            {/* Timeline line - positioned to go through the center of the buttons */}
            <div className="absolute left-0 right-0 h-1 bg-gray-200 top-6 z-0"></div>
            
            {/* Progress line - positioned to go through the center of the buttons */}
            <div 
              className="absolute left-0 h-1 bg-[#7BA7C2] top-6 z-0 transition-all duration-500"
              style={{ 
                width: activeStep === 0 
                  ? '0%' 
                  : activeStep === processSteps.length - 1 
                    ? '100%' 
                    : `calc(${(activeStep / (processSteps.length - 1)) * 100}% - 12px)`
              }}
            ></div>
            
            {/* Step indicators */}
            {processSteps.map((step, index) => (
              <div key={index} className="relative z-10 flex flex-col items-center">
                <button
                  onClick={() => setActiveStep(index)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    index <= activeStep 
                      ? 'bg-[#7BA7C2] text-white shadow-md' 
                      : 'bg-white border-2 border-gray-200 text-gray-400'
                  }`}
                  aria-label={`Go to step ${step.number}: ${step.title}`}
                  title={step.title}
                >
                  {index < activeStep ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <span className="text-lg font-medium">{step.number}</span>
                  )}
                </button>
                <div className={`text-center mt-3 transition-all duration-300 ${
                  index === activeStep ? 'text-[#7BA7C2] font-light' : 'text-gray-500 font-light'
                }`}>
                  {step.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Step Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12" data-exclude-from-effect="true">
          <div className="md:flex">
            {/* Image Column */}
            <div className="md:w-1/3 bg-[#7BA7C2]/10 p-8 flex items-center justify-center">
              <img 
                src={processSteps[activeStep].image} 
                alt={processSteps[activeStep].title}
                className="w-[80%] h-auto object-contain"
              />
            </div>
            
            {/* Content Column */}
            <div className="md:w-2/3 p-8">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[#7BA7C2] text-white flex items-center justify-center mr-4">
                  <span className="font-light">{processSteps[activeStep].number}</span>
                </div>
                <h3 className="text-2xl font-light">{processSteps[activeStep].title}</h3>
              </div>
              <p className="text-base text-gray-600 font-light leading-relaxed">
                {processSteps[activeStep].description}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Step Navigation */}
        <div className="md:hidden flex justify-between mb-8">
          <button
            onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
            className={`px-4 py-2 rounded-lg ${
              activeStep === 0 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-[#7BA7C2] border border-[#7BA7C2] hover:bg-[#7BA7C2]/5'
            }`}
          >
            Zurück
          </button>
          <div className="text-center">
            <span className="text-sm text-gray-500">Schritt {activeStep + 1} von {processSteps.length}</span>
          </div>
          <button
            onClick={() => setActiveStep(Math.min(processSteps.length - 1, activeStep + 1))}
            disabled={activeStep === processSteps.length - 1}
            className={`px-4 py-2 rounded-lg ${
              activeStep === processSteps.length - 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-[#7BA7C2] text-white hover:shadow-md'
            }`}
          >
            Weiter
          </button>
        </div>

        {/* Process Steps Grid - Compact View */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {processSteps.map((step, index) => (
            <button 
              key={index}
              onClick={() => setActiveStep(index)}
              className={`bg-white rounded-lg p-4 text-center transition-all duration-300 border ${
                index === activeStep 
                  ? 'border-[#7BA7C2] shadow-md transform scale-105' 
                  : 'border-gray-100 hover:border-[#7BA7C2]/50'
              }`}
              data-exclude-from-effect="true"
            >
              <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
                index <= activeStep 
                  ? 'bg-[#7BA7C2] text-white' 
                  : 'bg-gray-100 text-gray-400'
              }`}>
                {index < activeStep ? <CheckCircle className="w-4 h-4" /> : step.number}
              </div>
              <h4 className={`text-sm font-light ${index === activeStep ? 'text-[#7BA7C2]' : 'text-gray-700'}`}>
                {step.title}
              </h4>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
