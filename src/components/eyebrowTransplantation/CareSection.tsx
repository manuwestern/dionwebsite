import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, CheckSquare, FileText, Camera, Bell, Smartphone } from 'lucide-react';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, lineHeight } from '../../utils/typography';

const CareSection: React.FC = () => {
  const { t } = useTranslation(['eyebrowTransplantation', 'common']);

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
  const features = (t('careSection.features', { returnObjects: true }) as any[]).map(
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
            <h2 className={`${textStyle.sectionTitle} break-words hyphens-auto`} lang="de">{t('careSection.title')}</h2>
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[350px] mt-2 mx-auto`}></div>
          </div>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-4 hyphens-auto`} lang="de">
            {t('careSection.subtitle')}
          </p>
        </div>

        {/* Main content area */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left side: App mockup */}
          <div className="lg:w-1/2 relative">
            <div className="max-w-xs mx-auto relative -mt-8">
              <div className="relative">
                <img 
                  src="/images/dionapp.webp" 
                  alt="Dion Hair Clinic App - Augenbrauentransplantation Fortschritt verfolgen" 
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
          
          {/* Right side: Features */}
          <div className="lg:w-1/2">
            <h3 className={`${textStyle.primaryHeading} mb-6 text-center md:text-left break-words hyphens-auto`} lang="de">{t('careSection.subheading')}</h3>
            <p className={`${textStyle.bodyText} mb-4 text-center md:text-left px-2 md:px-0 hyphens-auto`} lang="de">
              {t('careSection.description')}
            </p>
            <div className="flex flex-col md:flex-row items-center md:items-start mb-8 bg-[#7BA7C2]/5 p-3 rounded-lg text-center md:text-left">
              
            
              <p className={`${fontSize.sm} ${textColor.dark} hyphens-auto`} lang="de">
                {t('careSection.appStoreInfo')}
              </p>
            </div>
            
            {/* Features grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
                  <div className="mb-3 md:mb-0 md:mr-4 md:mt-1">
                    <div className="w-14 h-14 md:w-10 md:h-10 rounded-full bg-[#7BA7C2]/10 flex items-center justify-center mx-auto md:mx-0">
                      {React.cloneElement(feature.icon as React.ReactElement, { 
                        className: `w-7 h-7 md:w-6 md:h-6 text-[#7BA7C2] transition-all duration-300` 
                      })}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className={`${fontSize.lg} ${fontWeight.normal} ${textColor.dark} mb-2 text-center md:text-left break-words hyphens-auto`} lang="de">{feature.title}</h4>
                    <p className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} leading-relaxed md:${lineHeight.relaxed} text-center md:text-left max-w-[280px] mx-auto md:max-w-none md:mx-0 hyphens-auto`} lang="de">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* App store icons */}
            <div className="mt-10 flex gap-6 justify-center md:justify-start">
              <a href="#" className="transform transition-all duration-300 hover:scale-[1.1] active:scale-[0.98]">
                <img 
                  src="/images/apple_store.svg" 
                  alt="Apple App Store - Dion Hair Clinic App herunterladen" 
                  className="w-32 h-32"
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <a href="#" className="transform transition-all duration-300 hover:scale-[1.1] active:scale-[0.98]">
                <img 
                  src="/images/google_play.svg" 
                  alt="Google Play Store - Dion Hair Clinic App herunterladen" 
                  className="w-32 h-32"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareSection;
