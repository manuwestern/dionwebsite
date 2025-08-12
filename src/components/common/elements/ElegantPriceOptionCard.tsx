import React from 'react';
import { fontSize, fontWeight, textColor, lineHeight } from '../../../utils/typography';

interface ElegantPriceOptionCardProps {
  title: string;
  price: string;
  description: string;
  index: number;
  hoverOption: number | null;
  setHoverOption: (index: number | null) => void;
}

const ElegantPriceOptionCard: React.FC<ElegantPriceOptionCardProps> = ({
  title,
  price,
  description,
  index,
  hoverOption,
  setHoverOption
}) => {
  const isHovered = index === hoverOption;
  
  return (
    <div 
      className="group relative"
      onMouseEnter={() => setHoverOption(index)}
      onMouseLeave={() => setHoverOption(null)}
    >
      {/* Card with elegant design */}
      <div 
        className={`relative bg-white backdrop-blur-sm rounded-xl overflow-hidden shadow-md transition-all duration-500 h-full border ${
          isHovered
            ? 'shadow-lg transform -translate-y-1 border-[#7BA7C2]/60'
            : 'border-gray-100 hover:shadow-md'
        }`}
      >
        {/* Top accent line */}
        <div 
          className={`h-1 w-full transition-all duration-300 ${
            isHovered ? 'bg-[#7BA7C2]' : 'bg-[#7BA7C2]/30'
          }`}
        ></div>
        
        <div className="p-6">
          {/* Title and Price */}
          <div className="flex justify-between items-start mb-4 pb-3 border-b border-gray-100">
            <h3 
              className={`${fontSize.base} ${fontWeight.medium} ${textColor.dark} transition-colors duration-300 ${
                isHovered ? 'text-[#7BA7C2]' : ''
              }`}
            >
              {title}
            </h3>
            <span className={`${fontSize.lg} ${textColor.primary} ${fontWeight.medium} transition-all duration-300 ${isHovered ? 'scale-110' : ''}`}>
              {price}
            </span>
          </div>
          
          {/* Description */}
          <p className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} ${lineHeight.relaxed}`}>
            {description}
          </p>
        </div>
        
        {/* Bottom right subtle accent */}
        <div 
          className={`absolute bottom-0 right-0 w-16 h-16 transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            background: `radial-gradient(circle at bottom right, #7BA7C215, transparent 70%)`
          }}
        ></div>
      </div>
      
      {/* Subtle shadow effect on hover */}
      <div className={`absolute -z-10 w-full h-full rounded-xl bg-[#7BA7C2]/5 top-1 left-1 transition-opacity duration-500 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}></div>
    </div>
  );
};

export default ElegantPriceOptionCard;
