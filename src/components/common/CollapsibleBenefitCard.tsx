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
      {/* Minimalist card design */}
      <div className={`relative bg-white rounded-xl overflow-hidden transition-all duration-500 h-full ${
        isHovered 
          ? 'shadow-md transform -translate-y-1' 
          : 'shadow-sm hover:shadow-md'
      }`}>
        {/* Simple header with icon and title */}
        <div className="flex items-center px-5 py-4 border-b border-gray-50">
          {/* Icon container with subtle background */}
          <div className="mr-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              isHovered ? 'bg-gray-50 text-[#7BA7C2]' : 'text-gray-500'
            }`}>
              {React.cloneElement(icon as React.ReactElement, { 
                className: `w-5 h-5 transition-all duration-300` 
              })}
            </div>
          </div>
          
          {/* Clean typography for title */}
          <h3 className={`${fontSize.lg} ${fontWeight.normal} ${textColor.dark} flex-1 pr-8 line-clamp-1`}>{title}</h3>
          
          {/* Mobile toggle button - only visible on mobile */}
          <div className="md:hidden">
            <button 
              className="text-gray-400 focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand();
              }}
              aria-label={isExpanded ? "Collapse card" : "Expand card"}
            >
              {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>
        </div>
        
        {/* Clean content area */}
        <div 
          className={`bg-white px-5 py-4 flex flex-col transition-all duration-300 overflow-hidden
            ${isExpanded ? 'max-h-[1000px]' : 'max-h-0 py-0'} 
            md:max-h-none md:py-4 md:h-auto md:min-h-[160px]`}
        >
          {/* Description with clean typography */}
          <p className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} ${lineHeight.relaxed} flex-grow hyphens-auto`} lang="de">
            {description}
          </p>
        </div>
        
        {/* Subtle accent line on hover */}
        <div className={`absolute top-0 left-0 w-full h-0.5 bg-[#7BA7C2]/70 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}></div>
      </div>
    </div>
  );
};

export default CollapsibleBenefitCard;
