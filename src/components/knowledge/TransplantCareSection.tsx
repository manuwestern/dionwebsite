import React from 'react';
import { useTranslation } from 'react-i18next';
import { textStyle, gradientUnderline } from '../../utils/typography';
import FeatureContainer from '../common/elements/FeatureContainer';
import {
  CalendarCheck,
  HeartPulse,
  Droplets,
  Clock,
  Pill,
  Goal
} from 'lucide-react';

const TransplantCareSection: React.FC = () => {
  const { t } = useTranslation('knowledge');

  const careItems = [
    {
      icon: <CalendarCheck size={24} className="text-[#7BA7C2]" />,
      title: t('transplantCare.beforeTitle'),
      description: t('transplantCare.beforeText')
    },
    {
      icon: <HeartPulse size={24} className="text-[#7BA7C2]" />,
      title: t('transplantCare.afterTitle'),
      description: t('transplantCare.afterText')
    },
    {
      icon: <Droplets size={24} className="text-[#7BA7C2]" />,
      title: t('transplantCare.washingTitle'),
      description: t('transplantCare.washingText')
    },
    {
      icon: <Clock size={24} className="text-[#7BA7C2]" />,
      title: t('transplantCare.longTermTitle'),
      description: t('transplantCare.longTermText')
    },
    {
      icon: <Pill size={24} className="text-[#7BA7C2]" />,
      title: t('transplantCare.medicationTitle'),
      description: t('transplantCare.medicationText')
    },
    {
      icon: <Goal size={24} className="text-[#7BA7C2]" />,
      title: t('transplantCare.expectationsTitle'),
      description: t('transplantCare.expectationsText')
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
            <h2 className={`${textStyle.sectionTitle}`}>{t('transplantCare.title')}</h2>
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[350px] mt-3 mx-auto`}></div>
          </div>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-4`}>
            {t('transplantCare.subtitle')}
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

export default TransplantCareSection;
