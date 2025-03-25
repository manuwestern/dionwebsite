import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Users, Zap, Compass, UserCheck, Clock, MapPin, ArrowRight } from 'lucide-react';

interface BenefitCard {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const BenefitsSection: React.FC = () => {
  const { t } = useTranslation(['hairTransplantation', 'common']);
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
      <div className="absolute -z-10 w-full h-full inset-0 bg-gradient-to-b from-white via-gray-50 to-white"></div>
      <div className="absolute -z-10 w-[800px] h-[800px] rounded-full bg-[#7BA7C2]/5 -top-[400px] -right-[400px] blur-3xl"></div>
      <div className="absolute -z-10 w-[600px] h-[600px] rounded-full bg-[#7BA7C2]/5 -bottom-[300px] -left-[300px] blur-3xl"></div>
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header with elegant design */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4 relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-[#7BA7C2]/10 blur-xl"></div>
            <h2 className="text-3xl font-light md:text-5xl relative">{t('benefitsSection.title')}</h2>
            <div className="h-1 bg-gradient-to-r from-[#7BA7C2] to-[#7BA7C2]/30 mt-3 mx-auto"></div>
          </div>
          <p className="text-base text-gray-600 font-light md:text-xl max-w-3xl mx-auto mt-4">
            {t('benefitsSection.subtitle')}
          </p>
        </div>

        {/* Benefits Cards Grid - Hexagonal layout for visual interest */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {benefitCards.map((card, index) => {
            const isHovered = index === hoverCard;
            
            return (
              <div 
                key={index}
                className={`relative group ${index % 3 === 1 ? 'md:mt-12' : ''}`}
                onMouseEnter={() => setHoverCard(index)}
                onMouseLeave={() => setHoverCard(null)}
              >
                {/* Card with glass morphism effect */}
                <div className={`relative bg-white backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-500 h-full ${
                  isHovered 
                    ? 'shadow-xl transform -translate-y-1 border-2 border-[#7BA7C2]/80' 
                    : 'border border-gray-100/80 hover:border-[#7BA7C2]/30 hover:shadow-xl'
                }`}>
                  {/* Icon with gradient background */}
                  <div className="relative h-32 overflow-hidden">
                    {/* Gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#7BA7C2] to-[#7BA7C2]/80"></div>
                    
                    {/* Decorative circles */}
                    <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/10 -mr-20 -mt-20"></div>
                    <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-white/10 -ml-10 -mb-10"></div>
                    
                    {/* Icon container */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-500 ${
                        isHovered ? 'scale-110 bg-white/30' : ''
                      }`}>
                        {React.cloneElement(card.icon as React.ReactElement, { 
                          className: `w-8 h-8 text-white transition-all duration-500 ${isHovered ? 'scale-110' : ''}` 
                        })}
                      </div>
                    </div>
                    
                    {/* Title overlay at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 py-3 px-6 bg-gradient-to-t from-[#7BA7C2]/90 to-transparent">
                      <h3 className="text-lg font-light text-white drop-shadow-sm">{card.title}</h3>
                    </div>
                  </div>
                  
                  {/* Content with subtle gradient */}
                  <div className="p-6 bg-gradient-to-b from-white to-gray-50/50 h-[180px] flex flex-col">
                    {/* Description with perfect typography */}
                    <p className="text-sm text-gray-600 font-light leading-relaxed flex-grow">
                      {card.description}
                    </p>
                    
                    {/* Subtle indicator */}
                    <div className={`flex items-center justify-end text-xs text-[#7BA7C2] mt-4 transition-opacity duration-300 ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <span className="mr-1 font-light">Mehr erfahren</span>
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
                <h3 className="text-2xl md:text-3xl font-light text-[#7BA7C2] mb-4">Persönliche Beratung vereinbaren</h3>
                <p className="text-gray-600 font-light">
                  Entdecken Sie, wie wir Ihnen helfen können, Ihr Selbstvertrauen zurückzugewinnen. In einem persönlichen 
                  Beratungsgespräch analysieren wir Ihre individuelle Situation und entwickeln einen maßgeschneiderten Behandlungsplan.
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center md:justify-end">
                <button className="inline-block bg-[#7BA7C2] text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300 text-base font-light tracking-wider transform hover:scale-105 hover:bg-[#6b97b2] group">
                  <span className="flex items-center">
                    {t('buttons.consultation', { ns: 'common' })}
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
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
