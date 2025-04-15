import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, CheckSquare, FileText, Camera, Bell, Smartphone } from 'lucide-react';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, lineHeight } from '../../utils/typography';

const AppSection: React.FC = () => {
  const { t } = useTranslation(['home', 'common']);

  // Feature icons
  const featureIcons = [
    <Calendar className="w-6 h-6 text-[#7BA7C2]" />,
    <CheckSquare className="w-6 h-6 text-[#7BA7C2]" />,
    <FileText className="w-6 h-6 text-[#7BA7C2]" />,
    <Camera className="w-6 h-6 text-[#7BA7C2]" />,
    <Bell className="w-6 h-6 text-[#7BA7C2]" />,
    <Smartphone className="w-6 h-6 text-[#7BA7C2]" />
  ];

  // Get features from translation
  const features = (t('appSection.features', { returnObjects: true }) as any[]).map(
    (feature: any, index: number) => ({
      icon: featureIcons[index],
      title: feature.title,
      description: feature.description
    })
  );

  return (
    <div className="py-16 md:py-24 relative">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Header with gradient underline */}
        <div className="text-center mb-16">
          <div className="inline-block mb-3">
            <h2 className={`${textStyle.sectionTitle}`} lang="de">{t('appSection.title')}</h2>
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[350px] mt-2 mx-auto`}></div>
          </div>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-4`} lang="de">
            {t('appSection.subtitle')}
          </p>
        </div>

        {/* Main content area */}
        <div className="flex flex-col gap-8 items-center">
          {/* Mobile App mockup - Only visible on mobile */}
          <div className="lg:hidden relative">
            <div className="max-w-[240px] sm:max-w-[260px] mx-auto relative -mt-4 mb-4">
              <div className="relative">
                <img 
                  src="/images/dionapp.webp" 
                  alt="Dion Hair Clinic App - Haartransplantation Fortschritt verfolgen" 
                  className="w-full h-auto"
                  loading="lazy"
                  decoding="async"
                  width="240"
                  height="480"
                />
                
                {/* Badge "ab Mai 2025" */}
                <div className="absolute top-2 right-2 bg-[#7BA7C2] text-white px-2 py-0.5 rounded-full shadow-md transform rotate-12 text-xs font-medium">
                  ab Mai 2025
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -z-10 w-48 h-48 bg-[#7BA7C2]/5 rounded-full -bottom-8 -left-8"></div>
              <div className="absolute -z-10 w-24 h-24 bg-[#7BA7C2]/10 rounded-full -top-4 right-8"></div>
            </div>
            
            {/* App store icons removed as requested */}
          </div>
          
          {/* Desktop layout - side by side app and card */}
          <div className="w-full flex flex-col lg:flex-row lg:gap-12 lg:items-start">
            {/* Desktop App mockup - Only visible on desktop */}
            <div className="hidden lg:block lg:w-1/3 relative">
              <div className="max-w-xs relative">
                <div className="relative">
                  <img 
                    src="/images/dionapp.webp" 
                    alt="Dion Hair Clinic App - Haartransplantation Fortschritt verfolgen" 
                    className="w-full h-auto"
                    loading="lazy"
                    decoding="async"
                    width="320"
                    height="640"
                  />
                  
                  {/* Badge "ab Mai 2025" */}
                  <div className="absolute top-3 right-3 bg-[#7BA7C2] text-white px-3 py-1 rounded-full shadow-md transform rotate-12 text-sm font-medium">
                    ab Mai 2025
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -z-10 w-64 h-64 bg-[#7BA7C2]/5 rounded-full -bottom-10 -left-10"></div>
                <div className="absolute -z-10 w-32 h-32 bg-[#7BA7C2]/10 rounded-full -top-5 right-10"></div>
              </div>
            </div>
            
            {/* Card layout with benefits only */}
            <div className="w-full lg:w-2/3">
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100 overflow-hidden mb-6">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#7BA7C2]/5 -mr-32 -mt-32 blur-xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#7BA7C2]/5 -ml-32 -mb-32 blur-xl"></div>
                
                <div className="relative z-10">
                  {/* Features grid */}
                  <div>
                    {/* Title, description and app store info removed as requested */}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                      {features.map((feature, index) => (
                        <div key={index} className="relative group">
                          <div className="flex flex-col md:flex-row gap-3 md:gap-4 p-4 md:p-5 rounded-xl transition-all duration-300 md:hover:bg-[#7BA7C2]/5">
                            <div className="flex-shrink-0 w-10 h-10 md:w-10 md:h-10 rounded-full bg-[#7BA7C2]/10 flex items-center justify-center mx-auto md:mx-0 mb-2 md:mb-0">
                              {React.cloneElement(feature.icon as React.ReactElement, { 
                                className: `w-5 h-5 md:w-6 md:h-6 text-[#7BA7C2] transition-all duration-300` 
                              })}
                            </div>
                            <div className="flex-grow">
                              <h4 className={`${fontSize.lg} ${fontWeight.normal} ${textColor.dark} mb-1 md:mb-2 text-center md:text-left`}>{feature.title}</h4>
                              <p className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} leading-relaxed md:${lineHeight.relaxed} text-center md:text-left max-w-[320px] mx-auto md:max-w-none md:mx-0 hyphens-auto`} lang="de">{feature.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* App Store Info */}
                    <div className="mt-8 bg-[#7BA7C2]/5 p-4 rounded-lg">
                      <p className={`${fontSize.sm} ${textColor.dark} text-center md:text-left`}>
                        {t('appSection.appStoreInfo')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* App store icons removed as requested */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppSection;
