import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Sparkles, Scissors, Droplets, Compass } from 'lucide-react';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, tracking, lineHeight } from '../../utils/typography';

interface ProcessStep {
  image: string;
  title: string;
  description: string;
  number: number;
}

interface AdvantageItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ProcessSection: React.FC = () => {
  const { t } = useTranslation('hairTransplantation');
  const [hoverStep, setHoverStep] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoverAdvantage, setHoverAdvantage] = useState<number | null>(null);

  // Trigger entrance animations
  useEffect(() => {
    setIsVisible(true);
  }, []);

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

  // Additional advantages
  const advantageItems: AdvantageItem[] = [
    {
      icon: <Sparkles strokeWidth={1.5} />,
      title: "Optimale Gestaltung der Haarlinie",
      description: "Wir gestalten die Haarlinie individuell passend zum Gesicht des Patienten, unter Berücksichtigung von Gesichtsform, Alter und persönlichem Stil für ein natürliches und harmonisches Erscheinungsbild."
    },
    {
      icon: <Scissors strokeWidth={1.5} />,
      title: "Unsichtbare Narben durch kleinste FUE Punches",
      description: "Durch den Einsatz modernster und kleinster FUE Punches hinterlassen wir praktisch unsichtbare Narben im Spenderbereich, sodass Sie Ihre Haare auch kurz tragen können."
    },
    {
      icon: <Droplets strokeWidth={1.5} />,
      title: "Minimale Schwellungen durch reduzierte Flüssigkeiten",
      description: "Wir verwenden nur geringe Mengen an Flüssigkeiten wie NaCl während des Eingriffs, um Schwellungen auf ein Minimum zu reduzieren und die Erholungszeit zu verkürzen."
    },
    {
      icon: <Compass strokeWidth={1.5} />,
      title: "Präzise Platzierung für natürliche Übergänge",
      description: "Jedes Implantat wird präzise platziert, um natürliche Übergänge vom Haaransatz zum restlichen Haar zu schaffen und die natürliche Haarwuchsrichtung zu respektieren."
    }
  ];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Decorative elements */}
      <div className="absolute -z-10 w-96 h-96 bg-[#7BA7C2]/5 rounded-full -bottom-48 -left-48 blur-xl"></div>
      <div className="absolute -z-10 w-64 h-64 bg-[#7BA7C2]/10 rounded-full top-24 -right-32 blur-xl"></div>
      
      {/* Content */}
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-[#7BA7C2]/10 blur-xl"></div>
            <h2 className={`${textStyle.sectionTitle} relative`}>{t('processSection.title')}</h2>
            <div className={`${gradientUnderline.primary} w-[300px] mt-3 mx-auto`}></div>
          </div>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-4`}>
            {t('processSection.subtitle')}
          </p>
        </div>

        {/* Process Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16">
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
                      <span className={`${fontSize.lg} ${fontWeight.medium}`}>{step.number}</span>
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
                    <h3 className={`${fontSize.h4} ${fontWeight.light} mb-3 transition-colors duration-300 ${
                      isHovered ? textColor.primary : textColor.dark
                    }`}>
                      {step.title}
                    </h3>
                    
                    {/* Description - full text without scrollbars */}
                    <div className="flex-grow">
                      <p className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} ${lineHeight.relaxed}`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
                
              </div>
            );
          })}
        </div>
        
        {/* Additional Advantages Box */}
        <div className={`relative transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#7BA7C2]/5 -mr-32 -mt-32 blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#7BA7C2]/5 -ml-32 -mb-32 blur-xl"></div>
            
            <div className="relative z-10">
              <h3 className={`${fontSize.h3} ${fontWeight.light} ${textColor.primary} mb-8 text-center`}>Unsere Expertise für Ihr perfektes Ergebnis</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {advantageItems.map((item, index) => {
                  const isHovered = index === hoverAdvantage;
                  
                  return (
                    <div 
                      key={index}
                      className="relative group"
                      onMouseEnter={() => setHoverAdvantage(index)}
                      onMouseLeave={() => setHoverAdvantage(null)}
                    >
                      <div className={`flex gap-4 p-6 rounded-xl transition-all duration-300 ${
                        isHovered 
                          ? 'bg-[#7BA7C2]/5 shadow-sm' 
                          : 'hover:bg-[#7BA7C2]/5'
                      }`}>
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isHovered 
                            ? 'bg-[#7BA7C2] text-white' 
                            : 'bg-[#7BA7C2]/10 text-[#7BA7C2]'
                        }`}>
                          {item.icon}
                        </div>
                        
                        <div className="flex-grow">
                          <h4 className={`${fontSize.lg} ${fontWeight.light} mb-2 transition-colors duration-300 ${
                            isHovered ? textColor.primary : textColor.dark
                          }`}>
                            {item.title}
                          </h4>
                          <p className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} ${lineHeight.relaxed}`}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default ProcessSection;
