import { ColorTheme, TypographySettings, UIElementsSettings } from '../../utils/colors';

// Typ für die Tabs im Theme Designer
export type ThemeDesignerTab = 'colors' | 'typography' | 'ui-elements' | 'preview';

// Schnittstelle für die gemeinsamen Props aller Theme-Designer-Komponenten
export interface ThemeDesignerProps {
  customTheme: ColorTheme;
  updateCustomTheme: (key: keyof ColorTheme, value: string) => void;
}

// Erweiterte Props für die Typografie-Section
export interface TypographySectionProps extends ThemeDesignerProps {
  typographySettings: TypographySettings;
  updateTypographySettings: (key: keyof TypographySettings, value: string) => void;
}

// Erweiterte Props für die UI-Elemente-Section
export interface UIElementsSectionProps extends ThemeDesignerProps {
  uiElementsSettings: UIElementsSettings;
  updateUIElementsSettings: (key: keyof UIElementsSettings, value: string | number) => void;
}

// Erweiterte Props für die Vorschau-Section
export interface PreviewSectionProps extends ThemeDesignerProps {
  typographySettings: TypographySettings;
  uiElementsSettings: UIElementsSettings;
}

// Schnittstelle für die Farbkategorie
export interface ColorCategory {
  title: string;
  colors: {
    key: string;
    label: string;
  }[];
}
