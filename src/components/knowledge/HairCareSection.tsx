import React from 'react';
import { useTranslation } from 'react-i18next';
import { textStyle, gradientUnderline } from '../../utils/typography';
import FeatureContainer from '../common/elements/FeatureContainer';
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

  const careItems = [
    {
      icon: <Droplets size={24} className="text-[#7BA7C2]" />,
      title: t('hairCare.washingTitle'),
      description: t('hairCare.washingText')
    },
    {
      icon: <Sparkles size={24} className="text-[#7BA7C2]" />,
      title: t('hairCare.conditioningTitle'),
      description: t('hairCare.conditioningText')
    },
    {
      icon: <Wind size={24} className="text-[#7BA7C2]" />,
      title: t('hairCare.dryingTitle'),
      description: t('hairCare.dryingText')
    },
    {
      icon: <Brush size={24} className="text-[#7BA7C2]" />,
      title: t('hairCare.brushingTitle'),
      description: t('hairCare.brushingText')
    },
    {
      icon: <Shield size={24} className="text-[#7BA7C2]" />,
      title: t('hairCare.protectionTitle'),
      description: t('hairCare.protectionText')
    },
    {
      icon: <Apple size={24} className="text-[#7BA7C2]" />,
      title: t('hairCare.dietTitle'),
      description: t('hairCare.dietText')
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

        <FeatureContainer
          title=""
          features={careItems}
          accentColor="#7BA7C2"
          backgroundColor="bg-white"
          columns={2}
        />
      </div>
    </section>
  );
};

export default HairCareSection;
