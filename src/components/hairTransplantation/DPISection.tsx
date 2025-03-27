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

const DPISection: React.FC = () => {
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
  const { t } = useTranslation('hairTransplantation');
  const featureItems: FeatureItem[] = (t('dpiSection.features', { returnObjects: true }) as any[]).map(
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
        <div className={`flex flex-col md:flex-row gap-12 items-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Left side - Premium badge and content */}
          <div className="md:w-1/2">
            {/* Mobile-optimized layout with center alignment */}
            <div className="flex flex-col items-center md:items-start">
              <div className="mb-6">
                <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#7BA7C2] to-[#5A8BA6] text-white rounded-full text-sm font-medium shadow-md">
                  {t('dpiSection.premiumOption')}
                </div>
              </div>
              
              <h2 className={`${textStyle.sectionTitle} mb-6 text-center md:text-left`} lang="de">
                Dion Painless Injection
                <span className={`${fontSize.h3} ${textColor.primary} ml-2`}>(DPI)</span>
              </h2>
              
              <div className={`${gradientUnderline.primary} w-[85%] max-w-[280px] md:w-[90%] md:max-w-[400px] mx-auto md:mx-0 mb-6`}></div>
              
              <p className={`${fontSize.lg} ${textColor.medium} ${fontWeight.light} ${lineHeight.relaxed} mb-8 text-center md:text-left px-2 md:px-0 max-w-md md:max-w-none mx-auto md:mx-0`}>
                {t('dpiSection.description')}
              </p>
              
              <div className="flex justify-center md:justify-start w-full">
                <button className={`${buttonStyle.primary} shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]`}>
                  <span className={buttonRippleClass}></span>
                  <span className={`relative flex items-center ${textStyle.button} uppercase tracking-widest`}>
                    {t('dpiSection.learnMore')}
                    <ArrowRight className={`${buttonArrowClass} ml-2`} />
                  </span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Right side - Elegant card with features */}
          <div className="md:w-1/2 mt-6 md:mt-0">
            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100/80 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#7BA7C2]/5 -mr-32 -mt-32 blur-xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#7BA7C2]/5 -ml-32 -mb-32 blur-xl"></div>
              
              {/* Premium badge */}
              <div className="absolute top-6 right-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#7BA7C2]/20 rounded-full blur-md"></div>
                  <div className="relative z-10 bg-gradient-to-r from-[#7BA7C2] to-[#5A8BA6] text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                    {t('dpiSection.additionalFee')}
                  </div>
                </div>
              </div>
              
              <div className="relative z-10">
                <h3 className={`${textStyle.primaryHeading} mb-6 text-center md:text-left`}>{t('dpiSection.benefitsTitle')}</h3>
                
                <div className="space-y-6">
                  {featureItems.map((item, index) => {
                    const isHovered = index === hoverFeature;
                    
                    return (
                      <div 
                        key={index}
                        className="relative group"
                        onMouseEnter={() => setHoverFeature(index)}
                        onMouseLeave={() => setHoverFeature(null)}
                      >
                        <div className={`flex gap-4 p-4 rounded-xl transition-all duration-300 ${
                          isHovered 
                            ? 'bg-[#7BA7C2]/5 shadow-sm' 
                            : 'hover:bg-[#7BA7C2]/5'
                        }`}>
                          <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                            isHovered 
                              ? 'bg-gradient-to-r from-[#7BA7C2] to-[#5A8BA6] text-white' 
                              : 'bg-[#7BA7C2]/10 text-[#7BA7C2]'
                          }`}>
                            {item.icon}
                          </div>
                          
                          <div className="flex-grow">
                            <h4 className={`${fontSize.lg} ${fontWeight.normal} mb-1 transition-colors duration-300 ${
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
      </div>
    </section>
  );
};

export default DPISection;
