import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { textStyle, gradientUnderline } from '../../utils/typography';
import CTASection from '../common/elements/CTASection';
import ElegantClinicCard from '../common/elements/ElegantClinicCard';

const FacilitySection: React.FC = () => {
  const { t } = useTranslation(['clinic', 'common']);
  const [hoverFeature, setHoverFeature] = useState<number | null>(null);

  // Get facility features from translation
  const features = t('facilitySection.features', { returnObjects: true }) as any[];

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
            <h2 className={`${textStyle.sectionTitle}`}>{t('facilitySection.title')}</h2>
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[350px] mt-3 mx-auto`}></div>
          </div>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-4`}>
            {t('facilitySection.description')}
          </p>
        </div>

        {/* Facility Image and Features */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Facility Image */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              {/* Gradient overlay for image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#7BA7C2]/30 to-transparent z-10"></div>

              {/* Placeholder image with gradient */}
              <div className="aspect-[4/3] bg-gradient-to-br from-[#7BA7C2]/20 to-[#7BA7C2]/5 flex items-center justify-center">
                <div className="text-center p-8">
                <img
                  src="/images/Dion_Model_Benefits.webp"
                  alt="Dion Hair Clinic Facility - Modern Treatment Rooms"
                  className="max-w-full h-auto rounded-xl shadow-lg"
                  width="600"
                  height="450"
                  loading="lazy"
                  decoding="async"
                />
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-64 h-64 rounded-full bg-[#7BA7C2]/5 -z-10 blur-3xl"></div>
            <div className="absolute -top-6 -left-6 w-48 h-48 rounded-full bg-[#7BA7C2]/5 -z-10 blur-3xl"></div>
          </div>

          {/* Facility Features */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <ElegantClinicCard
                  key={index}
                  title={feature.title}
                  description={feature.description}
                  index={index}
                  hoverCard={hoverFeature}
                  setHoverCard={setHoverFeature}
                  accentColor="#7BA7C2"
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section using the reusable component */}
        <div className="mt-20">
          <CTASection 
            translationNamespace="clinic"
            titleKey="facilitySection.cta.title"
            descriptionKey="facilitySection.cta.description"
            ctaTextKey="buttons.consultation"
            ctaLink="/kontakt"
          />
        </div>
      </div>
    </section>
  );
};

export default FacilitySection;
