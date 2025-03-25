import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const HeroSection: React.FC = () => {
  const { t } = useTranslation(['hairTransplantation', 'common']);
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
    <div className="relative overflow-hidden min-h-[800px] flex items-center bg-gradient-to-b from-gray-50 to-white">
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-5 z-0" 
        style={{ 
          backgroundImage: 'url("/images/dionhairclinic_bg.svg")',
          backgroundSize: '200px',
          backgroundRepeat: 'repeat'
        }}
      ></div>
        
      {/* Mobile Layout */}
      <div className="md:hidden w-full max-w-7xl mx-auto px-4 pt-8 pb-0 relative z-10">
        <div className="flex flex-col items-center min-h-[600px]">
          {/* Logo for mobile - smaller size */}
          <div className="w-full flex justify-center mb-8 pt-16">
            <img src="/images/DionHairClinic_Logo.svg" alt="Dion Hair Clinic" className="h-12" />
          </div>
          
          {/* Text content for mobile */}
          <div className="w-full flex flex-col items-center mb-8">
            <h1 className="text-4xl font-light mb-3 text-center">
              {t('heroSection.title')}
              <span className="block text-xl mt-2 text-gray-700 font-light">
                {t('heroSection.subtitle')}
              </span>
            </h1>
            
            <p className="text-base text-gray-700 font-light leading-relaxed mt-4 text-center max-w-2xl">
              {t('heroSection.welcomeText')}
            </p>
          </div>
          
          {/* Button above the image */}
          <div className="w-full flex justify-center mb-8">
            <button className="inline-block bg-[#7BA7C2] text-white px-6 py-2.5 rounded-lg hover:shadow-lg transition-all duration-300 text-xs font-light tracking-wider transform hover:scale-105">
              {t('buttons.consultation', { ns: 'common' })}
            </button>
          </div>
          
          {/* Mobile image at the bottom */}
          <div className="mt-auto flex justify-center items-end">
            <img 
              src="/images/Dion_Model_Mobile.png"
              alt="Dr. Dion - Führender Experte für Haartransplantation und Haarausfall-Behandlung in Mönchengladbach, NRW"
              className="w-auto h-auto max-h-[450px] object-contain mix-blend-multiply"
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
              alt="Haartransplantation Experte - Modernste Techniken für natürliche Ergebnisse in der Dion Hair Clinic"
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
                {t('heroSection.subtitle')}
              </span>
            </h1>
            
            <p className="text-lg text-gray-700 font-light leading-relaxed max-w-2xl">
              {t('heroSection.welcomeText')}
            </p>
            
            <div className="mt-8 flex justify-start">
              <button className="inline-block bg-[#7BA7C2] text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-300 text-sm font-light tracking-wider transform hover:scale-105">
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
