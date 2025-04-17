import React from 'react';
import { useTranslation } from 'react-i18next';
import { textStyle, gradientUnderline } from '../../utils/typography';
import FeatureContainer from '../common/elements/FeatureContainer';
import {
  Dna,
  FlaskConical,
  Pill,
  Salad,
  Brain,
  Stethoscope
} from 'lucide-react';

const HairLossCausesSection: React.FC = () => {
  const { t } = useTranslation('knowledge');

  const causes = [
    {
      icon: <Dna size={24} className="text-[#7BA7C2]" />,
      title: t('hairLossCauses.geneticTitle'),
      description: t('hairLossCauses.geneticText')
    },
    {
      icon: <FlaskConical size={24} className="text-[#7BA7C2]" />,
      title: t('hairLossCauses.hormonalTitle'),
      description: t('hairLossCauses.hormonalText')
    },
    {
      icon: <Stethoscope size={24} className="text-[#7BA7C2]" />,
      title: t('hairLossCauses.medicalTitle'),
      description: t('hairLossCauses.medicalText')
    },
    {
      icon: <Salad size={24} className="text-[#7BA7C2]" />,
      title: t('hairLossCauses.nutritionalTitle'),
      description: t('hairLossCauses.nutritionalText')
    },
    {
      icon: <Brain size={24} className="text-[#7BA7C2]" />,
      title: t('hairLossCauses.stressTitle'),
      description: t('hairLossCauses.stressText')
    },
    {
      icon: <Pill size={24} className="text-[#7BA7C2]" />,
      title: t('hairLossCauses.medicationTitle'),
      description: t('hairLossCauses.medicationText')
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
            <h2 className={`${textStyle.sectionTitle}`}>{t('hairLossCauses.title')}</h2>
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[350px] mt-3 mx-auto`}></div>
          </div>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-4`}>
            {t('hairLossCauses.subtitle')}
          </p>
        </div>

        <FeatureContainer
          title=""
          features={causes}
          accentColor="#7BA7C2"
          backgroundColor="bg-white"
          columns={2}
        />
      </div>
    </section>
  );
};

export default HairLossCausesSection;
