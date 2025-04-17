import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Users, Zap, Compass, UserCheck, Clock, MapPin } from 'lucide-react';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline } from '../../utils/typography';
import FeatureBenefitCard from './elements/FeatureBenefitCard';
import CTASection from './elements/CTASection';

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
              <FeatureBenefitCard
                title={card.title}
                description={card.description}
                icon={card.icon}
                index={index}
                hoverCard={hoverCard}
                setHoverCard={setHoverCard}
                accentColor="bg-[#7BA7C2]"
              />
            </div>
          ))}
        </div>

        {/* Use the reusable CTASection component */}
        {showCTA && (
          <div className="mt-24">
            <CTASection 
              translationNamespace={translationNamespace}
              titleKey="benefitsSection.cta.title"
              descriptionKey="benefitsSection.cta.description"
              ctaTextKey="buttons.consultation"
              ctaLink={ctaLink}
              backgroundColor="bg-white/90"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default BenefitsSectionComponent;
