/**
 * Typography Utility
 * 
 * Dieses Modul definiert ein konsistentes Typografie-System für die gesamte Anwendung.
 * Es enthält Definitionen für Schriftgrößen, Schriftgewichte und Textfarben,
 * die in allen Komponenten verwendet werden sollten.
 */

// Schriftgrößen-Klassen für verschiedene Hierarchieebenen
export const fontSize = {
  // Überschriften
  h1: 'text-5xl md:text-6xl', // Hauptüberschrift (nur für spezielle Seiten)
  h2: 'text-3xl md:text-5xl', // Sektionsüberschriften
  h3: 'text-2xl md:text-3xl', // Unterabschnittsüberschriften
  h4: 'text-xl', // Kartenüberschriften, kleinere Abschnitte
  
  // Fließtext
  base: 'text-base', // Standardtext
  lg: 'text-lg', // Hervorgehobener Text, wichtige Informationen
  sm: 'text-sm', // Sekundärer Text, Beschreibungen
  xs: 'text-xs', // Hinweise, Fußnoten
  
  // Responsive Varianten
  heroMobile: 'text-4xl', // Für Hero-Überschriften auf Mobilgeräten
  heroDesktop: 'text-5xl', // Für Hero-Überschriften auf Desktop
};

// Schriftgewichte für verschiedene Textelemente
export const fontWeight = {
  light: 'font-light', // 300 - Für Überschriften und elegante Elemente
  normal: 'font-normal', // 400 - Für Fließtext
  medium: 'font-medium', // 500 - Für Hervorhebungen und Buttons
  semibold: 'font-semibold', // 600 - Für starke Hervorhebungen
  bold: 'font-bold', // 700 - Für sehr wichtige Elemente (sparsam verwenden)
};

// Zeilenabstände für optimale Lesbarkeit
export const lineHeight = {
  tight: 'leading-tight', // Für Überschriften
  normal: 'leading-normal', // Standard
  relaxed: 'leading-relaxed', // Für längere Textabschnitte
  loose: 'leading-loose', // Für sehr lange Textabschnitte oder Listen
};

// Textfarben für verschiedene Elemente und Zustände
export const textColor = {
  // Primäre Farben
  primary: 'text-[#7BA7C2]', // Primärfarbe für Hervorhebungen
  primaryDark: 'text-[#5A8BA6]', // Dunklere Variante der Primärfarbe
  
  // Neutrale Farben
  dark: 'text-gray-800', // Haupttextfarbe
  medium: 'text-gray-600', // Sekundäre Textfarbe
  light: 'text-gray-500', // Tertiäre Textfarbe
  
  // Spezielle Farben
  white: 'text-white', // Für Text auf dunklem Hintergrund
  accent: 'text-yellow-500', // Für Akzente wie Bewertungssterne
};

// Tracking (Buchstabenabstand)
export const tracking = {
  tighter: 'tracking-tighter', // Enger Buchstabenabstand
  tight: 'tracking-tight', // Leicht enger Buchstabenabstand
  normal: 'tracking-normal', // Normaler Buchstabenabstand
  wide: 'tracking-wide', // Weiter Buchstabenabstand
  wider: 'tracking-wider', // Sehr weiter Buchstabenabstand
};

// Kombinierte Typografie-Stile für häufig verwendete Elemente
export const textStyle = {
  // Überschriften
  sectionTitle: `${fontSize.h2} ${fontWeight.normal} ${lineHeight.tight} ${textColor.dark}`,
  sectionSubtitle: `${fontSize.lg} ${fontWeight.light} ${lineHeight.normal} ${textColor.medium}`,
  cardTitle: `${fontSize.h4} ${fontWeight.medium} ${lineHeight.tight} ${textColor.dark}`,
  
  // Fließtext
  bodyText: `${fontSize.base} ${fontWeight.light} ${lineHeight.relaxed} ${textColor.medium}`,
  bodyTextImportant: `${fontSize.lg} ${fontWeight.light} ${lineHeight.relaxed} ${textColor.dark}`,
  bodyTextSmall: `${fontSize.sm} ${fontWeight.light} ${lineHeight.normal} ${textColor.medium}`,
  
  // Listen
  listItem: `${fontSize.base} ${fontWeight.light} ${lineHeight.relaxed} ${textColor.medium} pl-2`,
  listItemBullet: `${fontSize.base} ${fontWeight.medium} ${textColor.primary} mr-2`,
  
  // Spezielle Elemente
  button: `${fontSize.base} ${fontWeight.medium} ${tracking.wider} ${textColor.white}`,
  badge: `${fontSize.xs} ${fontWeight.medium} ${tracking.wide}`,
  stat: `${fontSize.h3} ${fontWeight.medium} ${textColor.primary}`,
  
  // Primärfarben-Varianten
  primaryHeading: `${fontSize.h3} ${fontWeight.normal} ${lineHeight.tight} ${textColor.primary}`,
  primaryText: `${fontSize.base} ${fontWeight.light} ${lineHeight.normal} ${textColor.primary}`,
};

// Hilfsfunktion zum Kombinieren von Typografie-Klassen
export const combineTypography = (...classes: string[]): string => {
  return classes.join(' ');
};

// Gradient-Unterstriche für Überschriften
export const gradientUnderline = {
  primary: 'h-1 bg-gradient-to-r from-transparent via-[#7BA7C2] to-transparent',
  light: 'h-0.5 bg-gradient-to-r from-transparent via-[#7BA7C2]/25 to-transparent',
};

// Export des gesamten Typografie-Systems als Standard
export default {
  fontSize,
  fontWeight,
  lineHeight,
  textColor,
  tracking,
  textStyle,
  gradientUnderline,
  combineTypography,
};
