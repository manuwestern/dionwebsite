import React, { useState, useEffect } from 'react';
import { Microscope, HeartPulse, Sparkles, Stethoscope, Check, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { textStyle, fontSize, fontWeight, gradientUnderline, tracking, lineHeight } from '../../utils/typography';
import { buttonStyle, buttonRippleClass, buttonArrowClass } from '../../utils/buttons';
import { useTheme } from '../../utils/ThemeProvider';

interface Concept {
  icon: React.ReactNode;
  titleKey: string;
  descriptionKey: string;
  quoteKey: string;
}

const HolisticConceptSection: React.FC = () => {
  const { t } = useTranslation(['home', 'common']);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const { activeTheme } = useTheme();

  // Trigger entrance animations on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const element = document.getElementById('holistic-concept-section');
      
      if (element) {
        const elementPosition = element.offsetTop + 200;
        
        if (scrollPosition > elementPosition) {
          setIsVisible(true);
        }
      }
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Icons for each concept
  const conceptIcons = [
    <Microscope strokeWidth={1.5} />,
    <HeartPulse strokeWidth={1.5} />,
    <Sparkles strokeWidth={1.5} />,
    <Stethoscope strokeWidth={1.5} />
  ];

  // Create concept cards from translation keys
  const conceptCards: Concept[] = Array.from(
    { length: (t('holisticConceptSection.concepts', { returnObjects: true }) as any[]).length },
    (_, index) => ({
      icon: conceptIcons[index],
      titleKey: `holisticConceptSection.concepts.${index}.title`,
      descriptionKey: `holisticConceptSection.concepts.${index}.description`,
      quoteKey: `holisticConceptSection.concepts.${index}.quote`
    })
  );

  return (
    <section id="holistic-concept-section" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background with gradient and blur effects */}
      <div className="absolute inset-0 -z-10">
        {/* Main gradient background with theme colors */}
        <div className="absolute inset-0" 
             style={{ background: `linear-gradient(to bottom, ${activeTheme.backgroundLight}, ${activeTheme.backgroundDark}, ${activeTheme.backgroundLight})` }}></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full -mr-[400px] -mt-[400px] blur-3xl"
             style={{ backgroundColor: `${activeTheme.accent}05` }}></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full -ml-[300px] -mb-[300px] blur-3xl"
             style={{ backgroundColor: `${activeTheme.accent}05` }}></div>
        
        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: 'url("/images/dionhairclinic_bg.svg")',
            backgroundSize: '200px',
            backgroundRepeat: 'repeat'
          }}
        ></div>
      </div>
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header with elegant design */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6 relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full blur-xl"
                 style={{ backgroundColor: `${activeTheme.accent}10` }}></div>
            <h2 className={`${textStyle.sectionTitle}`} 
                style={{ color: activeTheme.textPrimary }}
                lang="de">{t('holisticConceptSection.title')}</h2>
            <div className="w-[90%] max-w-[300px] mt-4 mx-auto h-px" 
                 style={{ background: `linear-gradient(to right, transparent, ${activeTheme.divider}, transparent)` }}></div>
          </div>
          <p className={`${fontSize.lg} ${fontWeight.normal} ${lineHeight.normal} max-w-3xl mx-auto mt-6 md:tracking-wide`}
             style={{ color: activeTheme.textSecondary }}>
            {t('holisticConceptSection.subtitle')}
          </p>
        </div>

        {/* Main Content - Image + Text */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center mb-20">
          {/* Left Column - Image with enhanced effects */}
          <div className={`w-full lg:w-1/2 relative transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            {/* Decorative elements */}
            <div className="absolute -inset-4 rounded-full blur-3xl"
                 style={{ background: `linear-gradient(to top right, ${activeTheme.accent}10, ${activeTheme.accent}05)` }}></div>
            
            {/* Subtle animated decorative elements */}
            <div className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full animate-pulse-slow"
                 style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: `${activeTheme.accent}20` }}></div>
            <div className="absolute bottom-1/3 right-1/3 w-28 h-28 rounded-full animate-pulse-slower"
                 style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: `${activeTheme.accent}10` }}></div>
            
            {/* Mobile image */}
            <img 
              src="/images/Dion_Model_Ok.png" 
              alt="Dion Hair Clinic - Ganzheitliches Konzept" 
              className="w-full h-auto block lg:hidden relative z-10"
              style={{ 
                filter: 'drop-shadow(0 20px 13px rgb(0 0 0 / 0.05)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.1))'
              }}
              loading="lazy"
            />
            
            {/* Desktop image */}
            <img 
              src="/images/Dion_Model_Benefits.png" 
              alt="Dion Hair Clinic - Ganzheitliches Konzept" 
              className="w-full h-auto hidden lg:block relative z-10"
              style={{ 
                filter: 'drop-shadow(0 20px 13px rgb(0 0 0 / 0.05)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.1))'
              }}
              loading="lazy"
            />
          </div>
          
          {/* Right Column - Text Content */}
          <div className={`w-full lg:w-1/2 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="text-center lg:text-left">
              <p className={`${fontSize.lg} ${fontWeight.normal} ${lineHeight.relaxed} mb-8 leading-relaxed`}
                 style={{ color: activeTheme.textPrimary }}>
                {t('holisticConceptSection.description')}
              </p>
              
              {/* Concepts with elegant styling */}
              <div className="space-y-6 flex flex-col items-center lg:items-start">
                {conceptCards.map((concept, index) => (
                  <div 
                    key={index} 
                    className={`flex items-start gap-4 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                    style={{ transitionDelay: `${300 + index * 150}ms` }}
                    onMouseEnter={() => setActiveCard(index)}
                    onMouseLeave={() => setActiveCard(null)}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm transition-all duration-300 ${activeCard === index ? 'scale-110' : ''}`}
                         style={{ 
                           backgroundColor: activeCard === index ? `${activeTheme.accent}30` : `${activeTheme.accent}10`
                         }}>
                      {React.cloneElement(concept.icon as React.ReactElement, { 
                        className: `w-6 h-6 transition-all duration-300 ${activeCard === index ? 'scale-110' : ''}`,
                        style: { color: activeTheme.accent }
                      })}
                    </div>
                    <div>
                      <h4 className={`${fontSize.h4} ${fontWeight.normal} mb-2 transition-colors duration-300`}
                          style={{ 
                            color: activeCard === index ? activeTheme.primary : activeTheme.textPrimary 
                          }}>
                        {t(concept.titleKey)}
                      </h4>
                      <p className={`${fontSize.base} ${fontWeight.normal} ${lineHeight.relaxed} mb-2`}
                         style={{ color: activeTheme.textSecondary }}>
                        {t(concept.descriptionKey)}
                      </p>
                      <div className={`italic text-sm font-light transition-all duration-300 ${activeCard === index ? 'opacity-100' : 'opacity-70'}`}
                           style={{ color: activeTheme.primary }}>
                        "{t(concept.quoteKey)}"
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* CTA Button - Elegant styling */}
              <div className={`flex justify-center lg:justify-start mt-10 transition-all duration-1000 delay-1200 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <button className={`${buttonStyle.primary} shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]`}>
                  <span className={buttonRippleClass}></span>
                  <span className={`relative flex items-center ${textStyle.button} uppercase tracking-widest`}>
                    {t('buttons.moreInfo', { ns: 'common' })}
                    <ArrowRight className={`${buttonArrowClass} ml-2`} />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Concept Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {conceptCards.map((concept, index) => {
            const isActive = index === activeCard;
            
            return (
              <div 
                key={index}
                className={`relative group transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                {/* Card with glass morphism effect */}
                <div className={`relative bg-white backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-500 h-full ${
                  isActive 
                    ? 'shadow-xl transform -translate-y-1 border-2' 
                    : 'border border-gray-100/80 hover:shadow-xl'
                }`}
                     style={{ 
                       borderColor: isActive ? `${activeTheme.accent}80` : `${activeTheme.accent}30`
                     }}>
                  {/* Header with icon and title */}
                  <div className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-500 ${
                      isActive ? 'scale-110' : ''
                    }`}
                         style={{ 
                           backgroundColor: isActive ? `${activeTheme.accent}20` : `${activeTheme.accent}10`
                         }}>
                      {React.cloneElement(concept.icon as React.ReactElement, { 
                        className: `w-8 h-8 transition-all duration-500 ${isActive ? 'scale-110' : ''}`,
                        style: { color: activeTheme.accent }
                      })}
                    </div>
                    
                    <h3 className={`${fontSize.h4} ${fontWeight.normal} mb-3 transition-colors duration-300`}
                        style={{ 
                          color: isActive ? activeTheme.primary : activeTheme.textPrimary 
                        }}>
                      {t(concept.titleKey)}
                    </h3>
                  </div>
                  
                  {/* Content with subtle gradient */}
                  <div className="px-6 pb-6 text-center">
                    {/* Description with perfect typography */}
                    <p className={`${fontSize.sm} ${fontWeight.light} ${lineHeight.relaxed} mb-4`}
                       style={{ color: activeTheme.textSecondary }}>
                      {t(concept.descriptionKey)}
                    </p>
                    
                    {/* Quote */}
                    <div className={`italic text-sm font-light transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-70'}`}
                         style={{ color: activeTheme.primary }}>
                      "{t(concept.quoteKey)}"
                    </div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className={`absolute -z-10 w-full h-full rounded-2xl top-2 left-2 transition-all duration-500 ${
                  isActive ? 'opacity-70' : 'opacity-0'
                }`}
                     style={{ backgroundColor: `${activeTheme.accent}10` }}></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HolisticConceptSection;
