import React, { useState, useEffect, useRef } from 'react';
import { FileText, Microscope, ClipboardList, Stethoscope, HeartPulse, Check, ChevronDown, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, tracking, lineHeight } from '../../utils/typography';
import { buttonStyle, buttonRippleClass, buttonArrowClass } from '../../utils/buttons';

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
  const [cardHeight, setCardHeight] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Trigger entrance animations on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      
      if (sectionRef.current) {
        const elementPosition = sectionRef.current.offsetTop + 200;
        
        if (scrollPosition > elementPosition) {
          setIsVisible(true);
        }
      }
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Measure the height of the card whenever the active step changes
  useEffect(() => {
    if (cardRef.current) {
      const height = cardRef.current.offsetHeight;
      setCardHeight(height);
    }
  }, [activeStep]);

  // Icons for each step
  const stepIcons = [
    <FileText strokeWidth={1.5} />,
    <Microscope strokeWidth={1.5} />,
    <ClipboardList strokeWidth={1.5} />,
    <Stethoscope strokeWidth={1.5} />,
    <HeartPulse strokeWidth={1.5} />
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
    <section 
      ref={sectionRef}
      id="treatment-process-section" 
      className="py-20 md:py-28 relative overflow-hidden"
    >
      {/* Background with gradient and blur effects */}
      <div className="absolute inset-0 -z-10">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-[#7BA7C2]/5 -mr-[400px] -mt-[400px] blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[#7BA7C2]/5 -ml-[300px] -mb-[300px] blur-3xl"></div>
        
        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: 'url("/images/dionhairclinic_bg.svg")',
            backgroundSize: '200px',
            backgroundRepeat: 'repeat'
          }}
        ></div>
      </div>
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header with elegant design */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6 relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-[#7BA7C2]/10 blur-xl"></div>
            <h2 className={`${textStyle.sectionTitle}`} lang="de">{t('treatmentProcessSection.title')}</h2>
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[300px] mt-4 mx-auto`}></div>
          </div>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-6`}>
            {t('treatmentProcessSection.subtitle')}
          </p>
        </div>

        {/* Horizontal Timeline - Desktop */}
        <div className={`hidden md:block mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative">
            {/* Line connecting all steps */}
            <div className="absolute top-7 left-0 right-0 h-[2px] bg-gradient-to-r from-[#7BA7C2]/10 via-[#7BA7C2] to-[#7BA7C2]/10"></div>
            
            {/* Steps */}
            <div className="flex justify-between">
              {processSteps.map((step, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col items-center relative transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Step Number Circle - Clickable with animation */}
                  <button 
                    className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-medium z-10 mb-3 cursor-pointer transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7BA7C2] ${
                      activeStep === index 
                        ? 'bg-[#7BA7C2] text-white shadow-lg' 
                        : index < activeStep 
                          ? 'bg-[#7BA7C2]/60 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => handleStepChange(index)}
                    aria-label={`View details for step ${step.number}: ${t(step.titleKey)}`}
                  >
                    {index < activeStep ? <Check className="w-6 h-6" /> : step.number}
                  </button>
                  
                  {/* Step Title */}
                  <div className="text-center">
                    <div className={`font-light text-sm md:text-base transition-colors duration-300 ${activeStep === index ? textColor.primary : 'text-gray-600'}`}>
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
              className={`scroll-mt-4 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Step Button */}
              <button
                onClick={() => handleStepChange(index)}
                className={`w-full flex items-center gap-4 p-4 rounded-lg transition-all duration-300 ${
                  activeStep === index
                    ? 'bg-[#7BA7C2] text-white shadow-lg rounded-b-none'
                    : index < activeStep 
                      ? 'bg-[#7BA7C2]/20 text-gray-700' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activeStep === index 
                    ? 'bg-white text-[#7BA7C2]' 
                    : index < activeStep 
                      ? 'bg-[#7BA7C2]/60 text-white' 
                      : 'bg-gray-200'
                }`}>
                  {index < activeStep ? <Check className="w-5 h-5" /> : step.number}
                </div>
                <div className="flex-1 text-center md:text-left">
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
                  <div className="p-6 text-left">
                    <p className={`${textStyle.bodyText} mb-6`}>
                      {t(step.descriptionKey)}
                    </p>
                    
                    {step.featuresKey && (
                      <div className="space-y-3 flex flex-col items-start">
                        {(t(step.featuresKey, { returnObjects: true }) as string[]).map((feature, i) => (
                          <div key={i} className="flex items-start text-left">
                            <div className="w-6 h-6 rounded-full bg-[#7BA7C2]/10 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                              <Check className="h-3 w-3 text-[#7BA7C2]" />
                            </div>
                            <span className={`${textStyle.bodyText}`}>{feature}</span>
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
            ref={cardRef}
            className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={cardHeight ? { minHeight: `${cardHeight}px` } : {}}
          >
            <div className="p-8 flex flex-col h-full relative" style={{ minHeight: '500px' }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-[#7BA7C2]/10">
                  <div className="w-12 h-12 rounded-full bg-[#7BA7C2] text-white flex items-center justify-center">
                    {stepIcons[activeStep]}
                  </div>
                </div>
                <div>
                  <h3 className={`${fontSize.h3} ${fontWeight.light} ${textColor.dark}`}>{t(processSteps[activeStep].titleKey)}</h3>
                  <p className={`${fontSize.sm} ${textColor.light}`}>{t(processSteps[activeStep].durationKey)}</p>
                </div>
              </div>
              
              <div className="flex-grow pb-20">
                <p className={`${textStyle.bodyTextImportant} mb-8 leading-relaxed`}>
                  {t(processSteps[activeStep].descriptionKey)}
                </p>
                
                {processSteps[activeStep].featuresKey && (
                  <div className="space-y-4 bg-[#7BA7C2]/5 p-6 rounded-xl">
                    <h4 className={`${fontSize.lg} ${fontWeight.normal} ${textColor.dark} mb-4`}>Wichtige Punkte:</h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {(t(processSteps[activeStep].featuresKey!, { returnObjects: true }) as string[]).map((feature, i) => (
                        <div key={i} className="flex items-start">
                          <div className="w-8 h-8 rounded-full bg-[#7BA7C2]/10 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                            <Check className="h-4 w-4 text-[#7BA7C2]" />
                          </div>
                          <span className={`${textStyle.bodyText}`}>{feature}</span>
                        </div>
                      ))}
                    </div>
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
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
                    activeStep === processSteps.length - 1 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : buttonStyle.primary
                  }`}
                >
                  {activeStep === processSteps.length - 1 ? (
                    <>
                      <span>Fertig</span>
                      <Check className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      <span className={buttonRippleClass}></span>
                      <span className="relative flex items-center">
                        Weiter
                        <ChevronRight className="w-5 h-5 ml-1" />
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className={`mt-12 flex justify-center transition-all duration-1000 delay-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button className={`${buttonStyle.primary} shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]`}>
            <span className={buttonRippleClass}></span>
            <span className={`relative flex items-center ${textStyle.button} uppercase tracking-widest`}>
              {t('buttons.consultation', { ns: 'common' })}
              <ArrowRight className={`${buttonArrowClass} ml-2`} />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TreatmentProcessSection;
