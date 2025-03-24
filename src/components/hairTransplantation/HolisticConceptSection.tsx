import React from 'react';
import { useTranslation } from 'react-i18next';
import { Brain, FileText, Microscope, Pill, Droplet } from 'lucide-react';
import './holisticConcept.css';

interface ConceptStep {
  title: string;
  description: string;
  icon: React.ReactNode;
  boxAngle: number; // Angle for box positioning
  lineAngle: number; // Angle for line positioning
}

const HolisticConceptSection: React.FC = () => {
  const { t } = useTranslation('hairTransplantation');

  // Create concept steps with icons and angles for circular positioning
  // Evenly spaced at 72-degree intervals (360 / 5 = 72)
  // First box positioned at 12 o'clock (270 degrees)
  const conceptSteps: ConceptStep[] = [
    {
      title: t('holisticConceptSection.steps.0.title'),
      description: t('holisticConceptSection.steps.0.description'),
      icon: <Brain className="w-6 h-6 text-white" />,
      boxAngle: 280, // Top (12 o'clock position)
      lineAngle: 270
    },
    {
      title: t('holisticConceptSection.steps.1.title'),
      description: t('holisticConceptSection.steps.1.description'),
      icon: <FileText className="w-6 h-6 text-white" />,
      boxAngle: 360, // Top-right (between 1-2 o'clock)
      lineAngle: 342
    },
    {
      title: t('holisticConceptSection.steps.2.title'),
      description: t('holisticConceptSection.steps.2.description'),
      icon: <Microscope className="w-6 h-6 text-white" />,
      boxAngle: 80, // Right (between 4-5 o'clock)
      lineAngle: 54
    },
    {
      title: t('holisticConceptSection.steps.3.title'),
      description: t('holisticConceptSection.steps.3.description'),
      icon: <Pill className="w-6 h-6 text-white" />,
      boxAngle: 140, // Bottom (between 7-8 o'clock)
      lineAngle: 126
    },
    {
      title: t('holisticConceptSection.steps.4.title'),
      description: t('holisticConceptSection.steps.4.description'),
      icon: <Droplet className="w-6 h-6 text-white" />,
      boxAngle: 220, // Left (between 10-11 o'clock)
      lineAngle: 198
    }
  ];

  return (
    <div className="relative py-16 md:py-28 overflow-hidden min-h-[800px] flex items-center">
      {/* Background with gradient overlay */}
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
      
      {/* Content */}
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light mb-3 md:text-5xl md:mb-4">{t('holisticConceptSection.title')}</h2>
          <p className="text-base text-gray-600 font-light md:text-xl max-w-3xl mx-auto">
            {t('holisticConceptSection.subtitle')}
          </p>
        </div>

        {/* Introduction text - visible only on mobile */}
        <div className="md:hidden mb-8">
          <p className="text-base text-gray-700 font-light leading-relaxed">
            {t('holisticConceptSection.introduction')}
          </p>
        </div>

        {/* Circle diagram - hidden on mobile, shown on desktop */}
        <div className="hidden md:block relative">
          {/* Container with fixed size */}
          <div className="relative mx-auto w-[800px] h-[800px]">
            {/* Outer decorative circles */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[700px] h-[700px] rounded-full border-2 border-gray-100 opacity-70 animate-pulse"></div>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[600px] h-[600px] rounded-full border-2 border-gray-200 opacity-80"></div>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[500px] h-[500px] rounded-full border-2 border-gray-300 opacity-60"></div>
            </div>
            
            {/* Center circle */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="w-[200px] h-[200px] rounded-full bg-white shadow-lg flex items-center justify-center">
                <div className="text-center p-4">
                  <h3 className="text-2xl font-light text-gray-800 mb-2">Dion 360°</h3>
                  <div className="w-16 h-[1px] bg-gray-300 mx-auto mb-2"></div>
                  <p className="text-xs text-gray-600 font-light">
                    {t('holisticConceptSection.introduction')}
                  </p>
                </div>
              </div>
            </div>

            {/* Concept steps positioned in a circle */}
            {conceptSteps.map((step, index) => {
              // Calculate position based on boxAngle
              const boxRadians = step.boxAngle * (Math.PI / 180); // Convert to radians
              const distance = 320; // Increased distance from center to accommodate larger boxes
              
              // Calculate x and y coordinates
              const x = Math.sin(boxRadians) * distance;
              const y = -Math.cos(boxRadians) * distance; // Negative because y increases downward in CSS
              
              return (
                <React.Fragment key={index}>
                  {/* Connecting line - using separate lineAngle */}
                  <div 
                    className="absolute top-1/2 left-1/2 h-[2px] bg-gray-300 z-10"
                    style={{
                      width: `${distance - 125}px`, // Distance from center to box minus center circle radius
                      transformOrigin: 'left center',
                      transform: `rotate(${step.lineAngle}deg) translateX(100px)` // Start from edge of center circle
                    }}
                  ></div>
                  
                  {/* Larger text box with fixed dimensions and no scrollbars */}
                  <div 
                    className="absolute bg-white rounded-xl shadow-md transition-all duration-300 hover:shadow-lg z-30"
                    style={{
                      width: '280px',
                      height: '150px',
                      top: `calc(50% + ${y}px)`,
                      left: `calc(50% + ${x}px)`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <div className="flex items-center h-full p-4">
                      <div 
                        className="flex-shrink-0 mr-3 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center"
                      >
                        {step.icon}
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-800 mb-2">{step.title}</h3>
                        <p className="text-xs text-gray-600 font-light">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Mobile layout - stacked list with enhanced styling */}
        <div className="md:hidden space-y-5">
          {conceptSteps.map((step, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <div className="p-5">
                <div className="flex items-start">
                  <div 
                    className="flex-shrink-0 mr-4 w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center"
                  >
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-800 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600 font-light leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HolisticConceptSection;
