import React, { useState } from 'react';
import { fontSize, fontWeight, textColor, lineHeight } from '../../../utils/typography';

export interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor?: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({
  icon,
  title,
  description,
  accentColor = '#7BA7C2'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col md:flex-row gap-3 md:gap-4 p-4 md:p-5 rounded-xl transition-all duration-300 md:hover:bg-[#7BA7C2]/5">
        <div 
          className="flex-shrink-0 w-10 h-10 md:w-10 md:h-10 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-2 md:mb-0 transition-all duration-300"
          style={{ 
            backgroundColor: isHovered ? '#7BA7C220' : '#7BA7C210',
            color: '#7BA7C2'
          }}
        >
          {React.cloneElement(icon as React.ReactElement, { 
            className: `w-5 h-5 md:w-6 md:h-6 transition-all duration-300 ${isHovered ? 'scale-110' : ''}` 
          })}
        </div>
        
        <div className="flex-grow">
          <h4 
            className={`${fontSize.lg} ${fontWeight.normal} mb-1 md:mb-2 text-center md:text-left break-words hyphens-auto ${textColor.dark}`}
            lang="de"
          >
            {title}
          </h4>
          <p 
            className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} leading-relaxed md:${lineHeight.relaxed} text-center md:text-left max-w-[320px] mx-auto md:max-w-none md:mx-0 hyphens-auto`}
            lang="de"
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BenefitCard;
