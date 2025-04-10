import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Microscope, HeartPulse, Sparkles, Stethoscope, Check, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, tracking, lineHeight } from '../../utils/typography';
import { buttonStyle, buttonRippleClass, buttonArrowClass } from '../../utils/buttons';

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
        {/* Main gradient background with more visible blue-gray tones */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#EDF5FC] via-[#E5EFF7] to-[#EDF5FC]"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-[#7BA7C2]/5 -mr-[400px] -mt-[400px] blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[#7BA7C2]/5 -ml-[300px] -mb-[300px] blur-3xl"></div>
        
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
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-[#7BA7C2]/10 blur-xl"></div>
            <h2 className={`${textStyle.sectionTitle}`} lang="de">{t('holisticConceptSection.title')}</h2>
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[300px] mt-6 mx-auto`}></div>
          </div>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-6`}>
            {t('holisticConceptSection.subtitle')}
          </p>
        </div>

        {/* Main Content - Image + Text */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center mb-20">
          {/* Left Column - Image with enhanced effects */}
          <div className={`w-full lg:w-1/2 relative transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            {/* Decorative elements */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#7BA7C2]/10 to-[#7BA7C2]/5 rounded-full blur-3xl"></div>
            
            {/* Subtle animated decorative elements */}
            <div className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full border border-[#7BA7C2]/20 animate-pulse-slow"></div>
            <div className="absolute bottom-1/3 right-1/3 w-28 h-28 rounded-full border border-[#7BA7C2]/10 animate-pulse-slower"></div>
            
            {/* Mobile image */}
            <img 
              src="/images/Dion_Model_Ok.webp" 
              alt="Dion Hair Clinic - Ganzheitliches Konzept für Haartransplantation" 
              className="w-full h-auto block lg:hidden relative z-10"
              style={{ 
                filter: 'drop-shadow(0 20px 13px rgb(0 0 0 / 0.05)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.1))'
              }}
              loading="lazy"
              decoding="async"
              fetchPriority="high"
              width="450"
              height="650"
            />
            
            {/* Desktop image */}
            <img 
              src="/images/Dion_Model_Benefits.webp" 
              alt="Dion Hair Clinic - Ganzheitliches Konzept für Haartransplantation" 
              className="w-full h-auto hidden lg:block relative z-10"
              style={{ 
                filter: 'drop-shadow(0 20px 13px rgb(0 0 0 / 0.05)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.1))'
              }}
              loading="lazy"
              decoding="async"
              fetchPriority="high"
              width="650"
              height="850"
            />
          </div>
          
          {/* Right Column - Text Content */}
          <div className={`w-full lg:w-1/2 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="text-center lg:text-left">
              <p className={`${textStyle.bodyTextImportant} mb-8 leading-relaxed`}>
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
                    <div className={`w-12 h-12 rounded-full bg-[#7BA7C2]/10 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm transition-all duration-300 ${activeCard === index ? 'bg-[#7BA7C2]/30 scale-110' : ''}`}>
                      {React.cloneElement(concept.icon as React.ReactElement, { 
                        className: `w-6 h-6 text-[#7BA7C2] transition-all duration-300 ${activeCard === index ? 'scale-110' : ''}` 
                      })}
                    </div>
                    <div>
                      <h4 className={`${fontSize.h4} ${fontWeight.normal} ${activeCard === index ? textColor.primary : textColor.dark} mb-2 transition-colors duration-300`}>
                        {t(concept.titleKey)}
                      </h4>
                      <p className={`${textStyle.bodyText} mb-2`}>
                        {t(concept.descriptionKey)}
                      </p>
                      <div className={`italic text-sm ${textColor.primary} font-light transition-all duration-300 ${activeCard === index ? 'opacity-100' : 'opacity-70'}`}>
                        "{t(concept.quoteKey)}"
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* CTA Button - Elegant styling */}
              <div className={`flex justify-center lg:justify-start mt-10 transition-all duration-1000 delay-1200 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <Link to="/klinik" className={`${buttonStyle.primary} shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]`}>
                  <span className={buttonRippleClass}></span>
                  <span className={`relative flex items-center ${textStyle.button} uppercase tracking-widest`}>
                    {t('buttons.moreInfo', { ns: 'common' })}
                    <ArrowRight className={`${buttonArrowClass} ml-2`} />
                  </span>
                </Link>
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
                    ? 'shadow-xl transform -translate-y-1 border-2 border-[#7BA7C2]/80' 
                    : 'border border-gray-100/80 hover:border-[#7BA7C2]/30 hover:shadow-xl'
                }`}>
                  {/* Header with icon and title */}
                  <div className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-full bg-[#7BA7C2]/10 flex items-center justify-center mx-auto mb-4 transition-all duration-500 ${
                      isActive ? 'scale-110 bg-[#7BA7C2]/20' : ''
                    }`}>
                      {React.cloneElement(concept.icon as React.ReactElement, { 
                        className: `w-8 h-8 text-[#7BA7C2] transition-all duration-500 ${isActive ? 'scale-110' : ''}` 
                      })}
                    </div>
                    
                    <h3 className={`${fontSize.h4} ${fontWeight.normal} ${isActive ? textColor.primary : textColor.dark} mb-3 transition-colors duration-300`}>
                      {t(concept.titleKey)}
                    </h3>
                  </div>
                  
                  {/* Content with subtle gradient */}
                  <div className="px-6 pb-6 text-center">
                    {/* Description with perfect typography */}
                    <p className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} ${lineHeight.relaxed} mb-4`}>
                      {t(concept.descriptionKey)}
                    </p>
                    
                    {/* Quote */}
                    <div className={`italic text-sm ${textColor.primary} font-light transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                      "{t(concept.quoteKey)}"
                    </div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className={`absolute -z-10 w-full h-full rounded-2xl bg-[#7BA7C2]/10 top-2 left-2 transition-all duration-500 ${
                  isActive ? 'opacity-70' : 'opacity-0'
                }`}></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HolisticConceptSection;
