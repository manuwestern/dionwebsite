import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BeforeAfterCase {
  id: number;
  title: string;
  description: string;
  age: number;
  technique: string;
  grafts: number;
  result: string;
  beforeImage: string;
  afterImage: string;
}

const beforeAfterCases: BeforeAfterCase[] = [
  {
    id: 1,
    title: "Fortgeschrittener Haarausfall, Klasse 5",
    description: "Patient mit fortgeschrittenem Haarausfall im Stirn- und Scheitelbereich. Deutliche Geheimratsecken und lichte Stellen im vorderen Kopfbereich.",
    age: 42,
    technique: "Saphir-FUE",
    grafts: 3200,
    result: "12 Monate",
    beforeImage: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    afterImage: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 2,
    title: "Geheimratsecken, Klasse 3",
    description: "Patient mit ausgeprägten Geheimratsecken und beginnender Ausdünnung im Scheitelbereich. Gute Spenderzone im Hinterkopfbereich.",
    age: 35,
    technique: "DHI-Technik",
    grafts: 2400,
    result: "14 Monate",
    beforeImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    afterImage: "https://images.unsplash.com/photo-1595163791530-b99f6c0dd4b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 3,
    title: "Diffuser Haarausfall, Klasse 4",
    description: "Patient mit diffusem Haarausfall über den gesamten Oberkopf. Besonders im Scheitelbereich starke Ausdünnung mit sichtbarer Kopfhaut.",
    age: 38,
    technique: "Saphir-FUE",
    grafts: 2800,
    result: "10 Monate",
    beforeImage: "https://images.unsplash.com/photo-1614859324669-927e70f7e6ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    afterImage: "https://images.unsplash.com/photo-1626954079673-f3c3a7a5af61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  }
];

const BeforeAfterSection: React.FC = () => {
  const [activeCase, setActiveCase] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
          <h2 className="text-3xl font-light mb-3 md:text-5xl md:mb-4">Unsere Ergebnisse</h2>
          <p className="text-base text-gray-600 font-light md:text-xl">
            Vorher-Nachher Bilder unserer erfolgreichen Haartransplantationen
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Arrows */}
          <button 
            onClick={handlePrevCase}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
            aria-label="Vorheriger Fall"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          
          <button 
            onClick={handleNextCase}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
            aria-label="Nächster Fall"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Case Title and Counter */}
          <div className="text-center mb-6">
            <h3 className="text-2xl font-light mb-2">{currentCase.title}</h3>
            <p className="text-sm text-gray-500">Fall {activeCase + 1} von {beforeAfterCases.length}</p>
          </div>

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
            {/* Vorher Label */}
            <div className="absolute top-4 left-4 z-10 bg-red-600 text-white px-4 py-2 rounded-lg font-light">
              Vorher
            </div>
            
            {/* Nachher Label */}
            <div className="absolute top-4 right-4 z-10 bg-green-600 text-white px-4 py-2 rounded-lg font-light">
              Nachher
            </div>
            
            {/* Before Image (Full Width) */}
            <div className="absolute inset-0">
              <img 
                src={currentCase.beforeImage} 
                alt={`Vor der Behandlung: ${currentCase.title}`}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* After Image (Partial Width based on slider) */}
            <div 
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img 
                src={currentCase.afterImage} 
                alt={`Nach der Behandlung: ${currentCase.title}`}
                className="w-full h-full object-cover"
                style={{ 
                  width: `${100 / (sliderPosition / 100)}%`,
                  maxWidth: 'none'
                }}
              />
            </div>
            
            {/* Slider Control */}
            <div 
              ref={sliderRef}
              className="absolute inset-y-0 z-10"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute inset-y-0 -left-px w-0.5 bg-white"></div>
              <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                  <div className="w-1 h-6 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Case Information */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-gray-500 text-sm mb-1">Alter</h4>
              <p className="text-xl font-light">{currentCase.age} Jahre</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-gray-500 text-sm mb-1">Technik</h4>
              <p className="text-xl font-light">{currentCase.technique}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-gray-500 text-sm mb-1">Transplantierte Grafts</h4>
              <p className="text-xl font-light">{currentCase.grafts}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-gray-500 text-sm mb-1">Ergebnis nach</h4>
              <p className="text-xl font-light">{currentCase.result}</p>
            </div>
          </div>

          {/* Case Description */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 font-light">{currentCase.description}</p>
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
