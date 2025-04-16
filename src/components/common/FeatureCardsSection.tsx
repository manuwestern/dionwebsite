import React, { useState, useEffect } from 'react';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, lineHeight } from '../../utils/typography';

export interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeatureCardsSectionProps {
  title: string;
  subtitle: string;
  features: FeatureItem[];
  imageSrc?: string;
  imageAlt?: string;
  premiumLabel?: string;
  additionalFeeLabel?: string;
  backgroundColor?: string;
  accentColor?: string;
  translationNamespace?: string;
}

const FeatureCardsSection: React.FC<FeatureCardsSectionProps> = ({
  title,
  subtitle,
  features,
  imageSrc,
  imageAlt = "Feature image",
  premiumLabel,
  additionalFeeLabel,
  backgroundColor = "from-[#7BA7C2]/5 via-[#7BA7C2]/10 to-[#7BA7C2]/5",
  accentColor = "bg-[#7BA7C2]/70",
  translationNamespace
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoverFeature, setHoverFeature] = useState<number | null>(null);

  // Trigger entrance animations
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className={`absolute inset-0 -z-10 bg-gradient-to-b ${backgroundColor}`}></div>
      <div className="absolute -z-10 w-[800px] h-[800px] rounded-full bg-[#7BA7C2]/10 -top-[400px] -right-[400px] blur-3xl"></div>
      <div className="absolute -z-10 w-[600px] h-[600px] rounded-full bg-[#7BA7C2]/10 -bottom-[300px] -left-[300px] blur-3xl"></div>
      
      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] z-0" 
        style={{ 
          backgroundImage: 'url("/images/dionhairclinic_bg.svg")',
          backgroundSize: '200px',
          backgroundRepeat: 'repeat'
        }}
      ></div>
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header with elegant design */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4 relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-[#7BA7C2]/10 blur-xl"></div>
            <h2 className={`${textStyle.sectionTitle}`} lang="de">{title}</h2>
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[350px] mt-3 mx-auto`}></div>
          </div>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-4 hyphens-auto`} lang="de">
            {subtitle}
          </p>
        </div>
        
        {/* Mobile Image - Only visible on mobile */}
        {imageSrc && (
          <div className="md:hidden mb-8 mx-auto max-w-xs">
            <div className="relative w-full">
              <img 
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-auto object-cover rounded-xl shadow-md"
                loading="lazy"
              />
              {premiumLabel && (
                <div className="absolute top-3 right-3 bg-[#7BA7C2] text-white text-xs font-medium px-2 py-0.5 rounded-full">
                  {premiumLabel}
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Content with image for desktop */}
        <div className={`relative transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative bg-white rounded-xl p-6 md:p-8 shadow-sm overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row gap-8">
              {/* Content section */}
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {features.map((item, index) => {
                    const isHovered = index === hoverFeature;
                    
                    return (
                      <div 
                        key={index}
                        className="relative group"
                        onMouseEnter={() => window.innerWidth >= 768 ? setHoverFeature(index) : null}
                        onMouseLeave={() => window.innerWidth >= 768 ? setHoverFeature(null) : null}
                      >
                        {/* Minimalist card design */}
                        <div className={`relative bg-white rounded-xl overflow-hidden transition-all duration-500 h-full ${
                          isHovered && window.innerWidth >= 768
                            ? 'shadow-md transform -translate-y-1' 
                            : 'shadow-sm hover:shadow-md'
                        }`}>
                          {/* Simple header with icon and title */}
                          <div className="flex items-center px-5 py-4 border-b border-gray-50">
                            {/* Icon container with subtle background */}
                            <div className="mr-4">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                isHovered && window.innerWidth >= 768 ? 'bg-gray-50 text-[#7BA7C2]' : 'text-gray-500'
                              }`}>
                                {React.cloneElement(item.icon as React.ReactElement, { 
                                  className: `w-5 h-5 transition-all duration-300` 
                                })}
                              </div>
                            </div>
                            
                            {/* Clean typography for title */}
                            <h4 className={`${fontSize.lg} ${fontWeight.normal} ${textColor.dark} flex-1 pr-4 line-clamp-1`}>
                              {item.title}
                            </h4>
                          </div>
                          
                          {/* Clean content area */}
                          <div className="bg-white px-5 py-4">
                            {/* Description with clean typography */}
                            <p className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} ${lineHeight.relaxed} hyphens-auto`} lang="de">
                              {item.description}
                            </p>
                          </div>
                          
                          {/* Subtle accent line on hover */}
                          <div className={`absolute top-0 left-0 w-full h-0.5 ${accentColor} transition-opacity duration-300 ${
                            isHovered && window.innerWidth >= 768 ? 'opacity-100' : 'opacity-0'
                          }`}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Image section - Only visible on desktop */}
              {imageSrc && (
                <div className="hidden md:block md:w-2/5 lg:w-1/3 flex-shrink-0">
                  <div className="relative h-full rounded-xl overflow-hidden shadow-sm">
                    <img 
                      src={imageSrc}
                      alt={imageAlt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {premiumLabel && (
                      <div className="absolute top-4 right-4 bg-white text-gray-700 text-sm font-medium px-3 py-1 rounded-full shadow-sm">
                        {premiumLabel}
                      </div>
                    )}
                    {additionalFeeLabel && (
                      <div className="absolute bottom-4 left-4 bg-white text-gray-700 text-sm font-medium px-3 py-1 rounded-full shadow-sm">
                        {additionalFeeLabel}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureCardsSection;
