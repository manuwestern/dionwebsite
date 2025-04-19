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
      className="group relative h-full"
      onMouseEnter={() => setHoverCard(index)}
      onMouseLeave={() => setHoverCard(null)}
    >
      {/* Card with glass morphism effect */}
      <div 
        className={`relative bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-md transition-all duration-300 h-full border-2 ${
          isHovered
            ? 'shadow-xl transform -translate-y-1 border-[#7BA7C2]/80'
            : 'border-gray-100/80 hover:border-[#7BA7C2]/30 hover:shadow-lg'
        }`}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#7BA7C2]/5 -mr-16 -mt-16 blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-[#7BA7C2]/5 -ml-16 -mb-16 blur-xl"></div>
        
        <div className="relative z-10 p-6">
        <div className="flex flex-col gap-4">
          {/* Icon and title in a row */}
          <div className="flex items-center">
            <div 
              className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-all duration-200"
              style={{ 
                backgroundColor: isHovered ? `${color}20` : `${color}10`,
                color: color
              }}
              onMouseEnter={() => setHoverCard(index)}
              onMouseLeave={() => setHoverCard(null)}
            >
              {React.cloneElement(icon as React.ReactElement, { 
                className: `w-5 h-5 ${isHovered ? 'scale-110' : ''}` 
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
        
        {/* Removed accent line on top */}
        
        {/* More diffuse corner accent */}
        <div 
          className="absolute bottom-0 right-0 w-24 h-24 rounded-full blur-md transition-opacity duration-200"
          style={{ 
            background: `radial-gradient(circle at bottom right, ${color}15, transparent 70%)`,
            opacity: isHovered ? 1 : 0
          }}
        ></div>
      </div>
      
      {/* Decorative shadow element behind the card - appears on hover - more diffuse */}
      <div className={`absolute -z-10 w-[calc(100%+16px)] h-[calc(100%+16px)] rounded-2xl bg-[#7BA7C2]/5 -top-2 -left-2 blur-md transition-all duration-200 ${
        isHovered ? 'opacity-80' : 'opacity-0'
      }`}></div>
    </div>
  );
};

export default FeatureBenefitCard;
