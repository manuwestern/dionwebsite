import React from 'react';
import { useTranslation } from 'react-i18next';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline } from '../../utils/typography';

const QualitySection: React.FC = () => {
  const { t } = useTranslation('clinic');
  
  // Get quality standards from translation
  const standards = t('qualitySection.standards', { returnObjects: true }) as any[];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`${textStyle.sectionTitle} mb-4`}>
            {t('qualitySection.title')}
          </h2>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto`}>
            {t('qualitySection.description')}
          </p>
          <div className={`${gradientUnderline.primary} w-[90%] max-w-[350px] mt-6 mx-auto`}></div>
        </div>
        
        {/* Quality Standards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {standards.map((standard, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-md p-8 border border-gray-100 hover:shadow-lg transition-shadow duration-300 group"
            >
              {/* Standard Number */}
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[#7BA7C2]/10 flex items-center justify-center group-hover:bg-[#7BA7C2]/20 transition-colors duration-300">
                  <span className={`${fontSize.h3} ${fontWeight.light} text-[#7BA7C2]`}>{index + 1}</span>
                </div>
                <div className={`h-[1px] flex-grow ml-4 ${gradientUnderline.light}`}></div>
              </div>
              
              {/* Standard Content */}
              <h3 className={`${textStyle.cardTitle} mb-3`}>{standard.title}</h3>
              <p className={`${textStyle.bodyText} ${textColor.medium}`}>{standard.description}</p>
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

export default QualitySection;
