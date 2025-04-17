import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, lineHeight } from '../../utils/typography';
import { Check } from 'lucide-react';
import CTASection from '../common/elements/CTASection';

const QualitySection: React.FC = () => {
  const { t } = useTranslation(['clinic', 'common']);
  const [hoverStandard, setHoverStandard] = useState<number | null>(null);

  // Get quality standards from translation
  const standards = t('qualitySection.standards', { returnObjects: true }) as any[];

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
            <h2 className={`${textStyle.sectionTitle}`}>{t('qualitySection.title')}</h2>
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[350px] mt-3 mx-auto`}></div>
          </div>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-4`}>
            {t('qualitySection.description')}
          </p>
        </div>

        {/* Quality Standards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {standards.map((standard, index) => {
            const isHovered = index === hoverStandard;

            return (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => setHoverStandard(index)}
                onMouseLeave={() => setHoverStandard(null)}
              >
                {/* Card with glass morphism effect */}
                <div className={`relative bg-white backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-500 h-full border-2 ${
                  isHovered
                    ? 'shadow-xl transform -translate-y-1 border-[#7BA7C2]/80'
                    : 'border-gray-100/80 hover:border-[#7BA7C2]/30 hover:shadow-xl'
                }`}>
                  {/* Header with gradient background */}
                  <div className="relative h-20 overflow-hidden flex items-center">
                    {/* Gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#7BA7C2] to-[#7BA7C2]/80"></div>

                    {/* Decorative circles */}
                    <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/10 -mr-20 -mt-20"></div>
                    <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-white/10 -ml-10 -mb-10"></div>

                    {/* Number container */}
                    <div className="relative z-10 ml-6 mr-4">
                      <div className={`w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-500 ${
                        isHovered ? 'scale-110 bg-white/30' : ''
                      }`}>
                        <span className={`${fontSize.h3} ${fontWeight.light} text-white transition-all duration-500 ${isHovered ? 'scale-110' : ''}`}>
                          {index + 1}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className={`relative z-10 ${fontSize.lg} ${fontWeight.normal} ${textColor.white} drop-shadow-sm flex-1 pr-6`}>
                      {standard.title}
                    </h3>
                  </div>

                  {/* Content with subtle gradient */}
                  <div className="p-6 md:p-8 bg-gradient-to-b from-white to-gray-50/50 h-auto flex flex-col">
                    {/* Description with perfect typography */}
                    <p className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} ${lineHeight.relaxed} flex-grow`}>
                      {standard.description}
                    </p>

                    {/* Features list if available */}
                    {standard.features && standard.features.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <ul className="grid gap-3">
                          {standard.features.map((feature: string, i: number) => (
                            <li key={i} className="flex items-start group">
                              <div className="mr-3 flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[#7BA7C2]/10 flex items-center justify-center transition-all duration-300 group-hover:bg-[#7BA7C2]/20">
                                <Check className="h-3 w-3 text-[#7BA7C2]" />
                              </div>
                              <span className={`${fontSize.sm} ${textColor.dark} ${fontWeight.normal}`}>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
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

        {/* CTA Section using the reusable component */}
        <div className="mt-20">
          <CTASection 
            translationNamespace="clinic"
            titleKey="qualitySection.cta.title"
            descriptionKey="qualitySection.cta.description"
            ctaTextKey="buttons.consultation"
            ctaLink="/kontakt"
          />
        </div>
      </div>
    </section>
  );
};

export default QualitySection;
