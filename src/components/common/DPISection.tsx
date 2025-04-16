import React, { useState, useEffect } from 'react';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, lineHeight } from '../../utils/typography';
import DPIFeatureCard, { DPIFeatureItem } from './elements/DPIFeatureCard';

export interface FeatureItem extends DPIFeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface DPISectionProps {
  title: string;
  subtitle: string;
  features: FeatureItem[];
  imageSrc?: string;
  imageAlt?: string;
  premiumLabel?: string;
  additionalFeeLabel?: string;
  backgroundColor?: string;
  accentColor?: string;
  translationNamespace?: string;
}

const DPISection: React.FC<DPISectionProps> = ({
  title,
  subtitle,
  features,
  imageSrc,
  imageAlt = "Feature image",
  premiumLabel,
  additionalFeeLabel,
  backgroundColor = "from-[#7BA7C2]/5 via-[#7BA7C2]/10 to-[#7BA7C2]/5",
  accentColor = "bg-[#7BA7C2]/70",
  translationNamespace
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoverFeature, setHoverFeature] = useState<number | null>(null);

  // Trigger entrance animations
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className={`absolute inset-0 -z-10 bg-gradient-to-b ${backgroundColor}`}></div>
      <div className="absolute -z-10 w-[800px] h-[800px] rounded-full bg-[#7BA7C2]/10 -top-[400px] -right-[400px] blur-3xl"></div>
      <div className="absolute -z-10 w-[600px] h-[600px] rounded-full bg-[#7BA7C2]/10 -bottom-[300px] -left-[300px] blur-3xl"></div>
      
      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] z-0" 
        style={{ 
          backgroundImage: 'url("/images/dionhairclinic_bg.svg")',
          backgroundSize: '200px',
          backgroundRepeat: 'repeat'
        }}
      ></div>
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header with elegant design */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4 relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-[#7BA7C2]/10 blur-xl"></div>
            <h2 className={`${textStyle.sectionTitle}`} lang="de">{title}</h2>
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[350px] mt-3 mx-auto`}></div>
          </div>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-4 hyphens-auto`} lang="de">
            {subtitle}
          </p>
        </div>
        
        {/* Mobile Image is now handled inside the DPIFeatureCard component */}
        
        {/* Content with integrated image */}
        <div className={`relative transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <DPIFeatureCard 
            features={features}
            accentColor={accentColor}
            imageSrc={imageSrc}
            imageAlt={imageAlt}
            premiumLabel={premiumLabel}
            additionalFeeLabel={additionalFeeLabel}
          />
        </div>
      </div>
    </section>
  );
};

export default DPISection;
