import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, tracking, lineHeight } from '../../utils/typography';

export interface PatternData {
  title: string;
  description: string;
  grafts: string;
  treatment: string;
  image?: string;
}

export interface PatternCardsSectionProps {
  // Required props
  translationNamespace: string;
  sectionTitleKey: string;
  sectionDescriptionKey: string;
  typicalGraftsKey: string;
  treatmentKey: string;
  
  // Optional props with different ways to provide pattern data
  patterns?: PatternData[]; // Direct pattern data
  patternsTranslationKey?: string; // Key to get patterns from translations
  
  // Function to get image URL for a pattern (used if patterns don't have image property)
  getPatternImage?: (pattern: PatternData, index: number) => string | null;
  
  // Image mapping (used if getPatternImage is not provided)
  patternImageMapping?: Record<string, string>;
  
  // Alt text template for images
  imageAltTemplate?: string;
}

const PatternCardsSection: React.FC<PatternCardsSectionProps> = ({
  // Required props
  translationNamespace,
  sectionTitleKey,
  sectionDescriptionKey,
  typicalGraftsKey,
  treatmentKey,
  
  // Optional props with defaults
  patterns,
  patternsTranslationKey,
  getPatternImage,
  patternImageMapping = {},
  imageAltTemplate = "{title}"
}) => {
  // Hardcoded height values for different screen sizes
  const cardHeight = {
    mobile: "280px",
    desktop: "330px"
  };
  
  const titleHeight = {
    mobile: "50px",
    desktop: "60px"
  };
  
  const descHeight = {
    mobile: "80px",
    desktop: "100px"
  };
  
  const imgHeight = {
    mobile: "200px",
    desktop: "250px"
  };
  const { t } = useTranslation([translationNamespace, 'common']);
  const [hoverPattern, setHoverPattern] = useState<number | null>(null);

  // Get patterns from props or translation
  const patternData: PatternData[] = patterns || 
    (patternsTranslationKey ? t(patternsTranslationKey, { returnObjects: true }) as PatternData[] : []);

  // Function to get image for a pattern
  const getImageForPattern = (pattern: PatternData, index: number): string | null => {
    // If pattern has image property, use it
    if (pattern.image) {
      return pattern.image;
    }
    
    // If getPatternImage function is provided, use it
    if (getPatternImage) {
      return getPatternImage(pattern, index);
    }
    
    // If patternImageMapping is provided, try to find a match
    if (patternImageMapping) {
      for (const [key, value] of Object.entries(patternImageMapping)) {
        if (pattern.title.includes(key)) {
          return value;
        }
      }
    }
    
    // Default fallback
    return null;
  };

  // Generate alt text for an image
  const getAltText = (pattern: PatternData): string => {
    return imageAltTemplate.replace('{title}', pattern.title);
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -z-10 w-full h-full inset-0 bg-gradient-to-b from-white via-gray-50 to-white"></div>
      <div className="absolute -z-10 w-[800px] h-[800px] rounded-full bg-[#7BA7C2]/3 -top-[400px] -right-[400px] blur-3xl"></div>
      <div className="absolute -z-10 w-[600px] h-[600px] rounded-full bg-[#7BA7C2]/3 -bottom-[300px] -left-[300px] blur-3xl"></div>
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <h2 className={`${textStyle.sectionTitle} hyphens-auto break-words`} lang="de" style={{ overflowWrap: 'break-word', wordWrap: 'break-word' }}>
              {t(sectionTitleKey)}
            </h2>
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[350px] mt-3 mx-auto`}></div>
          </div>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-4 hyphens-auto`} lang="de">
            {t(sectionDescriptionKey)}
          </p>
        </div>

        {/* Patterns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {patternData.map((pattern, index) => {
            const isHovered = index === hoverPattern;
            const patternImage = getImageForPattern(pattern, index);
            
            return (
              <div 
                key={index} 
                className="group relative"
                onMouseEnter={() => setHoverPattern(index)}
                onMouseLeave={() => setHoverPattern(null)}
              >
                {/* Card with glass morphism effect */}
                <div 
                  className={`relative h-full bg-white backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-500 border-2 ${
                    isHovered 
                      ? 'shadow-xl transform -translate-y-2' 
                      : 'hover:shadow-xl'
                  }`}
                  style={{
                    borderColor: isHovered ? '#7BA7C2CC' : 'rgba(243, 244, 246, 0.8)', // 80% opacity for hover, gray-100/80 equivalent
                  }}
                >
                  {/* Decorative elements from TreatmentAreasSection */}
                  <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-50 -mr-24 -mt-24 blur-xl transition-opacity duration-500"
                       style={{ 
                         background: 'radial-gradient(circle at top right, #7BA7C210, transparent 70%)',
                         opacity: isHovered ? 0.8 : 0
                       }}></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-50 -ml-24 -mb-24 blur-xl transition-opacity duration-500"
                       style={{ 
                         background: 'radial-gradient(circle at bottom left, #7BA7C210, transparent 70%)',
                         opacity: isHovered ? 0.5 : 0
                       }}></div>
                  {/* Pattern Image without dark gradient - hardcoded responsive height */}
                  <div className={`h-[${imgHeight.mobile}] md:h-[${imgHeight.desktop}] overflow-hidden relative`}>
                    {patternImage ? (
                      <img 
                        src={patternImage}
                        alt={getAltText(pattern)}
                        className={`w-full h-full object-cover transition-all duration-700 ${
                          isHovered ? 'scale-105' : 'scale-100'
                        }`}
                        loading="lazy"
                        decoding="async"
                        width="400"
                        height="300"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-[#7BA7C2]/10 to-[#7BA7C2]/5">
                        <span className={`${fontSize.h3} ${fontWeight.light} text-gray-400`}>{pattern.title}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Pattern Content with grid layout for perfect alignment - hardcoded responsive heights */}
                  <div className={`px-5 md:px-8 py-5 md:py-7 grid grid-rows-[${titleHeight.mobile}_${descHeight.mobile}_auto_auto_auto] md:grid-rows-[${titleHeight.desktop}_${descHeight.desktop}_auto_auto_30px] min-h-[220px] h-[${cardHeight.mobile}] md:h-[${cardHeight.desktop}]`}>
                    {/* Title moved from image overlay to here with hardcoded responsive fixed height */}
                    <div className={`h-[${titleHeight.mobile}] md:h-[${titleHeight.desktop}] overflow-hidden mb-2`}>
                      <h3 
                        className={`${fontSize.lg} ${fontWeight.medium} ${lineHeight.tight} text-center md:text-left ${textColor.primary}`}
                      >{pattern.title}</h3>
                    </div>
                    
                    {/* Description with hardcoded responsive fixed height */}
                    <div className={`overflow-auto pr-1 mb-2 md:mb-3 h-[${descHeight.mobile}] max-h-[${descHeight.mobile}] md:h-[${descHeight.desktop}] md:max-h-[${descHeight.desktop}]`}>
                      <p className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} ${lineHeight.relaxed} text-center md:text-left max-w-[280px] mx-auto md:max-w-none md:mx-0 hyphens-auto`} lang="de">
                        {pattern.description}
                      </p>
                    </div>
                    
                    {/* Elegant dividing line with subtle gradient */}
                    <div className={`w-full h-px ${gradientUnderline.light} mb-2 md:mb-3`}></div>
                    
                    {/* Pattern Details - always at the same position with perfect spacing */}
                    <div className="grid grid-cols-2 gap-2 md:gap-5 self-start mt-0 md:mt-1">
                      <div className={`rounded-xl p-2 md:p-4 transition-all duration-300 h-[70px] md:h-[75px] flex flex-col justify-between ${
                        isHovered 
                          ? 'bg-[#7BA7C2]/8' 
                          : 'bg-[#7BA7C2]/3'
                      }`}>
                        <h4 className={`${fontSize.xs} ${textColor.primary} ${fontWeight.medium} uppercase ${tracking.wider} text-center whitespace-nowrap`}>
                          {t(typicalGraftsKey)}
                        </h4>
                        <p className={`text-xs md:${fontSize.base} ${textColor.primary} ${fontWeight.light} text-center hyphens-auto`} lang="de">{pattern.grafts}</p>
                      </div>
                      <div className={`rounded-xl p-2 md:p-4 transition-all duration-300 h-[70px] md:h-[75px] flex flex-col justify-between ${
                        isHovered 
                          ? 'bg-[#7BA7C2]/8' 
                          : 'bg-[#7BA7C2]/3'
                      }`}>
                        <h4 className={`${fontSize.xs} ${textColor.primary} ${fontWeight.medium} uppercase ${tracking.wider} text-center whitespace-nowrap`}>
                          {t(treatmentKey)}
                        </h4>
                        <p className={`${fontSize.sm} md:${fontSize.base} ${textColor.primary} ${fontWeight.light} text-center hyphens-auto`} lang="de">{pattern.treatment}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative shadow element - dezenter gestaltet */}
                <div className={`absolute -z-10 w-[calc(100%+16px)] h-[calc(100%+16px)] rounded-2xl top-2 left-2 blur-md transition-all duration-500 ${
                  isHovered ? 'opacity-60' : 'opacity-0'
                }`} style={{ backgroundColor: '#7BA7C208' }}></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PatternCardsSection;
