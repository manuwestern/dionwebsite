import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, Scissors, Droplets, Compass } from 'lucide-react';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, tracking, lineHeight } from '../../utils/typography';
import BenefitsContainer from './elements/BenefitsContainer';
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
  objectFit = "contain",
  
  // Optional icon customization
  customAdvantageIcons
}) => {
  // Hardcoded height values
  const cardMinHeight = "520px";  // Minimum height on mobile
  const cardHeight = "520px";     // Height on desktop
  const contentMinHeight = "480px"; // Content area minimum height
  const contentHeight = "480px";   // Content area height on desktop
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
                {/* Decorative shadow element behind the card - appears on hover */}
                <div className={`absolute -z-10 w-[calc(100%+16px)] h-[calc(100%+16px)] rounded-2xl bg-[#7BA7C2]/5 -top-2 -left-2 blur-md transition-all duration-700 ${
                  isHovered ? 'opacity-80' : 'opacity-0'
                }`}></div>
                
                {/* Card with optimized height for perfect visual balance */}
                <div 
                  className={`process-card bg-white rounded-2xl overflow-hidden transition-all duration-700 border-2 ${
                    isHovered
                      ? 'shadow-xl transform -translate-y-1 border-[#7BA7C2]/80'
                      : 'border-gray-100/80 shadow-md hover:border-[#7BA7C2]/30 hover:shadow-lg'
                  }`}
                  style={{
                    height: cardMinHeight,
                    minHeight: cardMinHeight,
                    '--card-desktop-height': cardHeight
                  } as React.CSSProperties}
                >
                  {/* Card Header with Image */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-50 to-white">
                    {/* Step Number Badge */}
                    <div className={`absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-700 ${
                      isHovered
                        ? 'bg-[#7BA7C2]/20 text-[#7BA7C2]' 
                        : 'bg-white text-[#7BA7C2] border-2 border-[#7BA7C2]/50 shadow-sm'
                    }`}>
                      <span className={`${fontSize.lg} ${fontWeight.medium}`}>{step.number}</span>
                    </div>
                    
                    {/* Image */}
                    <div className="w-full h-full flex items-center justify-center p-8">
                      <img 
                        src={step.image} 
                        alt={getAltText(step)}
                        className={`w-full h-full object-${objectFit} transition-all duration-700 ${
                          isHovered ? 'scale-110' : ''
                        }`}
                        loading="lazy"
                        decoding="async"
                        width="300"
                        height="300"
                      />
                    </div>
                    
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent transition-opacity duration-700 ${
                      isHovered ? 'opacity-70' : 'opacity-0'
                    }`}></div>
                  </div>
                  
                  {/* Diffuse corner accent - appears on hover */}
                  <div 
                    className="absolute bottom-0 right-0 w-24 h-24 rounded-full blur-md transition-opacity duration-700"
                    style={{ 
                      background: `radial-gradient(circle at bottom right, #7BA7C215, transparent 70%)`,
                      opacity: isHovered ? 1 : 0
                    }}
                  ></div>
                  
                  {/* Card Content with fixed height */}
                  <div 
                    className="process-content p-6 flex flex-col overflow-hidden relative z-10"
                    style={{
                      height: contentMinHeight,
                      minHeight: contentMinHeight,
                      '--content-desktop-height': contentHeight
                    } as React.CSSProperties}
                  >
                    {/* Title */}
                    <h3 className={`${fontSize.h4} ${fontWeight.normal} ${tracking.wide} mb-3 transition-colors duration-700 text-center md:text-left break-words hyphens-auto ${textColor.dark}`} lang="de">
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
        
        {/* Additional Advantages Box using the reusable BenefitsContainer */}
        <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <BenefitsContainer
            title={t('processSection.expertiseTitle')}
            benefits={advantageItems}
            accentColor="#7BA7C2"
            backgroundColor="bg-white/90"
            columns={2}
          />
        </div>
        
     </div>
    </section>
  );
};

export default ProcessStepsSection;
