import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ShieldCheck, Zap, HeartPulse, Sparkles } from 'lucide-react';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, tracking, lineHeight } from '../../utils/typography';
import { buttonStyle, buttonRippleClass, buttonArrowClass } from '../../utils/buttons';

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const PainlessTreatmentSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoverFeature, setHoverFeature] = useState<number | null>(null);

  // Trigger entrance animations
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Get features from translation
  const featureIcons = [
    <ShieldCheck strokeWidth={1.5} />,
    <Zap strokeWidth={1.5} />,
    <HeartPulse strokeWidth={1.5} />,
    <Sparkles strokeWidth={1.5} />
  ];

  // Get features from translation
  const { t } = useTranslation('home');
  const featureItems: FeatureItem[] = (t('painlessTreatmentSection.features', { returnObjects: true }) as any[]).map(
    (feature: any, index: number) => ({
      icon: featureIcons[index],
      title: feature.title,
      description: feature.description
    })
  );

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#7BA7C2]/5 via-[#7BA7C2]/10 to-[#7BA7C2]/5"></div>
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
        {/* Section Header with elegant design - exactly matching other sections */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4 relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-[#7BA7C2]/10 blur-xl"></div>
            <h2 className={`${textStyle.sectionTitle} text-3xl md:text-4xl lg:text-5xl leading-tight md:leading-snug lg:leading-normal px-2 md:px-0`} lang="de">{t('painlessTreatmentSection.title')}</h2>
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[350px] mt-3 mx-auto`}></div>
          </div>
          <p className={`${textStyle.sectionSubtitle} text-sm md:text-base lg:text-lg leading-relaxed md:leading-relaxed max-w-[95%] md:max-w-3xl mx-auto mt-4 md:mt-6 px-2 md:px-0`}>
            {t('painlessTreatmentSection.subtitle')}
          </p>
        </div>
        
        {/* Additional Advantages Box - Exactly matching the ProcessSection */}
        <div className={`relative transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#7BA7C2]/5 -mr-32 -mt-32 blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#7BA7C2]/5 -ml-32 -mb-32 blur-xl"></div>
            
            <div className="relative z-10">
              <h3 className={`${textStyle.primaryHeading} mb-4 text-center md:text-left`}>{t('painlessTreatmentSection.benefitsTitle')}</h3>
              
              <p className={`${textStyle.bodyText} mb-8 text-center md:text-left`}>
                {t('painlessTreatmentSection.description')}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featureItems.map((item, index) => {
                  const isHovered = index === hoverFeature;
                  
                  return (
                    <div 
                      key={index}
                      className="relative group"
                      onMouseEnter={() => setHoverFeature(index)}
                      onMouseLeave={() => setHoverFeature(null)}
                    >
                      <div className={`flex gap-4 p-6 rounded-xl transition-all duration-300 ${
                        isHovered 
                          ? 'bg-[#7BA7C2]/5 shadow-sm' 
                          : 'hover:bg-[#7BA7C2]/5'
                      }`}>
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isHovered 
                            ? 'bg-[#7BA7C2] text-white' 
                            : 'bg-[#7BA7C2]/10 text-[#7BA7C2]'
                        }`}>
                          {item.icon}
                        </div>
                        
                        <div className="flex-grow">
                          <h4 className={`${fontSize.lg} ${fontWeight.normal} ${tracking.wide} mb-2 transition-colors duration-300 ${
                            isHovered ? textColor.primary : textColor.dark
                          }`}>
                            {item.title}
                          </h4>
                          <p className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} ${lineHeight.relaxed}`}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PainlessTreatmentSection;
