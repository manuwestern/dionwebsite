import React from 'react';
import { textStyle } from '../../utils/typography';
import { ThemeDesignerProps } from './types';

const HeaderSection: React.FC<ThemeDesignerProps> = ({ customTheme }) => {
  return (
    <div className="text-center mb-10">
      <h1 className={textStyle.sectionTitle} style={{ color: customTheme.textPrimary }}>
        Theme Designer
      </h1>
      <div 
        className="w-24 h-px mx-auto mt-4 mb-6"
        style={{ 
          background: `linear-gradient(to right, transparent, ${customTheme.divider}, transparent)` 
        }}
      ></div>
      <p className="max-w-2xl mx-auto" style={{ color: customTheme.textSecondary }}>
        Passen Sie das Theme und die Typografie visuell an und sehen Sie die Änderungen in Echtzeit.
      </p>
    </div>
  );
};

export default HeaderSection;
