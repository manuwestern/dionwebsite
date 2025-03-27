/**
 * Button Utility
 * 
 * Dieses Modul definiert ein einheitliches Button-System für die gesamte Anwendung.
 * Es enthält Definitionen für verschiedene Button-Stile, die in allen Komponenten
 * verwendet werden sollten, um ein konsistentes Design zu gewährleisten.
 * 
 * Dieses Modul verwendet das zentrale Farbsystem aus colors.ts und den ThemeProvider
 * für dynamische Theme-Unterstützung.
 */

import { palette, tailwindClasses } from './colors';

// Basis-Button-Klassen, die für alle Buttons gelten
export const buttonBase = "group relative inline-flex items-center justify-center overflow-hidden transition-all duration-300 shadow-lg";

// Größen-Varianten für Buttons
export const buttonSize = {
  sm: "px-4 py-2 rounded-lg text-sm",
  md: "px-6 py-3 rounded-xl",
  lg: "px-8 py-4 rounded-xl",
};

// Ripple-Effekt-Klasse für Buttons
export const buttonRippleClass = "absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-80 group-hover:h-80 opacity-10";

// Pfeil-Icon-Klasse mit Hover-Effekt
export const buttonArrowClass = "ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1";

// Kombinierte Button-Stile für häufig verwendete Varianten
// Hinweis: Diese Stile verwenden nun inline-style mit activeTheme in den Komponenten
export const buttonStyle = {
  // Primärer Button mit Gradient und Ripple-Effekt
  primary: `${buttonBase} ${buttonSize.lg}`,
  
  // Sekundärer Button mit Outline
  secondary: `${buttonBase} ${buttonSize.lg}`,
  
  // Dunkler Button
  dark: `${buttonBase} ${buttonSize.lg}`,
  
  // Heller Button
  light: `${buttonBase} ${buttonSize.lg}`,
  
  // Schwarzer Button (z.B. für App Store)
  black: `${buttonBase} ${buttonSize.md}`,
  
  // Kleinere Variante des primären Buttons
  primarySmall: `${buttonBase} ${buttonSize.sm}`,
};

// Export des gesamten Button-Systems als Standard
export default {
  buttonBase,
  buttonSize,
  buttonRippleClass,
  buttonArrowClass,
  buttonStyle,
};
