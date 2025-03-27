import React from 'react';
import { ThemeDesignerProps } from './types';

interface ActionsSectionProps extends ThemeDesignerProps {
  applyCustomTheme: () => void;
  resetCustomTheme: () => void;
}

const ActionsSection: React.FC<ActionsSectionProps> = ({ 
  customTheme, 
  applyCustomTheme, 
  resetCustomTheme 
}) => {
  return (
    <div className="flex justify-center gap-4 mb-8">
      <button
        className="px-6 py-3 rounded-lg shadow-md transition-all"
        style={{ 
          backgroundColor: customTheme.accent,
          color: 'white'
        }}
        onClick={applyCustomTheme}
      >
        Theme anwenden
      </button>
      <button
        className="px-6 py-3 rounded-lg shadow-md transition-all"
        style={{ 
          backgroundColor: customTheme.backgroundLight,
          color: customTheme.textPrimary,
          border: `1px solid ${customTheme.borderLight}`
        }}
        onClick={resetCustomTheme}
      >
        Zurücksetzen
      </button>
    </div>
  );
};

export default ActionsSection;
