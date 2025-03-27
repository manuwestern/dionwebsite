import React from 'react';
import { textStyle } from '../../utils/typography';
import { ThemeDesignerProps, ColorCategory } from './types';
import { ColorTheme } from '../../utils/colors';

const ColorsSection: React.FC<ThemeDesignerProps> = ({ customTheme, updateCustomTheme }) => {
  // Farbkategorien für die Benutzeroberfläche
  const colorCategories: ColorCategory[] = [
    {
      title: 'Primäre Farben',
      colors: [
        { key: 'primary', label: 'Primär' },
        { key: 'primaryLight', label: 'Primär Hell' },
        { key: 'primaryDark', label: 'Primär Dunkel' },
      ]
    },
    {
      title: 'Sekundäre Farben',
      colors: [
        { key: 'secondary', label: 'Sekundär' },
        { key: 'secondaryLight', label: 'Sekundär Hell' },
        { key: 'secondaryDark', label: 'Sekundär Dunkel' },
      ]
    },
    {
      title: 'Akzentfarben',
      colors: [
        { key: 'accent', label: 'Akzent' },
        { key: 'accentLight', label: 'Akzent Hell' },
        { key: 'accentDark', label: 'Akzent Dunkel' },
      ]
    },
    {
      title: 'Hintergrundfarben',
      colors: [
        { key: 'background', label: 'Hintergrund' },
        { key: 'backgroundLight', label: 'Hintergrund Hell' },
        { key: 'backgroundDark', label: 'Hintergrund Dunkel' },
      ]
    },
    {
      title: 'Textfarben',
      colors: [
        { key: 'textPrimary', label: 'Text Primär' },
        { key: 'textSecondary', label: 'Text Sekundär' },
        { key: 'textLight', label: 'Text Hell' },
        { key: 'textOnDark', label: 'Text auf Dunkel' },
      ]
    },
    {
      title: 'UI-Elemente',
      colors: [
        { key: 'border', label: 'Rahmen' },
        { key: 'borderLight', label: 'Rahmen Hell' },
        { key: 'divider', label: 'Trennlinie' },
      ]
    }
  ];

  return (
    <div>
      <h2 className={textStyle.primaryHeading} style={{ color: customTheme.primary, marginBottom: '1.5rem' }}>
        Farbeinstellungen
      </h2>
      
      {/* Farbkategorien */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {colorCategories.map((category, index) => (
          <div key={index} className="mb-8">
            <h3 className={textStyle.primaryHeading} style={{ color: customTheme.textPrimary, marginBottom: '1rem' }}>
              {category.title}
            </h3>
            <div className="space-y-4">
              {category.colors.map((color) => (
                <div key={color.key} className="flex items-center gap-4">
                  <div 
                    className="w-8 h-8 rounded-md shadow-sm"
                    style={{ backgroundColor: customTheme[color.key as keyof ColorTheme] as string }}
                  ></div>
                  <label className="w-32" style={{ color: customTheme.textSecondary }}>
                    {color.label}:
                  </label>
                  <input
                    type="color"
                    value={customTheme[color.key as keyof ColorTheme] as string}
                    onChange={(e) => updateCustomTheme(color.key as keyof ColorTheme, e.target.value)}
                    className="w-12 h-8 rounded cursor-pointer"
                    title={`Farbauswahl für ${color.label}`}
                    aria-label={`Farbauswahl für ${color.label}`}
                  />
                  <input
                    type="text"
                    value={customTheme[color.key as keyof ColorTheme] as string}
                    onChange={(e) => updateCustomTheme(color.key as keyof ColorTheme, e.target.value)}
                    className="px-3 py-1 rounded border"
                    style={{ 
                      borderColor: customTheme.borderLight,
                      color: customTheme.textPrimary,
                      backgroundColor: customTheme.backgroundLight
                    }}
                    title={`Farbcode für ${color.label}`}
                    aria-label={`Farbcode für ${color.label}`}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorsSection;
