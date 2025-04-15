/**
 * Button Utility
 * 
 * Dieses Modul definiert ein einheitliches Button-System für die gesamte Anwendung.
 * Es enthält Definitionen für verschiedene Button-Stile, die in allen Komponenten
 * verwendet werden sollten, um ein konsistentes Design zu gewährleisten.
 */

// Basis-Button-Klassen, die für alle Buttons gelten
export const buttonBase = "group relative inline-flex items-center justify-center overflow-hidden transition-all duration-300 shadow-md font-medium uppercase";

// Größen-Varianten für Buttons
export const buttonSize = {
  sm: "px-4 py-2 rounded-lg text-sm",
  md: "px-5 py-2.5 rounded-xl text-sm",
  lg: "px-5 py-2.5 rounded-xl text-sm",
};

// Farb-Varianten für Buttons
export const buttonColor = {
  primary: "bg-gradient-to-r from-[#7BA7C2] to-[#5A8BA6] text-white",
  secondary: "bg-white border border-[#7BA7C2] text-[#7BA7C2]",
  dark: "bg-gray-800 text-white",
  light: "bg-white border border-gray-200 text-gray-700",
  black: "bg-black text-white",
};

// Ripple-Effekt-Klasse für Buttons
export const buttonRippleClass = "absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-80 group-hover:h-80 opacity-10";

// Pfeil-Icon-Klasse mit Hover-Effekt
export const buttonArrowClass = "ml-1.5 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1";

// Kombinierte Button-Stile für häufig verwendete Varianten
export const buttonStyle = {
  // Primärer Button mit Gradient und Ripple-Effekt
  primary: `${buttonBase} ${buttonSize.lg} ${buttonColor.primary}`,
  
  // Sekundärer Button mit Outline
  secondary: `${buttonBase} ${buttonSize.lg} ${buttonColor.secondary}`,
  
  // Dunkler Button
  dark: `${buttonBase} ${buttonSize.lg} ${buttonColor.dark}`,
  
  // Heller Button
  light: `${buttonBase} ${buttonSize.lg} ${buttonColor.light}`,
  
  // Schwarzer Button (z.B. für App Store)
  black: `${buttonBase} ${buttonSize.md} ${buttonColor.black}`,
  
  // Kleinere Variante des primären Buttons
  primarySmall: `${buttonBase} ${buttonSize.sm} ${buttonColor.primary}`,
};

// Export des gesamten Button-Systems als Standard
export default {
  buttonBase,
  buttonSize,
  buttonColor,
  buttonRippleClass,
  buttonArrowClass,
  buttonStyle,
};
