import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, tracking } from '../../utils/typography';
import { buttonStyle, buttonRippleClass, buttonArrowClass } from '../../utils/buttons';

const HeroSection: React.FC = () => {
  const { t } = useTranslation(['hairTransplantation', 'common']);
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
      className="relative overflow-hidden min-h-[75vh] flex items-center"
    >
      {/* Background with gradient and blur effects */}
      <div className="absolute inset-0 z-0">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-[#7BA7C2]/5 -mr-[400px] -mt-[400px] blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[#7BA7C2]/5 -ml-[300px] -mb-[300px] blur-3xl"></div>
        
        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: 'url("/images/dionhairclinic_bg.svg")',
            backgroundSize: '200px',
            backgroundRepeat: 'repeat'
          }}
        ></div>
        
        {/* Animated gradient lines */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#7BA7C2] to-transparent animate-gradient-x"></div>
          <div className="absolute top-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#7BA7C2] to-transparent animate-gradient-x-slow"></div>
          <div className="absolute top-2/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#7BA7C2] to-transparent animate-gradient-x-slower"></div>
        </div>
      </div>
      
      {/* Mobile Layout */}
      <div className="md:hidden w-full max-w-7xl mx-auto px-6 pt-2 pb-0 relative z-10">
        <div className="flex flex-col items-center min-h-[450px]">
          {/* Logo for mobile with subtle animation */}
          <div className={`w-full flex justify-center mb-4 pt-4 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
            <div className="relative">
              <div className="absolute -inset-4 bg-white/50 rounded-full blur-xl"></div>
              <img src="/images/DionHairClinic_Logo.svg" alt="Dion Hair Clinic" className="h-14 relative z-10" />
            </div>
          </div>
          
          {/* Text content for mobile with staggered animations */}
          <div className="w-full flex flex-col items-center mb-10">
            <h1 className={`${textStyle.heroTitle} mb-4 text-center break-words hyphens-auto transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`} lang="de">
              {t('heroSection.title')}
              <span className={`block ${fontSize.h4} mt-4 ${textColor.medium} ${fontWeight.light} ${tracking.wider}`}>
                {t('heroSection.subtitle')}
              </span>
            </h1>
            
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[400px] my-6 transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
            
            <p className={`${textStyle.bodyText} mt-6 text-center max-w-2xl mx-auto transition-all duration-1000 delay-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {t('heroSection.welcomeText')}
            </p>
          </div>
          
          {/* Button with elegant animation */}
          <div className={`w-full flex justify-center mb-10 transition-all duration-1000 delay-900 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <button className={buttonStyle.primary}>
              <span className={buttonRippleClass}></span>
              <span className={`relative flex items-center ${textStyle.button} uppercase`}>
                {t('buttons.consultation', { ns: 'common' })}
                <ArrowRight className={buttonArrowClass} />
              </span>
            </button>
          </div>
          
          {/* Mobile image with elegant animation */}
          <div className={`mt-auto flex justify-center items-end transition-all duration-1000 delay-1100 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
            <div className="relative">
              {/* Image glow effect */}
              <div className="absolute -inset-4 bottom-0 bg-[#7BA7C2]/5 rounded-full blur-3xl"></div>
              
              <img 
                src="/images/Dion_Model_Mobile.png"
                alt="Dr. Dion - Führender Experte für Haartransplantation und Haarausfall-Behandlung in Mönchengladbach, NRW"
                className="w-auto h-auto max-h-[480px] object-contain relative z-10"
                style={{ filter: 'drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08))' }}
                width="400"
                height="600"
              />
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div 
            className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer transition-all duration-1000 delay-1500 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            onClick={scrollToNextSection}
          >
            <span className={`${fontSize.xs} ${textColor.light} mb-2 ${fontWeight.normal}`}>Mehr entdecken</span>
            <div className="w-8 h-8 rounded-full border border-[#7BA7C2]/30 flex items-center justify-center animate-bounce">
              <ChevronDown className="w-4 h-4 text-[#7BA7C2]" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Desktop Layout */}
      <div className="hidden md:block w-full max-w-7xl mx-auto px-6 pt-4 pb-0 relative z-10">
        <div className="relative min-h-[520px] flex items-center">
          {/* Text content for desktop with staggered animations */}
          <div className="relative z-10 w-[55%] flex flex-col justify-center h-full pt-6">
            <h1 className={`${textStyle.heroTitle} mb-6 text-left transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`} lang="de">
              {t('heroSection.title')}
              <span className={`block ${fontSize.h3} mt-4 ${textColor.medium} ${fontWeight.light} ${tracking.wider}`}>
                {t('heroSection.subtitle')}
              </span>
            </h1>
            
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[400px] my-8 transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
            
            <p className={`${textStyle.bodyTextImportant} max-w-2xl transition-all duration-1000 delay-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {t('heroSection.welcomeText')}
            </p>
            
            {/* Stats with elegant animations */}
            <div className={`flex gap-12 mt-10 transition-all duration-1000 delay-900 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex flex-col">
                <span className={`${textStyle.stat}`}>98%</span>
                <span className={`${fontSize.sm} ${textColor.light} ${fontWeight.normal}`}>Zufriedene Patienten</span>
              </div>
              <div className="flex flex-col">
                <span className={`${textStyle.stat}`}>5.000+</span>
                <span className={`${fontSize.sm} ${textColor.light} ${fontWeight.normal}`}>Erfolgreiche Behandlungen</span>
              </div>
              <div className="flex flex-col">
                <span className={`${textStyle.stat}`}>15+</span>
                <span className={`${fontSize.sm} ${textColor.light} ${fontWeight.normal}`}>Jahre Erfahrung</span>
              </div>
            </div>
            
            {/* Button with elegant animation */}
            <div className={`mt-10 flex justify-start transition-all duration-1000 delay-1100 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <button className={buttonStyle.primary}>
                <span className={buttonRippleClass}></span>
                <span className={`relative flex items-center ${textStyle.button} uppercase`}>
                  {t('buttons.consultation', { ns: 'common' })}
                  <ArrowRight className={buttonArrowClass} />
                </span>
              </button>
            </div>
            
            {/* Trust badges */}
            <div className={`mt-12 flex gap-6 transition-all duration-1000 delay-1300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#7BA7C2]/10 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-[#7BA7C2]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <span className={`${fontSize.sm} ${textColor.dark} ${fontWeight.normal}`}>Zertifizierte Experten</span>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#7BA7C2]/10 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-[#7BA7C2]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <span className={`${fontSize.sm} ${textColor.dark} ${fontWeight.normal}`}>Modernste Techniken</span>
              </div>
            </div>
          </div>
          
          {/* Desktop image with elegant animation and effects */}
          <div className={`absolute right-0 top-0 bottom-0 w-[50%] h-full flex items-center justify-end transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`}>
            <div className="relative">
              {/* Image glow effect */}
              <div className="absolute -inset-8 bg-[#7BA7C2]/5 rounded-full blur-3xl"></div>
              
              {/* Decorative elements */}
              <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full border border-[#7BA7C2]/20 animate-pulse-slow"></div>
              <div className="absolute bottom-1/3 right-1/3 w-24 h-24 rounded-full border border-[#7BA7C2]/10 animate-pulse-slower"></div>
              
              <img 
                src="/images/Dion_Model_Home.webp"
                alt="Haartransplantation Experte - Modernste Techniken für natürliche Ergebnisse in der Dion Hair Clinic"
                className="w-auto h-auto max-h-[580px] object-contain object-center relative z-10"
                style={{ 
                  filter: 'drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08))'
                }}
                width="600"
                height="800"
              />
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div 
            className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer transition-all duration-1000 delay-1500 ease-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            onClick={scrollToNextSection}
          >
            <span className={`${fontSize.xs} ${textColor.light} mb-2 ${fontWeight.normal}`}>Mehr entdecken</span>
            <div className="w-8 h-8 rounded-full border border-[#7BA7C2]/30 flex items-center justify-center animate-bounce">
              <ChevronDown className="w-4 h-4 text-[#7BA7C2]" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Animation classes are defined in index.css */}
    </div>
  );
};

export default HeroSection;
