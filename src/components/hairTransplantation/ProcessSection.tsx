import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  CalendarCheck, 
  ClipboardList, 
  Stethoscope, 
  HeartPulse 
} from 'lucide-react';

const ProcessSection: React.FC = () => {
  const { t } = useTranslation('hairTransplantation');

  // Get steps from translation
  const steps = t('processSection.steps', { returnObjects: true }) as any[];

  // Icons for each step
  const stepIcons = [
    <CalendarCheck className="h-8 w-8" />,
    <ClipboardList className="h-8 w-8" />,
    <Stethoscope className="h-8 w-8" />,
    <HeartPulse className="h-8 w-8" />
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

        {/* Desktop Timeline (hidden on mobile) */}
        <div className="hidden md:block relative">
          {/* Horizontal line connecting steps */}
          <div className="absolute left-0 right-0 top-24 h-0.5 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200"></div>
          
          <div className="grid grid-cols-4 gap-6 relative">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col items-center ${index % 2 === 0 ? 'pt-0 pb-16' : 'pt-48 pb-0'}`}>
                {/* Step number and icon */}
                <div className="flex-shrink-0 mb-6 relative">
                  {/* Circle with gradient border */}
                  <div className="w-16 h-16 rounded-full bg-white p-1 shadow-lg z-10 relative
                                 bg-gradient-to-br from-gray-100 to-gray-300">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <div className="text-[#333333]">
                        {stepIcons[index]}
                      </div>
                    </div>
                  </div>
                  
                  {/* Step number badge */}
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#333333] text-white 
                                 flex items-center justify-center font-medium text-sm z-20">
                    {index + 1}
                  </div>
                </div>
                
                {/* Step content */}
                <div className={`bg-white rounded-xl p-6 shadow-lg w-full transform transition-all duration-300 
                                hover:shadow-xl hover:-translate-y-1 border-t-4 border-[#333333]`}>
                  <h3 className="text-xl font-medium mb-3 text-center">{step.title}</h3>
                  <p className="text-gray-600 font-light text-center">
                    {step.description}
                  </p>
                </div>
                
                {/* Vertical connector line */}
                <div className={`absolute ${index % 2 === 0 ? 'top-16 h-32' : 'bottom-16 h-32'} 
                                w-0.5 bg-gradient-to-b from-gray-400 to-transparent`}></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Mobile Timeline (hidden on desktop) */}
        <div className="md:hidden relative">
          {/* Vertical line connecting steps */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-200 via-gray-400 to-gray-200"></div>
          
          <div className="space-y-12 relative">
            {steps.map((step, index) => (
              <div key={index} className="flex">
                {/* Step number and icon */}
                <div className="flex-shrink-0 mr-6">
                  {/* Circle with gradient border */}
                  <div className="w-12 h-12 rounded-full bg-white p-1 shadow-md z-10 relative
                                 bg-gradient-to-br from-gray-100 to-gray-300">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <div className="text-[#333333] transform scale-75">
                        {stepIcons[index]}
                      </div>
                    </div>
                  </div>
                  
                  {/* Step number badge */}
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#333333] text-white 
                                 flex items-center justify-center font-medium text-xs">
                    {index + 1}
                  </div>
                </div>
                
                {/* Step content */}
                <div className="bg-white rounded-xl p-5 shadow-md flex-grow border-l-4 border-[#333333]">
                  <h3 className="text-lg font-medium mb-2">{step.title}</h3>
                  <p className="text-gray-600 font-light text-sm">
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
