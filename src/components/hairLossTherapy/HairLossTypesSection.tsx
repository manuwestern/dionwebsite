import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, tracking, lineHeight } from '../../utils/typography';

const HairLossTypesSection: React.FC = () => {
  const { t } = useTranslation('hairLossTherapy');
  const [hoverType, setHoverType] = useState<number | null>(null);

  // Get types from translation
  const types = t('hairLossTypesSection.types', { returnObjects: true }) as any[];

  // Map type titles to images
  const typeImages = {
    "Androgenetisch": "/images/norwood_scale_3.png",
    "Androgenetic": "/images/norwood_scale_3.png",
    "Kreisrund": "/images/haaranalyse.png",
    "Alopecia Areata": "/images/haaranalyse.png",
    "Diffus": "/images/frau_lichter_scheitel.png",
    "Diffuse": "/images/frau_lichter_scheitel.png",
    "Narbig": "/images/hairselection.jpeg",
    "Scarring": "/images/hairselection.jpeg"
  };

  // Get image for a type
  const getTypeImage = (title: string) => {
    for (const [key, value] of Object.entries(typeImages)) {
      if (title.includes(key)) {
        return value;
      }
    }
    return null;
  };

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
            <h2 className={`${textStyle.sectionTitle}`} lang="de">{t('hairLossTypesSection.title')}</h2>
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[350px] mt-3 mx-auto`}></div>
          </div>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-4`}>
            {t('hairLossTypesSection.description')}
          </p>
        </div>

        {/* Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {types.map((type, index) => {
            const isHovered = index === hoverType;
            const typeImage = getTypeImage(type.title);
            
            return (
              <div 
                key={index} 
                className="group relative"
                onMouseEnter={() => setHoverType(index)}
                onMouseLeave={() => setHoverType(null)}
              >
                {/* Card with glass morphism effect */}
                <div className={`relative h-full bg-white backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-500 border-2 ${
                  isHovered 
                    ? 'shadow-xl transform -translate-y-1 border-[#7BA7C2]/80' 
                    : 'border-gray-100/80 hover:border-[#7BA7C2]/30 hover:shadow-xl'
                }`}>
                  {/* Type Image with background gradient */}
                  <div className={`h-64 overflow-hidden relative bg-gradient-to-t from-[#7BA7C2]/60 to-[#7BA7C2]/10`}>
                    {typeImage ? (
                      <img 
                        src={typeImage}
                        alt={type.title}
                        className={`w-full h-full object-cover transition-all duration-700 ${
                          isHovered ? 'scale-105' : 'scale-100'
                        }`}
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-[#7BA7C2]/10 to-[#7BA7C2]/5">
                        <span className={`${fontSize.h3} ${fontWeight.light} text-gray-400`}>{type.title}</span>
                      </div>
                    )}
                    
                    {/* Type title overlay with fixed height for consistent multi-line titles */}
                    <div className="absolute bottom-0 left-0 right-0 py-6 px-5 text-white bg-gradient-to-t from-black/60 to-transparent min-h-[80px] flex items-center justify-center md:justify-start">
                      <h3 className={`${fontSize.lg} ${fontWeight.normal} drop-shadow-md leading-tight text-center md:text-left`}>{type.title}</h3>
                    </div>
                  </div>
                  
                  {/* Type Content with grid layout for perfect alignment */}
                  <div className="px-8 py-7 grid grid-rows-[120px_auto_auto_30px] h-[280px]">
                    {/* Description with fixed height and scrolling if needed */}
                    <div className="overflow-auto pr-1 mb-3">
                      <p className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} ${lineHeight.relaxed} text-center md:text-left`}>
                        {type.description}
                      </p>
                    </div>
                    
                    {/* Elegant dividing line with subtle gradient */}
                    <div className={`w-full h-px ${gradientUnderline.light} mb-3`}></div>
                    
                    {/* Type Details - always at the same position with perfect spacing */}
                    <div className="grid grid-cols-1 gap-5 self-start mt-1">
                      <div className={`rounded-xl p-4 transition-all duration-300 h-[75px] flex flex-col justify-between ${
                        isHovered 
                          ? 'bg-[#7BA7C2]/10' 
                          : 'bg-[#7BA7C2]/5'
                      }`}>
                        <h4 className={`${fontSize.xs} ${textColor.primary} ${fontWeight.medium} uppercase ${tracking.wider} text-center md:text-left whitespace-nowrap`}>
                          {t('hairLossTypesSection.recommendedTreatment')}
                        </h4>
                        <p className={`${fontSize.base} ${textColor.primary} ${fontWeight.light} text-center md:text-left`}>{type.treatment}</p>
                      </div>
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
              <h3 className={`${textStyle.primaryHeading} mb-4 text-center md:text-left`}>{t('hairLossTypesSection.additionalInfo.diagnosis.title')}</h3>
              <p className={`${textStyle.bodyText} text-center md:text-left px-2 md:px-0`}>
                {t('hairLossTypesSection.additionalInfo.diagnosis.description')}
              </p>
            </div>
            <div className="md:w-1/3 mb-8 md:mb-0">
              <h3 className={`${textStyle.primaryHeading} mb-4 text-center md:text-left`}>{t('hairLossTypesSection.additionalInfo.personalizedApproach.title')}</h3>
              <p className={`${textStyle.bodyText} text-center md:text-left px-2 md:px-0`}>
                {t('hairLossTypesSection.additionalInfo.personalizedApproach.description')}
              </p>
            </div>
            <div className="md:w-1/3">
              <h3 className={`${textStyle.primaryHeading} mb-4 text-center md:text-left`}>{t('hairLossTypesSection.additionalInfo.combinedTherapies.title')}</h3>
              <p className={`${textStyle.bodyText} text-center md:text-left px-2 md:px-0`}>
                {t('hairLossTypesSection.additionalInfo.combinedTherapies.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HairLossTypesSection;
