import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { textStyle, fontSize, fontWeight, gradientUnderline, tracking } from '../../utils/typography';
import { buttonStyle, buttonRippleClass, buttonArrowClass } from '../../utils/buttons';
import { useTheme } from '../../utils/ThemeProvider';

const HeroSection: React.FC = () => {
  const { t } = useTranslation(['hairTransplantation', 'common']);
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const { activeTheme } = useTheme();

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
        <div className="absolute inset-0" 
             style={{ background: `linear-gradient(to bottom, ${activeTheme.backgroundLight}, ${activeTheme.backgroundDark}, ${activeTheme.backgroundLight})` }}></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full -mr-[400px] -mt-[400px] blur-3xl"
             style={{ backgroundColor: `${activeTheme.accent}05` }}></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full -ml-[300px] -mb-[300px] blur-3xl"
             style={{ backgroundColor: `${activeTheme.accent}05` }}></div>
        
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
          <div className="absolute top-0 left-0 w-full h-[1px] animate-gradient-x"
               style={{ background: `linear-gradient(to right, transparent, ${activeTheme.accent}, transparent)` }}></div>
          <div className="absolute top-1/3 left-0 w-full h-[1px] animate-gradient-x-slow"
               style={{ background: `linear-gradient(to right, transparent, ${activeTheme.accent}, transparent)` }}></div>
          <div className="absolute top-2/3 left-0 w-full h-[1px] animate-gradient-x-slower"
               style={{ background: `linear-gradient(to right, transparent, ${activeTheme.accent}, transparent)` }}></div>
        </div>
      </div>
      
      {/* Mobile Layout - Redesigned for perfect aesthetics */}
      <div className="md:hidden w-full max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col min-h-[100vh] px-5">
          {/* Top section with logo and subtle animation */}
          <div className="pt-6 pb-4 flex justify-center">
            <div className={`relative transition-all duration-700 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="absolute -inset-3 bg-gradient-to-r from-white/80 to-white/80 rounded-full blur-xl"
                   style={{ background: `linear-gradient(to right, ${activeTheme.accent}10, white/80)` }}></div>
              <img 
                src="/images/DionHairClinic_Logo.svg" 
                alt="Dion Hair Clinic" 
                className="h-12 relative z-10 drop-shadow-sm" 
              />
            </div>
          </div>
          
          {/* Main content area with perfect spacing */}
          <div className="flex-1 flex flex-col justify-between py-4">
            {/* Text content with refined typography and animations */}
            <div className="space-y-6 mt-4">
              {/* Title with elegant animation and perfect typography */}
              <div className={`transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}>
                <h1 className={`${textStyle.heroTitle} text-center px-1 leading-tight break-words hyphens-auto`} lang="de">
                  {t('heroSection.title')}
                </h1>
                
                {/* Subtitle with refined styling */}
                <div className="mt-3 mb-2">
                  <span className={`block text-center ${fontSize.h4} ${fontWeight.light} ${tracking.wider} leading-relaxed`}
                        style={{ color: activeTheme.textSecondary }}>
                    {t('heroSection.subtitle')}
                  </span>
                </div>
                
                {/* Elegant gradient underline with perfect animation */}
                <div className={`h-[1.5px] w-[85%] max-w-[280px] mx-auto mt-5 transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
                     style={{ background: `linear-gradient(to right, transparent, ${activeTheme.accent}, transparent)` }}></div>
              </div>
              
              {/* Welcome text with perfect spacing and animation */}
              <div className={`px-2 transition-all duration-1000 delay-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <p className={`${fontSize.base} ${fontWeight.normal} text-center max-w-md mx-auto leading-relaxed`}
                   style={{ color: activeTheme.textSecondary }}>
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
            <div className="mt-10 mb-16 relative">
              {/* Decorative elements */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[120%] h-[300px] rounded-[100%] blur-2xl opacity-60"
                     style={{ background: `linear-gradient(to top, ${activeTheme.accent}10, transparent)` }}></div>
              </div>
              
              {/* Image with refined animation and effects */}
              <div className={`relative flex justify-center transition-all duration-1000 delay-1100 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <div className="relative">
                  {/* Enhanced glow effect */}
                  <div className="absolute -inset-4 bottom-0 rounded-full blur-3xl"
                       style={{ background: `linear-gradient(to top, ${activeTheme.accent}20, ${activeTheme.accent}05)` }}></div>
                  
                  {/* Subtle animated decorative elements */}
                  <div className="absolute top-1/4 -left-4 w-12 h-12 rounded-full border animate-pulse-slow"
                       style={{ borderColor: `${activeTheme.accent}20` }}></div>
                  <div className="absolute bottom-1/3 -right-6 w-16 h-16 rounded-full border animate-pulse-slower"
                       style={{ borderColor: `${activeTheme.accent}10` }}></div>
                  
                  <img 
                    src="/images/Dion_Model_Mobile.png"
                    alt="Dr. Dion - Führender Experte für Haartransplantation"
                    className="w-auto h-auto max-h-[420px] object-contain relative z-10"
                    style={{ 
                      filter: 'drop-shadow(0 20px 13px rgb(0 0 0 / 0.05)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.1))'
                    }}
                    width="400"
                    height="600"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Removed "Mehr entdecken" scroll indicator */}
        </div>
      </div>
      
      {/* Desktop Layout - Refined for perfect aesthetics */}
      <div className="hidden md:block w-full max-w-7xl mx-auto px-8 relative z-10">
        <div className="relative min-h-[600px] flex items-center">
          {/* No logo in desktop version as per original design */}
          
          {/* Text content with refined typography and animations */}
          <div className="relative z-10 w-[55%] flex flex-col justify-center h-full pt-6">
            {/* Title with elegant animation and perfect typography */}
            <div className={`transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}>
              <h1 className={`${textStyle.heroTitle} text-left leading-tight break-words hyphens-auto`} lang="de">
                {t('heroSection.title')}
              </h1>
              
              {/* Subtitle with refined styling */}
              <div className="mt-3 mb-2">
                <span className={`block ${fontSize.h3} ${fontWeight.light} ${tracking.elegant} leading-relaxed`}
                      style={{ color: activeTheme.textSecondary }}>
                  {t('heroSection.subtitle')}
                </span>
              </div>
              
              {/* Elegant gradient underline with perfect animation */}
              <div className={`h-[1.5px] w-[90%] max-w-[400px] mt-6 mb-8 transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
                   style={{ background: `linear-gradient(to right, transparent, ${activeTheme.accent}, transparent)` }}></div>
            </div>
            
            {/* Welcome text with perfect spacing and animation */}
            <div className={`transition-all duration-1000 delay-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <p className={`${fontSize.lg} ${fontWeight.normal} max-w-2xl leading-relaxed`}
                 style={{ color: activeTheme.textPrimary }}>
                {t('heroSection.welcomeText')}
              </p>
            </div>
            
            {/* Stats with refined styling and animations */}
            <div className={`flex gap-14 mt-12 transition-all duration-1000 delay-900 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <div className="flex flex-col">
                <span className={`${textStyle.stat}`} style={{ color: activeTheme.accent }}>98%</span>
                <span className={`${fontSize.sm} ${fontWeight.light} tracking-wide`} style={{ color: activeTheme.textLight }}>Zufriedene Patienten</span>
              </div>
              <div className="flex flex-col">
                <span className={`${textStyle.stat}`} style={{ color: activeTheme.accent }}>5.000+</span>
                <span className={`${fontSize.sm} ${fontWeight.light} tracking-wide`} style={{ color: activeTheme.textLight }}>Erfolgreiche Behandlungen</span>
              </div>
              <div className="flex flex-col">
                <span className={`${textStyle.stat}`} style={{ color: activeTheme.accent }}>15+</span>
                <span className={`${fontSize.sm} ${fontWeight.light} tracking-wide`} style={{ color: activeTheme.textLight }}>Jahre Erfahrung</span>
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
            
            {/* Removed trust badges */}
          </div>
          
          {/* Image section with enhanced visual effects */}
          <div className={`absolute right-0 top-0 bottom-0 w-[50%] h-full flex items-center justify-end transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="relative">
              {/* Enhanced glow effect */}
              <div className="absolute -inset-12 rounded-full blur-3xl"
                   style={{ background: `linear-gradient(to top right, ${activeTheme.accent}10, ${activeTheme.accent}05)` }}></div>
              
              {/* Subtle animated decorative elements */}
              <div className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full border animate-pulse-slow"
                   style={{ borderColor: `${activeTheme.accent}20` }}></div>
              <div className="absolute bottom-1/3 right-1/3 w-28 h-28 rounded-full border animate-pulse-slower"
                   style={{ borderColor: `${activeTheme.accent}10` }}></div>
              <div className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full border animate-pulse"
                   style={{ borderColor: `${activeTheme.accent}15` }}></div>
              
              <img 
                src="/images/Dion_Model_Home.webp"
                alt="Haartransplantation Experte - Modernste Techniken für natürliche Ergebnisse"
                className="w-auto h-auto max-h-[620px] object-contain object-center relative z-10"
                style={{ 
                  filter: 'drop-shadow(0 20px 13px rgb(0 0 0 / 0.05)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.1))'
                }}
                width="600"
                height="800"
              />
            </div>
          </div>
          
          {/* Removed "Mehr entdecken" scroll indicator */}
        </div>
      </div>
      
      {/* Animation classes are defined in index.css */}
    </div>
  );
};

export default HeroSection;
