import React from 'react';
import { fontSize, fontWeight, textColor, lineHeight } from '../../../utils/typography';

export interface DPIFeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface DPIBenefitsCardProps {
  features: DPIFeatureItem[];
  accentColor?: string;
}

const DPIBenefitsCard: React.FC<DPIBenefitsCardProps> = ({ 
  features,
  accentColor = "bg-[#7BA7C2]"
}) => {
  // Extract the color from the accentColor class (assuming it's in the format "bg-[#color]")
  const colorMatch = accentColor.match(/#[0-9A-Fa-f]+/);
  const color = colorMatch ? colorMatch[0] : "#7BA7C2";
  
  // Create opacity variants
  const colorLight = `${color}10`; // 10% opacity
  const colorMedium = `${color}20`; // 20% opacity

  return (
    <div className="relative bg-white rounded-xl shadow-md overflow-hidden border border-gray-100/80">
      {/* Subtle decorative elements */}
      <div className="absolute -z-10 w-64 h-64 rounded-full bg-[#7BA7C2]/5 -top-32 -right-32 blur-3xl opacity-70"></div>
      <div className="absolute -z-10 w-48 h-48 rounded-full bg-[#7BA7C2]/5 -bottom-24 -left-24 blur-3xl opacity-70"></div>
      
      {/* Accent line on top */}
      <div 
        className="absolute top-0 left-0 w-full h-1"
        style={{ background: color }}
      ></div>
      
      {/* Card content */}
      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex">
              {/* Icon container with subtle gradient */}
              <div className="mr-4 flex-shrink-0">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(to bottom right, ${colorLight}, ${colorMedium})`,
                    color: color
                  }}
                >
                  {React.cloneElement(feature.icon as React.ReactElement, { 
                    className: "w-5 h-5" 
                  })}
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1">
                {/* Title with clean typography */}
                <h3 
                  className={`${fontSize.lg} ${fontWeight.normal} mb-2`}
                  style={{ color: color }}
                >
                  {feature.title}
                </h3>
                
                {/* Description with clean typography */}
                <p className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} ${lineHeight.relaxed} hyphens-auto`} lang="de">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Subtle corner accent */}
      <div 
        className="absolute bottom-0 right-0 w-32 h-32 rounded-tl-3xl opacity-20"
        style={{ 
          background: `linear-gradient(to top left, ${color}, transparent)` 
        }}
      ></div>
    </div>
  );
};

export default DPIBenefitsCard;
