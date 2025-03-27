import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ChevronDown, Star } from 'lucide-react';
import { textStyle, fontSize, fontWeight, gradientUnderline, tracking, lineHeight } from '../../utils/typography';
import { buttonStyle, buttonRippleClass, buttonArrowClass } from '../../utils/buttons';
import { useTheme } from '../../utils/ThemeProvider';

// Hilfsfunktionen für Typografie-Einstellungen
const getFontWeight = (weightName: string): number => {
  switch (weightName) {
    case 'light': return 300;
    case 'normal': return 400;
    case 'medium': return 500;
    case 'semibold': return 600;
    case 'bold': return 700;
    default: return 400;
  }
};

const getLineHeight = (lineHeightName: string): number => {
  switch (lineHeightName) {
    case 'tight': return 1.25;
    case 'normal': return 1.5;
    case 'relaxed': return 1.625;
    case 'loose': return 2;
    default: return 1.5;
  }
};

const getLetterSpacing = (letterSpacingName: string): string => {
  switch (letterSpacingName) {
    case 'tighter': return '-0.05em';
    case 'tight': return '-0.025em';
    case 'normal': return '0';
    case 'wide': return '0.025em';
    case 'wider': return '0.05em';
    case 'elegant': return '0.1em';
    default: return '0';
  }
};

