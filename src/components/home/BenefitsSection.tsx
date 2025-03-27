import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Users, Zap, Compass, UserCheck, Clock, MapPin, ArrowRight } from 'lucide-react';
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

interface BenefitCard {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const BenefitsSection: React.FC = () => {
  const { t } = useTranslation(['home', 'common']);
  const [hoverCard, setHoverCard] = useState<number | null>(null);
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

  // Icons for each benefit
  const benefitIcons = [
    <Users strokeWidth={1.5} />,
    <Zap strokeWidth={1.5} />,
    <Compass strokeWidth={1.5} />,
    <UserCheck strokeWidth={1.5} />,
    <Clock strokeWidth={1.5} />,
    <MapPin strokeWidth={1.5} />
  ];

  // Create benefit cards with more general content covering all treatment areas
  const benefitCards: BenefitCard[] = [
    {
      title: "Erfahrenes Expertenteam",
      description: "Unser Team besteht aus hochqualifizierten Spezialisten mit jahrelanger Erfahrung in Haar-, Bart- und Augenbrauentransplantationen, die regelmäßig an Fortbildungen teilnehmen.",
      icon: benefitIcons[0]
    },
    {
      title: "Modernste Verfahren",
      description: "Wir setzen auf innovative Techniken wie Saphir-FUE und DHI, die präzisere Ergebnisse, schnellere Heilung und ein natürlicheres Aussehen bei allen Transplantationsarten ermöglichen.",
      icon: benefitIcons[1]
    },
    {
      title: "Ganzheitliches Konzept",
      description: "Unser 360°-Ansatz umfasst nicht nur die Transplantation, sondern auch eine umfassende Analyse, Ernährungsberatung und ergänzende Behandlungen für optimale Ergebnisse.",
      icon: benefitIcons[2]
    },
    {
      title: "Individuelle Beratung",
      description: "Jeder Patient erhält einen maßgeschneiderten Behandlungsplan, der auf seine spezifischen Bedürfnisse, Haarstruktur und persönlichen Wünsche abgestimmt ist.",
      icon: benefitIcons[3]
    },
    {
      title: "Langzeitnachsorge",
      description: "Wir begleiten Sie auch nach dem Eingriff mit regelmäßigen Kontrollterminen und unterstützenden Behandlungen für langfristig beste Resultate in allen Behandlungsbereichen.",
      icon: benefitIcons[4]
    },
    {
      title: "Keine Auslandsreise nötig",
      description: "Genießen Sie höchste medizinische Standards in Deutschland ohne Sprachbarrieren, lange Reisen oder Risiken durch mangelnde Nachsorge im Ausland.",
      icon: benefitIcons[5]
    }
  ];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Decorative elements with theme colors */}
      <div className="absolute -z-10 w-full h-full inset-0" 
           style={{ background: `linear-gradient(to bottom, ${activeTheme.backgroundLight}, ${activeTheme.backgroundDark}, ${activeTheme.backgroundLight})` }}></div>
      <div className="absolute -z-10 w-[800px] h-[800px] rounded-full -top-[400px] -right-[400px] blur-3xl"
           style={{ backgroundColor: `${activeTheme.accent}05` }}></div>
      <div className="absolute -z-10 w-[600px] h-[600px] rounded-full -bottom-[300px] -left-[300px] blur-3xl"
           style={{ backgroundColor: `${activeTheme.accent}05` }}></div>
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header with elegant design */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6 relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-[#7BA7C2]/10 blur-xl"></div>
            <h2 className={`${textStyle.sectionTitle}`} 
                style={{ 
                  color: activeTheme.textPrimary,
                  fontSize: typographySettings.fontSizeH2,
                  fontWeight: getFontWeight(typographySettings.fontWeightHeadings),
                  lineHeight: getLineHeight(typographySettings.lineHeightHeadings),
                  letterSpacing: getLetterSpacing(typographySettings.letterSpacingHeadings)
                }} 
                lang="de">{t('benefitsSection.title')}</h2>
            <div className="w-[90%] max-w-[300px] mt-4 mx-auto h-px" 
                 style={{ background: `linear-gradient(to right, transparent, ${activeTheme.divider}, transparent)` }}></div>
          </div>
          <p className={`${fontSize.lg} max-w-3xl mx-auto mt-6`}
             style={{ 
               color: activeTheme.textSecondary,
               fontSize: typographySettings.fontSizeBase,
               fontWeight: getFontWeight(typographySettings.fontWeightBody),
               lineHeight: getLineHeight(typographySettings.lineHeightBody)
             }}>
            {t('benefitsSection.subtitle')}
          </p>
        </div>

        {/* Benefits Cards Grid - Equal height cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {benefitCards.map((card, index) => {
            const isHovered = index === hoverCard;
            
            return (
              <div 
                key={index}
                className="relative group"
                onMouseEnter={() => setHoverCard(index)}
                onMouseLeave={() => setHoverCard(null)}
              >
                {/* Card with glass morphism effect */}
                <div className={`relative bg-white backdrop-blur-sm overflow-hidden transition-all duration-500 h-full ${
                  isHovered 
                    ? 'shadow-xl transform -translate-y-1 border-2' 
                    : 'border border-gray-100/80 hover:shadow-xl'
                }`}
                     style={{ 
                       borderColor: isHovered ? `${activeTheme.accent}80` : `${activeTheme.accent}30`,
                       borderRadius: `${uiElementsSettings.borderRadius}px`,
                       boxShadow: shadowStyle
                     }}>
                  {/* Header with icon and title side by side */}
                  <div className="relative h-20 overflow-hidden flex items-center">
                    {/* Gradient background */}
                    <div className="absolute inset-0" 
                         style={{ background: `linear-gradient(to right, ${activeTheme.accent}, ${activeTheme.accent}80)` }}></div>
                    
                    {/* Decorative circles */}
                    <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/10 -mr-20 -mt-20"></div>
                    <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-white/10 -ml-10 -mb-10"></div>
                    
                    {/* Icon container */}
                    <div className="relative z-10 ml-6 mr-4">
                      <div className={`w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-500 ${
                        isHovered ? 'scale-110 bg-white/30' : ''
                      }`}>
                        {React.cloneElement(card.icon as React.ReactElement, { 
                          className: `w-6 h-6 text-white transition-all duration-500 ${isHovered ? 'scale-110' : ''}` 
                        })}
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className={`relative z-10 ${fontSize.lg} flex-1 pr-6 line-clamp-2`}
                        style={{ 
                          color: 'white',
                          fontWeight: getFontWeight(typographySettings.fontWeightHeadings),
                          letterSpacing: getLetterSpacing(typographySettings.letterSpacingHeadings)
                        }}>{card.title}</h3>
                  </div>
                  
                  {/* Content with subtle gradient - removed fixed height to ensure text is fully visible */}
                  <div className="p-6 bg-gradient-to-b from-white to-gray-50/50 h-auto flex flex-col">
                    {/* Description with perfect typography */}
                    <p className={`${fontSize.sm} text-center md:text-left`}
                       style={{ 
                         color: activeTheme.textSecondary,
                         fontSize: typographySettings.fontSizeBase,
                         fontWeight: getFontWeight(typographySettings.fontWeightBody),
                         lineHeight: getLineHeight(typographySettings.lineHeightBody)
                       }}>
                      {card.description}
                    </p>
                    
                    {/* Subtle indicator */}
                    <div className={`flex items-center justify-center md:justify-end ${fontSize.xs} mt-4 transition-opacity duration-300 ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <span className={`mr-1`} 
                            style={{ 
                              color: activeTheme.primary,
                              fontWeight: getFontWeight(typographySettings.fontWeightBody)
                            }}>Mehr erfahren</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className={`absolute -z-10 w-full h-full top-2 left-2 transition-all duration-500 ${
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
        <div className="mt-20 relative">
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
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#7BA7C2]/5 -mr-32 -mt-32 blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#7BA7C2]/5 -ml-32 -mb-32 blur-xl"></div>
            
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

export default BenefitsSection;
