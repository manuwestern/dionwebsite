import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { textStyle, fontSize, fontWeight, gradientUnderline, tracking, lineHeight } from '../../utils/typography';
import { buttonStyle, buttonRippleClass, buttonArrowClass } from '../../utils/buttons';
import { useTheme } from '../../utils/ThemeProvider';

interface BeforeAfterCase {
  id: number;
  titleKey: string;
  descriptionKey: string;
  age: number;
  technique: string;
  grafts: number;
  result: string;
  beforeImage: string;
  afterImage: string;
}

const BeforeAfterSection: React.FC = () => {
  const { t } = useTranslation(['home', 'common']);
  const [activeCase, setActiveCase] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { activeTheme } = useTheme();

  // Trigger entrance animations on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      
      if (sectionRef.current) {
        const elementPosition = sectionRef.current.offsetTop + 200;
        
        if (scrollPosition > elementPosition) {
          setIsVisible(true);
        }
      }
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset slider position when changing cases
  useEffect(() => {
    setSliderPosition(50);
  }, [activeCase]);

  // Images for each case
  const caseImages = [
    {
      beforeImage: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      afterImage: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      beforeImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      afterImage: "https://images.unsplash.com/photo-1595163791530-b99f6c0dd4b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      beforeImage: "https://images.unsplash.com/photo-1614859324669-927e70f7e6ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      afterImage: "https://images.unsplash.com/photo-1626954079673-f3c3a7a5af61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  // Create cases from translation keys
  const beforeAfterCases: BeforeAfterCase[] = Array.from(
    { length: (t('beforeAfterSection.cases', { returnObjects: true }) as any[]).length },
    (_, index) => ({
      id: index + 1,
      titleKey: `beforeAfterSection.cases.${index}.title`,
      descriptionKey: `beforeAfterSection.cases.${index}.description`,
      age: [42, 35, 38][index],
      technique: ["Saphir-FUE", "DHI-Technik", "Saphir-FUE"][index],
      grafts: [3200, 2400, 2800][index],
      result: ["12 Monate", "14 Monate", "10 Monate"][index],
      beforeImage: caseImages[index].beforeImage,
      afterImage: caseImages[index].afterImage
    })
  );

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  const handlePrevCase = () => {
    setActiveCase((prev) => (prev === 0 ? beforeAfterCases.length - 1 : prev - 1));
  };

  const handleNextCase = () => {
    setActiveCase((prev) => (prev === beforeAfterCases.length - 1 ? 0 : prev + 1));
  };

  const currentCase = beforeAfterCases[activeCase];

  return (
    <section 
      ref={sectionRef}
      id="before-after-section" 
      className="py-20 md:py-28 relative overflow-hidden"
    >
      {/* Background with gradient and blur effects */}
      <div className="absolute inset-0 -z-10">
        {/* Main gradient background with theme colors */}
        <div className="absolute inset-0" 
             style={{ background: `linear-gradient(to bottom, ${activeTheme.backgroundLight}, ${activeTheme.backgroundDark}, ${activeTheme.backgroundLight})` }}></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full -mr-[400px] -mt-[400px] blur-3xl"
             style={{ backgroundColor: `${activeTheme.accent}05` }}></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full -ml-[300px] -mb-[300px] blur-3xl"
             style={{ backgroundColor: `${activeTheme.accent}05` }}></div>
        
        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: 'url("/images/dionhairclinic_bg.svg")',
            backgroundSize: '200px',
            backgroundRepeat: 'repeat'
          }}
        ></div>
      </div>
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header with elegant design */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6 relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full blur-xl"
                 style={{ backgroundColor: `${activeTheme.accent}10` }}></div>
            <h2 className={`${textStyle.sectionTitle}`} 
                style={{ color: activeTheme.textPrimary }}
                lang="de">{t('beforeAfterSection.title')}</h2>
            <div className="w-[90%] max-w-[300px] mt-4 mx-auto h-px" 
                 style={{ background: `linear-gradient(to right, transparent, ${activeTheme.divider}, transparent)` }}></div>
          </div>
          <p className={`${fontSize.lg} ${fontWeight.normal} ${lineHeight.normal} max-w-3xl mx-auto mt-6 md:tracking-wide`}
             style={{ color: activeTheme.textSecondary }}>
            {t('beforeAfterSection.subtitle')}
          </p>
        </div>

        {/* Mobile Layout - Only visible on small screens */}
        <div className={`md:hidden relative w-full mx-auto transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {/* Before-After Slider with Navigation Arrows */}
          <div className="relative">
            {/* Navigation Arrows - positioned outside the slider container */}
            <button 
              onClick={handlePrevCase}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-40 rounded-full p-2 hover:bg-opacity-100 transition-all shadow-md"
              style={{ 
                backgroundColor: `${activeTheme.accent}CC`
              }}
              aria-label={t('beforeAfterSection.navigation.previous')}
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            
            <button 
              onClick={handleNextCase}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-40 rounded-full p-2 hover:bg-opacity-100 transition-all shadow-md"
              style={{ 
                backgroundColor: `${activeTheme.accent}CC`
              }}
              aria-label={t('beforeAfterSection.navigation.next')}
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>

            {/* Before-After Slider Container */}
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl mb-8">
              {/* Before Label */}
              <div className="absolute top-4 left-4 z-10 bg-black bg-opacity-80 text-white px-3 py-1.5 rounded-md text-sm font-light">
                {t('beforeAfterSection.navigation.before')}
              </div>
              
              {/* After Label */}
              <div className="absolute top-4 right-4 z-10 bg-black bg-opacity-80 text-white px-3 py-1.5 rounded-md text-sm font-light">
                {t('beforeAfterSection.navigation.after')}
              </div>
              
              {/* Before Image (Full Width) */}
              <div className="absolute inset-0 select-none">
                <img 
                  src={currentCase.beforeImage} 
                  alt={`Vor der ${currentCase.technique} Haartransplantation in der Dion Hair Clinic - Patient mit Haarausfall vor der Behandlung`}
                  className="w-full h-full object-cover pointer-events-none"
                  width="1000"
                  height="667"
                  loading="lazy"
                  draggable="false"
                />
              </div>
              
              {/* After Image (Partial Width based on slider) */}
              <div 
                className="absolute inset-0 overflow-hidden select-none"
                style={{ width: `${sliderPosition}%` }}
              >
                <img 
                  src={currentCase.afterImage} 
                  alt={`Ergebnis nach ${currentCase.result} - Erfolgreiche ${currentCase.technique} Haartransplantation mit ${currentCase.grafts} Grafts in der Dion Hair Clinic Mönchengladbach`}
                  className="w-full h-full object-cover pointer-events-none"
                  style={{ 
                    width: `${100 / (sliderPosition / 100)}%`,
                    maxWidth: 'none'
                  }}
                  width="1000"
                  height="667"
                  loading="lazy"
                  draggable="false"
                />
              </div>
              
              {/* Slider Line */}
              <div 
                className="absolute inset-y-0 z-20"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute inset-y-0 -left-px w-1 bg-white"></div>
                <div 
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white bg-opacity-90 shadow-md flex items-center justify-center border"
                  style={{ borderColor: `${activeTheme.accent}30` }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: activeTheme.accent }}></div>
                </div>
              </div>
              
              {/* HTML Range Input (positioned over the slider area only, not covering navigation buttons) */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={handleSliderChange}
                className="absolute inset-y-0 left-10 right-10 w-[calc(100%-80px)] h-full opacity-0 cursor-pointer z-30"
                aria-label="Slider zum Vergleichen von Vorher und Nachher Bildern"
              />
            </div>
          </div>

          {/* Case Information */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className={`${fontSize.xs} mb-1`} style={{ color: activeTheme.textLight }}>{t('beforeAfterSection.caseInfo.age')}</h4>
              <p className={`${fontSize.lg} ${fontWeight.light}`} style={{ color: activeTheme.textPrimary }}>{currentCase.age} {t('beforeAfterSection.caseInfo.years')}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className={`${fontSize.xs} mb-1`} style={{ color: activeTheme.textLight }}>{t('beforeAfterSection.caseInfo.technique')}</h4>
              <p className={`${fontSize.lg} ${fontWeight.light}`} style={{ color: activeTheme.textPrimary }}>{currentCase.technique}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className={`${fontSize.xs} mb-1`} style={{ color: activeTheme.textLight }}>{t('beforeAfterSection.caseInfo.grafts')}</h4>
              <p className={`${fontSize.lg} ${fontWeight.light}`} style={{ color: activeTheme.textPrimary }}>{currentCase.grafts}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className={`${fontSize.xs} mb-1`} style={{ color: activeTheme.textLight }}>{t('beforeAfterSection.caseInfo.result')}</h4>
              <p className={`${fontSize.lg} ${fontWeight.light}`} style={{ color: activeTheme.textPrimary }}>{currentCase.result}</p>
            </div>
          </div>

          {/* Case Description */}
          <div className="mt-6 text-center">
            <p className={`${fontSize.base} ${fontWeight.normal} ${lineHeight.relaxed}`} style={{ color: activeTheme.textSecondary }}>{t(currentCase.descriptionKey)}</p>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {beforeAfterCases.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveCase(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeCase ? 'scale-125' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                style={{ 
                  backgroundColor: index === activeCase ? activeTheme.accent : undefined
                }}
                aria-label={`Gehe zu Fall ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Layout - Hidden on small screens, visible on medium and up */}
        <div className={`hidden md:block relative w-full mx-auto transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="flex flex-row gap-8">
            {/* Left Column - Case Information and Description */}
            <div className="w-2/5">
              <div className="bg-white rounded-3xl shadow-lg h-full p-8 flex flex-col">
                <h3 className={`${fontSize.h3} ${fontWeight.light} mb-6`} style={{ color: activeTheme.primary }}>{t(currentCase.titleKey)}</h3>
                
                {/* Case Information Grid */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="p-4 rounded-xl" style={{ backgroundColor: `${activeTheme.accent}05` }}>
                    <h4 className={`${fontSize.xs} mb-1`} style={{ color: activeTheme.textLight }}>{t('beforeAfterSection.caseInfo.age')}</h4>
                    <p className={`${fontSize.lg} ${fontWeight.light}`} style={{ color: activeTheme.textPrimary }}>{currentCase.age} {t('beforeAfterSection.caseInfo.years')}</p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ backgroundColor: `${activeTheme.accent}05` }}>
                    <h4 className={`${fontSize.xs} mb-1`} style={{ color: activeTheme.textLight }}>{t('beforeAfterSection.caseInfo.technique')}</h4>
                    <p className={`${fontSize.lg} ${fontWeight.light}`} style={{ color: activeTheme.textPrimary }}>{currentCase.technique}</p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ backgroundColor: `${activeTheme.accent}05` }}>
                    <h4 className={`${fontSize.xs} mb-1`} style={{ color: activeTheme.textLight }}>{t('beforeAfterSection.caseInfo.grafts')}</h4>
                    <p className={`${fontSize.lg} ${fontWeight.light}`} style={{ color: activeTheme.textPrimary }}>{currentCase.grafts}</p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ backgroundColor: `${activeTheme.accent}05` }}>
                    <h4 className={`${fontSize.xs} mb-1`} style={{ color: activeTheme.textLight }}>{t('beforeAfterSection.caseInfo.result')}</h4>
                    <p className={`${fontSize.lg} ${fontWeight.light}`} style={{ color: activeTheme.textPrimary }}>{currentCase.result}</p>
                  </div>
                </div>
                
                {/* Case Description */}
                <div className="mb-8 flex-grow">
                  <h4 className={`${fontSize.lg} ${fontWeight.normal} mb-2`} style={{ color: activeTheme.textPrimary }}>Fallbeschreibung</h4>
                  <p className={`${fontSize.base} ${fontWeight.normal} ${lineHeight.relaxed}`} style={{ color: activeTheme.textSecondary }}>{t(currentCase.descriptionKey)}</p>
                </div>
                
                {/* CTA Button */}
                <div className="mt-auto">
                  <button className={`${buttonStyle.primary} w-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]`}>
                    <span className={buttonRippleClass}></span>
                    <span className={`relative flex items-center justify-center ${textStyle.button} uppercase tracking-widest`}>
                      {t('buttons.consultation', { ns: 'common' })}
                      <ArrowRight className={`${buttonArrowClass} ml-2`} />
                    </span>
                  </button>
                </div>
                
                {/* Pagination Dots */}
                <div className="flex justify-center space-x-3 mt-6">
                  {beforeAfterCases.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveCase(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === activeCase ? 'scale-125' : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      style={{ 
                        backgroundColor: index === activeCase ? activeTheme.accent : undefined
                      }}
                      aria-label={`Gehe zu Fall ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Before-After Slider */}
            <div className="w-3/5 relative">
              {/* Navigation Arrows */}
              <button 
                onClick={handlePrevCase}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-40 bg-white bg-opacity-90 rounded-full p-2 shadow-md -translate-x-6 hover:text-white transition-all hover:bg-blue-400"
                aria-label={t('beforeAfterSection.navigation.previous')}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button 
                onClick={handleNextCase}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-40 bg-white bg-opacity-90 rounded-full p-2 shadow-md translate-x-6 hover:text-white transition-all hover:bg-blue-400"
                aria-label={t('beforeAfterSection.navigation.next')}
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Before-After Slider Container */}
              <div className="relative h-[500px] rounded-xl overflow-hidden shadow-xl">
                {/* Before Label */}
                <div className="absolute top-4 left-4 z-10 bg-black bg-opacity-80 text-white px-3 py-1.5 rounded-md text-sm font-light">
                  {t('beforeAfterSection.navigation.before')}
                </div>
                
                {/* After Label */}
                <div className="absolute top-4 right-4 z-10 bg-black bg-opacity-80 text-white px-3 py-1.5 rounded-md text-sm font-light">
                  {t('beforeAfterSection.navigation.after')}
                </div>
                
                {/* Before Image (Full Width) */}
                <div className="absolute inset-0 select-none">
                  <img 
                    src={currentCase.beforeImage} 
                    alt={`Vor der ${currentCase.technique} Haartransplantation in der Dion Hair Clinic - Patient mit Haarausfall vor der Behandlung`}
                    className="w-full h-full object-cover pointer-events-none"
                    width="1000"
                    height="667"
                    loading="lazy"
                    draggable="false"
                  />
                </div>
                
                {/* After Image (Partial Width based on slider) */}
                <div 
                  className="absolute inset-0 overflow-hidden select-none"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img 
                    src={currentCase.afterImage} 
                    alt={`Ergebnis nach ${currentCase.result} - Erfolgreiche ${currentCase.technique} Haartransplantation mit ${currentCase.grafts} Grafts in der Dion Hair Clinic Mönchengladbach`}
                    className="w-full h-full object-cover pointer-events-none"
                    style={{ 
                      width: `${100 / (sliderPosition / 100)}%`,
                      maxWidth: 'none'
                    }}
                    width="1000"
                    height="667"
                    loading="lazy"
                    draggable="false"
                  />
                </div>
                
                {/* Slider Line */}
                <div 
                  className="absolute inset-y-0 z-20"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute inset-y-0 -left-px w-1 bg-white"></div>
                  <div 
                    className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white bg-opacity-90 shadow-md flex items-center justify-center border"
                    style={{ borderColor: `${activeTheme.accent}30` }}
                  >
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeTheme.accent }}></div>
                  </div>
                </div>
                
                {/* HTML Range Input (positioned over the slider area only, not covering navigation buttons) */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={handleSliderChange}
                  className="absolute inset-y-0 left-10 right-10 w-[calc(100%-80px)] h-full opacity-0 cursor-pointer z-30"
                  aria-label="Slider zum Vergleichen von Vorher und Nachher Bildern"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className={`mt-16 relative transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="absolute inset-0 rounded-2xl" style={{ backgroundColor: `${activeTheme.accent}05` }}></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full -mr-32 -mt-32 blur-xl"
                 style={{ backgroundColor: `${activeTheme.accent}05` }}></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full -ml-32 -mb-32 blur-xl"
                 style={{ backgroundColor: `${activeTheme.accent}05` }}></div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div className="md:w-2/3">
                <h3 className={`${fontSize.h3} ${fontWeight.normal} mb-4 text-center md:text-left`} style={{ color: activeTheme.primary }}>Überzeugt von unseren Ergebnissen?</h3>
                <p className={`${fontSize.base} ${fontWeight.normal} ${lineHeight.relaxed} text-center md:text-left px-2 md:px-0`} style={{ color: activeTheme.textSecondary }}>
                  Vereinbaren Sie jetzt Ihre kostenlose Beratung und erfahren Sie, wie wir auch Ihnen zu vollerem Haar verhelfen können.
                  Unsere Experten analysieren Ihre individuelle Situation und entwickeln einen maßgeschneiderten Behandlungsplan.
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center md:justify-end">
                <button className={`${buttonStyle.primary} shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]`}>
                  <span className={buttonRippleClass}></span>
                  <span className={`relative flex items-center ${textStyle.button} uppercase tracking-widest`}>
                    {t('buttons.consultation', { ns: 'common' })}
                    <ArrowRight className={`${buttonArrowClass} ml-2`} />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
