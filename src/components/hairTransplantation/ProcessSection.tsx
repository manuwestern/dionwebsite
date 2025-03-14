import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  CalendarCheck, 
  ClipboardList, 
  Stethoscope, 
  HeartPulse,
  Clock,
  Check
} from 'lucide-react';

const ProcessSection: React.FC = () => {
  const { t } = useTranslation('hairTransplantation');
  const [activeStep, setActiveStep] = useState(0);

  // Get steps from translation
  const steps = t('processSection.steps', { returnObjects: true }) as any[];

  // Duration information for each step
  const durations = [
    "60 Min.",
    "90 Min.",
    "2 Wochen",
    "4-8 Std."
  ];

  // Icons for each step
  const stepIcons = [
    <CalendarCheck className="h-6 w-6" />,
    <ClipboardList className="h-6 w-6" />,
    <Stethoscope className="h-6 w-6" />,
    <HeartPulse className="h-6 w-6" />
  ];

  return (
    <div className="bg-gray-100 py-16 md:py-24">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light mb-3 md:text-5xl md:mb-4">{t('processSection.title')}</h2>
          <p className="text-base text-gray-600 font-light md:text-xl max-w-3xl mx-auto">
            {t('processSection.subtitle')}
          </p>
        </div>

        {/* Timeline - Horizontal for desktop, vertical for mobile */}
        <div className="mb-16">
          {/* Desktop Timeline (hidden on mobile) */}
          <div className="hidden md:block relative">
            {/* Horizontal line connecting steps */}
            <div className="absolute left-0 right-0 top-[25px] h-[2px] bg-gray-200"></div>
            
            <div className="grid grid-cols-4 gap-4 relative">
              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center"
                  onClick={() => setActiveStep(index)}
                >
                  {/* Step number circle */}
                  <div className={`w-[50px] h-[50px] rounded-full flex items-center justify-center 
                                  text-xl font-medium mb-4 cursor-pointer transition-all duration-300
                                  ${activeStep === index 
                                    ? 'bg-[#333333] text-white shadow-lg' 
                                    : 'bg-white text-[#333333] border-2 border-gray-300'}`}>
                    {index + 1}
                  </div>
                  
                  {/* Step title and duration */}
                  <div className="text-center">
                    <h3 className={`text-base font-medium mb-1 transition-colors duration-300
                                  ${activeStep === index ? 'text-[#333333]' : 'text-gray-600'}`}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-500 font-light">
                      {durations[index]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile Timeline (hidden on desktop) */}
          <div className="md:hidden">
            <div className="flex justify-between items-center mb-8 overflow-x-auto pb-2 hide-scrollbar">
              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col items-center mx-2 min-w-[80px] cursor-pointer`}
                  onClick={() => setActiveStep(index)}
                >
                  {/* Step number circle */}
                  <div className={`w-[40px] h-[40px] rounded-full flex items-center justify-center 
                                  text-base font-medium mb-2
                                  ${activeStep === index 
                                    ? 'bg-[#333333] text-white' 
                                    : 'bg-white text-[#333333] border-2 border-gray-300'}`}>
                    {index + 1}
                  </div>
                  
                  {/* Step title */}
                  <p className={`text-xs text-center transition-colors duration-300
                                ${activeStep === index ? 'text-[#333333] font-medium' : 'text-gray-500'}`}>
                    {step.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Step Details */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Icon Column */}
            <div className="bg-gray-50 p-6 flex items-start justify-center md:w-1/4">
              <div className="w-16 h-16 rounded-full bg-[#333333] text-white flex items-center justify-center">
                {stepIcons[activeStep]}
              </div>
            </div>
            
            {/* Content Column */}
            <div className="p-6 md:p-8 md:w-3/4">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-[#333333] text-white flex items-center justify-center mr-3 font-medium">
                  {activeStep + 1}
                </div>
                <h3 className="text-xl md:text-2xl font-medium">{steps[activeStep].title}</h3>
              </div>
              
              <p className="text-gray-600 font-light mb-6">
                {steps[activeStep].description}
              </p>
              
              {/* Duration */}
              <div className="flex items-center text-gray-500 mb-4">
                <Clock className="h-5 w-5 mr-2" />
                <span className="text-sm">{durations[activeStep]}</span>
              </div>
              
              {/* Benefits */}
              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="mt-1 mr-2 flex-shrink-0 text-[#333333]">
                    <Check className="h-5 w-5" />
                  </div>
                  <p className="text-gray-600 font-light">
                    {activeStep === 0 ? 'Persönlich oder per Video möglich' : 
                     activeStep === 1 ? 'Detaillierte Analyse Ihrer Haarsituation' :
                     activeStep === 2 ? 'Sorgfältige Vorbereitung für optimale Ergebnisse' :
                     'Regelmäßige Nachkontrollen zur Überwachung des Heilungsprozesses'}
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="mt-1 mr-2 flex-shrink-0 text-[#333333]">
                    <Check className="h-5 w-5" />
                  </div>
                  <p className="text-gray-600 font-light">
                    {activeStep === 0 ? 'Unverbindlich und kostenlos' : 
                     activeStep === 1 ? 'Individuelle Behandlungsplanung' :
                     activeStep === 2 ? 'Klare Anweisungen für die Zeit vor dem Eingriff' :
                     'Persönliche Betreuung während des gesamten Heilungsprozesses'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessSection;
