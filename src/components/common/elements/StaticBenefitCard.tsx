import React from 'react';
import { fontSize, fontWeight, textColor, lineHeight } from '../../../utils/typography';

interface StaticBenefitCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  iconSize?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal' | 'accent';
}

/**
 * A reusable static benefit card component without collapsible functionality.
 * This component can be used in various sections of the application.
 */
const StaticBenefitCard: React.FC<StaticBenefitCardProps> = ({
  title,
  description,
  icon,
  className = '',
  iconSize = 'md',
  variant = 'default'
}) => {
  // Determine icon container size based on the iconSize prop
  const iconContainerSizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-14 h-14'
  };

  // Determine icon size based on the iconSize prop
  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  // Variant-specific styles
  const variantStyles = {
    default: {
      card: 'bg-gradient-to-br from-white to-gray-50/50 border border-gray-100/80 rounded-xl shadow-sm hover:shadow-md',
      header: 'border-b border-gray-100/80',
      icon: 'bg-gray-50 text-gray-500 hover:bg-gradient-to-br hover:from-[#7BA7C2]/20 hover:to-[#7BA7C2]/10 hover:text-[#7BA7C2]',
      title: `${textColor.dark} hover:${textColor.primary}`,
      accent: 'bg-gradient-to-r from-[#7BA7C2]/80 to-[#7BA7C2]/50'
    },
    minimal: {
      card: 'bg-white border border-gray-100/60 rounded-lg shadow-sm',
      header: 'border-b-0',
      icon: 'bg-gray-50/50 text-gray-500 hover:bg-gray-100/80 hover:text-gray-700',
      title: textColor.dark,
      accent: 'bg-gray-200/50'
    },
    accent: {
      card: 'bg-gradient-to-br from-[#7BA7C2]/10 to-[#7BA7C2]/5 border border-[#7BA7C2]/20 rounded-xl shadow-sm hover:shadow-md',
      header: 'border-b border-[#7BA7C2]/10',
      icon: 'bg-white/80 text-[#7BA7C2] hover:bg-white hover:text-[#7BA7C2]/80',
      title: textColor.primary,
      accent: 'bg-[#7BA7C2]/30'
    }
  };

  const styles = variantStyles[variant];

  return (
    <div className={`relative transition-all duration-300 h-full group ${className}`}>
      {/* Card with subtle gradient and better shadows */}
      <div className={`relative overflow-hidden transition-all duration-300 h-full ${styles.card} hover:transform hover:-translate-y-1`}>
        {/* Decorative elements */}
        <div className="absolute -z-10 w-32 h-32 rounded-full bg-[#7BA7C2]/5 -top-16 -right-16 blur-xl opacity-70"></div>
        <div className="absolute -z-10 w-24 h-24 rounded-full bg-[#7BA7C2]/5 -bottom-12 -left-12 blur-xl opacity-70"></div>
        
        {/* Header with icon and title */}
        <div className={`flex items-center px-6 py-5 ${styles.header}`}>
          {/* Icon container with subtle gradient */}
          <div className="mr-4 relative">
            <div className={`${iconContainerSizeClasses[iconSize]} rounded-full flex items-center justify-center transition-all duration-300 ${styles.icon}`}>
              {React.cloneElement(icon as React.ReactElement, { 
                className: `${iconSizeClasses[iconSize]} transition-all duration-300 group-hover:scale-110` 
              })}
              
              {/* Subtle ring animation on hover */}
              <div className="absolute inset-0 rounded-full border border-[#7BA7C2]/30 transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:scale-110"></div>
            </div>
          </div>
          
          {/* Typography for title with transition */}
          <h3 className={`${fontSize.lg} ${fontWeight.normal} ${styles.title} flex-1 pr-4 line-clamp-1 transition-colors duration-300`}>
            {title}
          </h3>
        </div>
        
        {/* Content area with better spacing */}
        <div className="px-6 py-5 flex flex-col">
          {/* Description with better typography and spacing */}
          <p className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} ${lineHeight.relaxed} flex-grow hyphens-auto`} lang="de">
            {description}
          </p>
        </div>
        
        {/* Accent elements */}
        <div className={`absolute top-0 left-0 w-full h-1 ${styles.accent} transition-opacity duration-300 opacity-0 group-hover:opacity-100`}></div>
          
        {/* Subtle corner accent */}
        <div className="absolute bottom-0 right-0 w-16 h-16 transition-opacity duration-500 bg-gradient-to-tl from-[#7BA7C2]/10 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100"></div>
      </div>
    </div>
  );
};

export default StaticBenefitCard;
