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
  h1: 'text-4xl md:text-5xl lg:text-6xl', // Hauptüberschrift (nur für spezielle Seiten)
  h2: 'text-3xl md:text-3xl lg:text-4xl', // Sektionsüberschriften - etwas kleiner für Eleganz
  h3: 'text-xl md:text-2xl', // Unterabschnittsüberschriften - feiner und eleganter
  h4: 'text-lg', // Kartenüberschriften, kleinere Abschnitte
  
  // Fließtext
  base: 'text-base', // Standardtext
  lg: 'text-lg', // Hervorgehobener Text, wichtige Informationen
  sm: 'text-sm', // Sekundärer Text, Beschreibungen
  xs: 'text-xs', // Hinweise, Fußnoten
  
  // Responsive Varianten
  heroMobile: 'text-3xl', // Für Hero-Überschriften auf Mobilgeräten
  heroDesktop: 'text-4xl md:text-5xl', // Für Hero-Überschriften auf Desktop
};

// Schriftgewichte für verschiedene Textelemente
export const fontWeight = {
  light: 'font-light', // 300 - Für elegante Elemente
  normal: 'font-normal', // 400 - Für Fließtext und Überschriften
  medium: 'font-medium', // 500 - Für Hervorhebungen und Buttons
  semibold: 'font-semibold', // 600 - Für starke Hervorhebungen
  bold: 'font-bold', // 700 - Für sehr wichtige Elemente (sparsam verwenden)
};

// Zeilenabstände für optimale Lesbarkeit
export const lineHeight = {
  tight: 'leading-snug', // Für Überschriften - etwas mehr Abstand für Eleganz
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
  wide: 'tracking-wide', // Weiter Buchstabenabstand für Eleganz
  wider: 'tracking-wider', // Sehr weiter Buchstabenabstand für besondere Eleganz
  elegant: 'tracking-widest', // Maximaler Buchstabenabstand für höchste Eleganz
};

// Kombinierte Typografie-Stile für häufig verwendete Elemente
export const textStyle = {
  // Überschriften
  sectionTitle: `${fontSize.h2} ${fontWeight.light} ${lineHeight.tight} ${textColor.dark} ${tracking.normal} break-words hyphens-auto px-2 md:px-0 md:tracking-widest md:font-normal`,
  sectionSubtitle: `${fontSize.lg} ${fontWeight.normal} ${lineHeight.normal} ${textColor.medium} md:tracking-wide`,
  cardTitle: `${fontSize.h4} ${fontWeight.normal} ${lineHeight.tight} ${textColor.dark} ${tracking.wide} md:tracking-wider`,
  
  // Fließtext
  bodyText: `${fontSize.base} ${fontWeight.normal} ${lineHeight.relaxed} ${textColor.medium}`,
  bodyTextImportant: `${fontSize.lg} ${fontWeight.normal} ${lineHeight.relaxed} ${textColor.dark}`,
  bodyTextSmall: `${fontSize.sm} ${fontWeight.normal} ${lineHeight.normal} ${textColor.medium}`,
  
  // Listen
  listItem: `${fontSize.base} ${fontWeight.normal} ${lineHeight.relaxed} ${textColor.medium} pl-2`,
  listItemBullet: `${fontSize.base} ${fontWeight.medium} ${textColor.primary} mr-2`,
  
  // Spezielle Elemente
  button: `${fontSize.base} ${fontWeight.medium} ${tracking.wider} ${textColor.white}`,
  badge: `${fontSize.xs} ${fontWeight.medium} ${tracking.wide}`,
  stat: `${fontSize.h3} ${fontWeight.medium} ${textColor.primary} ${tracking.wider}`,
  
  // Primärfarben-Varianten
  primaryHeading: `${fontSize.h3} ${fontWeight.light} ${lineHeight.tight} ${textColor.primary} ${tracking.wider} md:tracking-widest`,
  primaryText: `${fontSize.base} ${fontWeight.normal} ${lineHeight.normal} ${textColor.primary}`,
  
  // Hero-Titel mit besonderer Eleganz
  heroTitle: `${fontSize.heroDesktop} ${fontWeight.light} ${lineHeight.tight} ${textColor.dark} ${tracking.wide} md:tracking-widest md:leading-tight`,
};

// Hilfsfunktion zum Kombinieren von Typografie-Klassen
export const combineTypography = (...classes: string[]): string => {
  return classes.join(' ');
};

// Gradient-Unterstriche für Überschriften
export const gradientUnderline = {
  primary: 'h-px bg-gradient-to-r from-transparent via-[#7BA7C2] to-transparent',
  light: 'h-px bg-gradient-to-r from-transparent via-[#7BA7C2]/25 to-transparent',
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
