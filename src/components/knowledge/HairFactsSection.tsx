import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { textStyle, gradientUnderline, fontSize, fontWeight, textColor, lineHeight } from '../../utils/typography';
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
  const [hoverFact, setHoverFact] = useState<string | null>(null);

  const facts = [
    {
      id: 'fact1',
      icon: <ArrowUpRight size={24} className="text-[#7BA7C2]" />,
      title: t('hairFacts.fact1Title'),
      text: t('hairFacts.fact1Text')
    },
    {
      id: 'fact2',
      icon: <Hourglass size={24} className="text-[#7BA7C2]" />,
      title: t('hairFacts.fact2Title'),
      text: t('hairFacts.fact2Text')
    },
    {
      id: 'fact3',
      icon: <Hash size={24} className="text-[#7BA7C2]" />,
      title: t('hairFacts.fact3Title'),
      text: t('hairFacts.fact3Text')
    },
    {
      id: 'fact4',
      icon: <Weight size={24} className="text-[#7BA7C2]" />,
      title: t('hairFacts.fact4Title'),
      text: t('hairFacts.fact4Text')
    },
    {
      id: 'fact5',
      icon: <Scissors size={24} className="text-[#7BA7C2]" />,
      title: t('hairFacts.fact5Title'),
      text: t('hairFacts.fact5Text')
    },
    {
      id: 'fact6',
      icon: <Zap size={24} className="text-[#7BA7C2]" />,
      title: t('hairFacts.fact6Title'),
      text: t('hairFacts.fact6Text')
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facts.map((fact) => {
            const isHovered = fact.id === hoverFact;
            
            return (
              <div
                key={fact.id}
                className="group relative h-full"
                onMouseEnter={() => setHoverFact(fact.id)}
                onMouseLeave={() => setHoverFact(null)}
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
                        {fact.icon}
                      </div>
                      <h3 className={`${fontSize.lg} ${fontWeight.medium} ${textColor.dark}`}>
                        {fact.title}
                      </h3>
                    </div>
                    
                    {/* Description */}
                    <p className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} ${lineHeight.relaxed} flex-grow`}>
                      {fact.text}
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
        
        {/* Additional information */}
        <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="md:w-1/2">
              <h3 className={`${textStyle.primaryHeading} mb-4 text-center md:text-left`}>{t('hairFacts.fact1Title')}</h3>
              <p className={`${textStyle.bodyText} text-center md:text-left px-2 md:px-0`}>
                {t('hairFacts.fact1Text')}
              </p>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <h3 className={`${textStyle.primaryHeading} mb-4 text-center md:text-left`}>{t('hairFacts.fact2Title')}</h3>
              <p className={`${textStyle.bodyText} text-center md:text-left px-2 md:px-0`}>
                {t('hairFacts.fact2Text')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HairFactsSection;
