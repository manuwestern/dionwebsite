import React, { useState } from 'react';
import { fontSize, fontWeight, textColor, lineHeight } from '../../../utils/typography';

export interface DPIFeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface DPICardGridProps {
  features: DPIFeatureItem[];
  accentColor?: string;
}

const DPICardGrid: React.FC<DPICardGridProps> = ({ 
  features,
  accentColor = "bg-[#7BA7C2]"
}) => {
  const [hoverFeature, setHoverFeature] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
      {features.map((feature, index) => (
        <div 
          key={index}
          className="transform transition-all duration-500"
          style={{ 
            animationDelay: `${index * 100}ms`,
            transitionDelay: `${index * 50}ms` 
          }}
          onMouseEnter={() => setHoverFeature(index)}
          onMouseLeave={() => setHoverFeature(null)}
        >
          <FeatureCard 
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            isHovered={index === hoverFeature}
            accentColor={accentColor}
          />
        </div>
      ))}
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isHovered: boolean;
  accentColor: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  isHovered,
  accentColor
}) => {
  // Extract the color from the accentColor class (assuming it's in the format "bg-[#color]")
  const colorMatch = accentColor.match(/#[0-9A-Fa-f]+/);
  const color = colorMatch ? colorMatch[0] : "#7BA7C2";
  
  // Create opacity variants
  const colorLight = `${color}20`; // 20% opacity
  const colorMedium = `${color}40`; // 40% opacity

  return (
    <div 
      className={`relative bg-white rounded-xl overflow-hidden transition-all duration-300 h-full
        border border-gray-100/80
        ${isHovered 
          ? 'shadow-md transform -translate-y-1 scale-[1.01]' 
          : 'shadow-sm hover:shadow'
        }`}
    >
      {/* Subtle decorative elements */}
      <div className="absolute -z-10 w-32 h-32 rounded-full bg-[#7BA7C2]/5 -top-16 -right-16 blur-xl opacity-70"></div>
      <div className="absolute -z-10 w-24 h-24 rounded-full bg-[#7BA7C2]/5 -bottom-12 -left-12 blur-xl opacity-70"></div>
      
      {/* Card header with icon and title */}
      <div className="flex items-center p-5 border-b border-gray-50">
        {/* Icon container with subtle gradient */}
        <div className="mr-4">
          <div 
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300
              ${isHovered 
                ? `bg-gradient-to-br from-[${colorLight}] to-[${colorMedium}] text-[${color}]` 
                : 'bg-gray-50 text-gray-500'
              }`}
            style={{
              background: isHovered ? `linear-gradient(to bottom right, ${colorLight}, ${colorMedium})` : '',
              color: isHovered ? color : ''
            }}
          >
            {React.cloneElement(icon as React.ReactElement, { 
              className: `w-5 h-5 transition-all duration-300 ${isHovered ? 'scale-110' : ''}` 
            })}
          </div>
        </div>
        
        {/* Title with clean typography */}
        <h3 
          className={`${fontSize.lg} ${fontWeight.normal} flex-1 pr-4 line-clamp-1 transition-colors duration-300`}
          style={{ color: isHovered ? color : '#374151' }}
        >
          {title}
        </h3>
      </div>
      
      {/* Content area */}
      <div className="p-5">
        {/* Description with clean typography */}
        <p className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} ${lineHeight.relaxed} hyphens-auto`} lang="de">
          {description}
        </p>
      </div>
      
      {/* Accent line on top */}
      <div 
        className={`absolute top-0 left-0 w-full h-1 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ background: color }}
      ></div>
      
      {/* Subtle corner accent */}
      <div 
        className={`absolute bottom-0 right-0 w-16 h-16 transition-opacity duration-500
          rounded-tl-3xl ${isHovered ? 'opacity-30' : 'opacity-0'}`}
        style={{ 
          background: isHovered ? `linear-gradient(to top left, ${color}, transparent)` : '' 
        }}
      ></div>
    </div>
  );
};

export default DPICardGrid;
