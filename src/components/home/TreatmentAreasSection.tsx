import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
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

interface TreatmentArea {
  id: string;
  imageUrl: string;
  titleKey: string;
  descriptionKey: string;
  mobileDescription: string;
  altText: string;
  features: string[];
}

const TreatmentAreasSection: React.FC = () => {
  const { t } = useTranslation(['home', 'common']);
  const [isVisible, setIsVisible] = useState(false);
  const [hoverCard, setHoverCard] = useState<string | null>(null);
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

  // Trigger entrance animations on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const element = document.getElementById('treatment-areas-section');
      
      if (element) {
        const elementPosition = element.offsetTop + 200;
        
        if (scrollPosition > elementPosition) {
          setIsVisible(true);
        }
      }
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Treatment areas data with enhanced information
  const treatmentAreas: TreatmentArea[] = [
    {
      id: 'head',
      imageUrl: '/images/Behandlung_Haartransplantation.webp',
      titleKey: 'treatmentAreasSection.areas.0.title',
      descriptionKey: 'treatmentAreasSection.areas.0.description',
      mobileDescription: 'Leiden Sie unter kahlen Stellen oder Geheimratsecken?',
      altText: 'Haartransplantation in Mönchengladbach - Wiederherstellung des Haupthaars mit modernsten FUE und DHI Techniken',
      features: [
        'Dauerhafte Lösung für Haarausfall',
        'Natürlich aussehende Haarlinie',
        'Schmerzarme Behandlung unter lokaler Betäubung'
      ]
    },
    {
      id: 'beard',
      imageUrl: '/images/Behandlung_Barthaartransplantation.webp',
      titleKey: 'treatmentAreasSection.areas.1.title',
      descriptionKey: 'treatmentAreasSection.areas.1.description',
      mobileDescription: 'Wünschen Sie sich einen volleren Bart ohne Lücken?',
      altText: 'Barthaartransplantation in der Dion Hair Clinic - Verdichtung und Neugestaltung des Bartwuchses für einen volleren Bart',
      features: [
        'Individuelle Bartgestaltung nach Wunsch',
        'Füllung von lückenhaftem Bartwuchs',
        'Definierte Konturen und Vollbart möglich'
      ]
    },
    {
      id: 'eyebrows',
      imageUrl: '/images/Behandlung_Augenbrauentransplantation.webp',
      titleKey: 'treatmentAreasSection.areas.2.title',
      descriptionKey: 'treatmentAreasSection.areas.2.description',
      mobileDescription: 'Möchten Sie ausdrucksstarke, volle Augenbrauen?',
      altText: 'Augenbrauentransplantation bei Dion Hair Clinic - Wiederherstellung oder Verdichtung der Augenbrauen für einen ausdrucksstarken Blick',
      features: [
        'Maßgeschneiderte Augenbrauenform',
        'Präzise Platzierung jedes Haarfollikels',
        'Natürlicher Wuchswinkel und -richtung'
      ]
    }
  ];

  return (
    <section id="treatment-areas-section" className="py-24 md:py-32 relative overflow-hidden">
      {/* Elegant background with subtle animations */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient with theme colors */}
        <div className="absolute inset-0" 
             style={{ background: `linear-gradient(to bottom, ${activeTheme.backgroundLight}, ${activeTheme.backgroundDark}, ${activeTheme.backgroundLight})` }}></div>
        
        {/* Animated gradient circles */}
        <div className="absolute -z-10 w-[800px] h-[800px] rounded-full -top-[400px] -left-[400px] blur-3xl"
             style={{ background: `linear-gradient(to bottom right, ${activeTheme.accent}05, transparent)` }}></div>
        <div className="absolute -z-10 w-[600px] h-[600px] rounded-full -bottom-[300px] -right-[300px] blur-3xl"
             style={{ background: `linear-gradient(to top right, ${activeTheme.accent}05, transparent)` }}></div>
        
        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.015]" 
          style={{ 
            backgroundImage: 'url("/images/dionhairclinic_bg.svg")',
            backgroundSize: '200px',
            backgroundRepeat: 'repeat'
          }}
        ></div>
        
        {/* Animated gradient lines */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-1/3 left-0 w-full h-[1px]"
               style={{ background: `linear-gradient(to right, transparent, ${activeTheme.accent}, transparent)` }}></div>
          <div className="absolute top-2/3 left-0 w-full h-[1px]"
               style={{ background: `linear-gradient(to right, transparent, ${activeTheme.accent}, transparent)` }}></div>
        </div>
      </div>
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Elegant section header */}
        <div className="text-center mb-20">
          <div className="inline-block relative">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full blur-xl"
                 style={{ backgroundColor: `${activeTheme.accent}10` }}></div>
            <h2 className={`${textStyle.sectionTitle} mb-4`} 
                style={{ 
                  color: activeTheme.textPrimary,
                  fontSize: typographySettings.fontSizeH2,
                  fontWeight: getFontWeight(typographySettings.fontWeightHeadings),
                  lineHeight: getLineHeight(typographySettings.lineHeightHeadings),
                  letterSpacing: getLetterSpacing(typographySettings.letterSpacingHeadings)
                }}
                lang="de">{t('treatmentAreasSection.title')}</h2>
            <div className="w-[90%] max-w-[300px] mx-auto h-px" 
                 style={{ background: `linear-gradient(to right, transparent, ${activeTheme.divider}, transparent)` }}></div>
          </div>
          <p className={`max-w-3xl mx-auto mt-6`}
             style={{ 
               color: activeTheme.textSecondary,
               fontSize: typographySettings.fontSizeBase,
               fontWeight: getFontWeight(typographySettings.fontWeightBody),
               lineHeight: getLineHeight(typographySettings.lineHeightBody)
             }}>
            {t('treatmentAreasSection.subtitle')}
          </p>
        </div>

        {/* Mobile View - Only visible on small screens */}
        <div className="md:hidden space-y-10">
          {treatmentAreas.map((area, index) => (
            <div 
              key={area.id}
              className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Treatment area card with enhanced styling */}
              <div className="bg-white overflow-hidden border border-gray-100/80"
                   style={{ 
                     borderRadius: `${uiElementsSettings.borderRadius}px`,
                     boxShadow: shadowStyle
                   }}>
                {/* Image container with elegant styling */}
                <div className="relative">
                  <div className="absolute inset-0" 
                       style={{ background: `linear-gradient(to bottom, ${activeTheme.accent}10, transparent)` }}></div>
                  <img
                    src={area.imageUrl}
                    alt={area.altText}
                    className="w-full h-64 object-cover relative z-10"
                    loading="lazy"
                  />
                  {/* Elegant overlay with title */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 z-20">
                    <h3 className={`${textStyle.primaryHeading} text-white mb-0`}
                        style={{ 
                          fontWeight: getFontWeight(typographySettings.fontWeightHeadings),
                          letterSpacing: getLetterSpacing(typographySettings.letterSpacingHeadings)
                        }}>{t(area.titleKey)}</h3>
                  </div>
                </div>
                
                  {/* Text content container with refined typography and fixed height - enhanced with features */}
                  <div className="p-6 text-center flex flex-col h-[350px]">
                    <div className="flex-grow">
                      <div className="h-[80px] overflow-hidden">
                        <p style={{ 
                          color: activeTheme.textSecondary,
                          fontSize: typographySettings.fontSizeBase,
                          fontWeight: getFontWeight(typographySettings.fontWeightBody),
                          lineHeight: getLineHeight(typographySettings.lineHeightBody)
                        }}>
                          {t(area.descriptionKey)}
                        </p>
                      </div>
                      
                      {/* Key features with elegant styling and fixed height */}
                      <div className="mt-4 h-[120px] space-y-2">
                        {area.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                 style={{ backgroundColor: `${activeTheme.accent}20` }}>
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: activeTheme.accent }}></div>
                            </div>
                            <p className={`${fontSize.sm} text-left`}
                               style={{ 
                                 color: activeTheme.textSecondary,
                                 fontWeight: getFontWeight(typographySettings.fontWeightBody)
                               }}>
                              {feature}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Elegant button with ripple effect - positioned at bottom */}
                    <div className="mt-auto pt-6 pb-2">
                      <button 
                        className={`${buttonStyle.primary} w-full transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]`}
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
                        <span className={`relative flex items-center justify-center ${textStyle.button} uppercase`}>
                          {t('buttons.moreInfo', { ns: 'common' })}
                          <ArrowRight className={`${buttonArrowClass} ml-2`} />
                        </span>
                      </button>
                    </div>
                  </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View - Hidden on small screens, grid layout on medium and up */}
        <div className="hidden md:grid grid-cols-3 gap-10">
          {treatmentAreas.map((area, index) => {
            const isHovered = area.id === hoverCard;
            
            return (
              <div 
                key={area.id}
                className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoverCard(area.id)}
                onMouseLeave={() => setHoverCard(null)}
              >
                {/* Treatment area card with glass morphism and hover effects */}
                <div className={`group relative bg-white backdrop-blur-sm overflow-hidden transition-all duration-500 h-full ${
                  isHovered 
                    ? 'shadow-xl transform -translate-y-2 border-2' 
                    : 'border border-gray-100/80 hover:shadow-xl'
                }`}
                     style={{ 
                       borderColor: isHovered ? activeTheme.accent : undefined,
                       borderRadius: `${uiElementsSettings.borderRadius}px`,
                       boxShadow: shadowStyle
                     }}>
                  {/* Image container with elegant overlay effects */}
                  <div className="relative h-72 overflow-hidden">
                    {/* Gradient overlay that intensifies on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 transition-opacity duration-500 ${
                      isHovered ? 'opacity-80' : 'opacity-60'
                    }`}></div>
                    
                    {/* Subtle color overlay on hover */}
                    <div className={`absolute inset-0 z-10 transition-opacity duration-500 ${
                      isHovered ? 'opacity-30' : 'opacity-0'
                    }`}
                         style={{ backgroundColor: `${activeTheme.accent}20` }}></div>
                    
                    {/* Image with zoom effect on hover */}
                    <img
                      src={area.imageUrl}
                      alt={area.altText}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    
                    {/* Title overlay positioned at bottom of image */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 z-20 transform transition-transform duration-500">
                      <h3 className={`${textStyle.primaryHeading} mb-0 group-hover:text-white`}
                          style={{ 
                            color: isHovered ? `${activeTheme.accent}E6` : 'white',
                            fontWeight: getFontWeight(typographySettings.fontWeightHeadings),
                            letterSpacing: getLetterSpacing(typographySettings.letterSpacingHeadings)
                          }}>
                        {t(area.titleKey)}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Text content container with refined typography and fixed height - enhanced with features */}
                  <div className="p-8 flex flex-col h-[380px]">
                    <div className="flex-grow">
                      <div className="h-[100px] overflow-hidden">
                        <p style={{ 
                          color: activeTheme.textSecondary,
                          fontSize: typographySettings.fontSizeBase,
                          fontWeight: getFontWeight(typographySettings.fontWeightBody),
                          lineHeight: getLineHeight(typographySettings.lineHeightBody)
                        }}>
                          {t(area.descriptionKey)}
                        </p>
                      </div>
                      
                      {/* Key features with elegant styling and fixed height */}
                      <div className="mt-6 h-[120px] space-y-3">
                        {area.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                 style={{ backgroundColor: `${activeTheme.accent}20` }}>
                              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeTheme.accent }}></div>
                            </div>
                            <p className={`${fontSize.sm} text-left`}
                               style={{ 
                                 color: activeTheme.textSecondary,
                                 fontWeight: getFontWeight(typographySettings.fontWeightBody)
                               }}>
                              {feature}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Elegant button with ripple effect - positioned at bottom */}
                    <div className="mt-auto pt-6 pb-2">
                      <button 
                        className={`${buttonStyle.primary} w-full transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]`}
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
                        <span className={`relative flex items-center justify-center ${textStyle.button} uppercase`}>
                          {t('buttons.moreInfo', { ns: 'common' })}
                          <ArrowRight className={`${buttonArrowClass} ml-2`} />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Decorative shadow element */}
                <div className={`absolute -z-10 w-full h-full top-3 left-3 transition-all duration-500 ${
                  isHovered ? 'opacity-70' : 'opacity-0'
                }`}
                     style={{ 
                       backgroundColor: `${activeTheme.accent}10`,
                       borderRadius: `${uiElementsSettings.borderRadius}px`
                     }}></div>
              </div>
            );
          })}
        </div>
        
        {/* Elegant CTA Section */}
        <div className={`mt-20 relative transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="absolute inset-0" 
               style={{ 
                 backgroundColor: `${activeTheme.accent}05`,
                 borderRadius: `${uiElementsSettings.borderRadius}px`
               }}></div>
          <div className="relative bg-white/80 backdrop-blur-sm p-8 md:p-10 shadow-lg border border-gray-100 overflow-hidden"
               style={{ 
                 borderRadius: `${uiElementsSettings.borderRadius}px`,
                 boxShadow: shadowStyle
               }}>
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full -mr-32 -mt-32 blur-xl"
                 style={{ backgroundColor: `${activeTheme.accent}05` }}></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full -ml-32 -mb-32 blur-xl"
                 style={{ backgroundColor: `${activeTheme.accent}05` }}></div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div className="md:w-2/3">
                <h3 className={`${fontSize.h3} mb-4 text-center md:text-left`}
                    style={{ 
                      color: activeTheme.primary,
                      fontWeight: getFontWeight(typographySettings.fontWeightHeadings),
                      lineHeight: getLineHeight(typographySettings.lineHeightHeadings),
                      letterSpacing: getLetterSpacing(typographySettings.letterSpacingHeadings)
                    }}>Persönliche Beratung vereinbaren</h3>
                <p className={`text-center md:text-left px-2 md:px-0`}
                   style={{ 
                     color: activeTheme.textSecondary,
                     fontSize: typographySettings.fontSizeBase,
                     fontWeight: getFontWeight(typographySettings.fontWeightBody),
                     lineHeight: getLineHeight(typographySettings.lineHeightBody)
                   }}>
                  Entdecken Sie, wie wir Ihnen helfen können, Ihr Selbstvertrauen zurückzugewinnen. In einem persönlichen 
                  Beratungsgespräch analysieren wir Ihre individuelle Situation und entwickeln einen maßgeschneiderten Behandlungsplan 
                  für Haare, Bart oder Augenbrauen.
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center md:justify-end">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default TreatmentAreasSection;
