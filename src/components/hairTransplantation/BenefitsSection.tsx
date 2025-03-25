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

  // Icons for each benefit
  const benefitIcons = [
    <Users className="w-6 h-6 text-white" />,
    <Zap className="w-6 h-6 text-white" />,
    <Compass className="w-6 h-6 text-white" />,
    <UserCheck className="w-6 h-6 text-white" />,
    <Clock className="w-6 h-6 text-white" />,
    <MapPin className="w-6 h-6 text-white" />
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
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light mb-3 md:text-5xl md:mb-4">{t('benefitsSection.title')}</h2>
          <p className="text-base text-gray-600 font-light md:text-xl max-w-3xl mx-auto">
            {t('benefitsSection.subtitle')}
          </p>
        </div>

        {/* Benefits Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefitCards.map((card, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100 h-full"
              data-exclude-from-effect="true"
            >
              <div className="flex h-full">
                {/* Gray placeholder image with icon - takes up 25% of the card width */}
                <div className="w-1/4 bg-gray-300 flex flex-col items-center justify-center">
                  {/* Icon in circle */}
                  <div className="w-12 h-12 rounded-full bg-[#333333] flex items-center justify-center mb-2">
                    {card.icon}
                  </div>
                  {/* Number indicator */}
                  <span className="text-white text-sm font-light">{index + 1}</span>
                </div>
                
                {/* Content */}
                <div className="w-3/4 p-5">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-600 font-light">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <button className="inline-block bg-[#333333] text-white px-8 py-3 rounded-lg hover:bg-[#444444] transition-colors text-sm font-light tracking-wider">
            {t('buttons.consultation', { ns: 'common' })}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
