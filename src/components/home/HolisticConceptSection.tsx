import React from 'react';
import { Microscope, HeartPulse, Sparkles, Stethoscope, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HolisticConceptSection: React.FC = () => {
  const { t } = useTranslation('home');

  // Icons for each concept
  const conceptIcons = [
    <Microscope className="w-10 h-10 text-[#333333]" />,
    <HeartPulse className="w-10 h-10 text-[#333333]" />,
    <Sparkles className="w-10 h-10 text-[#333333]" />,
    <Stethoscope className="w-10 h-10 text-[#333333]" />
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
    <div className="bg-gradient-to-b from-gray-50 to-white w-full py-16 md:py-28">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light mb-4 md:text-5xl md:mb-6">{t('holisticConceptSection.title')}</h2>
          <div className="w-24 h-1 bg-[#333333] mx-auto mb-6"></div>
          <p className="text-base text-gray-600 font-light md:text-xl max-w-3xl mx-auto">
            {t('holisticConceptSection.subtitle')}
          </p>
        </div>

        {/* Main Content - Visual + Text */}
        <div className="flex flex-col lg:flex-row items-center mb-16 gap-8 lg:gap-16">
          {/* Left side - Simple image without shadow or border */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="w-full max-w-md overflow-hidden">
              <img 
                src="/images/Dion_Model_Home.webp" 
                alt="Dion Hair Clinic - Ganzheitliches Konzept" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          
          {/* Right side - Text description */}
          <div className="w-full lg:w-1/2">
            <p className="text-lg text-gray-700 font-light mb-8 leading-relaxed">
              {t('holisticConceptSection.description')}
            </p>
            
            <div className="space-y-4">
              {conceptCards.map((card, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#333333] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-medium mb-1">{t(card.titleKey)}</h4>
                    <p className="text-gray-600 font-light">{t(card.descriptionKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* No cards at the bottom as requested */}
      </div>
    </div>
  );
};

export default HolisticConceptSection;
