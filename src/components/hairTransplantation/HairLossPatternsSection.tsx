import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react';

const HairLossPatternsSection: React.FC = () => {
  const { t } = useTranslation('hairTransplantation');
  const [hoverPattern, setHoverPattern] = useState<number | null>(null);

  // Get patterns from translation
  const patterns = t('hairLossPatternsSection.patterns', { returnObjects: true }) as any[];

  // Map pattern titles to images
  const patternImages = {
    "Norwood 1-2": "/images/norwood_scale_1.png",
    "Norwood 3": "/images/norwood_scale_3.png",
    "Norwood 4": "/images/norwood_scale_4.png",
    "Norwood 5-6": "/images/norwood_scale_5.png",
    "Norwood 7": "/images/norwood_scale_7.png",
    "Frauen": "/images/frau_lichter_scheitel.png"
  };

  // Get image for a pattern
  const getPatternImage = (title: string) => {
    for (const [key, value] of Object.entries(patternImages)) {
      if (title.includes(key)) {
        return value;
      }
    }
    return null;
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -z-10 w-full h-full inset-0 bg-gradient-to-b from-white via-gray-50 to-white"></div>
      <div className="absolute -z-10 w-[800px] h-[800px] rounded-full bg-[#7BA7C2]/5 -top-[400px] -right-[400px] blur-3xl"></div>
      <div className="absolute -z-10 w-[600px] h-[600px] rounded-full bg-[#7BA7C2]/5 -bottom-[300px] -left-[300px] blur-3xl"></div>
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <h2 className="text-3xl font-light md:text-5xl">{t('hairLossPatternsSection.title')}</h2>
            <div className="h-1 w-[350px] bg-gradient-to-r from-transparent via-[#7BA7C2] to-transparent mt-3 mx-auto"></div>
          </div>
          <p className="text-base text-gray-600 font-light md:text-xl max-w-3xl mx-auto mt-4">
            {t('hairLossPatternsSection.description')}
          </p>
        </div>

        {/* Patterns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {patterns.map((pattern, index) => {
            const isHovered = index === hoverPattern;
            const patternImage = getPatternImage(pattern.title);
            
            return (
              <div 
                key={index} 
                className="group relative"
                onMouseEnter={() => setHoverPattern(index)}
                onMouseLeave={() => setHoverPattern(null)}
              >
                {/* Card with glass morphism effect */}
                <div className={`relative h-full bg-white backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-500 ${
                  isHovered 
                    ? 'shadow-xl transform -translate-y-1 border-2 border-[#7BA7C2]/80' 
                    : 'border border-gray-100/80 hover:border-[#7BA7C2]/30 hover:shadow-xl'
                }`}>
                  {/* Pattern Image with background gradient */}
                  <div className={`h-64 overflow-hidden relative bg-gradient-to-t from-[#7BA7C2]/60 to-[#7BA7C2]/10`}>
                    {patternImage ? (
                      <img 
                        src={patternImage}
                        alt={pattern.title}
                        className={`w-full h-full object-cover transition-all duration-700 ${
                          isHovered ? 'scale-105' : 'scale-100'
                        }`}
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-[#7BA7C2]/10 to-[#7BA7C2]/5">
                        <span className="text-2xl font-light text-gray-400">{pattern.title}</span>
                      </div>
                    )}
                    
                    {/* Pattern title overlay with fixed height for consistent multi-line titles */}
                    <div className="absolute bottom-0 left-0 right-0 py-6 px-5 text-white bg-gradient-to-t from-black/60 to-transparent min-h-[80px] flex items-center">
                      <h3 className="text-xl font-light drop-shadow-md leading-tight">{pattern.title}</h3>
                    </div>
                  </div>
                  
                  {/* Pattern Content with grid layout for perfect alignment */}
                  <div className="px-8 py-7 grid grid-rows-[120px_auto_auto_30px] h-[280px]">
                    {/* Description with fixed height and scrolling if needed */}
                    <div className="overflow-auto pr-1 mb-3">
                      <p className="text-sm text-gray-600 font-light leading-relaxed">
                        {pattern.description}
                      </p>
                    </div>
                    
                    {/* Elegant dividing line with subtle gradient */}
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-[#7BA7C2]/25 to-transparent mb-3"></div>
                    
                    {/* Pattern Details - always at the same position with perfect spacing */}
                    <div className="grid grid-cols-2 gap-5 self-start mt-1">
                      <div className={`rounded-xl p-4 transition-all duration-300 h-[75px] flex flex-col justify-between ${
                        isHovered 
                          ? 'bg-[#7BA7C2]/10' 
                          : 'bg-[#7BA7C2]/5'
                      }`}>
                        <h4 className="text-xs text-[#7BA7C2] font-medium uppercase tracking-wider">
                          {t('hairLossPatternsSection.typicalGrafts')}
                        </h4>
                        <p className="text-lg text-[#7BA7C2] font-light">{pattern.grafts}</p>
                      </div>
                      <div className={`rounded-xl p-4 transition-all duration-300 h-[75px] flex flex-col justify-between ${
                        isHovered 
                          ? 'bg-[#7BA7C2]/10' 
                          : 'bg-[#7BA7C2]/5'
                      }`}>
                        <h4 className="text-xs text-[#7BA7C2] font-medium uppercase tracking-wider">
                          {t('hairLossPatternsSection.treatment')}
                        </h4>
                        <p className="text-lg text-[#7BA7C2] font-light">{pattern.treatment}</p>
                      </div>
                    </div>
                    
                    {/* Subtle indicator - always at the bottom */}
                    <div className={`flex items-center justify-end text-xs text-[#7BA7C2] transition-opacity duration-300 self-end ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <span className="mr-1 font-light">Ideal für Ihren Haartyp</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className={`absolute -z-10 w-full h-full rounded-2xl bg-[#7BA7C2]/10 top-2 left-2 transition-all duration-500 ${
                  isHovered ? 'opacity-70' : 'opacity-0'
                }`}></div>
              </div>
            );
          })}
        </div>
        
        {/* Additional information */}
        <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="md:w-1/3">
              <h3 className="text-2xl font-light text-[#7BA7C2] mb-4">Individuelle Beratung</h3>
              <p className="text-gray-600 font-light">
                Jedes Haarausfallmuster ist einzigartig und erfordert eine individuelle Behandlungsstrategie. 
                In einem persönlichen Beratungsgespräch analysieren wir Ihr spezifisches Muster und entwickeln 
                einen maßgeschneiderten Behandlungsplan.
              </p>
            </div>
            <div className="md:w-1/3">
              <h3 className="text-2xl font-light text-[#7BA7C2] mb-4">Modernste Techniken</h3>
              <p className="text-gray-600 font-light">
                Unsere fortschrittlichen Transplantationstechniken ermöglichen es uns, selbst bei fortgeschrittenem 
                Haarausfall natürlich aussehende Ergebnisse zu erzielen. Wir passen die Methode an Ihr 
                individuelles Haarausfallmuster an.
              </p>
            </div>
            <div className="md:w-1/3">
              <h3 className="text-2xl font-light text-[#7BA7C2] mb-4">Langfristige Ergebnisse</h3>
              <p className="text-gray-600 font-light">
                Durch unseren ganzheitlichen Ansatz erzielen wir nicht nur sofortige, sondern auch langfristige 
                Ergebnisse. Wir berücksichtigen den zukünftigen Haarverlust und planen die Behandlung entsprechend.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HairLossPatternsSection;
