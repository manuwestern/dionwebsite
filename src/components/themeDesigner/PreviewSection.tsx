import React from 'react';
import { textStyle } from '../../utils/typography';
import { PreviewSectionProps } from './types';

const PreviewSection: React.FC<PreviewSectionProps> = ({ 
  customTheme, 
  typographySettings, 
  uiElementsSettings 
}) => {
  // Berechne den Schatten-Stil basierend auf den Einstellungen
  const shadowStyle = `0 ${uiElementsSettings.shadowIntensity}px ${uiElementsSettings.shadowBlur}px ${uiElementsSettings.shadowSpread}px ${uiElementsSettings.shadowColor}`;

  // Hilfsfunktion für Schriftgewicht
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

  // Hilfsfunktion für Zeilenabstand
  const getLineHeight = (lineHeightName: string): number => {
    switch (lineHeightName) {
      case 'tight': return 1.25;
      case 'normal': return 1.5;
      case 'relaxed': return 1.625;
      case 'loose': return 2;
      default: return 1.5;
    }
  };

  // Hilfsfunktion für Buchstabenabstand
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

  return (
    <div>
      <h2 className={textStyle.primaryHeading} style={{ color: customTheme.primary, marginBottom: '1.5rem' }}>
        Theme-Vorschau
      </h2>
      
      {/* Hero-Bereich */}
      <div 
        className="rounded-xl p-8 mb-8 relative overflow-hidden"
        style={{ 
          backgroundColor: customTheme.backgroundLight,
          borderColor: customTheme.borderLight,
          borderWidth: `${uiElementsSettings.borderStandard}px`,
          borderRadius: `${uiElementsSettings.borderRadius}px`,
          boxShadow: shadowStyle
        }}
      >
        {/* Dekorative Elemente */}
        <div 
          className="absolute top-0 right-0 w-64 h-64 rounded-full -mr-32 -mt-32 blur-xl"
          style={{ backgroundColor: `${customTheme.accent}10` }}
        ></div>
        <div 
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full -ml-32 -mb-32 blur-xl"
          style={{ backgroundColor: `${customTheme.accent}10` }}
        ></div>
        
        <div className="relative z-10">
          <h1 style={{ 
            color: customTheme.textPrimary,
            fontSize: typographySettings.fontSizeH1,
            fontWeight: getFontWeight(typographySettings.fontWeightHeadings),
            lineHeight: getLineHeight(typographySettings.lineHeightHeadings),
            letterSpacing: getLetterSpacing(typographySettings.letterSpacingHeadings)
          }}>
            Haartransplantation
          </h1>
          <div 
            className="h-px w-48 my-4"
            style={{ 
              background: `linear-gradient(to right, transparent, ${customTheme.accent}, transparent)` 
            }}
          ></div>
          <p style={{ 
            color: customTheme.textSecondary, 
            maxWidth: '600px',
            fontSize: typographySettings.fontSizeBase,
            fontWeight: getFontWeight(typographySettings.fontWeightBody),
            lineHeight: getLineHeight(typographySettings.lineHeightBody)
          }}>
            Modernste Techniken für natürliche Ergebnisse. Unsere Experten bieten Ihnen eine individuelle Beratung und maßgeschneiderte Lösungen.
          </p>
          <div className="mt-6">
            <button 
              className="px-6 py-3 rounded-lg shadow-md transition-all"
              style={{ 
                background: `linear-gradient(to right, ${customTheme.accent}, ${customTheme.accentDark})`,
                color: 'white',
                fontWeight: getFontWeight(typographySettings.fontWeightButtons),
                letterSpacing: getLetterSpacing(typographySettings.letterSpacingButtons),
                borderRadius: `${uiElementsSettings.borderRadius}px`,
                boxShadow: shadowStyle
              }}
            >
              <span>BERATUNGSTERMIN VEREINBAREN</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Abschnitte */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Abschnitt 1 */}
        <div 
          className="rounded-xl p-6 relative overflow-hidden"
          style={{ 
            backgroundColor: customTheme.background,
            borderColor: customTheme.borderLight,
            borderWidth: `${uiElementsSettings.borderStandard}px`,
            borderRadius: `${uiElementsSettings.borderRadius}px`,
            boxShadow: shadowStyle
          }}
        >
          <h2 style={{ 
            color: customTheme.primary,
            fontSize: typographySettings.fontSizeH2,
            fontWeight: getFontWeight(typographySettings.fontWeightHeadings),
            lineHeight: getLineHeight(typographySettings.lineHeightHeadings),
            letterSpacing: getLetterSpacing(typographySettings.letterSpacingHeadings)
          }}>
            Unsere Leistungen
          </h2>
          <div 
            className="h-px w-full my-4"
            style={{ 
              background: `linear-gradient(to right, transparent, ${customTheme.divider}, transparent)` 
            }}
          ></div>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: customTheme.accent }}
              ></div>
              <span style={{ 
                color: customTheme.textPrimary,
                fontSize: typographySettings.fontSizeBase,
                fontWeight: getFontWeight(typographySettings.fontWeightBody),
                lineHeight: getLineHeight(typographySettings.lineHeightBody)
              }}>Haartransplantation</span>
            </li>
            <li className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: customTheme.accent }}
              ></div>
              <span style={{ 
                color: customTheme.textPrimary,
                fontSize: typographySettings.fontSizeBase,
                fontWeight: getFontWeight(typographySettings.fontWeightBody),
                lineHeight: getLineHeight(typographySettings.lineHeightBody)
              }}>Barthaartransplantation</span>
            </li>
            <li className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: customTheme.accent }}
              ></div>
              <span style={{ 
                color: customTheme.textPrimary,
                fontSize: typographySettings.fontSizeBase,
                fontWeight: getFontWeight(typographySettings.fontWeightBody),
                lineHeight: getLineHeight(typographySettings.lineHeightBody)
              }}>Augenbrauentransplantation</span>
            </li>
          </ul>
        </div>
        
        {/* Abschnitt 2 */}
        <div 
          className="rounded-xl p-6 relative overflow-hidden"
          style={{ 
            backgroundColor: customTheme.background,
            borderColor: customTheme.borderLight,
            borderWidth: `${uiElementsSettings.borderStandard}px`,
            borderRadius: `${uiElementsSettings.borderRadius}px`,
            boxShadow: shadowStyle
          }}
        >
          <h2 style={{ 
            color: customTheme.primary,
            fontSize: typographySettings.fontSizeH2,
            fontWeight: getFontWeight(typographySettings.fontWeightHeadings),
            lineHeight: getLineHeight(typographySettings.lineHeightHeadings),
            letterSpacing: getLetterSpacing(typographySettings.letterSpacingHeadings)
          }}>
            Warum uns wählen?
          </h2>
          <div 
            className="h-px w-full my-4"
            style={{ 
              background: `linear-gradient(to right, transparent, ${customTheme.divider}, transparent)` 
            }}
          ></div>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${customTheme.accent}10` }}
              >
                <span style={{ color: customTheme.accent }}>✓</span>
              </div>
              <div>
                <h3 style={{ 
                  color: customTheme.textPrimary,
                  fontWeight: getFontWeight(typographySettings.fontWeightHeadings),
                  lineHeight: getLineHeight(typographySettings.lineHeightHeadings)
                }}>
                  Erfahrene Spezialisten
                </h3>
                <p style={{ 
                  color: customTheme.textSecondary,
                  fontSize: typographySettings.fontSizeBase,
                  fontWeight: getFontWeight(typographySettings.fontWeightBody),
                  lineHeight: getLineHeight(typographySettings.lineHeightBody)
                }}>
                  Unsere Ärzte sind Experten auf dem Gebiet der Haartransplantation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewSection;
