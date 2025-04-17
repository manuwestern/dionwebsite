import React from 'react';
import { fontSize, fontWeight, textColor, lineHeight } from '../../../utils/typography';

export interface DPIFeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface DPIFeatureCardProps {
  features: DPIFeatureItem[];
  accentColor?: string;
  imageSrc?: string;
  imageAlt?: string;
  premiumLabel?: string;
  additionalFeeLabel?: string;
}

const DPIFeatureCard: React.FC<DPIFeatureCardProps> = ({ 
  features,
  accentColor = "bg-[#7BA7C2]",
  imageSrc,
  imageAlt = "Feature image",
  premiumLabel,
  additionalFeeLabel
}) => {
  // Extract the color from the accentColor class (assuming it's in the format "bg-[#color]")
  const colorMatch = accentColor.match(/#[0-9A-Fa-f]+/);
  const color = colorMatch ? colorMatch[0] : "#7BA7C2";

  return (
    <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#7BA7C2]/5 -mr-32 -mt-32 blur-xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#7BA7C2]/5 -ml-32 -mb-32 blur-xl"></div>
      
      {/* Removed top accent line hover effect */}
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile Image - Only visible on mobile */}
          {imageSrc && (
            <div className="md:hidden mb-6 w-full">
              <div className="relative rounded-xl overflow-hidden group">
                {/* Image with enhanced styling */}
                <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-[#7BA7C2]/5 to-transparent shadow-md">
                  <img 
                    src={imageSrc}
                    alt={imageAlt}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Subtle overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#7BA7C2]/10 to-transparent opacity-60"></div>
                </div>
              </div>
            </div>
          )}
          
          {/* Features section - with vertical centering */}
          <div className={`flex-1 ${imageSrc ? 'md:w-3/5' : 'w-full'} flex items-center`}>
            {/* Features grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 auto-rows-fr w-full">
              {features.map((feature, index) => {
                const [isHovered, setIsHovered] = React.useState(false);
                
                return (
                <div 
                  key={index} 
                  className="relative group h-full"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div 
                    className="flex flex-col md:flex-row gap-3 md:gap-4 p-4 md:p-5 rounded-xl transition-all duration-300 h-full"
                    style={{
                      backgroundColor: isHovered ? `${color}0D` : 'transparent', // 5% opacity equivalent
                    }}
                  >
                    {/* Icon with hover effect */}
                    <div 
                      className="flex-shrink-0 w-10 h-10 md:w-10 md:h-10 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-2 md:mb-0 transition-all duration-300"
                      style={{ 
                        backgroundColor: isHovered ? `${color}20` : `${color}10`,
                        color: color
                      }}
                    >
                      {React.cloneElement(feature.icon as React.ReactElement, { 
                        className: `w-5 h-5 md:w-6 md:h-6 transition-all duration-300 ${isHovered ? 'scale-110' : ''}` 
                      })}
                    </div>
                    <div className="flex-grow">
                      <h4 
                        className={`${fontSize.lg} ${fontWeight.normal} mb-1 md:mb-2 text-center md:text-left ${textColor.dark} transition-all duration-300`}
                        style={{ 
                          color: isHovered ? color : undefined
                        }}
                      >
                        {feature.title}
                      </h4>
                      <p className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} leading-relaxed md:${lineHeight.relaxed} text-center md:text-left max-w-[320px] mx-auto md:max-w-none md:mx-0 hyphens-auto`} lang="de">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          </div>
          
          {/* Image section - Only visible on desktop */}
          {imageSrc && (
            <div className="hidden md:block mt-8 md:mt-0 md:w-2/5 flex-shrink-0">
              <div className="relative rounded-xl overflow-hidden group h-full">
                {/* Image with enhanced styling */}
                <div className="relative h-full rounded-xl overflow-hidden bg-gradient-to-br from-[#7BA7C2]/5 to-transparent">
                  <img 
                    src={imageSrc}
                    alt={imageAlt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Subtle overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#7BA7C2]/10 to-transparent opacity-60"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DPIFeatureCard;
