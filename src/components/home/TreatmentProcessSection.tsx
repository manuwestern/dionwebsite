import React, { useState, useEffect, useRef } from 'react';
import { FileText, Microscope, ClipboardList, Stethoscope, HeartPulse, Clock, Check, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [scrollY, setScrollY] = useState(0);
  const [cardHeight, setCardHeight] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Measure the height of the first card when it's active
  useEffect(() => {
    if (activeStep === 0 && cardRef.current) {
      const height = cardRef.current.offsetHeight;
      setCardHeight(height);
    }
  }, [activeStep]);

  // No need for button position tracking anymore

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
      featuresKey: `treatmentProcessSection.steps.${index}.features`,
      number: index + 1
    })
  );

  const handleStepChange = (index: number) => {
    setActiveStep(index);
  };

  return (
    <div className="relative py-16 md:py-28 overflow-hidden bg-gradient-to-b from-gray-50 to-white min-h-[800px] flex items-center">
      {/* Background image - fixed position without parallax for better compatibility */}
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: 'url("/images/bg_abstrakt.webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          opacity: 0.15
        }}
      ></div>
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light mb-3 md:text-5xl md:mb-4">{t('treatmentProcessSection.title')}</h2>
          <p className="text-base text-gray-600 font-light md:text-xl max-w-3xl mx-auto mb-2">
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
                  {/* Step Number Circle - Clickable with animation */}
                  <button 
                    className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-medium z-10 mb-3 cursor-pointer transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ${
                      activeStep === index 
                        ? 'bg-[#333333] text-white shadow-lg' 
                        : index < activeStep 
                          ? 'bg-gray-400 text-white' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    onClick={() => handleStepChange(index)}
                    aria-label={`View details for step ${step.number}: ${t(step.titleKey)}`}
                  >
                    {index < activeStep ? <Check className="w-6 h-6" /> : step.number}
                  </button>
                  
                  {/* Step Title */}
                  <div className="text-center">
                    <div className={`font-light text-sm md:text-base ${activeStep === index ? 'text-[#333333] font-medium' : 'text-gray-600'}`}>
                      {t(step.titleKey)}
                    </div>
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
                onClick={() => handleStepChange(index)}
                className={`w-full flex items-center gap-4 p-4 rounded-lg transition-all duration-300 ${
                  activeStep === index
                    ? 'bg-[#333333] text-white shadow-lg rounded-b-none'
                    : index < activeStep 
                      ? 'bg-gray-300 text-gray-700' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                aria-expanded={activeStep === index}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activeStep === index 
                    ? 'bg-white text-[#333333]' 
                    : index < activeStep 
                      ? 'bg-gray-400 text-white' 
                      : 'bg-gray-200'
                }`}>
                  {index < activeStep ? <Check className="w-5 h-5" /> : step.number}
                </div>
                <div className="flex-1 text-left">
                  <div className="font-light">{t(step.titleKey)}</div>
                  <div className={`text-xs ${activeStep === index ? 'text-gray-200' : 'text-gray-500'}`}>
                    {t(step.durationKey)}
                  </div>
                </div>
                <ChevronDown 
                  className={`w-5 h-5 transition-transform duration-300 ${activeStep === index ? 'rotate-180' : ''}`} 
                  aria-hidden="true"
                />
              </button>
              
              {/* Step Content - Only visible when active */}
              {activeStep === index && (
                <div className="bg-white rounded-b-lg shadow-lg overflow-hidden mb-4">
                  <div className="p-6">
                    <p className="text-base md:text-lg text-gray-700 font-light mb-6">
                      {t(step.descriptionKey)}
                    </p>
                    
                    {step.featuresKey && (
                      <div className="space-y-3">
                        {(t(step.featuresKey, { returnObjects: true }) as string[]).map((feature, i) => (
                          <div key={i} className="flex items-start">
                            <div className="mt-1 mr-2 flex-shrink-0">
                              <Check className="h-4 w-4 text-[#333333]" />
                            </div>
                        <span className="text-base text-gray-600 font-light">{feature}</span>
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
          <div 
            ref={activeStep === 0 ? cardRef : undefined}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
            style={cardHeight ? { minHeight: `${cardHeight}px` } : {}}
          >
            <div className="p-6 md:p-8 flex flex-col h-full relative" style={{ minHeight: '500px' }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-gray-100">
                  <div className="w-12 h-12 rounded-full bg-[#333333] text-white flex items-center justify-center">
                    {stepIcons[activeStep]}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-light">{t(processSteps[activeStep].titleKey)}</h3>
                  <p className="text-sm text-gray-500">{t(processSteps[activeStep].durationKey)}</p>
                </div>
              </div>
              
              <div className="flex-grow pb-20">
                <p className="text-base md:text-lg text-gray-700 font-light mb-6 leading-relaxed">
                  {t(processSteps[activeStep].descriptionKey)}
                </p>
                
                {processSteps[activeStep].featuresKey && (
                  <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
                    <h4 className="text-lg font-light text-gray-700 mb-2">Wichtige Punkte:</h4>
                    {(t(processSteps[activeStep].featuresKey!, { returnObjects: true }) as string[]).map((feature, i) => (
                      <div key={i} className="flex items-start">
                        <div className="mt-1 mr-2 flex-shrink-0">
                          <Check className="h-4 w-4 text-[#333333]" />
                        </div>
                        <span className="text-base text-gray-600 font-light">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between absolute bottom-8 left-8 right-8 mt-8" style={{ zIndex: 10 }}>
                <button 
                  onClick={() => handleStepChange(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    activeStep === 0 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Zurück</span>
                </button>
                
                <button 
                  onClick={() => handleStepChange(Math.min(processSteps.length - 1, activeStep + 1))}
                  disabled={activeStep === processSteps.length - 1}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    activeStep === processSteps.length - 1 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'bg-[#333333] text-white hover:bg-[#444444]'
                  }`}
                >
                  <span>Weiter</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentProcessSection;
