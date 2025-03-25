import React from 'react';
import { useTranslation } from 'react-i18next';

const HairLossPatternsSection: React.FC = () => {
  const { t } = useTranslation('hairTransplantation');

  // Get patterns from translation
  const patterns = t('hairLossPatternsSection.patterns', { returnObjects: true }) as any[];

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-50 py-16 md:py-24 relative">
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-5 z-0" 
        style={{ 
          backgroundImage: 'url("/images/dionhairclinic_bg.svg")',
          backgroundSize: '200px',
          backgroundRepeat: 'repeat'
        }}
      ></div>
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
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
              className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100"
            >
              {/* Pattern Image */}
              <div className="h-64 bg-gradient-to-t from-[#7BA7C2]/30 to-transparent overflow-hidden border-b border-gray-100 relative">
                {pattern.title.includes("Norwood 1-2") ? (
                  <img 
                    src="/images/norwood_scale_1.png" 
                    alt={pattern.title}
                    className="w-full h-full object-cover"
                  />
                ) : pattern.title.includes("Norwood 3") ? (
                  <img 
                    src="/images/norwood_scale_3.png" 
                    alt={pattern.title}
                    className="w-full h-full object-cover"
                  />
                ) : pattern.title.includes("Norwood 4") ? (
                  <img 
                    src="/images/norwood_scale_4.png" 
                    alt={pattern.title}
                    className="w-full h-full object-cover"
                  />
                ) : pattern.title.includes("Norwood 5-6") ? (
                  <img 
                    src="/images/norwood_scale_5.png" 
                    alt={pattern.title}
                    className="w-full h-full object-cover"
                  />
                ) : pattern.title.includes("Norwood 7") ? (
                  <img 
                    src="/images/norwood_scale_7.png" 
                    alt={pattern.title}
                    className="w-full h-full object-cover"
                  />
                ) : pattern.title.includes("Frauen") ? (
                  <img 
                    src="/images/frau_lichter_scheitel.png" 
                    alt={pattern.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <span className="text-2xl font-light text-gray-400">{pattern.title}</span>
                  </div>
                )}
              </div>
              
              {/* Pattern Content - using the same approach as MethodsSection */}
              <div className="p-4 bg-white relative h-[250px]">
                {/* Title and description at the top with fixed position */}
                <div className="absolute top-4 left-4 right-4 h-[100px]">
                  <h3 className="text-xl font-light text-gray-800 mb-2 text-center md:text-left">{pattern.title}</h3>
                  <p className="text-gray-600 font-light text-center md:text-left">
                    {pattern.description}
                  </p>
                </div>
                
                {/* Dividing line at fixed position */}
                <div className="absolute top-[155px] left-4 right-4 border-t border-gray-200"></div>
                
                {/* Pattern Details - fixed position at bottom with center alignment */}
                <div className="absolute top-[160px] left-4 right-4 h-[90px]">
                  <div className="grid grid-cols-2 gap-4 text-sm pt-4">
                    <div className="text-center">
                      <h4 className="text-gray-500 font-light mb-1">{t('hairLossPatternsSection.typicalGrafts')}:</h4>
                      <p className="text-[#7BA7C2] font-light">{pattern.grafts}</p>
                    </div>
                    <div className="text-center">
                      <h4 className="text-gray-500 font-light mb-1">{t('hairLossPatternsSection.treatment')}:</h4>
                      <p className="text-[#7BA7C2] font-light">{pattern.treatment}</p>
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
