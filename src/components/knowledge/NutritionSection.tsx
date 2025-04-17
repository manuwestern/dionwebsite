import React from 'react';
import { useTranslation } from 'react-i18next';
import { textStyle, gradientUnderline } from '../../utils/typography';
import FeatureContainer from '../common/elements/FeatureContainer';
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

  const nutritionItems = [
    {
      icon: <Beef size={24} className="text-[#7BA7C2]" />,
      title: t('nutrition.proteinTitle'),
      description: t('nutrition.proteinText')
    },
    {
      icon: <Egg size={24} className="text-[#7BA7C2]" />,
      title: t('nutrition.ironTitle'),
      description: t('nutrition.ironText')
    },
    {
      icon: <Fish size={24} className="text-[#7BA7C2]" />,
      title: t('nutrition.zincTitle'),
      description: t('nutrition.zincText')
    },
    {
      icon: <Carrot size={24} className="text-[#7BA7C2]" />,
      title: t('nutrition.biotinTitle'),
      description: t('nutrition.biotinText')
    },
    {
      icon: <Citrus size={24} className="text-[#7BA7C2]" />,
      title: t('nutrition.vitaminCTitle'),
      description: t('nutrition.vitaminCText')
    },
    {
      icon: <Sun size={24} className="text-[#7BA7C2]" />,
      title: t('nutrition.vitaminDTitle'),
      description: t('nutrition.vitaminDText')
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

        <FeatureContainer
          title=""
          features={nutritionItems}
          accentColor="#7BA7C2"
          backgroundColor="bg-white"
          columns={2}
        />
      </div>
    </section>
  );
};

export default NutritionSection;
