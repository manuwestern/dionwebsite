import React from 'react';
import { textStyle } from '../../utils/typography';
import { UIElementsSectionProps } from './types';

const UIElementsSection: React.FC<UIElementsSectionProps> = ({ 
  customTheme, 
  uiElementsSettings, 
  updateUIElementsSettings 
}) => {
  // Berechne den Schatten-Stil basierend auf den Einstellungen
  const shadowStyle = `0 ${uiElementsSettings.shadowIntensity}px ${uiElementsSettings.shadowBlur}px ${uiElementsSettings.shadowSpread}px ${uiElementsSettings.shadowColor}`;

  return (
    <div>
      <h2 className={textStyle.primaryHeading} style={{ color: customTheme.primary, marginBottom: '1.5rem' }}>
        UI-Elemente Einstellungen
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Schatten */}
        <div className="mb-8">
          <h3 className={textStyle.primaryHeading} style={{ color: customTheme.textPrimary, marginBottom: '1rem', fontSize: '1.25rem' }}>
            Schatten
          </h3>
          <div className="space-y-6">
            <div>
              <label style={{ color: customTheme.textSecondary, display: 'block', marginBottom: '0.5rem' }}>
                Schatten-Intensität
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={uiElementsSettings.shadowIntensity}
                  onChange={(e) => updateUIElementsSettings('shadowIntensity', parseInt(e.target.value))}
                  className="w-full"
                  title="Schatten-Intensität"
                  aria-label="Schatten-Intensität"
                />
                <span style={{ color: customTheme.textPrimary }}>{uiElementsSettings.shadowIntensity}px</span>
              </div>
            </div>
            
            <div>
              <label style={{ color: customTheme.textSecondary, display: 'block', marginBottom: '0.5rem' }}>
                Schatten-Unschärfe
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={uiElementsSettings.shadowBlur}
                  onChange={(e) => updateUIElementsSettings('shadowBlur', parseInt(e.target.value))}
                  className="w-full"
                  title="Schatten-Unschärfe"
                  aria-label="Schatten-Unschärfe"
                />
                <span style={{ color: customTheme.textPrimary }}>{uiElementsSettings.shadowBlur}px</span>
              </div>
            </div>
            
            <div>
              <label style={{ color: customTheme.textSecondary, display: 'block', marginBottom: '0.5rem' }}>
                Schatten-Ausbreitung
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="-5"
                  max="10"
                  step="1"
                  value={uiElementsSettings.shadowSpread}
                  onChange={(e) => updateUIElementsSettings('shadowSpread', parseInt(e.target.value))}
                  className="w-full"
                  title="Schatten-Ausbreitung"
                  aria-label="Schatten-Ausbreitung"
                />
                <span style={{ color: customTheme.textPrimary }}>{uiElementsSettings.shadowSpread}px</span>
              </div>
            </div>
            
            <div>
              <label style={{ color: customTheme.textSecondary, display: 'block', marginBottom: '0.5rem' }}>
                Schatten-Farbe
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={uiElementsSettings.shadowColor.startsWith('rgba') ? '#000000' : uiElementsSettings.shadowColor}
                  onChange={(e) => {
                    // Konvertiere Hex zu RGBA
                    const hex = e.target.value;
                    const r = parseInt(hex.slice(1, 3), 16);
                    const g = parseInt(hex.slice(3, 5), 16);
                    const b = parseInt(hex.slice(5, 7), 16);
                    const rgba = `rgba(${r}, ${g}, ${b}, 0.1)`;
                    updateUIElementsSettings('shadowColor', rgba);
                  }}
                  className="w-12 h-8 rounded cursor-pointer"
                  title="Schatten-Farbe"
                  aria-label="Schatten-Farbe"
                />
                <input
                  type="text"
                  value={uiElementsSettings.shadowColor}
                  onChange={(e) => updateUIElementsSettings('shadowColor', e.target.value)}
                  className="px-3 py-1 rounded border flex-grow"
                  style={{ 
                    borderColor: customTheme.borderLight,
                    color: customTheme.textPrimary,
                    backgroundColor: customTheme.backgroundLight
                  }}
                  title="Schatten-Farbe (RGBA)"
                  aria-label="Schatten-Farbe (RGBA)"
                />
              </div>
            </div>
            
            <div>
              <label style={{ color: customTheme.textSecondary, display: 'block', marginBottom: '0.5rem' }}>
                Schatten-Vorschau
              </label>
              <div 
                className="w-full h-32 rounded-lg flex items-center justify-center"
                style={{ 
                  backgroundColor: customTheme.backgroundLight,
                  boxShadow: shadowStyle
                }}
              >
                <span style={{ color: customTheme.textPrimary }}>Schatten-Beispiel</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Randstärke */}
        <div className="mb-8">
          <h3 className={textStyle.primaryHeading} style={{ color: customTheme.textPrimary, marginBottom: '1rem', fontSize: '1.25rem' }}>
            Randstärke
          </h3>
          <div className="space-y-6">
            <div>
              <label style={{ color: customTheme.textSecondary, display: 'block', marginBottom: '0.5rem' }}>
                Standard-Randstärke
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={uiElementsSettings.borderStandard}
                  onChange={(e) => updateUIElementsSettings('borderStandard', parseInt(e.target.value))}
                  className="w-full"
                  title="Standard-Randstärke"
                  aria-label="Standard-Randstärke"
                />
                <span style={{ color: customTheme.textPrimary }}>{uiElementsSettings.borderStandard}px</span>
              </div>
            </div>
            
            <div>
              <label style={{ color: customTheme.textSecondary, display: 'block', marginBottom: '0.5rem' }}>
                Hervorgehobene Randstärke
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={uiElementsSettings.borderHighlighted}
                  onChange={(e) => updateUIElementsSettings('borderHighlighted', parseInt(e.target.value))}
                  className="w-full"
                  title="Hervorgehobene Randstärke"
                  aria-label="Hervorgehobene Randstärke"
                />
                <span style={{ color: customTheme.textPrimary }}>{uiElementsSettings.borderHighlighted}px</span>
              </div>
            </div>
            
            <div>
              <label style={{ color: customTheme.textSecondary, display: 'block', marginBottom: '0.5rem' }}>
                Rand-Radius
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={uiElementsSettings.borderRadius}
                  onChange={(e) => updateUIElementsSettings('borderRadius', parseInt(e.target.value))}
                  className="w-full"
                  title="Rand-Radius"
                  aria-label="Rand-Radius"
                />
                <span style={{ color: customTheme.textPrimary }}>{uiElementsSettings.borderRadius}px</span>
              </div>
            </div>
            
            <div>
              <label style={{ color: customTheme.textSecondary, display: 'block', marginBottom: '0.5rem' }}>
                Rand-Vorschau
              </label>
              <div className="flex gap-4">
                <div 
                  className="w-1/2 h-32 rounded-lg flex items-center justify-center"
                  style={{ 
                    backgroundColor: customTheme.backgroundLight,
                    border: `${uiElementsSettings.borderStandard}px solid ${customTheme.border}`,
                    borderRadius: `${uiElementsSettings.borderRadius}px`
                  }}
                >
                  <span style={{ color: customTheme.textPrimary }}>Standard</span>
                </div>
                <div 
                  className="w-1/2 h-32 rounded-lg flex items-center justify-center"
                  style={{ 
                    backgroundColor: customTheme.backgroundLight,
                    border: `${uiElementsSettings.borderHighlighted}px solid ${customTheme.border}`,
                    borderRadius: `${uiElementsSettings.borderRadius}px`
                  }}
                >
                  <span style={{ color: customTheme.textPrimary }}>Hervorgehoben</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UIElementsSection;
