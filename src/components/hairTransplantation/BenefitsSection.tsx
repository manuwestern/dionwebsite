import React from 'react';
import { useTranslation } from 'react-i18next';
import { Users, Zap, Compass, UserCheck, Clock, MapPin } from 'lucide-react';

interface BenefitCard {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const BenefitsSection: React.FC = () => {
  const { t } = useTranslation(['hairTransplantation', 'common']);

  // Icons for each benefit with accent color
  const benefitIcons = [
    <Users className="w-8 h-8 text-white" />,
    <Zap className="w-8 h-8 text-white" />,
    <Compass className="w-8 h-8 text-white" />,
    <UserCheck className="w-8 h-8 text-white" />,
    <Clock className="w-8 h-8 text-white" />,
    <MapPin className="w-8 h-8 text-white" />
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
    <div className="bg-white py-16 md:py-24 relative">
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-5 z-0" 
        style={{ 
          backgroundImage: 'url("/images/dionhairclinic_bg.svg")',
          backgroundSize: '200px',
          backgroundRepeat: 'repeat'
        }}
      ></div>
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light mb-3 md:text-5xl md:mb-4">{t('benefitsSection.title')}</h2>
          <p className="text-base text-gray-600 font-light md:text-xl max-w-3xl mx-auto">
            {t('benefitsSection.subtitle')}
          </p>
        </div>

        {/* Benefits Cards Grid - Staggered layout for visual interest */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {benefitCards.map((card, index) => (
            <div 
              key={index}
              className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100 h-full transform hover:-translate-y-1 ${index % 3 === 1 ? 'md:mt-6' : ''}`}
              data-exclude-from-effect="true"
            >
              <div className="flex flex-col h-full">
                {/* Gradient header with icon and title in the same row */}
                <div className="w-full p-4 bg-gradient-to-r from-[#7BA7C2] to-[#7BA7C2]/70 flex items-center">
                  {/* Icon in white circle */}
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-3 flex-shrink-0">
                    {React.cloneElement(card.icon as React.ReactElement, { className: "w-5 h-5 text-white" })}
                  </div>
                  {/* Title */}
                  <h3 className="text-lg font-light text-white">{card.title}</h3>
                </div>
                
                {/* Content with subtle pattern background */}
                <div className="p-6 flex-grow bg-gradient-to-b from-gray-50 to-white relative">
                  {/* Subtle pattern background */}
                  <div className="absolute inset-0 opacity-5" 
                    style={{ 
                      backgroundImage: 'url("/images/dionhairclinic_bg.svg")',
                      backgroundSize: '100px',
                      backgroundRepeat: 'repeat'
                    }}>
                  </div>
                  {/* Description text */}
                  <p className="text-sm text-gray-600 font-light leading-relaxed relative z-10">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button with t-shirt color */}
        <div className="mt-16 text-center">
          <button className="inline-block bg-[#7BA7C2] text-white px-10 py-4 rounded-lg hover:shadow-lg transition-all duration-300 text-base font-light tracking-wider transform hover:scale-105">
            {t('buttons.consultation', { ns: 'common' })}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