const HeroSection: React.FC = () => {
  const { t } = useTranslation(['home', 'common']);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { activeTheme } = useTheme();

  // Typografie- und UI-Elemente-Einstellungen aus dem Theme
  const typographySettings = activeTheme.typography || {
    fontSizeH1: '3rem',
    fontSizeH2: '2.25rem',
    fontSizeBase: '1rem',
    fontWeightHeadings: 'light',
    fontWeightBody: 'normal',
    fontWeightButtons: 'medium',
    lineHeightHeadings: 'tight',
    lineHeightBody: 'relaxed',
    letterSpacingHeadings: 'wider',
    letterSpacingButtons: 'wider'
  };

  const uiElementsSettings = activeTheme.uiElements || {
    shadowIntensity: 6,
    shadowBlur: 8,
    shadowSpread: 0,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    borderStandard: 1,
    borderHighlighted: 2,
    borderRadius: 8
  };

  // Berechne den Schatten-Stil basierend auf den Einstellungen
  const shadowStyle = `0 ${uiElementsSettings.shadowIntensity}px ${uiElementsSettings.shadowBlur}px ${uiElementsSettings.shadowSpread}px ${uiElementsSettings.shadowColor}`;

  // Trigger entrance animations immediately
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Create an array of benefits from translation keys
  const benefits = [
    'heroSection.benefits.experience',
    'heroSection.benefits.technology',
    'heroSection.benefits.care',
    'heroSection.benefits.results',
    'heroSection.benefits.painless',
    'heroSection.benefits.satisfaction',
    'heroSection.benefits.specialists',
    'heroSection.benefits.aftercare',
    'heroSection.benefits.consultation',
    'heroSection.benefits.customized'
  ];

  return (
    <div 
      ref={heroRef}
      className="relative overflow-hidden min-h-[75vh] flex items-center"
    >
      {/* Background with gradient and blur effects */}
      <div className="absolute inset-0 z-0">
        {/* Main gradient background with theme colors */}
        <div className="absolute inset-0" style={{ 
          background: `linear-gradient(to bottom, ${activeTheme.backgroundLight}, ${activeTheme.backgroundDark}, ${activeTheme.backgroundLight})` 
        }}></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full -mr-[400px] -mt-[400px] blur-3xl"
             style={{ backgroundColor: `${activeTheme.backgroundDark}20` }}></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full -ml-[300px] -mb-[300px] blur-3xl"
             style={{ backgroundColor: `${activeTheme.backgroundDark}20` }}></div>
        
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
               style={{ background: `linear-gradient(to right, transparent, ${activeTheme.divider}, transparent)` }}></div>
          <div className="absolute top-1/3 left-0 w-full h-[1px] animate-gradient-x-slow"
               style={{ background: `linear-gradient(to right, transparent, ${activeTheme.divider}, transparent)` }}></div>
          <div className="absolute top-2/3 left-0 w-full h-[1px] animate-gradient-x-slower"
               style={{ background: `linear-gradient(to right, transparent, ${activeTheme.divider}, transparent)` }}></div>
        </div>
      </div>
      
      {/* Mobile Layout */}
      <div className="md:hidden w-full max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col min-h-[100vh] px-5">
          {/* Top section with logo and subtle animation */}
          <div className="pt-6 pb-4 flex justify-center">
            <div className={`relative transition-all duration-700 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="absolute -inset-3 rounded-full blur-xl"
                   style={{ background: `linear-gradient(to right, ${activeTheme.backgroundDark}50, ${activeTheme.background}80)` }}></div>
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
                <h1 className={`${textStyle.heroTitle} text-center px-1 leading-tight break-words hyphens-auto`} 
                    style={{ 
                      color: activeTheme.textPrimary,
                      fontSize: typographySettings.fontSizeH1,
                      fontWeight: getFontWeight(typographySettings.fontWeightHeadings),
                      lineHeight: getLineHeight(typographySettings.lineHeightHeadings),
                      letterSpacing: getLetterSpacing(typographySettings.letterSpacingHeadings)
                    }} 
                    lang="de">
                  {t('heroSection.title')}
                </h1>
                
                {/* Subtitle with refined styling */}
                <div className="mt-3 mb-2">
                  <span className={`block text-center ${fontSize.h4}`}
                        style={{ 
                          color: activeTheme.textSecondary,
                          fontWeight: getFontWeight(typographySettings.fontWeightHeadings),
                          letterSpacing: getLetterSpacing(typographySettings.letterSpacingHeadings)
                        }}>
                    {t('heroSection.subtitle').split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {i > 0 && <br />}
                        {line}
                      </React.Fragment>
                    ))}
                  </span>
                </div>
                
                {/* Elegant gradient underline with perfect animation */}
                <div className={`h-[1.5px] w-[85%] max-w-[280px] mx-auto mt-5 transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}
                     style={{ background: `linear-gradient(to right, transparent, ${activeTheme.divider}, transparent)` }}></div>
              </div>
              
              {/* Welcome text with perfect spacing and animation */}
              <div className={`px-2 transition-all duration-1000 delay-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <p className={`text-center max-w-md mx-auto`}
                   style={{ 
                     color: activeTheme.textSecondary,
                     fontSize: typographySettings.fontSizeBase,
                     fontWeight: getFontWeight(typographySettings.fontWeightBody),
                     lineHeight: getLineHeight(typographySettings.lineHeightBody)
                   }}>
                  {t('heroSection.welcomeText')}
                </p>
              </div>
              
              
              {/* CTA button with refined styling and animation */}
              <div className={`flex justify-center mt-8 transition-all duration-1000 delay-900 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <button 
                  className={`${buttonStyle.primary} transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]`}
                  style={{ 
                    background: `linear-gradient(to right, ${activeTheme.accent}, ${activeTheme.accentDark})`,
                    color: 'white',
                    boxShadow: shadowStyle,
                    borderRadius: `${uiElementsSettings.borderRadius}px`,
                    fontWeight: getFontWeight(typographySettings.fontWeightButtons),
                    letterSpacing: getLetterSpacing(typographySettings.letterSpacingButtons)
                  }}
                >
                  <span className={buttonRippleClass}></span>
                  <span className={`relative flex items-center ${textStyle.button} uppercase`}>
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
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[120%] h-[300px] bg-gradient-to-t from-gray-200/30 to-transparent rounded-[100%] blur-2xl opacity-60"></div>
              </div>
              
              {/* Image with refined animation and effects */}
              <div className={`relative flex justify-center transition-all duration-1000 delay-1100 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <div className="relative">
                  {/* Enhanced glow effect */}
                  <div className="absolute -inset-4 bottom-0 bg-gradient-to-t from-gray-200/50 to-gray-100/20 rounded-full blur-3xl"></div>
                  
                  {/* Subtle animated decorative elements */}
                  <div className="absolute top-1/4 -left-4 w-12 h-12 rounded-full border border-gray-300/50 animate-pulse-slow"></div>
                  <div className="absolute bottom-1/3 -right-6 w-16 h-16 rounded-full border border-gray-300/30 animate-pulse-slower"></div>
                  
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
        </div>
      </div>
      
      {/* Desktop Layout */}
      <div className="hidden md:block w-full max-w-7xl mx-auto px-8 relative z-10">
        <div className="relative min-h-[600px] flex items-center">
          {/* Text content with refined typography and animations */}
          <div className="relative z-10 w-[55%] flex flex-col justify-center h-full pt-6">
            {/* Title with elegant animation and perfect typography */}
            <div className={`transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}>
              <h1 className={`${textStyle.heroTitle} text-left leading-tight break-words hyphens-auto`} 
                  style={{ 
                    color: activeTheme.textPrimary,
                    fontSize: typographySettings.fontSizeH1,
                    fontWeight: getFontWeight(typographySettings.fontWeightHeadings),
                    lineHeight: getLineHeight(typographySettings.lineHeightHeadings),
                    letterSpacing: getLetterSpacing(typographySettings.letterSpacingHeadings)
                  }}
                  lang="de">
                {t('heroSection.title')}
              </h1>
              
              {/* Subtitle with refined styling */}
              <div className="mt-3 mb-2">
                <span className={`block ${fontSize.h3}`}
                      style={{ 
                        color: activeTheme.textSecondary,
                        fontWeight: getFontWeight(typographySettings.fontWeightHeadings),
                        letterSpacing: getLetterSpacing(typographySettings.letterSpacingHeadings)
                      }}>
                  {t('heroSection.subtitle').split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {i > 0 && <br />}
                      {line}
                    </React.Fragment>
                  ))}
                </span>
              </div>
              
              {/* Elegant gradient underline with perfect animation */}
              <div className={`${gradientUnderline.primary} h-[1.5px] w-[90%] max-w-[400px] mt-6 mb-8 transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
            </div>
            
            {/* Welcome text with perfect spacing and animation */}
            <div className={`transition-all duration-1000 delay-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <p className={`${textStyle.bodyTextImportant} max-w-2xl`}
                 style={{ 
                   color: activeTheme.textSecondary,
                   fontSize: typographySettings.fontSizeBase,
                   fontWeight: getFontWeight(typographySettings.fontWeightBody),
                   lineHeight: getLineHeight(typographySettings.lineHeightBody)
                 }}>
                {t('heroSection.welcomeText')}
              </p>
            </div>
            
            
            {/* CTA button with refined styling and animation */}
            <div className={`mt-12 flex justify-start transition-all duration-1000 delay-1100 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <button 
                className={`${buttonStyle.primary} transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]`}
                style={{ 
                  background: `linear-gradient(to right, ${activeTheme.accent}, ${activeTheme.accentDark})`,
                  color: 'white',
                  boxShadow: shadowStyle,
                  borderRadius: `${uiElementsSettings.borderRadius}px`,
                  fontWeight: getFontWeight(typographySettings.fontWeightButtons),
                  letterSpacing: getLetterSpacing(typographySettings.letterSpacingButtons)
                }}
              >
                <span className={buttonRippleClass}></span>
                <span className={`relative flex items-center ${textStyle.button} uppercase`}>
                  {t('buttons.consultation', { ns: 'common' })}
                  <ArrowRight className={`${buttonArrowClass} ml-2`} />
                </span>
              </button>
            </div>
          </div>
          
          {/* Image section with enhanced visual effects */}
          <div className={`absolute right-0 top-0 bottom-0 w-[50%] h-full flex items-center justify-end transition-all duration-1000 delay-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="relative">
              {/* Enhanced glow effect */}
              <div className="absolute -inset-12 bg-gradient-to-tr from-gray-200/30 to-gray-100/20 rounded-full blur-3xl"></div>
              
              {/* Subtle animated decorative elements */}
              <div className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full border border-gray-300/50 animate-pulse-slow"></div>
              <div className="absolute bottom-1/3 right-1/3 w-28 h-28 rounded-full border border-gray-300/30 animate-pulse-slower"></div>
              <div className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full border border-gray-300/40 animate-pulse"></div>
              
              {/* Light rays behind image */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-gray-200/30 to-transparent rounded-full blur-3xl opacity-70"></div>
              </div>
              
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
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
