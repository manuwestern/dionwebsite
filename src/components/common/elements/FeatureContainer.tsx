import React from 'react';
import { textStyle } from '../../../utils/typography';
import BenefitCard, { BenefitCardProps } from './BenefitCard';

export interface FeatureContainerProps {
  title: string;
  description?: string;
  features: Omit<BenefitCardProps, 'accentColor'>[];
  accentColor?: string;
  backgroundColor?: string;
  columns?: 1 | 2;
}

const FeatureContainer: React.FC<FeatureContainerProps> = ({
  title,
  description,
  features,
  accentColor = '#7BA7C2',
  backgroundColor = 'bg-white/90',
  columns = 2
}) => {
  return (
    <div className="relative">
      <div className={`relative ${backgroundColor} backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100 overflow-hidden`}>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#7BA7C2]/5 -mr-32 -mt-32 blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#7BA7C2]/5 -ml-32 -mb-32 blur-xl"></div>
        
        <div className="relative z-10">
          <h3 
            className={`${textStyle.primaryHeading} mb-4 text-center md:text-left break-words hyphens-auto`} 
            lang="de"
          >
            {title}
          </h3>
          
          {description && (
            <p 
              className={`${textStyle.bodyText} mb-8 text-center md:text-left break-words hyphens-auto`} 
              lang="de"
            >
              {description}
            </p>
          )}
          
          <div className={`grid grid-cols-1 ${columns === 2 ? 'md:grid-cols-2' : ''} gap-3 md:gap-6`}>
            {features.map((feature, index) => (
              <BenefitCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                accentColor={accentColor}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureContainer;
