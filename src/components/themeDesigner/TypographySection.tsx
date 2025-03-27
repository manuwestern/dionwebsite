import React from 'react';
import { textStyle, fontSize } from '../../utils/typography';
import { TypographySectionProps } from './types';

const TypographySection: React.FC<TypographySectionProps> = ({ 
  customTheme, 
  typographySettings, 
  updateTypographySettings 
}) => {
  return (
    <div>
      <h2 className={textStyle.primaryHeading} style={{ color: customTheme.primary, marginBottom: '1.5rem' }}>
        Typografieeinstellungen
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Schriftgrößen */}
        <div className="mb-8">
          <h3 className={textStyle.primaryHeading} style={{ color: customTheme.textPrimary, marginBottom: '1rem', fontSize: '1.25rem' }}>
            Schriftgrößen
          </h3>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label style={{ color: customTheme.textSecondary }}>Überschriften (H1)</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="0.1"
                  value={parseFloat(typographySettings.fontSizeH1)}
                  onChange={(e) => updateTypographySettings('fontSizeH1', `${e.target.value}rem`)}
                  className="w-full"
                  title="Schriftgröße für Überschriften (H1)"
                  aria-label="Schriftgröße für Überschriften (H1)"
                />
                <span style={{ color: customTheme.textPrimary }}>{typographySettings.fontSizeH1}</span>
              </div>
              <div className="p-3 rounded" style={{ backgroundColor: customTheme.backgroundLight }}>
                <span className={fontSize.h1} style={{ color: customTheme.textPrimary, fontSize: typographySettings.fontSizeH1 }}>Beispieltext</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label style={{ color: customTheme.textSecondary }}>Überschriften (H2)</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="4"
                  step="0.1"
                  value={parseFloat(typographySettings.fontSizeH2)}
                  onChange={(e) => updateTypographySettings('fontSizeH2', `${e.target.value}rem`)}
                  className="w-full"
                  title="Schriftgröße für Überschriften (H2)"
                  aria-label="Schriftgröße für Überschriften (H2)"
                />
                <span style={{ color: customTheme.textPrimary }}>{typographySettings.fontSizeH2}</span>
              </div>
              <div className="p-3 rounded" style={{ backgroundColor: customTheme.backgroundLight }}>
                <span className={fontSize.h2} style={{ color: customTheme.textPrimary, fontSize: typographySettings.fontSizeH2 }}>Beispieltext</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label style={{ color: customTheme.textSecondary }}>Standardtext</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0.75"
                  max="1.5"
                  step="0.05"
                  value={parseFloat(typographySettings.fontSizeBase)}
                  onChange={(e) => updateTypographySettings('fontSizeBase', `${e.target.value}rem`)}
                  className="w-full"
                  title="Schriftgröße für Standardtext"
                  aria-label="Schriftgröße für Standardtext"
                />
                <span style={{ color: customTheme.textPrimary }}>{typographySettings.fontSizeBase}</span>
              </div>
              <div className="p-3 rounded" style={{ backgroundColor: customTheme.backgroundLight }}>
                <span className={fontSize.base} style={{ color: customTheme.textPrimary, fontSize: typographySettings.fontSizeBase }}>Beispieltext</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Schriftgewichte */}
        <div className="mb-8">
          <h3 className={textStyle.primaryHeading} style={{ color: customTheme.textPrimary, marginBottom: '1rem', fontSize: '1.25rem' }}>
            Schriftgewichte
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="w-32" style={{ color: customTheme.textSecondary }}>Überschriften:</label>
              <select 
                className="px-3 py-2 rounded border flex-grow"
                style={{ 
                  borderColor: customTheme.borderLight,
                  color: customTheme.textPrimary,
                  backgroundColor: customTheme.backgroundLight
                }}
                value={typographySettings.fontWeightHeadings}
                onChange={(e) => updateTypographySettings('fontWeightHeadings', e.target.value)}
                title="Schriftgewicht für Überschriften"
                aria-label="Schriftgewicht für Überschriften"
              >
                <option value="light">Leicht (300)</option>
                <option value="normal">Normal (400)</option>
                <option value="medium">Mittel (500)</option>
                <option value="semibold">Halbfett (600)</option>
                <option value="bold">Fett (700)</option>
              </select>
            </div>
            
            <div className="flex items-center gap-4">
              <label className="w-32" style={{ color: customTheme.textSecondary }}>Fließtext:</label>
              <select 
                className="px-3 py-2 rounded border flex-grow"
                style={{ 
                  borderColor: customTheme.borderLight,
                  color: customTheme.textPrimary,
                  backgroundColor: customTheme.backgroundLight
                }}
                value={typographySettings.fontWeightBody}
                onChange={(e) => updateTypographySettings('fontWeightBody', e.target.value)}
                title="Schriftgewicht für Fließtext"
                aria-label="Schriftgewicht für Fließtext"
              >
                <option value="light">Leicht (300)</option>
                <option value="normal">Normal (400)</option>
                <option value="medium">Mittel (500)</option>
                <option value="semibold">Halbfett (600)</option>
                <option value="bold">Fett (700)</option>
              </select>
            </div>
            
            <div className="flex items-center gap-4">
              <label className="w-32" style={{ color: customTheme.textSecondary }}>Buttons:</label>
              <select 
                className="px-3 py-2 rounded border flex-grow"
                style={{ 
                  borderColor: customTheme.borderLight,
                  color: customTheme.textPrimary,
                  backgroundColor: customTheme.backgroundLight
                }}
                value={typographySettings.fontWeightButtons}
                onChange={(e) => updateTypographySettings('fontWeightButtons', e.target.value)}
                title="Schriftgewicht für Buttons"
                aria-label="Schriftgewicht für Buttons"
              >
                <option value="light">Leicht (300)</option>
                <option value="normal">Normal (400)</option>
                <option value="medium">Mittel (500)</option>
                <option value="semibold">Halbfett (600)</option>
                <option value="bold">Fett (700)</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Zeilenabstände */}
        <div className="mb-8">
          <h3 className={textStyle.primaryHeading} style={{ color: customTheme.textPrimary, marginBottom: '1rem', fontSize: '1.25rem' }}>
            Zeilenabstände
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="w-32" style={{ color: customTheme.textSecondary }}>Überschriften:</label>
              <select 
                className="px-3 py-2 rounded border flex-grow"
                style={{ 
                  borderColor: customTheme.borderLight,
                  color: customTheme.textPrimary,
                  backgroundColor: customTheme.backgroundLight
                }}
                value={typographySettings.lineHeightHeadings}
                onChange={(e) => updateTypographySettings('lineHeightHeadings', e.target.value)}
                title="Zeilenabstand für Überschriften"
                aria-label="Zeilenabstand für Überschriften"
              >
                <option value="tight">Eng (1.25)</option>
                <option value="normal">Normal (1.5)</option>
                <option value="relaxed">Entspannt (1.625)</option>
                <option value="loose">Locker (2)</option>
              </select>
            </div>
            
            <div className="flex items-center gap-4">
              <label className="w-32" style={{ color: customTheme.textSecondary }}>Fließtext:</label>
              <select 
                className="px-3 py-2 rounded border flex-grow"
                style={{ 
                  borderColor: customTheme.borderLight,
                  color: customTheme.textPrimary,
                  backgroundColor: customTheme.backgroundLight
                }}
                value={typographySettings.lineHeightBody}
                onChange={(e) => updateTypographySettings('lineHeightBody', e.target.value)}
                title="Zeilenabstand für Fließtext"
                aria-label="Zeilenabstand für Fließtext"
              >
                <option value="tight">Eng (1.25)</option>
                <option value="normal">Normal (1.5)</option>
                <option value="relaxed">Entspannt (1.625)</option>
                <option value="loose">Locker (2)</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Buchstabenabstände */}
        <div className="mb-8">
          <h3 className={textStyle.primaryHeading} style={{ color: customTheme.textPrimary, marginBottom: '1rem', fontSize: '1.25rem' }}>
            Buchstabenabstände
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="w-32" style={{ color: customTheme.textSecondary }}>Überschriften:</label>
              <select 
                className="px-3 py-2 rounded border flex-grow"
                style={{ 
                  borderColor: customTheme.borderLight,
                  color: customTheme.textPrimary,
                  backgroundColor: customTheme.backgroundLight
                }}
                value={typographySettings.letterSpacingHeadings}
                onChange={(e) => updateTypographySettings('letterSpacingHeadings', e.target.value)}
                title="Buchstabenabstand für Überschriften"
                aria-label="Buchstabenabstand für Überschriften"
              >
                <option value="tighter">Sehr eng (-0.05em)</option>
                <option value="tight">Eng (-0.025em)</option>
                <option value="normal">Normal (0)</option>
                <option value="wide">Weit (0.025em)</option>
                <option value="wider">Weiter (0.05em)</option>
                <option value="elegant">Elegant (0.1em)</option>
              </select>
            </div>
            
            <div className="flex items-center gap-4">
              <label className="w-32" style={{ color: customTheme.textSecondary }}>Buttons:</label>
              <select 
                className="px-3 py-2 rounded border flex-grow"
                style={{ 
                  borderColor: customTheme.borderLight,
                  color: customTheme.textPrimary,
                  backgroundColor: customTheme.backgroundLight
                }}
                value={typographySettings.letterSpacingButtons}
                onChange={(e) => updateTypographySettings('letterSpacingButtons', e.target.value)}
                title="Buchstabenabstand für Buttons"
                aria-label="Buchstabenabstand für Buttons"
              >
                <option value="tighter">Sehr eng (-0.05em)</option>
                <option value="tight">Eng (-0.025em)</option>
                <option value="normal">Normal (0)</option>
                <option value="wide">Weit (0.025em)</option>
                <option value="wider">Weiter (0.05em)</option>
                <option value="elegant">Elegant (0.1em)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Beispieltext */}
      <div className="mt-8 p-6 rounded-lg" style={{ backgroundColor: customTheme.backgroundLight }}>
        <h3 className={textStyle.primaryHeading} style={{ color: customTheme.primary, marginBottom: '1rem' }}>
          Beispieltext
        </h3>
        <h1 className={fontSize.h1} style={{ 
          color: customTheme.textPrimary, 
          fontSize: typographySettings.fontSizeH1,
          fontWeight: typographySettings.fontWeightHeadings === 'light' ? 300 : 
                     typographySettings.fontWeightHeadings === 'normal' ? 400 : 
                     typographySettings.fontWeightHeadings === 'medium' ? 500 : 
                     typographySettings.fontWeightHeadings === 'semibold' ? 600 : 700,
          lineHeight: typographySettings.lineHeightHeadings === 'tight' ? 1.25 : 
                      typographySettings.lineHeightHeadings === 'normal' ? 1.5 : 
                      typographySettings.lineHeightHeadings === 'relaxed' ? 1.625 : 2,
          letterSpacing: typographySettings.letterSpacingHeadings === 'tighter' ? '-0.05em' : 
                         typographySettings.letterSpacingHeadings === 'tight' ? '-0.025em' : 
                         typographySettings.letterSpacingHeadings === 'normal' ? '0' : 
                         typographySettings.letterSpacingHeadings === 'wide' ? '0.025em' : 
                         typographySettings.letterSpacingHeadings === 'wider' ? '0.05em' : '0.1em',
          marginBottom: '1rem'
        }}>
          Überschrift H1
        </h1>
        <h2 className={fontSize.h2} style={{ 
          color: customTheme.textPrimary, 
          fontSize: typographySettings.fontSizeH2,
          fontWeight: typographySettings.fontWeightHeadings === 'light' ? 300 : 
                     typographySettings.fontWeightHeadings === 'normal' ? 400 : 
                     typographySettings.fontWeightHeadings === 'medium' ? 500 : 
                     typographySettings.fontWeightHeadings === 'semibold' ? 600 : 700,
          lineHeight: typographySettings.lineHeightHeadings === 'tight' ? 1.25 : 
                      typographySettings.lineHeightHeadings === 'normal' ? 1.5 : 
                      typographySettings.lineHeightHeadings === 'relaxed' ? 1.625 : 2,
          letterSpacing: typographySettings.letterSpacingHeadings === 'tighter' ? '-0.05em' : 
                         typographySettings.letterSpacingHeadings === 'tight' ? '-0.025em' : 
                         typographySettings.letterSpacingHeadings === 'normal' ? '0' : 
                         typographySettings.letterSpacingHeadings === 'wide' ? '0.025em' : 
                         typographySettings.letterSpacingHeadings === 'wider' ? '0.05em' : '0.1em',
          marginBottom: '1rem'
        }}>
          Überschrift H2
        </h2>
        <h3 className={fontSize.h3} style={{ 
          color: customTheme.textPrimary, 
          fontWeight: typographySettings.fontWeightHeadings === 'light' ? 300 : 
                     typographySettings.fontWeightHeadings === 'normal' ? 400 : 
                     typographySettings.fontWeightHeadings === 'medium' ? 500 : 
                     typographySettings.fontWeightHeadings === 'semibold' ? 600 : 700,
          lineHeight: typographySettings.lineHeightHeadings === 'tight' ? 1.25 : 
                      typographySettings.lineHeightHeadings === 'normal' ? 1.5 : 
                      typographySettings.lineHeightHeadings === 'relaxed' ? 1.625 : 2,
          letterSpacing: typographySettings.letterSpacingHeadings === 'tighter' ? '-0.05em' : 
                         typographySettings.letterSpacingHeadings === 'tight' ? '-0.025em' : 
                         typographySettings.letterSpacingHeadings === 'normal' ? '0' : 
                         typographySettings.letterSpacingHeadings === 'wide' ? '0.025em' : 
                         typographySettings.letterSpacingHeadings === 'wider' ? '0.05em' : '0.1em',
          marginBottom: '1rem'
        }}>
          Überschrift H3
        </h3>
        <p className={fontSize.base} style={{ 
          color: customTheme.textSecondary, 
          fontSize: typographySettings.fontSizeBase,
          fontWeight: typographySettings.fontWeightBody === 'light' ? 300 : 
                     typographySettings.fontWeightBody === 'normal' ? 400 : 
                     typographySettings.fontWeightBody === 'medium' ? 500 : 
                     typographySettings.fontWeightBody === 'semibold' ? 600 : 700,
          lineHeight: typographySettings.lineHeightBody === 'tight' ? 1.25 : 
                      typographySettings.lineHeightBody === 'normal' ? 1.5 : 
                      typographySettings.lineHeightBody === 'relaxed' ? 1.625 : 2,
          marginBottom: '1rem'
        }}>
          Dies ist ein Beispieltext in der Standardgröße. Er zeigt, wie der Fließtext auf Ihrer Website aussehen wird. 
          Die Lesbarkeit ist ein wichtiger Faktor für die Benutzererfahrung.
        </p>
        <p className={fontSize.lg} style={{ 
          color: customTheme.textPrimary, 
          fontWeight: typographySettings.fontWeightBody === 'light' ? 300 : 
                     typographySettings.fontWeightBody === 'normal' ? 400 : 
                     typographySettings.fontWeightBody === 'medium' ? 500 : 
                     typographySettings.fontWeightBody === 'semibold' ? 600 : 700,
          lineHeight: typographySettings.lineHeightBody === 'tight' ? 1.25 : 
                      typographySettings.lineHeightBody === 'normal' ? 1.5 : 
                      typographySettings.lineHeightBody === 'relaxed' ? 1.625 : 2,
          marginBottom: '1rem'
        }}>
          Dies ist ein hervorgehobener Text, der wichtige Informationen enthält.
        </p>
        <button 
          className="px-6 py-3 rounded-lg shadow-md transition-all"
          style={{ 
            background: `linear-gradient(to right, ${customTheme.accent}, ${customTheme.accentDark})`,
            color: 'white',
            fontWeight: typographySettings.fontWeightButtons === 'light' ? 300 : 
                       typographySettings.fontWeightButtons === 'normal' ? 400 : 
                       typographySettings.fontWeightButtons === 'medium' ? 500 : 
                       typographySettings.fontWeightButtons === 'semibold' ? 600 : 700,
            letterSpacing: typographySettings.letterSpacingButtons === 'tighter' ? '-0.05em' : 
                           typographySettings.letterSpacingButtons === 'tight' ? '-0.025em' : 
                           typographySettings.letterSpacingButtons === 'normal' ? '0' : 
                           typographySettings.letterSpacingButtons === 'wide' ? '0.025em' : 
                           typographySettings.letterSpacingButtons === 'wider' ? '0.05em' : '0.1em'
          }}
        >
          <span className={textStyle.button}>BUTTON-TEXT</span>
        </button>
      </div>
    </div>
  );
};

export default TypographySection;
