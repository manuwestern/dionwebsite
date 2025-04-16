import React from 'react';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, lineHeight } from '../../utils/typography';

export interface AppFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface AppFeatureSectionProps {
  title: string;
  subtitle: string;
  features: AppFeature[];
  appImageSrc?: string;
  appImageAlt?: string;
  badgeText?: string;
  appStoreInfo?: string;
  backgroundColor?: string;
  accentColor?: string;
  translationNamespace?: string;
  showAppStoreButtons?: boolean;
}

const AppFeatureSection: React.FC<AppFeatureSectionProps> = ({
  title,
  subtitle,
  features,
  appImageSrc = "/images/dionapp.webp",
  appImageAlt = "Dion Hair Clinic App",
  badgeText = "ab Mai 2025",
  appStoreInfo,
  backgroundColor = "bg-white",
  accentColor = "text-[#7BA7C2]",
  translationNamespace,
  showAppStoreButtons = false
}) => {
  return (
    <div className="py-16 md:py-24 relative">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Header with gradient underline */}
        <div className="text-center mb-16">
          <div className="inline-block mb-3">
            <h2 className={`${textStyle.sectionTitle}`} lang="de">{title}</h2>
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[350px] mt-2 mx-auto`}></div>
          </div>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-4`} lang="de">
            {subtitle}
          </p>
        </div>

        {/* Main content area */}
        <div className="flex flex-col gap-8 items-center">
          {/* Mobile App mockup - Only visible on mobile */}
          {appImageSrc && (
            <div className="lg:hidden relative -mt-8">
              <div className="max-w-[240px] sm:max-w-[260px] mx-auto relative -mt-4 mb-4">
                <div className="relative">
                  <img 
                    src={appImageSrc}
                    alt={appImageAlt}
                    className="w-full h-auto"
                    loading="lazy"
                    decoding="async"
                    width="240"
                    height="480"
                  />
                  
                  {/* Badge */}
                  {badgeText && (
                    <div className="absolute top-2 right-2 bg-[#7BA7C2] text-white px-2 py-0.5 rounded-full shadow-md transform rotate-12 text-xs font-medium">
                      {badgeText}
                    </div>
                  )}
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -z-10 w-48 h-48 bg-[#7BA7C2]/5 rounded-full -bottom-8 -left-8"></div>
                <div className="absolute -z-10 w-24 h-24 bg-[#7BA7C2]/10 rounded-full -top-4 right-8"></div>
              </div>
            </div>
          )}
          
          {/* Desktop layout - side by side app and card */}
          <div className="w-full flex flex-col lg:flex-row lg:gap-12 lg:items-start">
            {/* Desktop App mockup - Only visible on desktop */}
            {appImageSrc && (
              <div className="hidden lg:block lg:w-1/3 relative -mt-4">
                <div className="max-w-xs relative">
                  <div className="relative">
                    <img 
                      src={appImageSrc}
                      alt={appImageAlt}
                      className="w-full h-auto"
                      loading="lazy"
                      decoding="async"
                      width="320"
                      height="640"
                    />
                    
                    {/* Badge */}
                    {badgeText && (
                      <div className="absolute top-3 right-3 bg-[#7BA7C2] text-white px-3 py-1 rounded-full shadow-md transform rotate-12 text-sm font-medium">
                        {badgeText}
                      </div>
                    )}
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -z-10 w-64 h-64 bg-[#7BA7C2]/5 rounded-full -bottom-10 -left-10"></div>
                  <div className="absolute -z-10 w-32 h-32 bg-[#7BA7C2]/10 rounded-full -top-5 right-10"></div>
                </div>
              </div>
            )}
            
            {/* Card layout with benefits */}
            <div className={`w-full ${appImageSrc ? 'lg:w-2/3' : 'lg:w-full'}`}>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100 overflow-hidden mb-6 group">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#7BA7C2]/5 -mr-32 -mt-32 blur-xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#7BA7C2]/5 -ml-32 -mb-32 blur-xl"></div>
                
                {/* Top accent line - only visible on hover */}
                <div 
                  className="absolute top-0 left-0 w-full h-1 transition-opacity duration-300 opacity-0 group-hover:opacity-100" 
                  style={{ background: `linear-gradient(to right, #7BA7C2, #7BA7C280)` }}
                ></div>
                
                <div className="relative z-10">
                  {/* Features grid */}
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                      {features.map((feature, index) => {
                        const [isHovered, setIsHovered] = React.useState(false);
                        
                        return (
                          <div 
                            key={index} 
                            className="relative"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                          >
                            <div className="flex flex-col md:flex-row gap-3 md:gap-4 p-4 md:p-5 rounded-xl transition-all duration-300 md:hover:bg-[#7BA7C2]/5">
                              <div 
                                className="flex-shrink-0 w-10 h-10 md:w-10 md:h-10 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-2 md:mb-0 transition-all duration-300"
                                style={{ 
                                  backgroundColor: isHovered ? '#7BA7C220' : '#7BA7C210',
                                  color: '#7BA7C2'
                                }}
                              >
                                {React.cloneElement(feature.icon as React.ReactElement, { 
                                  className: `w-5 h-5 md:w-6 md:h-6 transition-all duration-300 ${isHovered ? 'scale-110' : ''}` 
                                })}
                              </div>
                              <div className="flex-grow">
                                <h4 
                                  className={`${fontSize.lg} ${fontWeight.normal} mb-1 md:mb-2 text-center md:text-left ${textColor.dark}`}
                                >
                                  {feature.title}
                                </h4>
                                <p className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} leading-relaxed md:${lineHeight.relaxed} text-center md:text-left max-w-[320px] mx-auto md:max-w-none md:mx-0 hyphens-auto`} lang="de">
                                  {feature.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* App Store Info */}
                    {appStoreInfo && (
                      <div className="mt-8 bg-[#7BA7C2]/5 p-5 rounded-lg border border-[#7BA7C2]/10">
                        <p className={`${fontSize.sm} ${textColor.dark} text-center md:text-left`}>
                          {appStoreInfo}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* App store buttons - Optional */}
              {showAppStoreButtons && (
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mt-6">
                  <a href="#" className="inline-block transition-transform hover:scale-105">
                    <img 
                      src="/images/apple_store.svg" 
                      alt="Download on the App Store" 
                      className="h-12 w-auto"
                      loading="lazy"
                    />
                  </a>
                  <a href="#" className="inline-block transition-transform hover:scale-105">
                    <img 
                      src="/images/google_play.svg" 
                      alt="Get it on Google Play" 
                      className="h-12 w-auto"
                      loading="lazy"
                    />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppFeatureSection;
