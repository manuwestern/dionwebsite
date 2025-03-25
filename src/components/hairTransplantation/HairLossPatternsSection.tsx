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
              className="bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 border border-gray-100"
            >
              {/* Pattern Image without overlay gradient */}
              <div className="h-64 overflow-hidden relative">
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
              
              {/* Pattern title - fixed height header */}
              <div className="w-full p-4 bg-[#7BA7C2] h-[60px] flex items-center justify-center">
                <h3 className="text-lg font-light text-white text-center line-clamp-2">{pattern.title}</h3>
              </div>
              
              {/* Pattern Content */}
              <div className="p-5 bg-gradient-to-b from-gray-50 to-white">
                {/* Description */}
                <p className="text-sm text-gray-600 font-light mb-5 leading-relaxed">
                  {pattern.description}
                </p>
                
                {/* Dividing line with gradient */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#7BA7C2]/30 to-transparent my-4"></div>
                
                {/* Pattern Details with improved styling */}
                <div className="grid grid-cols-2 gap-6 mt-4">
                  <div className="bg-[#7BA7C2]/5 rounded-lg p-3">
                    <h4 className="text-xs text-[#7BA7C2] font-light mb-1 uppercase tracking-wider">{t('hairLossPatternsSection.typicalGrafts')}</h4>
                    <p className="text-lg text-[#7BA7C2] font-light">{pattern.grafts}</p>
                  </div>
                  <div className="bg-[#7BA7C2]/5 rounded-lg p-3">
                    <h4 className="text-xs text-[#7BA7C2] font-light mb-1 uppercase tracking-wider">{t('hairLossPatternsSection.treatment')}</h4>
                    <p className="text-lg text-[#7BA7C2] font-light">{pattern.treatment}</p>
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
