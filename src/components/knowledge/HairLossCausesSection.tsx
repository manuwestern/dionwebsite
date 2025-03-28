import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { textStyle, gradientUnderline, fontSize, fontWeight, textColor, lineHeight } from '../../utils/typography';
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
  const [hoverCause, setHoverCause] = useState<string | null>(null);

  const causes = [
    {
      id: 'genetic',
      icon: <Dna size={24} className="text-[#7BA7C2]" />,
      title: t('hairLossCauses.geneticTitle'),
      text: t('hairLossCauses.geneticText')
    },
    {
      id: 'hormonal',
      icon: <FlaskConical size={24} className="text-[#7BA7C2]" />,
      title: t('hairLossCauses.hormonalTitle'),
      text: t('hairLossCauses.hormonalText')
    },
    {
      id: 'medical',
      icon: <Stethoscope size={24} className="text-[#7BA7C2]" />,
      title: t('hairLossCauses.medicalTitle'),
      text: t('hairLossCauses.medicalText')
    },
    {
      id: 'nutritional',
      icon: <Salad size={24} className="text-[#7BA7C2]" />,
      title: t('hairLossCauses.nutritionalTitle'),
      text: t('hairLossCauses.nutritionalText')
    },
    {
      id: 'stress',
      icon: <Brain size={24} className="text-[#7BA7C2]" />,
      title: t('hairLossCauses.stressTitle'),
      text: t('hairLossCauses.stressText')
    },
    {
      id: 'medication',
      icon: <Pill size={24} className="text-[#7BA7C2]" />,
      title: t('hairLossCauses.medicationTitle'),
      text: t('hairLossCauses.medicationText')
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {causes.map((cause) => {
            const isHovered = cause.id === hoverCause;

            return (
              <div
                key={cause.id}
                className="group relative h-full"
                onMouseEnter={() => setHoverCause(cause.id)}
                onMouseLeave={() => setHoverCause(null)}
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
                        {cause.icon}
                      </div>
                      <h3 className={`${fontSize.lg} ${fontWeight.medium} ${textColor.dark}`}>
                        {cause.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} ${lineHeight.relaxed} flex-grow`}>
                      {cause.text}
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

export default HairLossCausesSection;
