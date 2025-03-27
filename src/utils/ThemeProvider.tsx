import React, { createContext, useContext, useState, useEffect } from 'react';
import { ColorTheme, grayTheme, blueTheme, elegantTheme } from './colors';

// Definiere den Typ für den Theme-Namen
type ThemeName = 'gray' | 'blue' | 'elegant' | 'custom';

// Definiere den Typ für den Theme-Kontext
type ThemeContextType = {
  activeTheme: ColorTheme;
  setTheme: (theme: 'gray' | 'blue' | 'elegant' | ColorTheme) => void;
  themeName: ThemeName;
};

// Erstelle den Theme-Kontext mit Standardwerten
const ThemeContext = createContext<ThemeContextType>({
  activeTheme: elegantTheme,
  setTheme: () => {},
  themeName: 'elegant',
});

// Hook zum Verwenden des Theme-Kontexts
export const useTheme = () => useContext(ThemeContext);

// Theme-Provider-Komponente
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Lade das gespeicherte Theme aus dem localStorage, falls vorhanden
  const getSavedTheme = (): { themeName: ThemeName; theme: ColorTheme } => {
    const savedThemeName = localStorage.getItem('theme');
    
    // Wenn ein benutzerdefiniertes Theme gespeichert ist
    if (savedThemeName === 'custom') {
      try {
        const customThemeStr = localStorage.getItem('customTheme');
        if (customThemeStr) {
          const customTheme = JSON.parse(customThemeStr) as ColorTheme;
          return { themeName: 'custom', theme: customTheme };
        }
      } catch (error) {
        console.error('Fehler beim Laden des benutzerdefinierten Themes:', error);
      }
    }
    
    // Vordefinierte Themes oder Fallback
    if (savedThemeName === 'gray') {
      return { themeName: 'gray', theme: grayTheme };
    } else if (savedThemeName === 'blue') {
      return { themeName: 'blue', theme: blueTheme };
    } else {
      return { themeName: 'elegant', theme: elegantTheme };
    }
  };

  // Lade das gespeicherte Theme
  const savedThemeData = getSavedTheme();
  
  // State für das aktive Theme
  const [themeName, setThemeName] = useState<ThemeName>(savedThemeData.themeName);
  const [activeTheme, setActiveTheme] = useState<ColorTheme>(savedThemeData.theme);

  // Funktion zum Ändern des Themes
  const setTheme = (theme: 'gray' | 'blue' | 'elegant' | ColorTheme) => {
    if (theme === 'gray') {
      setActiveTheme(grayTheme);
      setThemeName('gray');
      localStorage.setItem('theme', 'gray');
      localStorage.removeItem('customTheme'); // Entferne benutzerdefiniertes Theme
    } else if (theme === 'blue') {
      setActiveTheme(blueTheme);
      setThemeName('blue');
      localStorage.setItem('theme', 'blue');
      localStorage.removeItem('customTheme'); // Entferne benutzerdefiniertes Theme
    } else if (theme === 'elegant') {
      setActiveTheme(elegantTheme);
      setThemeName('elegant');
      localStorage.setItem('theme', 'elegant');
      localStorage.removeItem('customTheme'); // Entferne benutzerdefiniertes Theme
    } else {
      // Wenn ein benutzerdefiniertes Theme übergeben wird
      setActiveTheme(theme);
      setThemeName('custom');
      // Benutzerdefinierte Themes im localStorage speichern
      localStorage.setItem('theme', 'custom');
      localStorage.setItem('customTheme', JSON.stringify(theme));
    }
  };

  // Stelle den Theme-Kontext bereit
  return (
    <ThemeContext.Provider value={{ activeTheme, setTheme, themeName }}>
      {children}
    </ThemeContext.Provider>
  );
};

// ThemeSwitcher-Komponente zum einfachen Wechseln zwischen Themes
export const ThemeSwitcher: React.FC = () => {
  const { themeName, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <button
        className={`px-3 py-1 rounded-md transition-all ${
          themeName === 'gray' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'
        }`}
        onClick={() => setTheme('gray')}
      >
        Grau
      </button>
      <button
        className={`px-3 py-1 rounded-md transition-all ${
          themeName === 'blue' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-700'
        }`}
        onClick={() => setTheme('blue')}
      >
        Blau
      </button>
      <button
        className={`px-3 py-1 rounded-md transition-all ${
          themeName === 'elegant' ? 'bg-teal-500 text-white' : 'bg-teal-100 text-teal-700'
        }`}
        onClick={() => setTheme('elegant')}
      >
        Elegant
      </button>
    </div>
  );
};

export default ThemeProvider;
