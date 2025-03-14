import React, { useState, useRef, useEffect } from 'react';
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
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || !isDragging) return;
    
    let clientX: number;
    
    if ('touches' in e) {
      // Touch event
      clientX = e.touches[0].clientX;
    } else {
      // Mouse event
      clientX = e.clientX;
    }
    
    const rect = containerRef.current.getBoundingClientRect();
    const position = ((clientX - rect.left) / rect.width) * 100;
    
    // Clamp position between 0 and 100
    const clampedPosition = Math.max(0, Math.min(100, position));
    setSliderPosition(clampedPosition);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handleSliderMove(e);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handleSliderMove(e);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Add global event listeners for mouse up and touch end
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    const handleGlobalTouchEnd = () => {
      setIsDragging(false);
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('touchend', handleGlobalTouchEnd);

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, []);

  const handlePrevCase = () => {
    setActiveCase((prev) => (prev === 0 ? beforeAfterCases.length - 1 : prev - 1));
    setSliderPosition(50); // Reset slider position
  };

  const handleNextCase = () => {
    setActiveCase((prev) => (prev === beforeAfterCases.length - 1 ? 0 : prev + 1));
    setSliderPosition(50); // Reset slider position
  };

  const currentCase = beforeAfterCases[activeCase];

  return (
    <div className="bg-white py-16 md:py-24">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light mb-3 md:text-5xl md:mb-4">{t('beforeAfterSection.title')}</h2>
          <p className="text-base text-gray-600 font-light md:text-xl">
            {t('beforeAfterSection.subtitle')}
          </p>
        </div>

        <div className="relative w-full mx-auto">
          {/* Before-After Slider with Navigation Arrows */}
          <div className="relative">
            {/* Navigation Arrows - Now inside the relative container with the slider */}
            <button 
              onClick={handlePrevCase}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-[#333333] bg-opacity-60 rounded-full p-1.5 hover:bg-opacity-80 transition-all md:bg-white md:bg-opacity-80 md:p-2 md:shadow-md md:left-0 md:-translate-x-12"
              aria-label="Vorheriger Fall"
            >
              <ChevronLeft className="w-5 h-5 text-white md:w-6 md:h-6 md:text-gray-700" />
            </button>
            
            <button 
              onClick={handleNextCase}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-[#333333] bg-opacity-60 rounded-full p-1.5 hover:bg-opacity-80 transition-all md:bg-white md:bg-opacity-80 md:p-2 md:shadow-md md:right-0 md:translate-x-12"
              aria-label="Nächster Fall"
            >
              <ChevronRight className="w-5 h-5 text-white md:w-6 md:h-6 md:text-gray-700" />
            </button>

            {/* Before-After Slider */}
            <div 
              ref={containerRef}
              className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-xl mb-8 cursor-ew-resize"
              onMouseDown={handleMouseDown}
              onMouseMove={handleSliderMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleSliderMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Before Label */}
              <div className="absolute top-4 left-4 z-10 bg-[#333333] bg-opacity-80 text-white px-3 py-1.5 rounded-md text-sm font-light">
                {t('beforeAfterSection.navigation.before')}
              </div>
              
              {/* After Label */}
              <div className="absolute top-4 right-4 z-10 bg-[#333333] bg-opacity-80 text-white px-3 py-1.5 rounded-md text-sm font-light">
                {t('beforeAfterSection.navigation.after')}
              </div>
              
              {/* Before Image (Full Width) */}
              <div className="absolute inset-0">
                <img 
                  src={currentCase.beforeImage} 
                  alt={`Vor der ${currentCase.technique} Haartransplantation in der Dion Hair Clinic - Patient mit Haarausfall vor der Behandlung`}
                  className="w-full h-full object-cover"
                  width="1000"
                  height="667"
                  loading="lazy"
                />
              </div>
              
              {/* After Image (Partial Width based on slider) */}
              <div 
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img 
                  src={currentCase.afterImage} 
                  alt={`Ergebnis nach ${currentCase.result} - Erfolgreiche ${currentCase.technique} Haartransplantation mit ${currentCase.grafts} Grafts in der Dion Hair Clinic Mönchengladbach`}
                  className="w-full h-full object-cover"
                  style={{ 
                    width: `${100 / (sliderPosition / 100)}%`,
                    maxWidth: 'none'
                  }}
                  width="1000"
                  height="667"
                  loading="lazy"
                />
              </div>
              
              {/* Slider Control */}
              <div 
                ref={sliderRef}
                className="absolute inset-y-0 z-10"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute inset-y-0 -left-px w-0.5 bg-white"></div>
                <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center">
                  <div className="w-1 h-10 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Case Information */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
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
                onClick={() => {
                  setActiveCase(index);
                  setSliderPosition(50);
                }}
                className={`w-3 h-3 rounded-full ${
                  index === activeCase ? 'bg-gray-700' : 'bg-gray-300'
                }`}
                aria-label={`Gehe zu Fall ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSection;
