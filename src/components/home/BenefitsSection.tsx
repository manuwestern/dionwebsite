import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Users, Zap, Compass, UserCheck, Clock, MapPin, ArrowRight, ChevronDown } from 'lucide-react';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, tracking, lineHeight } from '../../utils/typography';
import { buttonStyle, buttonRippleClass, buttonArrowClass } from '../../utils/buttons';

interface BenefitCard {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const BenefitsSection: React.FC = () => {
  const { t } = useTranslation(['home', 'common']);
  const [hoverCard, setHoverCard] = useState<number | null>(null);
  const [expandedCards, setExpandedCards] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Toggle card expansion
  const toggleCard = (index: number) => {
    setExpandedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };
  
  // Check if card is expanded
  const isCardExpanded = (index: number) => expandedCards.includes(index);

  // Icons for each benefit
  const benefitIcons = [
    <Users strokeWidth={1.5} />,
    <Zap strokeWidth={1.5} />,
    <Compass strokeWidth={1.5} />,
    <UserCheck strokeWidth={1.5} />,
    <Clock strokeWidth={1.5} />,
    <MapPin strokeWidth={1.5} />
  ];

  // Create benefit cards from translation keys
  const benefitCards: BenefitCard[] = Array.from(
    { length: (t('benefitsSection.cards', { returnObjects: true }) as any[]).length },
    (_, index) => ({
      title: t(`benefitsSection.cards.${index}.title`),
      description: t(`benefitsSection.cards.${index}.description`),
      icon: benefitIcons[index]
    })
  );

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background is now provided by the SectionWrapper component */}
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header with elegant design */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6 relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-[#7BA7C2]/10 blur-xl"></div>
            <h2 className={`${textStyle.sectionTitle} text-3xl md:text-4xl lg:text-5xl leading-tight md:leading-snug lg:leading-normal px-2 md:px-0`} lang="de">{t('benefitsSection.title')}</h2>
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[300px] mt-6 mx-auto`}></div>
          </div>
          <p className={`${textStyle.sectionSubtitle} text-sm md:text-base lg:text-lg leading-relaxed md:leading-relaxed max-w-[95%] md:max-w-3xl mx-auto mt-4 md:mt-6 px-2 md:px-0`}>
            {t('benefitsSection.subtitle')}
          </p>
        </div>

        {/* Benefits Cards Grid - Equal height cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {benefitCards.map((card, index) => {
            const isHovered = index === hoverCard;
            
            return (
              <div 
                key={index}
                className="relative group"
                onMouseEnter={() => setHoverCard(index)}
                onMouseLeave={() => setHoverCard(null)}
              >
                {/* Card with glass morphism effect */}
                <div className={`relative bg-white backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-500 h-full border-2 ${
                  isHovered 
                    ? 'shadow-xl transform -translate-y-1 border-[#7BA7C2]/80' 
                    : 'border-gray-100/80 hover:border-[#7BA7C2]/30 hover:shadow-xl'
                }`}>
                  {/* Header with icon and title side by side - clickable on mobile */}
                  <button 
                    onClick={() => toggleCard(index)}
                    className="md:pointer-events-none w-full text-left relative overflow-hidden flex items-center"
                  >
                    {/* Gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#7BA7C2] to-[#7BA7C2]/80"></div>
                    
                    {/* Decorative circles */}
                    <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/10 -mr-20 -mt-20"></div>
                    <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-white/10 -ml-10 -mb-10"></div>
                    
                    {/* Icon container - smaller on mobile */}
                    <div className="relative z-10 ml-4 md:ml-6 mr-3 md:mr-4">
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-500 ${
                        isHovered ? 'scale-110 bg-white/30' : ''
                      }`}>
                        {React.cloneElement(card.icon as React.ReactElement, { 
                          className: `w-5 h-5 md:w-6 md:h-6 text-white transition-all duration-500 ${isHovered ? 'scale-110' : ''}` 
                        })}
                      </div>
                    </div>
                    
                    {/* Title - narrower on mobile */}
                    <h3 className={`relative z-10 ${fontSize.base} md:${fontSize.lg} ${fontWeight.normal} ${textColor.white} drop-shadow-sm flex-1 pr-6 line-clamp-2 py-3 md:py-5`}>
                      {card.title}
                    </h3>
                    
                    {/* Toggle indicator - only visible on mobile */}
                    <div className="md:hidden relative z-10 mr-4">
                      <ChevronDown 
                        className={`w-5 h-5 text-white transition-transform duration-300 ${
                          isCardExpanded(index) ? 'rotate-180' : ''
                        }`} 
                      />
                    </div>
                  </button>
                  
                  {/* Content with subtle gradient - collapsible on mobile */}
                  <div 
                    className={`overflow-hidden transition-all duration-300 bg-gradient-to-b from-white to-gray-50/50 ${
                      isCardExpanded(index) || !isMobile ? 'max-h-96' : 'max-h-0 md:max-h-96'
                    }`}
                  >
                    <div className="p-6">
                      {/* Description with perfect typography */}
                      <p className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} ${lineHeight.relaxed} text-center md:text-left`}>
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className={`absolute -z-10 w-full h-full rounded-2xl bg-[#7BA7C2]/10 top-2 left-2 transition-all duration-500 ${
                  isHovered ? 'opacity-70' : 'opacity-0'
                }`}></div>
              </div>
            );
          })}
        </div>

        {/* Elegant CTA Section */}
        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-[#7BA7C2]/5 rounded-2xl"></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#7BA7C2]/5 -mr-32 -mt-32 blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#7BA7C2]/5 -ml-32 -mb-32 blur-xl"></div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div className="md:w-2/3">
                <h3 className={`${fontSize.base} md:${fontSize.h3} ${fontWeight.normal} ${textColor.primary} mb-3 md:mb-4 text-center md:text-left leading-tight md:leading-normal max-w-[90%] mx-auto md:mx-0`}>{t('benefits.personalConsultation', { ns: 'common' })}</h3>
                <p className={`${textStyle.bodyText} text-center md:text-left px-2 md:px-0`}>
                  {/* Different text for mobile and desktop */}
                  <span className="md:hidden">
                    {t('benefits.personalConsultationMobileText', { ns: 'common' })}
                  </span>
                  <span className="hidden md:inline">
                    {t('benefits.personalConsultationText', { ns: 'common' })}
                  </span>
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center md:justify-end w-full">
                <div className="w-4/5">
                  <Link 
                    to="/kontakt" 
                    className={`${buttonStyle.primary} w-full shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] text-center`}
                  >
                    <span className={buttonRippleClass}></span>
                    <span className="relative flex items-center justify-center text-sm uppercase tracking-wider">
                      {t('buttons.consultation', { ns: 'common' })}
                      <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
