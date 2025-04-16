import React from 'react';
import { fontSize, fontWeight, textColor, lineHeight } from '../../../utils/typography';

interface StaticBenefitCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  hoverCard: number | null;
  setHoverCard: (index: number | null) => void;
}

const StaticBenefitCard: React.FC<StaticBenefitCardProps> = ({
  title,
  description,
  icon,
  index,
  hoverCard,
  setHoverCard
}) => {
  const isHovered = index === hoverCard;

  return (
    <div 
      key={index}
      className="relative group"
      onMouseEnter={() => setHoverCard(index)}
      onMouseLeave={() => setHoverCard(null)}
    >
      {/* Enhanced card design with subtle gradient and better shadows */}
      <div 
        className={`relative overflow-hidden transition-all duration-500 h-full 
          bg-gradient-to-br from-white to-gray-50/50
          border border-gray-100/80 rounded-xl
          ${isHovered 
            ? 'shadow-lg transform -translate-y-1.5 scale-[1.02]' 
            : 'shadow-sm hover:shadow-md'
          }`}
      >
        {/* Decorative elements */}
        <div className="absolute -z-10 w-32 h-32 rounded-full bg-[#7BA7C2]/5 -top-16 -right-16 blur-xl opacity-70"></div>
        <div className="absolute -z-10 w-24 h-24 rounded-full bg-[#7BA7C2]/5 -bottom-12 -left-12 blur-xl opacity-70"></div>
        
        {/* Enhanced header with icon and title */}
        <div className="flex items-center px-6 py-5 border-b border-gray-100/80">
          {/* Improved icon container with subtle gradient */}
          <div className="mr-4 relative">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
              ${isHovered 
                ? 'bg-gradient-to-br from-[#7BA7C2]/20 to-[#7BA7C2]/10 text-[#7BA7C2] shadow-sm' 
                : 'bg-gray-50 text-gray-500'
              }`}
            >
              {React.cloneElement(icon as React.ReactElement, { 
                className: `w-5 h-5 transition-all duration-300 ${isHovered ? 'scale-110' : ''}` 
              })}
              
              {/* Subtle ring animation on hover */}
              <div className={`absolute inset-0 rounded-full border border-[#7BA7C2]/30 transition-all duration-500 ${
                isHovered ? 'scale-110 opacity-100' : 'scale-100 opacity-0'
              }`}></div>
            </div>
          </div>
          
          {/* Enhanced typography for title with transition */}
          <h3 className={`${fontSize.lg} ${fontWeight.normal} ${isHovered ? textColor.primary : textColor.dark} 
            flex-1 pr-8 line-clamp-1 transition-colors duration-300`}>{title}</h3>
        </div>
        
        {/* Content area is always visible, no collapsible functionality */}
        <div className="px-6 py-5 flex flex-col min-h-[160px]">
          {/* Enhanced description with better typography and spacing */}
          <p className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} ${lineHeight.relaxed} 
            flex-grow hyphens-auto transition-opacity duration-300`} lang="de">
            {description}
          </p>
        </div>
        
        {/* Enhanced accent elements */}
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#7BA7C2]/80 to-[#7BA7C2]/50 
          transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
          
        {/* Subtle corner accent */}
        <div className={`absolute bottom-0 right-0 w-16 h-16 transition-opacity duration-500
          bg-gradient-to-tl from-[#7BA7C2]/10 to-transparent rounded-tl-3xl
          ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
      </div>
    </div>
  );
};

export default StaticBenefitCard;
