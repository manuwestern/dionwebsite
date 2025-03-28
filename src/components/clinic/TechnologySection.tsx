import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline } from '../../utils/typography';

const TechnologySection: React.FC = () => {
  const { t } = useTranslation('clinic');
  const [activeTech, setActiveTech] = useState<number | null>(null);
  
  // Get technologies from translation
  const technologies = t('technologySection.technologies', { returnObjects: true }) as any[];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-gray-50 border-t border-b border-gray-100">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full bg-[#7BA7C2]/5 -ml-[400px] -mt-[400px] blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-[#7BA7C2]/5 -mr-[300px] -mb-[300px] blur-3xl"></div>
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`${textStyle.sectionTitle} mb-4`}>
            {t('technologySection.title')}
          </h2>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto`}>
            {t('technologySection.description')}
          </p>
          <div className={`${gradientUnderline.primary} w-[90%] max-w-[350px] mt-6 mx-auto`}></div>
        </div>
        
        {/* Technologies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => {
            const isActive = index === activeTech;
            
            return (
              <div 
                key={index}
                className={`bg-white rounded-xl shadow-md overflow-hidden border transition-all duration-300 ${
                  isActive 
                    ? 'border-[#7BA7C2] shadow-lg transform -translate-y-1' 
                    : 'border-gray-100 hover:shadow-lg hover:-translate-y-1'
                }`}
                onMouseEnter={() => setActiveTech(index)}
                onMouseLeave={() => setActiveTech(null)}
              >
                {/* Technology Header */}
                <div className={`h-24 bg-gradient-to-r from-[#7BA7C2]/20 to-[#7BA7C2]/5 flex items-center px-6 transition-all duration-300 ${
                  isActive ? 'bg-[#7BA7C2]/30' : ''
                }`}>
                  <h3 className={`${textStyle.primaryHeading} text-left`}>{tech.title}</h3>
                </div>
                
                {/* Technology Description */}
                <div className="p-6">
                  <p className={`${textStyle.bodyText}`}>
                    {tech.description}
                  </p>
                  
                  {/* Visual indicator for active state */}
                  <div className={`w-full h-1 mt-6 transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#7BA7C2]/80 to-[#7BA7C2]/20' 
                      : 'bg-gradient-to-r from-[#7BA7C2]/20 to-transparent'
                  }`}></div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Additional Information */}
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
