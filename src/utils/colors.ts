/**
 * Color Theme System
 * 
 * Dieses Modul definiert ein zentrales Farbsystem für die gesamte Anwendung.
 * Alle Farben werden hier definiert und können in allen Komponenten verwendet werden,
 * um ein konsistentes Design zu gewährleisten.
 */

// Basis-Farbpalette
// Diese Farben bilden die Grundlage für alle Themes
export const palette = {
  // Grautöne
  white: '#FFFFFF',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
  black: '#000000',
  
  // Blautöne (als Akzentfarben)
  blue50: '#EBF3FB',
  blue100: '#E5EFF7',
  blue200: '#BFDBEE',
  blue300: '#9AC7E3',
  blue400: '#7BA7C2',
  blue500: '#5A8BA6',
  blue600: '#4A7A93',
  blue700: '#3A6A80',
  blue800: '#2A5A6D',
  blue900: '#1A4A5A',
  
  // Türkis/Salbei-Töne (für elegantes Theme)
  teal50: '#F0F9F9',
  teal100: '#E6F3F3',
  teal200: '#C2E1E0',
  teal300: '#9ECFCD',
  teal400: '#7ABCB9',
  teal500: '#56A9A6',
  teal600: '#458F8C',
  teal700: '#357573',
  teal800: '#255B59',
  teal900: '#154140',
  
  // Weitere Akzentfarben
  red500: '#EF4444',
  red600: '#DC2626',
  yellow500: '#F59E0B',
  green500: '#10B981',
}

// Typografie-Einstellungen
export type TypographySettings = {
  // Schriftgrößen
  fontSizeH1: string;
  fontSizeH2: string;
  fontSizeBase: string;
  
  // Schriftgewichte
  fontWeightHeadings: string;
  fontWeightBody: string;
  fontWeightButtons: string;
  
  // Zeilenabstände
  lineHeightHeadings: string;
  lineHeightBody: string;
  
  // Buchstabenabstände
  letterSpacingHeadings: string;
  letterSpacingButtons: string;
}

// UI-Elemente-Einstellungen
export type UIElementsSettings = {
  // Schatten
  shadowIntensity: number;
  shadowBlur: number;
  shadowSpread: number;
  shadowColor: string;
  
  // Randstärke
  borderStandard: number;
  borderHighlighted: number;
  borderRadius: number;
}

// Farb-Theme-Typen
export type ColorTheme = {
  // Primäre Farben
  primary: string;
  primaryLight: string;
  primaryDark: string;
  
  // Sekundäre Farben
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  
  // Akzentfarben
  accent: string;
  accentLight: string;
  accentDark: string;
  
  // Hintergrundfarben
  background: string;
  backgroundLight: string;
  backgroundDark: string;
  backgroundGradient: string;
  
  // Textfarben
  textPrimary: string;
  textSecondary: string;
  textLight: string;
  textOnDark: string;
  
  // UI-Elemente
  border: string;
  borderLight: string;
  divider: string;
  shadow: string;
  overlay: string;
  
  // Status-Farben
  success: string;
  error: string;
  warning: string;
  info: string;
  
  // Spezielle Elemente
  buttonPrimary: string;
  buttonSecondary: string;
  buttonDisabled: string;
  inputBorder: string;
  inputBackground: string;
  cardBackground: string;
  
  // Gradient-Definitionen
  gradientPrimary: string;
  gradientSecondary: string;
  gradientAccent: string;
  gradientBackground: string;
  gradientOverlay: string;
  gradientDivider: string;
  
  // Erweiterte Einstellungen
  typography?: TypographySettings;
  uiElements?: UIElementsSettings;
}

