import React from 'react';
import { useTranslation } from 'react-i18next';

const HairLossPatternsSection: React.FC = () => {
  const { t } = useTranslation('hairTransplantation');

  // Get patterns from translation
  const patterns = t('hairLossPatternsSection.patterns', { returnObjects: true }) as any[];

  return (
    <div className="bg-gray-100 py-16 md:py-24">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light mb-3 md:text-5xl md:mb-4">
            {t('hairLossPatternsSection.title')}
          </h2>
          <p className="text-base text-gray-600 font-light md:text-xl max-w-3xl mx-auto">
            {t('hairLossPatternsSection.description')}
          </p>
        </div>

        {/* Patterns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {patterns.map((pattern, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl overflow-hidden shadow-lg"
            >
              {/* Pattern Image */}
              <div className="h-64 bg-gray-300 relative">
                {/* Placeholder for image - would be replaced with actual images */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-light text-white">{pattern.title}</span>
                </div>
              </div>
              
              {/* Pattern Content - using the same approach as MethodsSection */}
              <div className="p-4 bg-white relative h-[250px]">
                {/* Title and description at the top with fixed position */}
                <div className="absolute top-4 left-4 right-4 h-[100px]">
                  <h3 className="text-xl font-medium text-gray-800 mb-2">{pattern.title}</h3>
                  <p className="text-gray-600 font-light">
                    {pattern.description}
                  </p>
                </div>
                
                {/* Dividing line at fixed position */}
                <div className="absolute top-[160px] left-4 right-4 border-t border-gray-200"></div>
                
                {/* Pattern Details - fixed position at bottom with center alignment */}
                <div className="absolute top-[170px] left-4 right-4 h-[90px]">
                  <div className="grid grid-cols-2 gap-4 text-sm pt-4">
                    <div className="text-center">
                      <h4 className="text-gray-500 font-medium mb-1">{t('hairLossPatternsSection.typicalGrafts')}:</h4>
                      <p className="text-gray-800 font-medium">{pattern.grafts}</p>
                    </div>
                    <div className="text-center">
                      <h4 className="text-gray-500 font-medium mb-1">{t('hairLossPatternsSection.treatment')}:</h4>
                      <p className="text-gray-800 font-medium">{pattern.treatment}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HairLossPatternsSection;
