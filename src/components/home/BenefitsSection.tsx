import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Users, Zap, Compass, UserCheck, Clock, MapPin, ArrowRight } from 'lucide-react';
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

  // Icons for each benefit
  const benefitIcons = [
    <Users strokeWidth={1.5} />,
    <Zap strokeWidth={1.5} />,
    <Compass strokeWidth={1.5} />,
    <UserCheck strokeWidth={1.5} />,
    <Clock strokeWidth={1.5} />,
    <MapPin strokeWidth={1.5} />
  ];

  // Create benefit cards with more general content covering all treatment areas
  const benefitCards: BenefitCard[] = [
    {
      title: "Erfahrenes Expertenteam",
      description: "Unser Team besteht aus hochqualifizierten Spezialisten mit jahrelanger Erfahrung in Haar-, Bart- und Augenbrauentransplantationen, die regelmäßig an Fortbildungen teilnehmen.",
      icon: benefitIcons[0]
    },
    {
      title: "Modernste Verfahren",
      description: "Wir setzen auf innovative Techniken wie Saphir-FUE und DHI, die präzisere Ergebnisse, schnellere Heilung und ein natürlicheres Aussehen bei allen Transplantationsarten ermöglichen.",
      icon: benefitIcons[1]
    },
    {
      title: "Ganzheitliches Konzept",
      description: "Unser 360°-Ansatz umfasst nicht nur die Transplantation, sondern auch eine umfassende Analyse, Ernährungsberatung und ergänzende Behandlungen für optimale Ergebnisse.",
      icon: benefitIcons[2]
    },
    {
      title: "Individuelle Beratung",
      description: "Jeder Patient erhält einen maßgeschneiderten Behandlungsplan, der auf seine spezifischen Bedürfnisse, Haarstruktur und persönlichen Wünsche abgestimmt ist.",
      icon: benefitIcons[3]
    },
    {
      title: "Langzeitnachsorge",
      description: "Wir begleiten Sie auch nach dem Eingriff mit regelmäßigen Kontrollterminen und unterstützenden Behandlungen für langfristig beste Resultate in allen Behandlungsbereichen.",
      icon: benefitIcons[4]
    },
    {
      title: "Keine Auslandsreise nötig",
      description: "Genießen Sie höchste medizinische Standards in Deutschland ohne Sprachbarrieren, lange Reisen oder Risiken durch mangelnde Nachsorge im Ausland.",
      icon: benefitIcons[5]
    }
  ];

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
                    ? 'shadow-xl transform -translate-y-1 border-2 border-[#7BA7C2]/80' 
                    : 'border border-gray-100/80 hover:border-[#7BA7C2]/30 hover:shadow-xl'
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
                  
                  {/* Content with subtle gradient - removed fixed height to ensure text is fully visible */}
                  <div className="p-6 bg-gradient-to-b from-white to-gray-50/50 h-auto flex flex-col">
                    {/* Description with perfect typography */}
                    <p className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} ${lineHeight.relaxed} text-center md:text-left`}>
                      {card.description}
                    </p>
                    
                    {/* Subtle indicator */}
                    <div className={`flex items-center justify-center md:justify-end ${fontSize.xs} ${textColor.primary} mt-4 transition-opacity duration-300 ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <span className={`mr-1 ${fontWeight.light}`}>Mehr erfahren</span>
                      <ArrowRight className="w-3 h-3" />
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
                <h3 className={`${fontSize.h3} ${fontWeight.normal} ${textColor.primary} mb-4 text-center md:text-left`}>Persönliche Beratung vereinbaren</h3>
                <p className={`${textStyle.bodyText} text-center md:text-left px-2 md:px-0`}>
                  Entdecken Sie, wie wir Ihnen helfen können, Ihr Selbstvertrauen zurückzugewinnen. In einem persönlichen 
                  Beratungsgespräch analysieren wir Ihre individuelle Situation und entwickeln einen maßgeschneiderten Behandlungsplan 
                  für Haare, Bart oder Augenbrauen.
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
