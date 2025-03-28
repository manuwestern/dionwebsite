import React from 'react';
import { useTranslation } from 'react-i18next';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline } from '../../utils/typography';

const FacilitySection: React.FC = () => {
  const { t } = useTranslation('clinic');
  
  // Get facility features from translation
  const features = t('facilitySection.features', { returnObjects: true }) as any[];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`${textStyle.sectionTitle} mb-4`}>
            {t('facilitySection.title')}
          </h2>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto`}>
            {t('facilitySection.description')}
          </p>
          <div className={`${gradientUnderline.primary} w-[90%] max-w-[350px] mt-6 mx-auto`}></div>
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
                    src="/images/Dion_Model_Benefits.png" 
                    alt="Dion Hair Clinic Facility" 
                    className="max-w-full h-auto rounded-xl shadow-lg"
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
                <div 
                  key={index}
                  className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-[#7BA7C2]/10 flex items-center justify-center mb-4">
                    <span className={`${fontSize.h3} ${fontWeight.light} text-[#7BA7C2]`}>{index + 1}</span>
                  </div>
                  
                  <h3 className={`${textStyle.cardTitle} mb-3`}>{feature.title}</h3>
                  <p className={`${textStyle.bodyText} ${textColor.medium}`}>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacilitySection;
