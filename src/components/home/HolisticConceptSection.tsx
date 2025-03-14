import React from 'react';
import { Microscope, HeartPulse, Sparkles, Stethoscope } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HolisticConceptSection: React.FC = () => {
  const { t } = useTranslation('home');

  // Icons for each concept
  const conceptIcons = [
    <Microscope className="w-8 h-8 text-gray-700" />,
    <HeartPulse className="w-8 h-8 text-gray-700" />,
    <Sparkles className="w-8 h-8 text-gray-700" />,
    <Stethoscope className="w-8 h-8 text-gray-700" />
  ];

  // Create concept cards from translation keys
  const conceptCards = Array.from(
    { length: (t('holisticConceptSection.concepts', { returnObjects: true }) as any[]).length },
    (_, index) => ({
      icon: conceptIcons[index],
      titleKey: `holisticConceptSection.concepts.${index}.title`,
      descriptionKey: `holisticConceptSection.concepts.${index}.description`,
      quoteKey: `holisticConceptSection.concepts.${index}.quote`
    })
  );

  return (
    <div className="bg-gray-100 w-full py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light mb-3 md:text-5xl md:mb-4">{t('holisticConceptSection.title')}</h2>
          <p className="text-base text-gray-600 font-light md:text-xl">
            {t('holisticConceptSection.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {conceptCards.map((card, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg text-center hover:transform hover:scale-105 transition-transform duration-300 flex flex-col h-full">
              {/* Top section with icon and title */}
              <div>
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center">
                  {card.icon}
                </div>
                <h3 className="text-xl font-light mb-3">{t(card.titleKey)}</h3>
              </div>
              
              {/* Middle section with description - flex-grow to push footer to bottom */}
              <div className="flex-grow flex flex-col">
                <p className="text-gray-600 font-light mb-4">
                  {t(card.descriptionKey)}
                </p>
              </div>
              
              {/* Footer section with divider and quote - fixed at bottom */}
              <div className="mt-auto pt-4">
                <div className="w-12 h-0.5 bg-gray-200 mx-auto mb-4"></div>
                <p className="text-sm text-gray-500 font-light italic h-12 flex items-center justify-center">
                  "{t(card.quoteKey)}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HolisticConceptSection;
