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
    <div className="relative overflow-hidden min-h-[800px] flex items-center">
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
      
      {/* Mobile Layout */}
      <div className="md:hidden w-full max-w-7xl mx-auto px-4 pt-8 pb-0 relative z-10">
        <div className="flex flex-col items-center min-h-[600px]">
          {/* Text content for mobile */}
          <div className="w-full flex flex-col items-center pt-16 mb-8">
            <h1 className="text-4xl font-light mb-3 text-center">
              {t('heroSection.title')}
              <span className="block text-xl mt-2 text-gray-700 font-light">
                {t('heroSection.subtitle').split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <br />}
                    {line}
                  </React.Fragment>
                ))}
              </span>
            </h1>
            
            <p className="text-sm text-gray-700 font-light leading-relaxed mt-4 text-center max-w-2xl">
              {t('heroSection.welcomeText')}
            </p>
            
            <div className="mt-6 relative z-20">
              <button className="inline-block bg-[#333333] text-white px-6 py-2.5 rounded-lg hover:bg-[#444444] transition-colors text-xs font-light tracking-wider">
                {t('buttons.consultation', { ns: 'common' })}
              </button>
            </div>
          </div>
          
          {/* Mobile image at the bottom */}
          <div className="mt-auto flex justify-center items-end">
            <img 
              src="/images/Dion_Model_Mobile.png"
              alt="Dr. Dion - Führender Experte für Haartransplantation und Haarausfall-Behandlung in Mönchengladbach, NRW"
              className="w-auto h-auto max-h-[350px] object-contain mix-blend-multiply"
              style={{ filter: 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))' }}
              width="400"
              height="600"
            />
          </div>
        </div>
      </div>
      
      {/* Desktop Layout */}
      <div className="hidden md:block w-full max-w-7xl mx-auto px-4 pt-16 pb-0 relative z-10">
        <div className="relative min-h-[600px]">
          {/* Desktop image */}
          <div className="absolute right-0 top-[30%] bottom-0 w-[45%] h-[100%] flex items-end justify-end">
            <img 
              src="/images/Dion_Model_Home.webp"
              alt="Dr. Dion - Führender Experte für Haartransplantation und Haarausfall-Behandlung in Mönchengladbach, NRW"
              className="w-full h-auto object-contain object-center mix-blend-multiply"
              style={{ filter: 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))' }}
              width="600"
              height="800"
            />
          </div>
          
          {/* Text content for desktop */}
          <div className="relative z-10 max-w-[60%] flex flex-col justify-center h-full pt-12">
            <h1 className="text-5xl font-light mb-6 text-left">
              {t('heroSection.title')}
              <span className="block text-4xl mt-1 text-gray-700 font-light">
                {t('heroSection.subtitle').split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <br />}
                    {line}
                  </React.Fragment>
                ))}
              </span>
            </h1>
            
            <p className="text-lg text-gray-700 font-light leading-relaxed max-w-2xl">
              {t('heroSection.welcomeText')}
            </p>
            
            <div className="mt-8 flex justify-start">
              <button className="inline-block bg-[#333333] text-white px-8 py-3 rounded-lg hover:bg-[#444444] transition-colors text-sm font-light tracking-wider">
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
