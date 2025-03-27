import React from 'react';
import { ThemeDesignerProps } from './types';
import { ThemeDesignerTab } from './types';

interface TabsSectionProps extends ThemeDesignerProps {
  activeTab: ThemeDesignerTab;
  setActiveTab: (tab: ThemeDesignerTab) => void;
}

const TabsSection: React.FC<TabsSectionProps> = ({ customTheme, activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex rounded-lg overflow-hidden shadow-md">
        <button
          className={`px-6 py-3 transition-all ${activeTab === 'colors' ? 'text-white' : ''}`}
          style={{ 
            backgroundColor: activeTab === 'colors' ? customTheme.primary : customTheme.backgroundLight,
            color: activeTab === 'colors' ? 'white' : customTheme.textPrimary,
            borderRight: `1px solid ${customTheme.borderLight}`
          }}
          onClick={() => setActiveTab('colors')}
        >
          Farben
        </button>
        <button
          className={`px-6 py-3 transition-all ${activeTab === 'typography' ? 'text-white' : ''}`}
          style={{ 
            backgroundColor: activeTab === 'typography' ? customTheme.primary : customTheme.backgroundLight,
            color: activeTab === 'typography' ? 'white' : customTheme.textPrimary,
            borderRight: `1px solid ${customTheme.borderLight}`
          }}
          onClick={() => setActiveTab('typography')}
        >
          Typografie
        </button>
        <button
          className={`px-6 py-3 transition-all ${activeTab === 'ui-elements' ? 'text-white' : ''}`}
          style={{ 
            backgroundColor: activeTab === 'ui-elements' ? customTheme.primary : customTheme.backgroundLight,
            color: activeTab === 'ui-elements' ? 'white' : customTheme.textPrimary,
            borderRight: `1px solid ${customTheme.borderLight}`
          }}
          onClick={() => setActiveTab('ui-elements')}
        >
          UI-Elemente
        </button>
        <button
          className={`px-6 py-3 transition-all ${activeTab === 'preview' ? 'text-white' : ''}`}
          style={{ 
            backgroundColor: activeTab === 'preview' ? customTheme.primary : customTheme.backgroundLight,
            color: activeTab === 'preview' ? 'white' : customTheme.textPrimary
          }}
          onClick={() => setActiveTab('preview')}
        >
          Vorschau
        </button>
      </div>
    </div>
  );
};

export default TabsSection;
