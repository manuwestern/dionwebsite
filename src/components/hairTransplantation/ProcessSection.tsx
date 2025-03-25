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
  const [hoverStep, setHoverStep] = useState<number | null>(null);

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
    <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Decorative elements */}
      <div className="absolute -z-10 w-96 h-96 bg-[#7BA7C2]/5 rounded-full -bottom-48 -left-48 blur-xl"></div>
      <div className="absolute -z-10 w-64 h-64 bg-[#7BA7C2]/10 rounded-full top-24 -right-32 blur-xl"></div>
      
      {/* Content */}
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <h2 className="text-3xl font-light md:text-5xl">{t('processSection.title')}</h2>
            <div className="h-1 bg-gradient-to-r from-[#7BA7C2] to-[#7BA7C2]/30 mt-3 mx-auto"></div>
          </div>
          <p className="text-base text-gray-600 font-light md:text-xl max-w-3xl mx-auto mt-4">
            {t('processSection.subtitle')}
          </p>
        </div>

        {/* Process Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {processSteps.map((step, index) => {
            const isHovered = index === hoverStep;
            
            return (
              <div 
                key={index}
                className="relative group"
                onMouseEnter={() => setHoverStep(index)}
                onMouseLeave={() => setHoverStep(null)}
              >
                
                {/* Card with optimized height for perfect visual balance */}
                <div 
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden h-[520px] transition-all duration-500 ${
                    isHovered
                      ? 'shadow-xl transform -translate-y-1 border-2 border-[#7BA7C2]/80 scale-[1.02]' 
                      : 'border border-gray-100 hover:border-[#7BA7C2]/30 hover:shadow-md'
                  }`}
                >
                  {/* Card Header with Image */}
                  <div className={`relative w-full aspect-[4/3] overflow-hidden ${
                    isHovered
                      ? 'bg-gradient-to-br from-[#7BA7C2]/20 to-[#7BA7C2]/5' 
                      : 'bg-gradient-to-br from-gray-50 to-white'
                  }`}>
                    {/* Step Number Badge */}
                    <div className={`absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-300 ${
                      isHovered
                        ? 'bg-[#7BA7C2] text-white shadow-md' 
                        : 'bg-white text-[#7BA7C2] border-2 border-[#7BA7C2]/50 shadow-sm'
                    }`}>
                      <span className="text-lg font-medium">{step.number}</span>
                    </div>
                    
                    {/* Image */}
                    <div className="w-full h-full flex items-center justify-center p-8">
                      <img 
                        src={step.image} 
                        alt={step.title}
                        className={`w-full h-full object-contain transition-all duration-500 ${
                          isHovered ? 'scale-110' : ''
                        }`}
                      />
                    </div>
                    
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent transition-opacity duration-300 ${
                      isHovered ? 'opacity-70' : 'opacity-0'
                    }`}></div>
                  </div>
                  
                  {/* Card Content with optimized height */}
                  <div className="p-6 h-[240px] flex flex-col">
                    {/* Title */}
                    <h3 className={`text-xl font-light mb-3 transition-colors duration-300 ${
                      isHovered ? 'text-[#7BA7C2]' : 'text-gray-800'
                    }`}>
                      {step.title}
                    </h3>
                    
                    {/* Description - full text without scrollbars */}
                    <div className="flex-grow">
                      <p className="text-sm text-gray-600 font-light leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
                
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
};

export default ProcessSection;
