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
      
      {/* Top accent line - only visible on hover */}
      <div 
        className="absolute top-0 left-0 w-full h-1 transition-opacity duration-300 opacity-0 hover:opacity-100" 
        style={{ background: `linear-gradient(to right, ${color}, ${color}50)` }}
      ></div>
      
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
          
          {/* Features section */}
          <div className={`flex-1 ${imageSrc ? 'md:w-3/5' : 'w-full'}`}>
            {/* Features grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
              {features.map((feature, index) => (
                <div key={index} className="relative group">
                  <div className="flex flex-col md:flex-row gap-3 md:gap-4 p-4 md:p-5 rounded-xl transition-all duration-300 md:hover:bg-[#7BA7C2]/5">
                    <div 
                      className="flex-shrink-0 w-10 h-10 md:w-10 md:h-10 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-2 md:mb-0"
                      style={{ backgroundColor: `${color}10` }} // 10% opacity
                    >
                      {React.cloneElement(feature.icon as React.ReactElement, { 
                        className: `w-5 h-5 md:w-6 md:h-6 transition-all duration-300`,
                        style: { color: color }
                      })}
                    </div>
                    <div className="flex-grow">
                      <h4 
                        className={`${fontSize.lg} ${fontWeight.normal} mb-1 md:mb-2 text-center md:text-left ${textColor.dark}`}
                      >
                        {feature.title}
                      </h4>
                      <p className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} leading-relaxed md:${lineHeight.relaxed} text-center md:text-left max-w-[320px] mx-auto md:max-w-none md:mx-0 hyphens-auto`} lang="de">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
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
