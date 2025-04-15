import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Users, Zap, Compass, UserCheck, Clock, MapPin, ArrowRight } from 'lucide-react';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, tracking, lineHeight } from '../../utils/typography';
import { buttonStyle, buttonRippleClass, buttonArrowClass } from '../../utils/buttons';
import CollapsibleBenefitCard from '../common/CollapsibleBenefitCard';

interface BenefitCard {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const BenefitsSection: React.FC = () => {
  const { t } = useTranslation(['home', 'common']);
  const [hoverCard, setHoverCard] = useState<number | null>(null);

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
            <h2 className={`${textStyle.sectionTitle}`} lang="de">{t('benefitsSection.title')}</h2>
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[300px] mt-6 mx-auto`}></div>
          </div>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-6`} lang="de">
            {t('benefitsSection.subtitle')}
          </p>
        </div>

        {/* Benefits Cards Grid - Equal height cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {benefitCards.map((card, index) => (
            <CollapsibleBenefitCard
              key={index}
              title={card.title}
              description={card.description}
              icon={card.icon}
              index={index}
              hoverCard={hoverCard}
              setHoverCard={setHoverCard}
            />
          ))}
        </div>

        
      </div>
    </section>
  );
};

export default BenefitsSection;