// Standard-Typografie-Einstellungen
export const defaultTypography: TypographySettings = {
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

// Standard-UI-Elemente-Einstellungen
export const defaultUIElements: UIElementsSettings = {
  shadowIntensity: 6,
  shadowBlur: 8,
  shadowSpread: 0,
  shadowColor: 'rgba(0, 0, 0, 0.1)',
  
  borderStandard: 1,
  borderHighlighted: 2,
  borderRadius: 8
};

// Grau-Theme (Standard)
export const grayTheme: ColorTheme = {
  // Primäre Farben
  primary: palette.gray700,
  primaryLight: palette.gray600,
  primaryDark: palette.gray800,
  
  // Sekundäre Farben
  secondary: palette.gray500,
  secondaryLight: palette.gray400,
  secondaryDark: palette.gray600,
  
  // Akzentfarben (Blau als Akzent)
  accent: palette.blue400,
  accentLight: palette.blue300,
  accentDark: palette.blue500,
  
  // Hintergrundfarben
  background: palette.white,
  backgroundLight: palette.gray50,
  backgroundDark: palette.gray100,
  backgroundGradient: `bg-gradient-to-b from-${palette.gray50} via-${palette.gray100} to-${palette.gray50}`,
  
  // Textfarben
  textPrimary: palette.gray800,
  textSecondary: palette.gray600,
  textLight: palette.gray500,
  textOnDark: palette.white,
  
  // UI-Elemente
  border: palette.gray300,
  borderLight: palette.gray200,
  divider: palette.gray200,
  shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  overlay: 'rgba(0, 0, 0, 0.5)',
  
  // Status-Farben
  success: palette.green500,
  error: palette.red500,
  warning: palette.yellow500,
  info: palette.blue400,
  
  // Spezielle Elemente
  buttonPrimary: `bg-gradient-to-r from-${palette.gray600} to-${palette.gray700}`,
  buttonSecondary: palette.gray200,
  buttonDisabled: palette.gray300,
  inputBorder: palette.gray300,
  inputBackground: palette.white,
  cardBackground: palette.white,
  
  // Gradient-Definitionen
  gradientPrimary: `bg-gradient-to-r from-${palette.gray600} to-${palette.gray700}`,
  gradientSecondary: `bg-gradient-to-r from-${palette.gray400} to-${palette.gray500}`,
  gradientAccent: `bg-gradient-to-r from-${palette.blue300} to-${palette.blue500}`,
  gradientBackground: `bg-gradient-to-b from-${palette.gray50} via-${palette.gray100} to-${palette.gray50}`,
  gradientOverlay: `bg-gradient-to-t from-${palette.black} to-transparent`,
  gradientDivider: `bg-gradient-to-r from-transparent via-${palette.gray400} to-transparent`,
  
  // Erweiterte Einstellungen
  typography: defaultTypography,
  uiElements: defaultUIElements
}

// Blau-Theme (Alternative)
export const blueTheme: ColorTheme = {
  // Primäre Farben
  primary: palette.blue400,
  primaryLight: palette.blue300,
  primaryDark: palette.blue500,
  
  // Sekundäre Farben
  secondary: palette.gray500,
  secondaryLight: palette.gray400,
  secondaryDark: palette.gray600,
  
  // Akzentfarben
  accent: palette.blue600,
  accentLight: palette.blue500,
  accentDark: palette.blue700,
  
  // Hintergrundfarben
  background: palette.white,
  backgroundLight: palette.blue50,
  backgroundDark: palette.blue100,
  backgroundGradient: `bg-gradient-to-b from-${palette.blue50} via-${palette.blue100} to-${palette.blue50}`,
  
  // Textfarben
  textPrimary: palette.gray800,
  textSecondary: palette.gray600,
  textLight: palette.gray500,
  textOnDark: palette.white,
  
  // UI-Elemente
  border: palette.gray300,
  borderLight: palette.gray200,
  divider: palette.blue200,
  shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  overlay: 'rgba(0, 0, 0, 0.5)',
  
  // Status-Farben
  success: palette.green500,
  error: palette.red500,
  warning: palette.yellow500,
  info: palette.blue400,
  
  // Spezielle Elemente
  buttonPrimary: `bg-gradient-to-r from-${palette.blue400} to-${palette.blue500}`,
  buttonSecondary: palette.blue100,
  buttonDisabled: palette.gray300,
  inputBorder: palette.blue200,
  inputBackground: palette.white,
  cardBackground: palette.white,
  
  // Gradient-Definitionen
  gradientPrimary: `bg-gradient-to-r from-${palette.blue400} to-${palette.blue500}`,
  gradientSecondary: `bg-gradient-to-r from-${palette.blue300} to-${palette.blue400}`,
  gradientAccent: `bg-gradient-to-r from-${palette.blue500} to-${palette.blue600}`,
  gradientBackground: `bg-gradient-to-b from-${palette.blue50} via-${palette.blue100} to-${palette.blue50}`,
  gradientOverlay: `bg-gradient-to-t from-${palette.black} to-transparent`,
  gradientDivider: `bg-gradient-to-r from-transparent via-${palette.blue400} to-transparent`,
  
  // Erweiterte Einstellungen
  typography: defaultTypography,
  uiElements: defaultUIElements
}

// Elegantes Theme (Türkis/Salbei)
export const elegantTheme: ColorTheme = {
  // Primäre Farben
  primary: palette.teal600,
  primaryLight: palette.teal500,
  primaryDark: palette.teal700,
  
  // Sekundäre Farben
  secondary: palette.gray500,
  secondaryLight: palette.gray400,
  secondaryDark: palette.gray600,
  
  // Akzentfarben
  accent: palette.teal500,
  accentLight: palette.teal400,
  accentDark: palette.teal600,
  
  // Hintergrundfarben
  background: palette.white,
  backgroundLight: palette.teal50,
  backgroundDark: palette.teal100,
  backgroundGradient: `bg-gradient-to-b from-${palette.teal50} via-${palette.white} to-${palette.teal50}`,
  
  // Textfarben
  textPrimary: palette.gray800,
  textSecondary: palette.gray600,
  textLight: palette.gray500,
  textOnDark: palette.white,
  
  // UI-Elemente
  border: palette.gray300,
  borderLight: palette.gray200,
  divider: palette.teal200,
  shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  overlay: 'rgba(0, 0, 0, 0.5)',
  
  // Status-Farben
  success: palette.green500,
  error: palette.red500,
  warning: palette.yellow500,
  info: palette.teal400,
  
  // Spezielle Elemente
  buttonPrimary: `bg-gradient-to-r from-${palette.teal500} to-${palette.teal600}`,
  buttonSecondary: palette.teal100,
  buttonDisabled: palette.gray300,
  inputBorder: palette.teal200,
  inputBackground: palette.white,
  cardBackground: palette.white,
  
  // Gradient-Definitionen
  gradientPrimary: `bg-gradient-to-r from-${palette.teal500} to-${palette.teal600}`,
  gradientSecondary: `bg-gradient-to-r from-${palette.teal400} to-${palette.teal500}`,
  gradientAccent: `bg-gradient-to-r from-${palette.teal500} to-${palette.teal600}`,
  gradientBackground: `bg-gradient-to-b from-${palette.teal50} via-${palette.white} to-${palette.teal50}`,
  gradientOverlay: `bg-gradient-to-t from-${palette.black} to-transparent`,
  gradientDivider: `bg-gradient-to-r from-transparent via-${palette.teal400} to-transparent`,
  
  // Erweiterte Einstellungen
  typography: defaultTypography,
  uiElements: defaultUIElements
}

// Standardtheme (wird als Fallback verwendet)
export const defaultTheme: ColorTheme = elegantTheme;

// Hinweis: Das aktive Theme sollte über den ThemeProvider bezogen werden
// Verwende useTheme() aus ThemeProvider.tsx, um das aktive Theme zu erhalten
// Beispiel: const { activeTheme } = useTheme();

// Hilfsfunktionen für Tailwind-Klassen
export const tailwindClasses = {
  // Hintergrundfarben
  bg: {
    primary: 'bg-gray-700',
    primaryLight: 'bg-gray-600',
    primaryDark: 'bg-gray-800',
    secondary: 'bg-gray-500',
    accent: 'bg-blue-400',
    background: 'bg-white',
    backgroundLight: 'bg-gray-50',
    backgroundDark: 'bg-gray-100',
  },
  
  // Textfarben
  text: {
    primary: 'text-gray-800',
    secondary: 'text-gray-600',
    light: 'text-gray-500',
    onDark: 'text-white',
    accent: 'text-blue-400',
  },
  
  // Rahmenfarben
  border: {
    primary: 'border-gray-300',
    light: 'border-gray-200',
    accent: 'border-blue-400',
  },
  
  // Gradient-Klassen
  gradient: {
    primary: 'bg-gradient-to-r from-gray-600 to-gray-700',
    secondary: 'bg-gradient-to-r from-gray-400 to-gray-500',
    accent: 'bg-gradient-to-r from-blue-300 to-blue-500',
    background: 'bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50',
    divider: 'bg-gradient-to-r from-transparent via-gray-400 to-transparent',
  },
  
  // Hover-Effekte
  hover: {
    bgPrimary: 'hover:bg-gray-800',
    bgSecondary: 'hover:bg-gray-600',
    bgAccent: 'hover:bg-blue-500',
    textPrimary: 'hover:text-gray-900',
    textSecondary: 'hover:text-gray-700',
    textAccent: 'hover:text-blue-500',
  },
  
  // Schatten
  shadow: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  },
}

// Export des gesamten Farbsystems als Standard
export default {
  palette,
  grayTheme,
  blueTheme,
  elegantTheme,
  defaultTheme,
  tailwindClasses,
  defaultTypography,
  defaultUIElements
};
