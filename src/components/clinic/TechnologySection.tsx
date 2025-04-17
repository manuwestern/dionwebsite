import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { textStyle, gradientUnderline } from '../../utils/typography';
import CTASection from '../common/elements/CTASection';
import ElegantClinicCard from '../common/elements/ElegantClinicCard';

const TechnologySection: React.FC = () => {
  const { t } = useTranslation(['clinic', 'common']);
  const [activeTech, setActiveTech] = useState<number | null>(null);

  // Get technologies from translation
  const technologies = t('technologySection.technologies', { returnObjects: true }) as any[];

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
            <h2 className={`${textStyle.sectionTitle}`}>{t('technologySection.title')}</h2>
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[350px] mt-3 mx-auto`}></div>
          </div>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-4`}>
            {t('technologySection.description')}
          </p>
        </div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <ElegantClinicCard
              key={index}
              title={tech.title}
              description={tech.description}
              index={index}
              hoverCard={activeTech}
              setHoverCard={setActiveTech}
              accentColor="#7BA7C2"
            />
          ))}
        </div>

        

        {/* Stats Section */}
        <div className="mt-16 text-center">
          <p className={`${textStyle.bodyTextImportant} max-w-3xl mx-auto`}>
            <span className="text-[#7BA7C2] font-medium">15+ </span>
            {t('common:stats.yearsExperience')}
            <span className="mx-2">•</span>
            <span className="text-[#7BA7C2] font-medium">5.000+ </span>
            {t('common:stats.successfulTreatments')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
