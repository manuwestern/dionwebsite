import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, tracking, lineHeight } from '../../utils/typography';

const PatternSection: React.FC = () => {
  const { t } = useTranslation('eyebrowTransplantation');
  const [hoverPattern, setHoverPattern] = useState<number | null>(null);

  // Get patterns from translation
  const patterns = t('patternSection.patterns', { returnObjects: true }) as any[];

  // Fixed patterns with specific images
  const eyebrowPatterns = [
    {
      title: "Kahle Augenbrauen",
      description: "Vollständig fehlende oder extrem dünne Augenbrauen, die eine komplette Rekonstruktion erfordern",
      grafts: "250-400",
      treatment: "1 Sitzung",
      image: "/images/Augenbrauen_kahl.png"
    },
    {
      title: "Undichte Augenbrauen",
      description: "Lücken oder dünne Stellen in den Augenbrauen, die eine Verdichtung benötigen",
      grafts: "150-250",
      treatment: "1 Sitzung",
      image: "/images/Augenbrauen_undicht.png"
    },
    {
      title: "Microblading-Alternative",
      description: "Natürliche und dauerhafte Alternative zu Microblading für definierte Augenbrauen",
      grafts: "200-300",
      treatment: "1 Sitzung",
      image: "/images/Augenbrauen_Microblading.png"
    }
  ];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -z-10 w-full h-full inset-0 bg-gradient-to-b from-white via-gray-50 to-white"></div>
      <div className="absolute -z-10 w-[800px] h-[800px] rounded-full bg-[#7BA7C2]/5 -top-[400px] -right-[400px] blur-3xl"></div>
      <div className="absolute -z-10 w-[600px] h-[600px] rounded-full bg-[#7BA7C2]/5 -bottom-[300px] -left-[300px] blur-3xl"></div>
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <h2 className={`${textStyle.sectionTitle}`} lang="de">{t('patternSection.title')}</h2>
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[350px] mt-3 mx-auto`}></div>
          </div>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-4`}>
            {t('patternSection.description')}
          </p>
        </div>

        {/* Patterns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eyebrowPatterns.map((pattern, index) => {
            const isHovered = index === hoverPattern;
            
            return (
              <div 
                key={index} 
                className="group relative"
                onMouseEnter={() => setHoverPattern(index)}
                onMouseLeave={() => setHoverPattern(null)}
              >
                {/* Card with glass morphism effect */}
                <div className={`relative h-full bg-white backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-500 border-2 ${
                  isHovered 
                    ? 'shadow-xl transform -translate-y-1 border-[#7BA7C2]/80' 
                    : 'border-gray-100/80 hover:border-[#7BA7C2]/30 hover:shadow-xl'
                }`}>
                  {/* Pattern Image with background gradient */}
                  <div className={`h-64 overflow-hidden relative bg-gradient-to-t from-[#7BA7C2]/60 to-[#7BA7C2]/10`}>
                    <img 
                      src={pattern.image}
                      alt={pattern.title}
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        isHovered ? 'scale-105' : 'scale-100'
                      }`}
                    />
                    
                    {/* Pattern title overlay with fixed height for consistent multi-line titles */}
                    <div className="absolute bottom-0 left-0 right-0 py-6 px-5 text-white bg-gradient-to-t from-black/60 to-transparent min-h-[80px] flex items-center justify-center md:justify-start">
                      <h3 className={`${fontSize.lg} ${fontWeight.normal} drop-shadow-md leading-tight text-center md:text-left`}>{pattern.title}</h3>
                    </div>
                  </div>
                  
                  {/* Pattern Content with grid layout for perfect alignment */}
                  <div className="px-8 py-7 grid grid-rows-[120px_auto_auto_30px] h-[280px]">
                    {/* Description with fixed height and scrolling if needed */}
                    <div className="overflow-auto pr-1 mb-3">
                      <p className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} ${lineHeight.relaxed} text-center md:text-left`}>
                        {pattern.description}
                      </p>
                    </div>
                    
                    {/* Elegant dividing line with subtle gradient */}
                    <div className={`w-full h-px ${gradientUnderline.light} mb-3`}></div>
                    
                    {/* Pattern Details - always at the same position with perfect spacing */}
                    <div className="grid grid-cols-2 gap-5 self-start mt-1">
                      <div className={`rounded-xl p-4 transition-all duration-300 h-[75px] flex flex-col justify-between ${
                        isHovered 
                          ? 'bg-[#7BA7C2]/10' 
                          : 'bg-[#7BA7C2]/5'
                      }`}>
                        <h4 className={`${fontSize.xs} ${textColor.primary} ${fontWeight.medium} uppercase ${tracking.wider} text-center md:text-left whitespace-nowrap`}>
                          {t('patternSection.typicalGrafts')}
                        </h4>
                        <p className={`${fontSize.base} ${textColor.primary} ${fontWeight.light} text-center md:text-left`}>{pattern.grafts}</p>
                      </div>
                      <div className={`rounded-xl p-4 transition-all duration-300 h-[75px] flex flex-col justify-between ${
                        isHovered 
                          ? 'bg-[#7BA7C2]/10' 
                          : 'bg-[#7BA7C2]/5'
                      }`}>
                        <h4 className={`${fontSize.xs} ${textColor.primary} ${fontWeight.medium} uppercase ${tracking.wider} text-center md:text-left whitespace-nowrap`}>
                          {t('patternSection.treatment')}
                        </h4>
                        <p className={`${fontSize.base} ${textColor.primary} ${fontWeight.light} text-center md:text-left`}>{pattern.treatment}</p>
                      </div>
                    </div>
                    
                    {/* Subtle indicator - always at the bottom */}
                    <div className={`flex items-center justify-center md:justify-end ${fontSize.xs} ${textColor.primary} transition-opacity duration-300 self-end ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <span className={`mr-1 ${fontWeight.light}`}>{t('patternSection.idealForYourEyebrowType')}</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className={`absolute -z-10 w-full h-full rounded-2xl bg-[#7BA7C2]/10 top-2 left-2 transition-all duration-500 ${
                  isHovered ? 'opacity-70' : 'opacity-0'
                }`}></div>
              </div>
            );
          })}
        </div>
        
        {/* Additional information */}
        <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="md:w-1/3 mb-8 md:mb-0">
              <h3 className={`${textStyle.primaryHeading} mb-4 text-center md:text-left`}>{t('patternSection.additionalInfo.individualConsultation.title')}</h3>
              <p className={`${textStyle.bodyText} text-center md:text-left px-2 md:px-0`}>
                {t('patternSection.additionalInfo.individualConsultation.description')}
              </p>
            </div>
            <div className="md:w-1/3 mb-8 md:mb-0">
              <h3 className={`${textStyle.primaryHeading} mb-4 text-center md:text-left`}>{t('patternSection.additionalInfo.modernTechniques.title')}</h3>
              <p className={`${textStyle.bodyText} text-center md:text-left px-2 md:px-0`}>
                {t('patternSection.additionalInfo.modernTechniques.description')}
              </p>
            </div>
            <div className="md:w-1/3">
              <h3 className={`${textStyle.primaryHeading} mb-4 text-center md:text-left`}>{t('patternSection.additionalInfo.longTermResults.title')}</h3>
              <p className={`${textStyle.bodyText} text-center md:text-left px-2 md:px-0`}>
                {t('patternSection.additionalInfo.longTermResults.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatternSection;
