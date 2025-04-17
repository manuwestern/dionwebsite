import React from 'react';
import { useTranslation } from 'react-i18next';
import { textStyle, gradientUnderline } from '../../utils/typography';
import FeatureContainer from '../common/elements/FeatureContainer';
import {
  ArrowUpRight,
  Hourglass,
  Hash,
  Weight,
  Scissors,
  Zap
} from 'lucide-react';

const HairFactsSection: React.FC = () => {
  const { t } = useTranslation('knowledge');

  const facts = [
    {
      icon: <ArrowUpRight size={24} className="text-[#7BA7C2]" />,
      title: t('hairFacts.fact1Title'),
      description: t('hairFacts.fact1Text')
    },
    {
      icon: <Hourglass size={24} className="text-[#7BA7C2]" />,
      title: t('hairFacts.fact2Title'),
      description: t('hairFacts.fact2Text')
    },
    {
      icon: <Hash size={24} className="text-[#7BA7C2]" />,
      title: t('hairFacts.fact3Title'),
      description: t('hairFacts.fact3Text')
    },
    {
      icon: <Weight size={24} className="text-[#7BA7C2]" />,
      title: t('hairFacts.fact4Title'),
      description: t('hairFacts.fact4Text')
    },
    {
      icon: <Scissors size={24} className="text-[#7BA7C2]" />,
      title: t('hairFacts.fact5Title'),
      description: t('hairFacts.fact5Text')
    },
    {
      icon: <Zap size={24} className="text-[#7BA7C2]" />,
      title: t('hairFacts.fact6Title'),
      description: t('hairFacts.fact6Text')
    }
  ];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -z-10 w-full h-full inset-0 bg-gradient-to-b from-white via-gray-50 to-white"></div>
      <div className="absolute -z-10 w-[800px] h-[800px] rounded-full bg-[#7BA7C2]/5 -top-[400px] -right-[400px] blur-3xl"></div>
      <div className="absolute -z-10 w-[600px] h-[600px] rounded-full bg-[#7BA7C2]/5 -bottom-[300px] -left-[300px] blur-3xl"></div>

      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header with elegant design */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <h2 className={`${textStyle.sectionTitle}`}>{t('hairFacts.title')}</h2>
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[350px] mt-3 mx-auto`}></div>
          </div>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-4`}>
            {t('hairFacts.subtitle')}
          </p>
        </div>

        <FeatureContainer
          title=""
          features={facts}
          accentColor="#7BA7C2"
          backgroundColor="bg-white"
          columns={2}
        />
      </div>
    </section>
  );
};

export default HairFactsSection;
