import React, { useState } from 'react';
import { fontSize, fontWeight, textColor, lineHeight } from '../../../utils/typography';

interface ElegantClinicCardProps {
  title: string;
  description: string;
  index: number;
  hoverCard: number | null;
  setHoverCard: (index: number | null) => void;
  accentColor?: string;
  features?: string[];
}

const ElegantClinicCard: React.FC<ElegantClinicCardProps> = ({
  title,
  description,
  index,
  hoverCard,
  setHoverCard,
  accentColor = "#7BA7C2",
  features
}) => {
  const isHovered = index === hoverCard;
  
  return (
    <div
      className="group relative h-full"
      onMouseEnter={() => setHoverCard(index)}
      onMouseLeave={() => setHoverCard(null)}
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
        
        <div className="p-6 md:p-7">
          {/* Title with subtle underline */}
          <div className="mb-4 pb-3 border-b border-gray-100">
            <h3 
              className={`${fontSize.lg} ${fontWeight.medium} ${textColor.dark} transition-colors duration-300 ${
                isHovered ? 'text-[#7BA7C2]' : ''
              }`}
            >
              {title}
            </h3>
          </div>
          
          {/* Description */}
          <div>
            <p className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} ${lineHeight.relaxed} hyphens-auto`} lang="de">
              {description}
            </p>
            
            {/* Features list if available */}
            {features && features.length > 0 && (
              <ul className="mt-4 space-y-2">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2 text-[#7BA7C2] font-light">•</span>
                    <span className={`${fontSize.sm} ${textColor.dark} ${fontWeight.light}`}>{feature}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        {/* Bottom right subtle accent */}
        <div 
          className={`absolute bottom-0 right-0 w-16 h-16 transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            background: `radial-gradient(circle at bottom right, ${accentColor}15, transparent 70%)`
          }}
        ></div>
      </div>
      
      {/* Subtle shadow effect on hover */}
      <div className={`absolute -z-10 w-full h-full rounded-xl bg-[#7BA7C2]/5 top-2 left-1 transition-opacity duration-500 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`}></div>
    </div>
  );
};

export default ElegantClinicCard;
