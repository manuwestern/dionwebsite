import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { textStyle, gradientUnderline, fontSize, fontWeight, textColor, lineHeight } from '../../utils/typography';
import {
  Beef,
  Egg,
  Fish,
  Carrot,
  Citrus,
  Sun
} from 'lucide-react';

const NutritionSection: React.FC = () => {
  const { t } = useTranslation('knowledge');
  const [hoverItem, setHoverItem] = useState<string | null>(null);

  const nutritionItems = [
    {
      id: 'protein',
      icon: <Beef size={24} className="text-[#7BA7C2]" />,
      title: t('nutrition.proteinTitle'),
      text: t('nutrition.proteinText')
    },
    {
      id: 'iron',
      icon: <Egg size={24} className="text-[#7BA7C2]" />,
      title: t('nutrition.ironTitle'),
      text: t('nutrition.ironText')
    },
    {
      id: 'zinc',
      icon: <Fish size={24} className="text-[#7BA7C2]" />,
      title: t('nutrition.zincTitle'),
      text: t('nutrition.zincText')
    },
    {
      id: 'biotin',
      icon: <Carrot size={24} className="text-[#7BA7C2]" />,
      title: t('nutrition.biotinTitle'),
      text: t('nutrition.biotinText')
    },
    {
      id: 'vitaminC',
      icon: <Citrus size={24} className="text-[#7BA7C2]" />,
      title: t('nutrition.vitaminCTitle'),
      text: t('nutrition.vitaminCText')
    },
    {
      id: 'vitaminD',
      icon: <Sun size={24} className="text-[#7BA7C2]" />,
      title: t('nutrition.vitaminDTitle'),
      text: t('nutrition.vitaminDText')
    }
  ];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -z-10 w-full h-full inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50"></div>
      <div className="absolute -z-10 w-[800px] h-[800px] rounded-full bg-[#7BA7C2]/5 -top-[400px] -right-[400px] blur-3xl"></div>
      <div className="absolute -z-10 w-[600px] h-[600px] rounded-full bg-[#7BA7C2]/5 -bottom-[300px] -left-[300px] blur-3xl"></div>

      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header with elegant design */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <h2 className={`${textStyle.sectionTitle}`}>{t('nutrition.title')}</h2>
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[350px] mt-3 mx-auto`}></div>
          </div>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-4`}>
            {t('nutrition.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {nutritionItems.map((item) => {
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

export default NutritionSection;
