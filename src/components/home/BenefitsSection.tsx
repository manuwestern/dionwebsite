import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Users, Zap, Compass, UserCheck, Clock, MapPin, ArrowRight } from 'lucide-react';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, tracking, lineHeight } from '../../utils/typography';
import { buttonStyle, buttonRippleClass, buttonArrowClass } from '../../utils/buttons';

interface BenefitCard {
  title: string;
  description: string;
  shortDescription: string;
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

  // Function to get shorter descriptions for mobile view
  const getShorterDescription = (fullDescription: string, index: number): string => {
    // Predefined shorter descriptions for mobile view
    const shortDescriptions = [
      "Hochqualifizierte Spezialisten mit jahrelanger Erfahrung in Haar-, Bart- und Augenbrauentransplantationen.",
      "Innovative Techniken wie Saphir-FUE und DHI für präzisere Ergebnisse und natürlicheres Aussehen.",
      "Ganzheitlicher 360°-Ansatz mit umfassender Analyse, Ernährungsberatung und ergänzenden Behandlungen.",
      "Maßgeschneiderte Behandlungspläne für Ihre spezifischen Bedürfnisse und persönlichen Wünsche.",
      "Begleitung nach dem Eingriff mit regelmäßigen Kontrollterminen für langfristig beste Resultate.",
      "Höchste medizinische Standards in Deutschland ohne Sprachbarrieren oder lange Reisen."
    ];
    
    return shortDescriptions[index] || fullDescription;
  };

  // Create benefit cards from translation keys
  const benefitCards: BenefitCard[] = Array.from(
    { length: (t('benefitsSection.cards', { returnObjects: true }) as any[]).length },
    (_, index) => {
      const fullDescription = t(`benefitsSection.cards.${index}.description`);
      return {
        title: t(`benefitsSection.cards.${index}.title`),
        description: fullDescription,
        shortDescription: getShorterDescription(fullDescription, index),
        icon: benefitIcons[index]
      };
    }
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
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-6`}>
            {t('benefitsSection.subtitle')}
          </p>
        </div>

        {/* Mobile View - Only visible on small screens */}
        <div className="md:hidden grid grid-cols-2 gap-4">
          {benefitCards.map((card, index) => (
            <div key={index} className="relative">
              {/* Mobile card design with centered icon */}
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg h-full border border-gray-100/80">
                {/* Elegant top section with centered icon */}
                <div className="pt-5 pb-2 px-3 text-center relative">
                  {/* Decorative background elements */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7BA7C2]/5 to-transparent"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#7BA7C2]/5 -mr-16 -mt-16 blur-md"></div>
                  
                  {/* Premium icon container with subtle shadow and glow */}
                  <div className="relative inline-flex mb-2">
                    <div className="absolute inset-0 rounded-full bg-[#7BA7C2]/20 blur-md transform scale-110"></div>
                    <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-[#7BA7C2] to-[#7BA7C2]/80 flex items-center justify-center shadow-lg">
                      {React.cloneElement(card.icon as React.ReactElement, { 
                        className: "w-6 h-6 text-white"
                      })}
                    </div>
                  </div>
                  
                  {/* Title with elegant typography */}
                  <h3 className={`relative z-10 text-sm ${fontWeight.medium} ${textColor.primary} mb-1 line-clamp-1`}>
                    {card.title}
                  </h3>
                  
                  {/* Subtle divider */}
                  <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#7BA7C2]/30 to-transparent mx-auto"></div>
                </div>
                
                {/* Content with subtle gradient background and fixed height */}
                <div className="p-3 bg-gradient-to-b from-white to-gray-50/50 flex flex-col h-[120px]">
                  {/* Description with perfect typography - shorter version for mobile */}
                  <p className={`${fontSize.xs} ${textColor.medium} ${fontWeight.light} ${lineHeight.relaxed} text-center`}>
                    {card.shortDescription}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View - Hidden on small screens, grid layout on medium and up */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-10">
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
                  {/* Header with icon and title side by side */}
                  <div className="relative h-20 overflow-hidden flex items-center">
                    {/* Gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#7BA7C2] to-[#7BA7C2]/80"></div>
                    
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
                    <h3 className={`relative z-10 ${fontSize.lg} ${fontWeight.normal} ${textColor.white} drop-shadow-sm flex-1 pr-6 line-clamp-2`}>{card.title}</h3>
                  </div>
                  
                  {/* Content with subtle gradient */}
                  <div className="p-6 bg-gradient-to-b from-white to-gray-50/50 h-auto flex flex-col">
                    {/* Description with perfect typography */}
                    <p className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} ${lineHeight.relaxed} text-center md:text-left`}>
                      {card.description}
                    </p>
                  </div>
                </div>
                
                {/* Decorative shadow element */}
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
                <h3 className={`${fontSize.h3} ${fontWeight.normal} ${textColor.primary} mb-4 text-center md:text-left`}>{t('benefits.personalConsultation', { ns: 'common' })}</h3>
                <p className={`${textStyle.bodyText} text-center md:text-left px-2 md:px-0`}>
                  {t('benefits.personalConsultationText', { ns: 'common' })}
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center md:justify-end">
                <Link to="/kontakt" className={`${buttonStyle.primary} shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]`}>
                  <span className={buttonRippleClass}></span>
                  <span className={`relative flex items-center ${textStyle.button} uppercase tracking-widest`}>
                    {t('buttons.consultation', { ns: 'common' })}
                    <ArrowRight className={`${buttonArrowClass} ml-2`} />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
