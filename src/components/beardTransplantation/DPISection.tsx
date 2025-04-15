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
  const { t } = useTranslation('beardTransplantation');
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
        {/* Section Header with elegant design - exactly matching other sections */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4 relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-[#7BA7C2]/10 blur-xl"></div>
            <h2 className={`${textStyle.sectionTitle}`} lang="de">{t('dpiSection.title')}</h2>
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[350px] mt-3 mx-auto`}></div>
          </div>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-4 hyphens-auto`} lang="de">
            {t('dpiSection.subtitle')}
          </p>
        </div>
        
        {/* Mobile Image - Only visible on mobile */}
        <div className="md:hidden mb-8 mx-auto max-w-none -mx-6 sm:-mx-8">
          <div className="relative w-[110%] sm:w-[120%] transform -translate-x-[5%] sm:-translate-x-[10%]">
            <img 
              src="/images/DionPainlessInjection.webp" 
              alt="Dion Painless Injection Technology" 
              className="w-full h-auto object-cover"
              loading="lazy"
            />
            <div className="absolute top-4 right-4 bg-[#7BA7C2] text-white text-xs font-medium px-2 py-0.5 rounded-full">
              {t('dpiSection.premiumOption')}
            </div>
          </div>
        </div>
        
        {/* Content with image for desktop */}
        <div className={`relative transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#7BA7C2]/5 -mr-32 -mt-32 blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#7BA7C2]/5 -ml-32 -mb-32 blur-xl"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row gap-8">
              {/* Content section */}
              <div className="flex-1">
                {/* Title and description text removed as requested */}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                  {featureItems.map((item, index) => {
                    const isHovered = index === hoverFeature;
                    
                    return (
                      <div 
                        key={index}
                        className="relative group"
                        onMouseEnter={() => window.innerWidth >= 768 ? setHoverFeature(index) : null}
                        onMouseLeave={() => window.innerWidth >= 768 ? setHoverFeature(null) : null}
                      >
                        <div className={`flex flex-col md:flex-row gap-3 md:gap-4 p-4 md:p-5 rounded-xl transition-all duration-300 ${
                          isHovered && window.innerWidth >= 768
                            ? 'bg-[#7BA7C2]/5 shadow-sm' 
                            : 'md:hover:bg-[#7BA7C2]/5'
                        }`}>
                          <div className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full mx-auto md:mx-0 mb-2 md:mb-0 flex items-center justify-center transition-all duration-300 ${
                            isHovered && window.innerWidth >= 768
                              ? 'bg-[#7BA7C2] text-white' 
                              : 'bg-[#7BA7C2]/10 text-[#7BA7C2]'
                          }`}>
                            {React.cloneElement(item.icon as React.ReactElement, { 
                              className: `w-5 h-5 md:w-6 md:h-6 transition-all duration-300` 
                            })}
                          </div>
                          
                          <div className="flex-grow">
                            <h4 className={`${fontSize.lg} ${fontWeight.normal} ${tracking.wide} mb-1 md:mb-2 transition-colors duration-300 text-center md:text-left ${
                              isHovered && window.innerWidth >= 768 ? textColor.primary : textColor.dark
                            }`}>
                              {item.title}
                            </h4>
                            <p className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} leading-relaxed md:${lineHeight.relaxed} text-center md:text-left max-w-[320px] mx-auto md:max-w-none md:mx-0 hyphens-auto`} lang="de">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Image section - Only visible on desktop */}
              <div className="hidden md:block md:w-2/5 lg:w-1/3 flex-shrink-0">
                <div className="relative h-full rounded-xl overflow-hidden shadow-lg">
                  <img 
                    src="/images/DionPainlessInjection.webp" 
                    alt="Dion Painless Injection Technology" 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Light gradient behind the image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent -z-10"></div>
                  <div className="absolute top-4 right-4 bg-[#7BA7C2] text-white text-sm font-medium px-3 py-1 rounded-full">
                    {t('dpiSection.premiumOption')}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm text-[#7BA7C2] text-sm font-medium px-3 py-1 rounded-full">
                    {t('dpiSection.additionalFee')}
                  </div>
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
