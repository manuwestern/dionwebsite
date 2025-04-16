import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Users, Zap, Compass, UserCheck, Clock, MapPin, ArrowRight } from 'lucide-react';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, tracking, lineHeight } from '../../utils/typography';
import { buttonStyle, buttonRippleClass, buttonArrowClass } from '../../utils/buttons';
import StaticBenefitCard from './elements/StaticBenefitCard';

interface BenefitCard {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface BenefitsSectionComponentProps {
  translationNamespace: string;
  showCTA?: boolean;
  ctaLink?: string;
  customIcons?: React.ReactNode[];
}

const BenefitsSectionComponent: React.FC<BenefitsSectionComponentProps> = ({
  translationNamespace,
  showCTA = true,
  ctaLink = '/kontakt',
  customIcons
}) => {
  const { t } = useTranslation([translationNamespace, 'common']);
  const [hoverCard, setHoverCard] = useState<number | null>(null);

  // Default icons for each benefit
  const defaultIcons = [
    <Users strokeWidth={1.5} />,
    <Zap strokeWidth={1.5} />,
    <Compass strokeWidth={1.5} />,
    <UserCheck strokeWidth={1.5} />,
    <Clock strokeWidth={1.5} />,
    <MapPin strokeWidth={1.5} />
  ];

  // Use custom icons if provided, otherwise use default icons
  const benefitIcons = customIcons || defaultIcons;

  // Get benefits from translation
  const benefitCards: BenefitCard[] = (t('benefitsSection.cards', { returnObjects: true }) as any[]).map(
    (card: any, index: number) => ({
      title: card.title || t(`benefitsSection.cards.${index}.title`),
      description: card.description || t(`benefitsSection.cards.${index}.description`),
      icon: benefitIcons[index % benefitIcons.length]
    })
  );

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -z-10 w-full h-full inset-0 bg-gradient-to-b from-white via-gray-50 to-white"></div>
      <div className="absolute -z-10 w-[800px] h-[800px] rounded-full bg-[#7BA7C2]/5 -top-[400px] -right-[400px] blur-3xl"></div>
      <div className="absolute -z-10 w-[600px] h-[600px] rounded-full bg-[#7BA7C2]/5 -bottom-[300px] -left-[300px] blur-3xl"></div>
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header with elegant design */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6 relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-[#7BA7C2]/10 blur-xl"></div>
            <h2 className={`${textStyle.sectionTitle}`} lang="de">{t('benefitsSection.title')}</h2>
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[300px] mt-4 mx-auto`}></div>
          </div>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-6`} lang="de">
            {t('benefitsSection.subtitle')}
          </p>
        </div>

        {/* Enhanced Benefits Cards Grid with improved spacing and staggered animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {benefitCards.map((card, index) => (
            <div 
              key={index} 
              className="transform transition-all duration-700 hover:z-10"
              style={{ 
                animationDelay: `${index * 100}ms`,
                transitionDelay: `${index * 50}ms` 
              }}
            >
              <StaticBenefitCard
                title={card.title}
                description={card.description}
                icon={card.icon}
                index={index}
                hoverCard={hoverCard}
                setHoverCard={setHoverCard}
              />
            </div>
          ))}
        </div>

        {/* Enhanced Elegant CTA Section with improved visual design */}
        {showCTA && (
          <div className="mt-24 relative">
            {/* Improved background with subtle gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#7BA7C2]/10 to-[#7BA7C2]/5 rounded-2xl"></div>
            
            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 md:p-12 
              shadow-xl border border-gray-100/80 overflow-hidden">
              {/* Enhanced decorative elements */}
              <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gradient-to-br from-[#7BA7C2]/10 to-transparent -mr-40 -mt-40 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gradient-to-tr from-[#7BA7C2]/10 to-transparent -ml-40 -mb-40 blur-2xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-white/30 blur-3xl -z-10"></div>
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
                <div className="md:w-2/3">
                  <h3 className={`${fontSize.h3} ${fontWeight.normal} ${textColor.primary} mb-5 text-center md:text-left
                    relative inline-block`}>
                    {t('benefitsSection.cta.title')}
                    <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-[#7BA7C2]/50 hidden md:block"></div>
                  </h3>
                  <p className={`${textStyle.bodyText} text-center md:text-left px-2 md:px-0 max-w-xl`}>
                    {t('benefitsSection.cta.description')}
                  </p>
                </div>
                <div className="md:w-1/3 flex justify-center md:justify-end">
                  <Link 
                    to={ctaLink} 
                    className={`${buttonStyle.primary} shadow-lg hover:shadow-xl 
                      transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]
                      relative overflow-hidden group`}
                  >
                    <span className={buttonRippleClass}></span>
                    {/* Subtle background animation on hover */}
                    <span className="absolute inset-0 bg-gradient-to-r from-[#7BA7C2]/20 to-transparent 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                    <span className={`relative flex items-center ${textStyle.button}`}>
                      {t('buttons.consultation', { ns: 'common' })}
                      <ArrowRight className={`${buttonArrowClass} ml-2 group-hover:translate-x-1 transition-transform duration-300`} />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BenefitsSectionComponent;
