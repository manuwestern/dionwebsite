import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { fontSize, fontWeight, textColor, lineHeight } from '../../utils/typography';

interface CollapsibleBenefitCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  hoverCard: number | null;
  setHoverCard: (index: number | null) => void;
}

const CollapsibleBenefitCard: React.FC<CollapsibleBenefitCardProps> = ({
  title,
  description,
  icon,
  index,
  hoverCard,
  setHoverCard
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isHovered = index === hoverCard;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      key={index}
      className="relative group"
      onMouseEnter={() => setHoverCard(index)}
      onMouseLeave={() => setHoverCard(null)}
    >
      {/* Card with glass morphism effect */}
      <div className={`relative bg-white backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-500 h-full border-2 ${
        isHovered 
          ? 'shadow-xl transform -translate-y-1 border-[#7BA7C2]/80' 
          : 'border-gray-100/80 hover:border-[#7BA7C2]/30 hover:shadow-xl'
      }`}>
        {/* Header with icon and title side by side */}
        <div className="relative h-20 overflow-hidden flex items-center">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#7BA7C2] to-[#7BA7C2]/80"></div>
          
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/10 -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-white/10 -ml-10 -mb-10"></div>
          
          {/* Icon container */}
          <div className="relative z-10 ml-6 mr-4">
            <div className={`w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-500 ${
              isHovered ? 'scale-110 bg-white/30' : ''
            }`}>
              {React.cloneElement(icon as React.ReactElement, { 
                className: `w-6 h-6 text-white transition-all duration-500 ${isHovered ? 'scale-110' : ''}` 
              })}
            </div>
          </div>
          
          {/* Title */}
          <h3 className={`relative z-10 ${fontSize.lg} ${fontWeight.normal} ${textColor.white} drop-shadow-sm flex-1 pr-6 line-clamp-2`}>{title}</h3>
          
          {/* Mobile toggle button - only visible on mobile */}
          {isExpanded ? (
            <button 
              className="md:hidden relative z-10 mr-4 p-2 text-white focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand();
              }}
              aria-expanded="true"
              aria-label="Collapse card"
            >
              <ChevronUp size={20} />
            </button>
          ) : (
            <button 
              className="md:hidden relative z-10 mr-4 p-2 text-white focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand();
              }}
              aria-expanded="false"
              aria-label="Expand card"
            >
              <ChevronDown size={20} />
            </button>
          )}
        </div>
        
        {/* Content with subtle gradient */}
        <div 
          className={`bg-gradient-to-b from-white to-gray-50/50 flex flex-col transition-all duration-300 overflow-hidden
            ${isExpanded ? 'max-h-[1000px] p-6' : 'max-h-0 p-0'} 
            md:max-h-none md:p-6 md:h-auto md:min-h-[180px] md:h-[200px]`}
        >
          {/* Description with perfect typography */}
          <p className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} ${lineHeight.relaxed} flex-grow text-center md:text-left`}>
            {description}
          </p>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className={`absolute -z-10 w-full h-full rounded-2xl bg-[#7BA7C2]/10 top-2 left-2 transition-all duration-500 ${
        isHovered ? 'opacity-70' : 'opacity-0'
      }`}></div>
    </div>
  );
};

export default CollapsibleBenefitCard;
