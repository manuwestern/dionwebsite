import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, tracking } from '../../utils/typography';
import { buttonStyle, buttonRippleClass, buttonArrowClass } from '../../utils/buttons';

const HeroSection: React.FC = () => {
  const { t } = useTranslation(['prices', 'common']);
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Trigger entrance animations immediately
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Scroll to next section
  const scrollToNextSection = () => {
    if (heroRef.current) {
      const heroHeight = heroRef.current.offsetHeight;
      window.scrollTo({
        top: heroHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div 
      ref={heroRef}
      className="relative overflow-hidden min-h-[85vh] flex items-center"
    >
      {/* Background with simple gradient */}
      <div className="absolute inset-0 z-0">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white"></div>
        
        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: 'url("/images/dionhairclinic_bg.svg")',
            backgroundSize: '200px',
            backgroundRepeat: 'repeat'
          }}
        ></div>
      </div>
      
      {/* Mobile Layout */}
      <div className="md:hidden w-full max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col min-h-[90vh] px-4">
          {/* Main content area with perfect spacing */}
          <div className="flex-1 flex flex-col justify-between pt-4 pb-0">
            {/* Text content with refined typography and animations */}
            <div className="space-y-4 mt-2">
              {/* Title with elegant animation and perfect typography */}
              <div className={`transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}>
                <h1 className={`${textStyle.heroTitle} text-center px-1 leading-tight break-words hyphens-auto whitespace-pre-line`} lang="de">
                  {t('heroSection.title')}
                </h1>
                
                {/* Subtitle with refined styling */}
                 <div className="mt-3 mb-2">
                  <span className={`block text-center ${fontSize.h4} ${textColor.medium} ${fontWeight.light} ${tracking.wider} leading-relaxed`}>
                    {t('heroSection.subtitle')}
                  </span>
                </div>
                
                {/* Elegant gradient underline with perfect animation */}
                <div className={`${gradientUnderline.primary} h-[1.5px] w-[85%] max-w-[280px] mx-auto mt-5 transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
              </div>
              
              {/* Welcome text with perfect spacing and animation */}
              <div className={`px-1 transition-all duration-1000 delay-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <p className={`${textStyle.bodyText} text-center max-w-md mx-auto leading-relaxed`}>
                  {t('heroSection.welcomeText')}
                </p>
              </div>
              
              {/* CTA button with refined styling and animation */}
              <div className={`flex justify-center mt-6 transition-all duration-1000 delay-900 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <a 
                  href="/kontakt#appointmentForm" 
                  className={`${buttonStyle.primary} shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] inline-block`}
                >
                  <span className={buttonRippleClass}></span>
                  <span className={`relative flex items-center ${textStyle.button} uppercase tracking-widest`}>
                    {t('buttons.consultation', { ns: 'common' })}
                    <ArrowRight className={`${buttonArrowClass} ml-2`} />
                  </span>
                </a>
              </div>
            </div>
            
            {/* Price tag section */}
            <div className="mt-10 mb-12 relative">
              {/* Decorative price tag elements */}
              <div className={`relative flex justify-center transition-all duration-1000 delay-1100 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                {/* Decorative price tags - Grid layout for better mobile display */}
                <div className="grid grid-cols-2 gap-4 max-w-[360px] mx-auto">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-md border border-[#7BA7C2]/20 transform rotate-[-3deg] hover:rotate-0 transition-all duration-300">
                    <div className="text-[#7BA7C2] font-medium text-lg">Saphir FUE</div>
                    <div className="text-gray-800 font-light text-2xl">ab 2599€</div>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-md border border-[#7BA7C2]/20 transform rotate-[2deg] hover:rotate-0 transition-all duration-300">
                    <div className="text-[#7BA7C2] font-medium text-lg">DHI FUE</div>
                    <div className="text-gray-800 font-light text-2xl">ab 3599€</div>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-md border border-[#7BA7C2]/20 transform rotate-[1deg] hover:rotate-0 transition-all duration-300">
                    <div className="text-[#7BA7C2] font-medium text-lg">Beard</div>
                    <div className="text-gray-800 font-light text-2xl">ab 2599€</div>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-md border border-[#7BA7C2]/20 transform rotate-[-2deg] hover:rotate-0 transition-all duration-300">
                    <div className="text-[#7BA7C2] font-medium text-lg">Eyebrow</div>
                    <div className="text-gray-800 font-light text-2xl">ab 1699€</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Desktop Layout */}
      <div className="hidden md:block w-full max-w-7xl mx-auto px-8 relative z-10">
        <div className="relative min-h-[750px] flex items-center">
          {/* Text content with refined typography and animations */}
          <div className="relative z-10 w-[50%] flex flex-col justify-center h-full pt-6 pr-12">
            {/* Title with elegant animation and perfect typography */}
            <div className={`transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}>
              <h1 className={`${textStyle.heroTitle} text-left leading-tight break-words hyphens-auto whitespace-pre-line`} lang="de">
                {t('heroSection.title')}
              </h1>
              
              {/* Subtitle with refined styling */}
              <div className="mt-3 mb-2">
                <span className={`block ${fontSize.h3} ${textColor.medium} ${fontWeight.light} ${tracking.elegant} leading-relaxed`}>
                  {t('heroSection.subtitle')}
                </span>
              </div>
              
              {/* Elegant gradient underline with perfect animation */}
              <div className={`${gradientUnderline.primary} h-[1.5px] w-[90%] max-w-[400px] mt-6 mb-8 transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
            </div>
            
            {/* Welcome text with perfect spacing and animation */}
            <div className={`transition-all duration-1000 delay-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <p className={`${textStyle.bodyTextImportant} max-w-2xl leading-relaxed`}>
                {t('heroSection.welcomeText')}
              </p>
            </div>
            
            {/* Stats with refined styling and animations */}
            <div className={`flex gap-14 mt-12 transition-all duration-1000 delay-900 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="flex flex-col">
                <span className={`${textStyle.stat} text-[#7BA7C2]`}>98%</span>
                <span className={`${fontSize.sm} ${textColor.light} ${fontWeight.light} tracking-wide`}>{t('stats.satisfiedPatients', { ns: 'common' })}</span>
              </div>
              <div className="flex flex-col">
                <span className={`${textStyle.stat} text-[#7BA7C2]`}>5.000+</span>
                <span className={`${fontSize.sm} ${textColor.light} ${fontWeight.light} tracking-wide`}>{t('stats.successfulTreatments', { ns: 'common' })}</span>
              </div>
              <div className="flex flex-col">
                <span className={`${textStyle.stat} text-[#7BA7C2]`}>15+</span>
                <span className={`${fontSize.sm} ${textColor.light} ${fontWeight.light} tracking-wide`}>{t('stats.yearsExperience', { ns: 'common' })}</span>
              </div>
            </div>
            
            {/* CTA button with refined styling and animation */}
            <div className={`mt-12 flex justify-start transition-all duration-1000 delay-1100 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <a 
                href="/kontakt#appointmentForm" 
                className={`${buttonStyle.primary} shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] inline-block`}
              >
                <span className={buttonRippleClass}></span>
                <span className={`relative flex items-center ${textStyle.button} uppercase tracking-widest`}>
                  {t('buttons.consultation', { ns: 'common' })}
                  <ArrowRight className={`${buttonArrowClass} ml-2`} />
                </span>
              </a>
            </div>
          </div>
          
          {/* Price tag section */}
          <div className={`absolute right-0 top-0 bottom-0 w-[50%] h-full flex items-center justify-end transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            {/* Decorative price tags */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-[#7BA7C2]/20 transform rotate-[-3deg] hover:rotate-0 transition-all duration-300">
                <div className="text-[#7BA7C2] font-medium text-xl mb-1">Saphir FUE Hair</div>
                <div className="text-gray-800 font-light text-4xl mb-2">ab 2599€</div>
                <div className="text-gray-600 text-sm">Basic Paket bis 2000 Grafts</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-[#7BA7C2]/20 transform rotate-[2deg] hover:rotate-0 transition-all duration-300 mt-8">
                <div className="text-[#7BA7C2] font-medium text-xl mb-1">DHI FUE Hair</div>
                <div className="text-gray-800 font-light text-4xl mb-2">ab 3599€</div>
                <div className="text-gray-600 text-sm">Basic Paket bis 2000 Grafts</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-[#7BA7C2]/20 transform rotate-[1deg] hover:rotate-0 transition-all duration-300">
                <div className="text-[#7BA7C2] font-medium text-xl mb-1">Saphir FUE Beard</div>
                <div className="text-gray-800 font-light text-4xl mb-2">ab 2599€</div>
                <div className="text-gray-600 text-sm">Basic Paket bis 2000 Grafts</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-[#7BA7C2]/20 transform rotate-[-2deg] hover:rotate-0 transition-all duration-300 mt-4">
                <div className="text-[#7BA7C2] font-medium text-xl mb-1">Saphir FUE Eyebrow</div>
                <div className="text-gray-800 font-light text-4xl mb-2">ab 1699€</div>
                <div className="text-gray-600 text-sm">bis 1000 Grafts</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
