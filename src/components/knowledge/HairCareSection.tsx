import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { textStyle, gradientUnderline, fontSize, fontWeight, textColor, lineHeight } from '../../utils/typography';
import {
  Droplets,
  Sparkles,
  Wind,
  Brush,
  Shield,
  Apple
} from 'lucide-react';

const HairCareSection: React.FC = () => {
  const { t } = useTranslation('knowledge');
  const [hoverItem, setHoverItem] = useState<string | null>(null);

  const careItems = [
    {
      id: 'washing',
      icon: <Droplets size={24} className="text-[#7BA7C2]" />,
      title: t('hairCare.washingTitle'),
      text: t('hairCare.washingText')
    },
    {
      id: 'conditioning',
      icon: <Sparkles size={24} className="text-[#7BA7C2]" />,
      title: t('hairCare.conditioningTitle'),
      text: t('hairCare.conditioningText')
    },
    {
      id: 'drying',
      icon: <Wind size={24} className="text-[#7BA7C2]" />,
      title: t('hairCare.dryingTitle'),
      text: t('hairCare.dryingText')
    },
    {
      id: 'brushing',
      icon: <Brush size={24} className="text-[#7BA7C2]" />,
      title: t('hairCare.brushingTitle'),
      text: t('hairCare.brushingText')
    },
    {
      id: 'protection',
      icon: <Shield size={24} className="text-[#7BA7C2]" />,
      title: t('hairCare.protectionTitle'),
      text: t('hairCare.protectionText')
    },
    {
      id: 'diet',
      icon: <Apple size={24} className="text-[#7BA7C2]" />,
      title: t('hairCare.dietTitle'),
      text: t('hairCare.dietText')
    }
  ];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -z-10 w-full h-full inset-0 bg-gradient-to-b from-white via-gray-50 to-white"></div>
      <div className="absolute -z-10 w-[800px] h-[800px] rounded-full bg-[#7BA7C2]/5 -top-[400px] -left-[400px] blur-3xl"></div>
      <div className="absolute -z-10 w-[600px] h-[600px] rounded-full bg-[#7BA7C2]/5 -bottom-[300px] -right-[300px] blur-3xl"></div>

      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header with elegant design */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <h2 className={`${textStyle.sectionTitle}`}>{t('hairCare.title')}</h2>
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[350px] mt-3 mx-auto`}></div>
          </div>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-4`}>
            {t('hairCare.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {careItems.map((item) => {
            const isHovered = item.id === hoverItem;

            return (
              <div
                key={item.id}
                className="group relative h-full"
                onMouseEnter={() => setHoverItem(item.id)}
                onMouseLeave={() => setHoverItem(null)}
              >
                {/* Card with glass morphism effect */}
                <div className={`relative bg-white backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-500 h-full border-2 ${
                  isHovered
                    ? 'shadow-xl transform -translate-y-1 border-[#7BA7C2]/80'
                    : 'border-gray-100/80 hover:border-[#7BA7C2]/30 hover:shadow-xl'
                }`}>
                  <div className="p-6 md:p-8 h-full flex flex-col">
                    {/* Icon and Title */}
                    <div className="flex items-center mb-6">
                      <div className={`mr-4 p-3 rounded-full transition-all duration-300 ${
                        isHovered ? 'bg-[#7BA7C2]/20' : 'bg-[#7BA7C2]/10'
                      }`}>
                        {item.icon}
                      </div>
                      <h3 className={`${fontSize.lg} ${fontWeight.medium} ${textColor.dark}`}>
                        {item.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} ${lineHeight.relaxed} flex-grow`}>
                      {item.text}
                    </p>
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
      </div>
    </section>
  );
};

export default HairCareSection;
