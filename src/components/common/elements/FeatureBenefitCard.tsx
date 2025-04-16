import React from 'react';
import { fontSize, fontWeight, textColor, lineHeight } from '../../../utils/typography';

interface FeatureBenefitCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  hoverCard: number | null;
  setHoverCard: (index: number | null) => void;
  accentColor?: string;
}

const FeatureBenefitCard: React.FC<FeatureBenefitCardProps> = ({
  title,
  description,
  icon,
  index,
  hoverCard,
  setHoverCard,
  accentColor = "bg-[#7BA7C2]"
}) => {
  const isHovered = index === hoverCard;
  
  // Extract the color from the accentColor class (assuming it's in the format "bg-[#color]")
  const colorMatch = accentColor.match(/#[0-9A-Fa-f]+/);
  const color = colorMatch ? colorMatch[0] : "#7BA7C2";

  return (
    <div 
      className="relative bg-white/90 backdrop-blur-sm rounded-xl shadow-md border border-gray-100 overflow-hidden h-full transition-all duration-300"
      onMouseEnter={() => setHoverCard(index)}
      onMouseLeave={() => setHoverCard(null)}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#7BA7C2]/5 -mr-16 -mt-16 blur-xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-[#7BA7C2]/5 -ml-16 -mb-16 blur-xl"></div>
      
      <div className="relative z-10 p-6">
        <div className="flex flex-col gap-4">
          {/* Icon and title in a row */}
          <div className="flex items-center">
            <div 
              className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-all duration-300"
              style={{ 
                backgroundColor: isHovered ? `${color}20` : `${color}10`,
                color: color
              }}
            >
              {React.cloneElement(icon as React.ReactElement, { 
                className: `w-5 h-5 transition-all duration-300 ${isHovered ? 'scale-110' : ''}` 
              })}
            </div>
            
            <h3 
              className={`${fontSize.lg} ${fontWeight.normal} ${textColor.dark} flex-1 line-clamp-1`}
            >
              {title}
            </h3>
          </div>
          
          {/* Description */}
          <p className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} ${lineHeight.relaxed} hyphens-auto`} lang="de">
            {description}
          </p>
        </div>
      </div>
      
      {/* Accent line on top */}
      <div 
        className="absolute top-0 left-0 w-full h-1 transition-opacity duration-300"
        style={{ 
          background: `linear-gradient(to right, ${color}, ${color}80)`,
          opacity: isHovered ? 1 : 0
        }}
      ></div>
      
      {/* Subtle corner accent */}
      <div 
        className="absolute bottom-0 right-0 w-16 h-16 rounded-tl-3xl transition-opacity duration-500"
        style={{ 
          background: `linear-gradient(to top left, ${color}20, transparent)`,
          opacity: isHovered ? 1 : 0
        }}
      ></div>
    </div>
  );
};

export default FeatureBenefitCard;
