import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { textStyle, gradientUnderline } from '../../utils/typography';
import CTASection from '../common/elements/CTASection';
import ElegantClinicCard from '../common/elements/ElegantClinicCard';

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
          {standards.map((standard, index) => (
            <ElegantClinicCard
              key={index}
              title={standard.title}
              description={standard.description}
              index={index}
              hoverCard={hoverStandard}
              setHoverCard={setHoverStandard}
              accentColor="#7BA7C2"
              features={standard.features}
            />
          ))}
        </div>

       
      </div>
    </section>
  );
};

export default QualitySection;
