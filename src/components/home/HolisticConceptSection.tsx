import React, { useEffect, useState } from 'react';
import { Microscope, HeartPulse, Sparkles, Stethoscope, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const HolisticConceptSection: React.FC = () => {
  const { t } = useTranslation('home');
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div className="relative w-full py-16 md:py-28 overflow-hidden min-h-[800px] flex items-center">
      {/* Background image - fixed position without parallax for better compatibility */}
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: 'url("/images/bg_abstrakt.webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          opacity: 0.9
        }}
      ></div>
      
      {/* Overlay to ensure content readability */}
      <div className="absolute inset-0 bg-white bg-opacity-40 z-1"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light mb-3 md:text-5xl md:mb-4">{t('holisticConceptSection.title')}</h2>
          <p className="text-base text-gray-600 font-light md:text-xl max-w-3xl mx-auto">
            {t('holisticConceptSection.subtitle')}
          </p>
        </div>

        {/* Main Content - Visual + Text */}
        <div className="flex flex-col lg:flex-row items-center mb-16 gap-8 lg:gap-16">
          {/* Left side - Simple image without decorative elements */}
          <div className="w-full lg:w-1/2">
            <img 
              src="/images/Dion_Model_Benefits.png" 
              alt="Dion Hair Clinic - Ganzheitliches Konzept" 
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
          
          {/* Right side - Text description */}
          <div className="w-full lg:w-1/2">
            <p className="text-base md:text-lg text-gray-700 font-light mb-8 leading-relaxed">
              {t('holisticConceptSection.description')}
            </p>
            
            <div className="space-y-4">
              {conceptCards.map((card, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-[#333333] mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-light mb-1">{t(card.titleKey)}</h4>
                    <p className="text-base text-gray-600 font-light">{t(card.descriptionKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolisticConceptSection;
