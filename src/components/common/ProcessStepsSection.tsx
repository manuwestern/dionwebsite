import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, Scissors, Droplets, Compass } from 'lucide-react';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, tracking, lineHeight } from '../../utils/typography';
import './ProcessStepsSection.css';

export interface ProcessStep {
  image: string;
  title: string;
  description: string;
  number: number;
}

export interface AdvantageItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface ProcessStepsSectionProps {
  // Required props
  translationNamespace: string;
  stepImages: string[];
  
  // Optional props
  imageAltTemplate?: string;
  cardMinHeight?: string;
  cardHeight?: string;
  contentMinHeight?: string;
  contentHeight?: string;
  objectFit?: 'contain' | 'cover';
  
  // Optional icon customization
  customAdvantageIcons?: React.ReactNode[];
}

const ProcessStepsSection: React.FC<ProcessStepsSectionProps> = ({
  // Required props
  translationNamespace,
  stepImages,
  
  // Optional props with defaults
  imageAltTemplate = "{title} - {treatmentType} Prozess Schritt {number}",
  cardMinHeight = "450px",
  cardHeight = "520px",
  contentMinHeight = "180px",
  contentHeight = "240px",
  objectFit = "contain",
  
  // Optional icon customization
  customAdvantageIcons
}) => {
  const { t } = useTranslation([translationNamespace, 'common']);
  const [hoverStep, setHoverStep] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoverAdvantage, setHoverAdvantage] = useState<number | null>(null);

  // Trigger entrance animations
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Get steps from translation
  const stepsData = t('processSection.steps', { returnObjects: true }) as any[];

  // Create process steps
  const processSteps: ProcessStep[] = stepsData.map((step, index) => ({
    image: stepImages[index] || '',
    title: step.title,
    description: step.description,
    number: index + 1
  }));

  // Default advantage icons
  const defaultAdvantageIcons = [
    <Sparkles strokeWidth={1.5} />,
    <Scissors strokeWidth={1.5} />,
    <Droplets strokeWidth={1.5} />,
    <Compass strokeWidth={1.5} />
  ];

  // Use custom icons if provided, otherwise use defaults
  const advantageIcons = customAdvantageIcons || defaultAdvantageIcons;

  // Get advantages from translation
  const advantageItems: AdvantageItem[] = (t('processSection.advantages', { returnObjects: true }) as any[]).map(
    (advantage: any, index: number) => ({
      icon: advantageIcons[index % advantageIcons.length],
      title: advantage.title,
      description: advantage.description
    })
  );

  // Generate alt text for an image
  const getAltText = (step: ProcessStep): string => {
    const treatmentType = translationNamespace.charAt(0).toUpperCase() + translationNamespace.slice(1);
    return imageAltTemplate
      .replace('{title}', step.title)
      .replace('{treatmentType}', treatmentType)
      .replace('{number}', step.number.toString());
  };

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
            <h2 className={`${textStyle.sectionTitle} break-words hyphens-auto`} lang="de">{t('processSection.title')}</h2>
            <div className={`${gradientUnderline.primary} w-[300px] mt-3 mx-auto`}></div>
          </div>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-4 hyphens-auto`} lang="de">
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
                  className={`process-card bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 border-2 ${
                    isHovered
                      ? 'shadow-xl transform -translate-y-1 border-[#7BA7C2]/80 scale-[1.02]' 
                      : 'border-gray-100 hover:border-[#7BA7C2]/30 hover:shadow-md'
                  }`}
                  style={{
                    height: cardMinHeight,
                    minHeight: cardMinHeight,
                    '--card-desktop-height': cardHeight
                  } as React.CSSProperties}
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
                        alt={getAltText(step)}
                        className={`w-full h-full object-${objectFit} transition-all duration-500 ${
                          isHovered ? 'scale-110' : ''
                        }`}
                        loading="lazy"
                        decoding="async"
                        width="300"
                        height="300"
                      />
                    </div>
                    
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent transition-opacity duration-300 ${
                      isHovered ? 'opacity-70' : 'opacity-0'
                    }`}></div>
                  </div>
                  
                  {/* Card Content with fixed height */}
                  <div 
                    className="process-content p-6 flex flex-col overflow-hidden"
                    style={{
                      height: contentMinHeight,
                      minHeight: contentMinHeight,
                      '--content-desktop-height': contentHeight
                    } as React.CSSProperties}
                  >
                    {/* Title */}
                    <h3 className={`${fontSize.h4} ${fontWeight.normal} ${tracking.wide} mb-3 transition-colors duration-300 text-center md:text-left break-words hyphens-auto ${
                      isHovered ? textColor.primary : textColor.dark
                    }`} lang="de">
                      {step.title}
                    </h3>
                    
                    {/* Description - with overflow handling */}
                    <div className="flex-grow overflow-auto">
                      <p className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} ${lineHeight.relaxed} text-center md:text-left max-w-[280px] mx-auto md:max-w-none md:mx-0 hyphens-auto pr-1`} lang="de">
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
              <h3 className={`${textStyle.primaryHeading} mb-8 text-center md:text-left break-words hyphens-auto`} lang="de">{t('processSection.expertiseTitle')}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {advantageItems.map((item, index) => {
                  const isHovered = index === hoverAdvantage;
                  
                  return (
                    <div 
                      key={index}
                      className="relative group"
                      onMouseEnter={() => window.innerWidth >= 768 ? setHoverAdvantage(index) : null}
                      onMouseLeave={() => window.innerWidth >= 768 ? setHoverAdvantage(null) : null}
                    >
                      <div className={`flex flex-col md:flex-row gap-3 md:gap-4 p-4 md:p-5 rounded-xl transition-all duration-300 ${
                        isHovered && window.innerWidth >= 768
                          ? 'bg-[#7BA7C2]/5 shadow-sm' 
                          : 'md:hover:bg-[#7BA7C2]/5'
                      }`}>
                        <div className={`flex-shrink-0 w-10 h-10 md:w-10 md:h-10 rounded-full bg-[#7BA7C2]/10 flex items-center justify-center mx-auto md:mx-0 mb-2 md:mb-0 transition-all duration-300 ${
                          isHovered && window.innerWidth >= 768
                            ? 'bg-[#7BA7C2] text-white' 
                            : 'text-[#7BA7C2]'
                        }`}>
                          {React.cloneElement(item.icon as React.ReactElement, { 
                            className: `w-5 h-5 md:w-6 md:h-6 transition-all duration-300` 
                          })}
                        </div>
                        
                        <div className="flex-grow">
                          <h4 className={`${fontSize.lg} ${fontWeight.normal} ${tracking.wide} mb-1 md:mb-2 transition-colors duration-300 text-center md:text-left break-words hyphens-auto ${
                            isHovered && window.innerWidth >= 768 ? textColor.primary : textColor.dark
                          }`} lang="de">
                            {item.title}
                          </h4>
                          <p className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} leading-relaxed md:${lineHeight.relaxed} text-center md:text-left max-w-[320px] mx-auto md:max-w-none md:mx-0 hyphens-auto`} lang="de">
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

export default ProcessStepsSection;
