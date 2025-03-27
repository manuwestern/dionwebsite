import React, { useState, useEffect } from 'react';
import { useTheme } from '../utils/ThemeProvider';
import { ColorTheme, TypographySettings, UIElementsSettings, defaultTypography, defaultUIElements } from '../utils/colors';
import { ThemeDesignerTab } from '../components/themeDesigner/types';

// Import der Theme-Designer-Komponenten
import HeaderSection from '../components/themeDesigner/HeaderSection';
import TabsSection from '../components/themeDesigner/TabsSection';
import ActionsSection from '../components/themeDesigner/ActionsSection';
import ColorsSection from '../components/themeDesigner/ColorsSection';
import TypographySection from '../components/themeDesigner/TypographySection';
import UIElementsSection from '../components/themeDesigner/UIElementsSection';
import PreviewSection from '../components/themeDesigner/PreviewSection';

const ThemeDesignerPage: React.FC = () => {
  const { activeTheme, setTheme } = useTheme();
  const [customTheme, setCustomTheme] = useState<ColorTheme>({...activeTheme});
  const [activeTab, setActiveTab] = useState<ThemeDesignerTab>('colors');
  
  // State für Typografie-Einstellungen
  const [typographySettings, setTypographySettings] = useState<TypographySettings>(
    activeTheme.typography || defaultTypography
  );
  
  // State für UI-Elemente-Einstellungen
  const [uiElementsSettings, setUIElementsSettings] = useState<UIElementsSettings>(
    activeTheme.uiElements || defaultUIElements
  );

  // Aktualisiere das customTheme, wenn sich die Typografie- oder UI-Elemente-Einstellungen ändern
  useEffect(() => {
    setCustomTheme(prev => ({
      ...prev,
      typography: typographySettings,
      uiElements: uiElementsSettings
    }));
  }, [typographySettings, uiElementsSettings]);

  // Funktion zum Aktualisieren des benutzerdefinierten Themes
  const updateCustomTheme = (key: keyof ColorTheme, value: string) => {
    setCustomTheme(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  // Funktion zum Aktualisieren der Typografie-Einstellungen
  const updateTypographySettings = (key: keyof TypographySettings, value: string) => {
    setTypographySettings(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  // Funktion zum Aktualisieren der UI-Elemente-Einstellungen
  const updateUIElementsSettings = (key: keyof UIElementsSettings, value: string | number) => {
    setUIElementsSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Funktion zum Anwenden des benutzerdefinierten Themes
  const applyCustomTheme = () => {
    // Erstelle ein vollständiges Theme-Objekt mit allen Einstellungen
    const completeTheme: ColorTheme = {
      ...customTheme,
      typography: typographySettings,
      uiElements: uiElementsSettings,
      // Aktualisiere den Schatten basierend auf den UI-Elemente-Einstellungen
      shadow: `0 ${uiElementsSettings.shadowIntensity}px ${uiElementsSettings.shadowBlur}px ${uiElementsSettings.shadowSpread}px ${uiElementsSettings.shadowColor}`
    };
    
    // Wende das Theme an
    setTheme(completeTheme);
  };

  // Funktion zum Zurücksetzen des benutzerdefinierten Themes
  const resetCustomTheme = () => {
    setCustomTheme({...activeTheme});
    setTypographySettings(activeTheme.typography || defaultTypography);
    setUIElementsSettings(activeTheme.uiElements || defaultUIElements);
  };

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: customTheme.backgroundLight }}>
      <div className="container mx-auto px-4">
        {/* Header-Section mit Titel und Beschreibung */}
        <HeaderSection 
          customTheme={customTheme} 
          updateCustomTheme={updateCustomTheme} 
        />

        {/* Tabs-Section für die Navigation */}
        <TabsSection 
          customTheme={customTheme} 
          updateCustomTheme={updateCustomTheme}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Actions-Section mit Buttons zum Anwenden und Zurücksetzen */}
        <ActionsSection 
          customTheme={customTheme} 
          updateCustomTheme={updateCustomTheme}
          applyCustomTheme={applyCustomTheme}
          resetCustomTheme={resetCustomTheme}
        />

        {/* Inhalt basierend auf aktivem Tab */}
        <div className="bg-white rounded-xl shadow-lg p-6" style={{ backgroundColor: customTheme.background }}>
          {/* Farben Tab */}
          {activeTab === 'colors' && (
            <ColorsSection 
              customTheme={customTheme} 
              updateCustomTheme={updateCustomTheme} 
            />
          )}

          {/* Typografie Tab */}
          {activeTab === 'typography' && (
            <TypographySection 
              customTheme={customTheme} 
              updateCustomTheme={updateCustomTheme}
              typographySettings={typographySettings}
              updateTypographySettings={updateTypographySettings}
            />
          )}
          
          {/* UI-Elemente Tab */}
          {activeTab === 'ui-elements' && (
            <UIElementsSection 
              customTheme={customTheme} 
              updateCustomTheme={updateCustomTheme}
              uiElementsSettings={uiElementsSettings}
              updateUIElementsSettings={updateUIElementsSettings}
            />
          )}

          {/* Vorschau Tab */}
          {activeTab === 'preview' && (
            <PreviewSection 
              customTheme={customTheme} 
              updateCustomTheme={updateCustomTheme}
              typographySettings={typographySettings}
              uiElementsSettings={uiElementsSettings}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ThemeDesignerPage;
