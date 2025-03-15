import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const HeroSection: React.FC = () => {
  const { t } = useTranslation(['home', 'common']);
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Background image - fixed position without parallax for better compatibility */}
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: 'url("/images/bg_abstrakt.webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      ></div>
      
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-white bg-opacity-40 z-1"></div>
      
      <div className="w-full max-w-7xl mx-auto px-4 pt-8 pb-0 md:pt-16 md:pb-0 relative z-10">
        <div className="relative min-h-[500px] md:min-h-[600px]">
          {/* Image positioned on the right - with independent mobile and desktop positioning */}
          <div className="
            absolute 
            right-[-35%] 
            top-[25%] 
            w-[100%] 
            h-full 
            z-5 
            md:absolute 
            md:right-0 
            md:top-[30%] 
            md:bottom-0 
            md:w-[45%] 
            md:h-[100%]
          ">
              <div className="w-full h-full flex items-end">
                <img 
                  src="/images/Dion_Model_Home.webp"
                  alt="Dr. Dion - Führender Experte für Haartransplantation und Haarausfall-Behandlung in Mönchengladbach, NRW"
                  className="w-full h-auto object-contain object-left-top mix-blend-multiply md:w-full md:object-contain md:object-center"
                  style={{ filter: 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))' }}
                  width="600"
                  height="800"
                />
              </div>
          </div>
          
          {/* Text content that overlaps with the image */}
          <div className="relative z-10 max-w-[85%] md:max-w-[60%] flex flex-col justify-center h-full pt-16 md:pt-12">
            <h1 className="text-3xl font-light mb-2 md:text-5xl md:mb-6">
              {t('heroSection.title')}
              {/* Mobile version with line break from translation file */}
              <span className="block text-2xl mt-1 text-gray-700 md:hidden font-light">
                {t('heroSection.subtitle').split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <br />}
                    {line}
                  </React.Fragment>
                ))}
              </span>
              {/* Desktop version with line break from translation file */}
              <span className="hidden md:block text-4xl mt-1 text-gray-700 font-light">
                {t('heroSection.subtitle').split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <br />}
                    {line}
                  </React.Fragment>
                ))}
              </span>
            </h1>
            
            <p className="text-base text-gray-700 font-light leading-relaxed mt-4 md:text-lg md:mt-6 max-w-2xl">
              {t('heroSection.welcomeText')}
            </p>
            
            <div className="mt-6">
              <button className="inline-block bg-[#333333] text-white px-6 py-3 rounded-lg hover:bg-[#444444] transition-colors text-sm font-light tracking-wider md:px-8">
                {t('buttons.consultation', { ns: 'common' })}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
