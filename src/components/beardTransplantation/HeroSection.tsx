import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, tracking } from '../../utils/typography';
import { buttonStyle, buttonRippleClass, buttonArrowClass } from '../../utils/buttons';

const HeroSection: React.FC = () => {
  const { t } = useTranslation(['beardTransplantation', 'common']);
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
      
      {/* Mobile Layout - Redesigned for perfect aesthetics */}
      <div className="md:hidden w-full max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col min-h-[100vh] px-5">
          {/* Top section with logo and subtle animation */}
          <div className="pt-6 pb-4 flex justify-center">
            <div className={`relative transition-all duration-700 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="absolute -inset-3 bg-gradient-to-r from-[#7BA7C2]/10 to-white/80 rounded-full blur-xl"></div>
              <img 
                src="/images/DionHairClinic_Logo.svg" 
                alt="Dion Hair Clinic" 
                className="h-12 relative z-10 drop-shadow-sm" 
              />
            </div>
          </div>
          
          {/* Main content area with perfect spacing */}
          <div className="flex-1 flex flex-col justify-between pt-4 pb-0">
            {/* Text content with refined typography and animations */}
            <div className="space-y-6 mt-4">
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
              <div className={`px-2 transition-all duration-1000 delay-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <p className={`${textStyle.bodyText} text-center max-w-md mx-auto leading-relaxed`}>
                  {t('heroSection.welcomeText')}
                </p>
              </div>
              
              {/* CTA button with refined styling and animation */}
              <div className={`flex justify-center mt-8 transition-all duration-1000 delay-900 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <button className={`${buttonStyle.primary} shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]`}>
                  <span className={buttonRippleClass}></span>
                  <span className={`relative flex items-center ${textStyle.button} uppercase tracking-widest`}>
                    {t('buttons.consultation', { ns: 'common' })}
                    <ArrowRight className={`${buttonArrowClass} ml-2`} />
                  </span>
                </button>
              </div>
            </div>
            
            {/* Image section with enhanced visual effects */}
            <div className="mt-10 -mb-10 relative">
              {/* Decorative elements */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[120%] h-[300px] bg-gradient-to-t from-[#7BA7C2]/10 to-transparent rounded-[100%] blur-2xl opacity-60"></div>
              </div>
              
              {/* Image with refined animation and effects */}
              <div className={`relative flex justify-center transition-all duration-1000 delay-1100 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <div className="relative">
                  {/* Enhanced glow effect */}
                  <div className="absolute -inset-4 bottom-0 bg-gradient-to-t from-[#7BA7C2]/20 to-[#7BA7C2]/5 rounded-full blur-3xl"></div>
                  
                  {/* Subtle animated decorative elements */}
                  <div className="absolute top-1/4 -left-4 w-12 h-12 rounded-full border border-[#7BA7C2]/20 animate-pulse-slow"></div>
                  <div className="absolute bottom-1/3 -right-6 w-16 h-16 rounded-full border border-[#7BA7C2]/10 animate-pulse-slower"></div>
                  
                  <img 
                    src="/images/Model_Bart.png"
                    alt="Dr. Dion - Führender Experte für Barthaartransplantation"
                    className="w-auto h-auto max-h-[500px] object-contain relative z-10 scale-125"
                    width="450"
                    height="650"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll indicator removed as requested */}
        </div>
      </div>
      
      {/* Desktop Layout - Refined for perfect aesthetics */}
      <div className="hidden md:block w-full max-w-7xl mx-auto px-8 relative z-10">
        <div className="relative min-h-[750px] flex items-center">
          {/* No logo in desktop version as per original design */}
          
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
              <button className={`${buttonStyle.primary} shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]`}>
                <span className={buttonRippleClass}></span>
                <span className={`relative flex items-center ${textStyle.button} uppercase tracking-widest`}>
                  {t('buttons.consultation', { ns: 'common' })}
                  <ArrowRight className={`${buttonArrowClass} ml-2`} />
                </span>
              </button>
            </div>
            
            {/* Trust badges removed as requested */}
          </div>
          
          {/* Image section with enhanced visual effects */}
          <div className={`absolute right-0 top-0 bottom-0 w-[50%] h-full flex items-center justify-end transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="relative">
              {/* Enhanced glow effect */}
              <div className="absolute -inset-12 bg-gradient-to-tr from-[#7BA7C2]/10 to-[#7BA7C2]/5 rounded-full blur-3xl"></div>
              
              {/* Subtle animated decorative elements */}
              <div className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full border border-[#7BA7C2]/20 animate-pulse-slow"></div>
              <div className="absolute bottom-1/3 right-1/3 w-28 h-28 rounded-full border border-[#7BA7C2]/10 animate-pulse-slower"></div>
              <div className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full border border-[#7BA7C2]/15 animate-pulse"></div>
              
              <img 
                src="/images/Model_Bart.png"
                alt="Barthaartransplantation Experte - Modernste Techniken für natürliche Ergebnisse"
                className="w-auto h-auto max-h-[750px] object-contain object-center relative z-10 scale-125"
                width="650"
                height="850"
              />
            </div>
          </div>
          
          {/* Scroll indicator removed as requested */}
        </div>
      </div>
      
      {/* Animation classes are defined in index.css */}
    </div>
  );
};

export default HeroSection;
