import React from 'react';
import { useTranslation } from 'react-i18next';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline } from '../../utils/typography';

const AboutSection: React.FC = () => {
  const { t } = useTranslation('clinic');

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white -z-10"></div>
      
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`${textStyle.sectionTitle} mb-4`}>
            {t('aboutSection.title')}
          </h2>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto`}>
            {t('aboutSection.description')}
          </p>
          <div className={`${gradientUnderline.primary} w-[90%] max-w-[350px] mt-6 mx-auto`}></div>
        </div>
        
        {/* Mission Statement */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16 border border-gray-100 max-w-4xl mx-auto">
          <h3 className={`${textStyle.primaryHeading} mb-4 text-center`}>
            {t('aboutSection.mission.title')}
          </h3>
          <p className={`${textStyle.bodyTextImportant} text-center italic`}>
            "{t('aboutSection.mission.description')}"
          </p>
        </div>
        
        {/* Values Grid */}
        <h3 className={`${textStyle.primaryHeading} mb-8 text-center`}>
          {t('aboutSection.values.title')}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {(t('aboutSection.values.items', { returnObjects: true }) as any[]).map((value, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 group"
            >
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-[#7BA7C2]/10 flex items-center justify-center mb-4 group-hover:bg-[#7BA7C2]/20 transition-colors duration-300">
                  <span className={`${fontSize.h3} ${fontWeight.medium} text-[#7BA7C2]`}>{index + 1}</span>
                </div>
                
                <h4 className={`${textStyle.cardTitle} mb-3`}>{value.title}</h4>
                <p className={`${textStyle.bodyText} ${textColor.medium}`}>{value.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-[#7BA7C2]/5 -z-10 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-64 h-64 rounded-full bg-[#7BA7C2]/5 -z-10 blur-3xl"></div>
      </div>
    </section>
  );
};

export default AboutSection;
