import React, { useState } from 'react';
import { FileText, Microscope, ClipboardList, Stethoscope, HeartPulse, Clock, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ProcessStep {
  icon: React.ReactNode;
  titleKey: string;
  durationKey: string;
  descriptionKey: string;
  featuresKey?: string;
  number: number;
}

const TreatmentProcessSection: React.FC<{ 
  stepRefs: React.MutableRefObject<(HTMLDivElement | null)[]>, 
  visibleSteps: Set<number> 
}> = ({ stepRefs, visibleSteps }) => {
  const { t } = useTranslation('home');
  const [activeStep, setActiveStep] = useState(0);

  // Icons for each step
  const stepIcons = [
    <FileText className="w-5 h-5" />,
    <Microscope className="w-5 h-5" />,
    <ClipboardList className="w-5 h-5" />,
    <Stethoscope className="w-5 h-5" />,
    <HeartPulse className="w-5 h-5" />,
    <Clock className="w-5 h-5" />
  ];

  // Create process steps from translation keys
  const processSteps: ProcessStep[] = Array.from(
    { length: (t('treatmentProcessSection.steps', { returnObjects: true }) as any[]).length },
    (_, index) => ({
      icon: stepIcons[index],
      titleKey: `treatmentProcessSection.steps.${index}.title`,
      durationKey: `treatmentProcessSection.steps.${index}.duration`,
      descriptionKey: `treatmentProcessSection.steps.${index}.description`,
      featuresKey: index === 0 ? `treatmentProcessSection.steps.${index}.features` : undefined,
      number: index + 1
    })
  );

  return (
    <div className="bg-gray-50 py-16 md:py-24">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light mb-3 md:text-5xl md:mb-4">{t('treatmentProcessSection.title')}</h2>
          <p className="text-base text-gray-600 font-light md:text-xl">
            {t('treatmentProcessSection.subtitle')}
          </p>
        </div>

        {/* Horizontal Timeline */}
        <div className="hidden md:block mb-16">
          <div className="relative">
            {/* Line connecting all steps */}
            <div className="absolute top-7 left-0 right-0 h-[2px] bg-gray-300"></div>
            
            {/* Steps */}
            <div className="flex justify-between">
              {processSteps.map((step, index) => (
                <div key={index} className="flex flex-col items-center relative">
                  {/* Step Number Circle */}
                  <div 
                    className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-medium z-10 mb-3 ${
                      activeStep === index 
                        ? 'bg-[#333333] text-white' 
                        : 'bg-gray-200 text-gray-700'
                    }`}
                    onClick={() => setActiveStep(index)}
                  >
                    {step.number}
                  </div>
                  
                  {/* Step Title */}
                  <div className="text-center">
                    <div className="font-light text-sm md:text-base">{t(step.titleKey)}</div>
                    <div className="text-xs text-gray-500">{t(step.durationKey)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Timeline with integrated content */}
        <div className="md:hidden space-y-4">
          {processSteps.map((step, index) => (
            <div 
              key={index}
              ref={el => stepRefs.current[index] = el}
              className="scroll-mt-4"
            >
              {/* Step Button */}
              <button
                onClick={() => setActiveStep(index)}
                className={`w-full flex items-center gap-4 p-4 rounded-t-lg transition-all duration-300 ${
                  activeStep === index
                    ? 'bg-[#333333] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activeStep === index ? 'bg-white text-[#333333]' : 'bg-gray-200'
                }`}>
                  {step.number}
                </div>
                <div className="flex-1 text-left">
                  <div className="font-light">{t(step.titleKey)}</div>
                  <div className={`text-xs ${activeStep === index ? 'text-gray-200' : 'text-gray-500'}`}>
                    {t(step.durationKey)}
                  </div>
                </div>
              </button>
              
              {/* Step Content - Only visible when active */}
              {activeStep === index && (
                <div className="bg-white rounded-b-lg shadow-lg overflow-hidden mb-4">
                  <div className="p-6">
                    <p className="text-gray-700 font-light mb-6">
                      {t(step.descriptionKey)}
                    </p>
                    
                    {step.featuresKey && (
                      <div className="space-y-3">
                        {(t(step.featuresKey, { returnObjects: true }) as string[]).map((feature, i) => (
                          <div key={i} className="flex items-start">
                            <div className="mt-1 mr-2 flex-shrink-0">
                              <Check className="h-4 w-4 text-[#333333]" />
                            </div>
                            <span className="text-gray-700 font-light">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop Active Step Card */}
        <div className="hidden md:block w-full mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-gray-100">
                  <div className="w-10 h-10 rounded-full bg-[#333333] text-white flex items-center justify-center">
                    {processSteps[activeStep].number}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-light">{t(processSteps[activeStep].titleKey)}</h3>
                  <p className="text-sm text-gray-500">{t(processSteps[activeStep].durationKey)}</p>
                </div>
              </div>
              
              <p className="text-gray-700 font-light mb-6">
                {t(processSteps[activeStep].descriptionKey)}
              </p>
              
              {processSteps[activeStep].featuresKey && (
                <div className="space-y-3">
                  {(t(processSteps[activeStep].featuresKey!, { returnObjects: true }) as string[]).map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <div className="mt-1 mr-2 flex-shrink-0">
                        <Check className="h-4 w-4 text-[#333333]" />
                      </div>
                      <span className="text-gray-700 font-light">{feature}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentProcessSection;
