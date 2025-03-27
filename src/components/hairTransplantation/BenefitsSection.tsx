import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Users, Zap, Compass, UserCheck, Clock, MapPin, ArrowRight } from 'lucide-react';
import { textStyle, fontSize, fontWeight, gradientUnderline, tracking, lineHeight } from '../../utils/typography';
import { buttonStyle, buttonRippleClass, buttonArrowClass } from '../../utils/buttons';
import { useTheme } from '../../utils/ThemeProvider';

interface BenefitCard {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const BenefitsSection: React.FC = () => {
  const { t } = useTranslation(['hairTransplantation', 'common']);
  const [hoverCard, setHoverCard] = useState<number | null>(null);
  const { activeTheme } = useTheme();

  // Icons for each benefit
  const benefitIcons = [
    <Users strokeWidth={1.5} />,
    <Zap strokeWidth={1.5} />,
    <Compass strokeWidth={1.5} />,
    <UserCheck strokeWidth={1.5} />,
    <Clock strokeWidth={1.5} />,
    <MapPin strokeWidth={1.5} />
  ];

  // Get benefits from translation
  const benefitCards: BenefitCard[] = (t('benefitsSection.cards', { returnObjects: true }) as any[]).map(
    (card: any, index: number) => ({
      title: card.title,
      description: card.description,
      icon: benefitIcons[index]
    })
  );

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -z-10 w-full h-full inset-0" 
           style={{ background: `linear-gradient(to bottom, ${activeTheme.backgroundLight}, ${activeTheme.backgroundDark}, ${activeTheme.backgroundLight})` }}></div>
      <div className="absolute -z-10 w-[800px] h-[800px] rounded-full -top-[400px] -right-[400px] blur-3xl"
           style={{ backgroundColor: `${activeTheme.accent}05` }}></div>
      <div className="absolute -z-10 w-[600px] h-[600px] rounded-full -bottom-[300px] -left-[300px] blur-3xl"
           style={{ backgroundColor: `${activeTheme.accent}05` }}></div>
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header with elegant design */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6 relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full blur-xl"
                 style={{ backgroundColor: `${activeTheme.accent}10` }}></div>
            <h2 className={`${textStyle.sectionTitle}`} lang="de">{t('benefitsSection.title')}</h2>
            <div className="w-[90%] max-w-[300px] mt-4 mx-auto h-px" 
                 style={{ background: `linear-gradient(to right, transparent, ${activeTheme.accent}, transparent)` }}></div>
          </div>
          <p className={`${fontSize.lg} ${fontWeight.normal} max-w-3xl mx-auto mt-6`}
             style={{ color: activeTheme.textSecondary }}>
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
                <div className={`relative bg-white backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-500 h-full ${
                  isHovered 
                    ? 'shadow-xl transform -translate-y-1 border-2' 
                    : 'border border-gray-100/80 hover:shadow-xl'
                }`}
                style={{ 
                  borderColor: isHovered 
                    ? `${activeTheme.accent}80` 
                    : isHovered ? undefined : `${activeTheme.accent}30`
                }}>
                  {/* Header with icon and title side by side */}
                  <div className="relative h-20 overflow-hidden flex items-center">
                    {/* Gradient background */}
                    <div className="absolute inset-0" 
                         style={{ background: `linear-gradient(to right, ${activeTheme.accent}, ${activeTheme.accent}80)` }}></div>
                    
                    {/* Decorative circles */}
                    <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/10 -mr-20 -mt-20"></div>
                    <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-white/10 -ml-10 -mb-10"></div>
                    
                    {/* Icon container */}
                    <div className="relative z-10 ml-6 mr-4">
                      <div className={`w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-500 ${
                        isHovered ? 'scale-110 bg-white/30' : ''
                      }`}>
                        {React.cloneElement(card.icon as React.ReactElement, { 
                          className: `w-6 h-6 text-white transition-all duration-500 ${isHovered ? 'scale-110' : ''}` 
                        })}
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className={`relative z-10 ${fontSize.lg} ${fontWeight.normal} text-white drop-shadow-sm flex-1 pr-6 line-clamp-2`}>{card.title}</h3>
                  </div>
                  
                  {/* Content with subtle gradient */}
                  <div className="p-6 bg-gradient-to-b from-white to-gray-50/50 h-auto min-h-[180px] md:h-[200px] flex flex-col">
                    {/* Description with perfect typography */}
                    <p className={`${fontSize.sm} ${fontWeight.light} ${lineHeight.relaxed} flex-grow text-center md:text-left`}
                       style={{ color: activeTheme.textSecondary }}>
                      {card.description}
                    </p>
                    
                    {/* Subtle indicator */}
                    <div className={`flex items-center justify-center md:justify-end ${fontSize.xs} mt-4 transition-opacity duration-300 ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <span className={`mr-1 ${fontWeight.light}`} style={{ color: activeTheme.accent }}>Mehr erfahren</span>
                      <ArrowRight className="w-3 h-3" style={{ color: activeTheme.accent }} />
                    </div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className={`absolute -z-10 w-full h-full rounded-2xl top-2 left-2 transition-all duration-500 ${
                  isHovered ? 'opacity-70' : 'opacity-0'
                }`} style={{ backgroundColor: `${activeTheme.accent}10` }}></div>
              </div>
            );
          })}
        </div>

        {/* Elegant CTA Section */}
        <div className="mt-20 relative">
          <div className="absolute inset-0 rounded-2xl" style={{ backgroundColor: `${activeTheme.accent}05` }}></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full -mr-32 -mt-32 blur-xl"
                 style={{ backgroundColor: `${activeTheme.accent}05` }}></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full -ml-32 -mb-32 blur-xl"
                 style={{ backgroundColor: `${activeTheme.accent}05` }}></div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div className="md:w-2/3">
                <h3 className={`${fontSize.h3} ${fontWeight.normal} mb-4 text-center md:text-left`}
                    style={{ color: activeTheme.accent }}>Persönliche Beratung vereinbaren</h3>
                <p className={`${fontSize.base} ${fontWeight.normal} text-center md:text-left px-2 md:px-0`}
                   style={{ color: activeTheme.textSecondary }}>
                  Entdecken Sie, wie wir Ihnen helfen können, Ihr Selbstvertrauen zurückzugewinnen. In einem persönlichen 
                  Beratungsgespräch analysieren wir Ihre individuelle Situation und entwickeln einen maßgeschneiderten Behandlungsplan.
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center md:justify-end">
                <button className={`${buttonStyle.primary} shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]`}>
                  <span className={buttonRippleClass}></span>
                  <span className={`relative flex items-center ${textStyle.button} uppercase tracking-widest`}>
                    {t('buttons.consultation', { ns: 'common' })}
                    <ArrowRight className={`${buttonArrowClass} ml-2`} />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
