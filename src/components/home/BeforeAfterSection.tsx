import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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

  // Reset slider position when changing cases
  useEffect(() => {
    setSliderPosition(50);
  }, [activeCase]);

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
    <div className="bg-gradient-to-b from-white to-gray-50 bg-size-200 animate-gradient-slow py-16 md:py-24">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light mb-3 md:text-5xl md:mb-4">{t('beforeAfterSection.title')}</h2>
          <p className="text-base text-gray-600 font-light md:text-xl">
            {t('beforeAfterSection.subtitle')}
          </p>
        </div>

        {/* Mobile Layout - Only visible on small screens */}
        <div className="md:hidden relative w-full mx-auto">
          {/* Before-After Slider with Navigation Arrows */}
          <div className="relative">
            {/* Navigation Arrows - positioned outside the slider container */}
            <button 
              onClick={handlePrevCase}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-40 bg-[#333333] bg-opacity-60 rounded-full p-1.5 hover:bg-opacity-80 transition-all"
              aria-label="Vorheriger Fall"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            
            <button 
              onClick={handleNextCase}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-40 bg-[#333333] bg-opacity-60 rounded-full p-1.5 hover:bg-opacity-80 transition-all"
              aria-label="Nächster Fall"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>

            {/* Before-After Slider Container */}
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl mb-8">
              {/* Before Label */}
              <div className="absolute top-4 left-4 z-10 bg-[#333333] bg-opacity-80 text-white px-3 py-1.5 rounded-md text-sm font-light">
                {t('beforeAfterSection.navigation.before')}
              </div>
              
              {/* After Label */}
              <div className="absolute top-4 right-4 z-10 bg-[#333333] bg-opacity-80 text-white px-3 py-1.5 rounded-md text-sm font-light">
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
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-gray-200"
                >
                  {/* Left Arrow */}
                  <div className="absolute left-2.5 w-0 h-0 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent border-r-gray-400"></div>
                  {/* Divider Line */}
                  <div className="w-0.5 h-8 bg-gray-400 mx-0.5"></div>
                  {/* Right Arrow */}
                  <div className="absolute right-2.5 w-0 h-0 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-gray-400"></div>
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
              <h4 className="text-gray-500 text-sm mb-1">{t('beforeAfterSection.caseInfo.age')}</h4>
              <p className="text-xl font-light">{currentCase.age} {t('beforeAfterSection.caseInfo.years')}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="text-gray-500 text-sm mb-1">{t('beforeAfterSection.caseInfo.technique')}</h4>
              <p className="text-xl font-light">{currentCase.technique}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="text-gray-500 text-sm mb-1">{t('beforeAfterSection.caseInfo.grafts')}</h4>
              <p className="text-xl font-light">{currentCase.grafts}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="text-gray-500 text-sm mb-1">{t('beforeAfterSection.caseInfo.result')}</h4>
              <p className="text-xl font-light">{currentCase.result}</p>
            </div>
          </div>

          {/* Case Description */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 font-light">{t(currentCase.descriptionKey)}</p>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {beforeAfterCases.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveCase(index)}
                className={`w-3 h-3 rounded-full ${
                  index === activeCase ? 'bg-gray-700' : 'bg-gray-300'
                }`}
                aria-label={`Gehe zu Fall ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Layout - Hidden on small screens, visible on medium and up */}
        <div className="hidden md:block relative w-full mx-auto">
          <div className="flex flex-row gap-8">
            {/* Left Column - Case Information and Description */}
            <div className="w-2/5">
              <div className="bg-white rounded-3xl shadow-lg h-full p-8 flex flex-col">
                <h3 className="text-2xl font-light mb-6 text-[#333333]">{t(currentCase.titleKey)}</h3>
                
                {/* Case Information Grid */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="text-gray-500 text-sm mb-1">{t('beforeAfterSection.caseInfo.age')}</h4>
                    <p className="text-xl font-light">{currentCase.age} {t('beforeAfterSection.caseInfo.years')}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="text-gray-500 text-sm mb-1">{t('beforeAfterSection.caseInfo.technique')}</h4>
                    <p className="text-xl font-light">{currentCase.technique}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="text-gray-500 text-sm mb-1">{t('beforeAfterSection.caseInfo.grafts')}</h4>
                    <p className="text-xl font-light">{currentCase.grafts}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="text-gray-500 text-sm mb-1">{t('beforeAfterSection.caseInfo.result')}</h4>
                    <p className="text-xl font-light">{currentCase.result}</p>
                  </div>
                </div>
                
                {/* Case Description */}
                <div className="mb-8 flex-grow">
                  <h4 className="text-gray-700 font-medium mb-2">Fallbeschreibung</h4>
                  <p className="text-gray-600 font-light leading-relaxed">{t(currentCase.descriptionKey)}</p>
                </div>
                
                {/* Pagination Dots */}
                <div className="flex justify-center space-x-3 mt-auto">
                  {beforeAfterCases.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveCase(index)}
                      className={`w-3 h-3 rounded-full ${
                        index === activeCase ? 'bg-gray-700' : 'bg-gray-300'
                      }`}
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
                className="absolute left-0 top-1/2 -translate-y-1/2 z-40 bg-white bg-opacity-80 rounded-full p-2 shadow-md -translate-x-6 hover:bg-opacity-100 transition-all"
                aria-label="Vorheriger Fall"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>
              
              <button 
                onClick={handleNextCase}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-40 bg-white bg-opacity-80 rounded-full p-2 shadow-md translate-x-6 hover:bg-opacity-100 transition-all"
                aria-label="Nächster Fall"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>

              {/* Before-After Slider Container */}
              <div className="relative h-[500px] rounded-xl overflow-hidden shadow-xl">
                {/* Before Label */}
                <div className="absolute top-4 left-4 z-10 bg-[#333333] bg-opacity-80 text-white px-3 py-1.5 rounded-md text-sm font-light">
                  {t('beforeAfterSection.navigation.before')}
                </div>
                
                {/* After Label */}
                <div className="absolute top-4 right-4 z-10 bg-[#333333] bg-opacity-80 text-white px-3 py-1.5 rounded-md text-sm font-light">
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
                    className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-gray-200"
                  >
                    {/* Left Arrow */}
                    <div className="absolute left-2.5 w-0 h-0 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent border-r-gray-400"></div>
                    {/* Divider Line */}
                    <div className="w-0.5 h-8 bg-gray-400 mx-0.5"></div>
                    {/* Right Arrow */}
                    <div className="absolute right-2.5 w-0 h-0 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-gray-400"></div>
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
      </div>
    </div>
  );
};

export default BeforeAfterSection;
