import React, { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, Zap, HeartPulse, Sparkles } from 'lucide-react';

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const DPISection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoverFeature, setHoverFeature] = useState<number | null>(null);

  // Trigger entrance animations
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Features of DPI
  const featureItems: FeatureItem[] = [
    {
      icon: <ShieldCheck strokeWidth={1.5} />,
      title: "Schmerzfreie Betäubung",
      description: "Unser neuentwickeltes Verfahren macht die Phase der Betäubung nahezu vollständig schmerzfrei, für ein angenehmes Behandlungserlebnis von Anfang an."
    },
    {
      icon: <Zap strokeWidth={1.5} />,
      title: "Innovative Technologie",
      description: "Die DPI-Technologie nutzt computergesteuerte Präzisionsinjektionen mit optimaler Geschwindigkeit und Druck für maximalen Komfort."
    },
    {
      icon: <HeartPulse strokeWidth={1.5} />,
      title: "Reduzierte Angst",
      description: "Durch die schmerzfreie Betäubung wird die Behandlungsangst deutlich reduziert, was zu einer entspannteren Erfahrung und besseren Ergebnissen führt."
    },
    {
      icon: <Sparkles strokeWidth={1.5} />,
      title: "Exklusiver Komfort",
      description: "Als Premium-Option bietet DPI einen exklusiven Komfort, der Ihre Haartransplantation zu einem angenehmen, stressfreien Erlebnis macht."
    }
  ];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#7BA7C2]/5 via-[#7BA7C2]/10 to-[#7BA7C2]/5"></div>
      <div className="absolute -z-10 w-[800px] h-[800px] rounded-full bg-[#7BA7C2]/10 -top-[400px] -right-[400px] blur-3xl"></div>
      <div className="absolute -z-10 w-[600px] h-[600px] rounded-full bg-[#7BA7C2]/10 -bottom-[300px] -left-[300px] blur-3xl"></div>
      
      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] z-0" 
        style={{ 
          backgroundImage: 'url("/images/dionhairclinic_bg.svg")',
          backgroundSize: '200px',
          backgroundRepeat: 'repeat'
        }}
      ></div>
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        <div className={`flex flex-col md:flex-row gap-12 items-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Left side - Premium badge and content */}
          <div className="md:w-1/2">
            <div className="mb-6">
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#7BA7C2] to-[#5A8BA6] text-white rounded-full text-sm font-medium shadow-md">
                Premium Option
              </div>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-light text-gray-800 mb-6">
              <span className="text-[#7BA7C2]">Dion Painless Injection</span>
              <span className="text-xl md:text-2xl bg-gradient-to-r from-[#7BA7C2] to-[#5A8BA6] inline-block text-transparent bg-clip-text ml-2">(DPI)</span>
            </h2>
            
            <div className="h-1 w-32 bg-gradient-to-r from-[#7BA7C2] to-transparent mb-6"></div>
            
            <p className="text-lg text-gray-600 font-light mb-8 leading-relaxed">
              Erleben Sie eine revolutionäre Haartransplantation ohne den gefürchteten Schmerz der Betäubungsphase. 
              Unser neuentwickeltes DPI-Verfahren macht die Phase der Betäubung nahezu vollständig schmerzfrei und 
              verwandelt Ihre Behandlung in ein angenehmes Erlebnis von Anfang bis Ende.
            </p>
            
            <button className="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-[#7BA7C2] to-[#5A8BA6] text-white overflow-hidden transition-all duration-300 hover:shadow-lg">
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-80 group-hover:h-80 opacity-10"></span>
              <span className="relative flex items-center font-light tracking-wider">
                Mehr über DPI erfahren
                <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>
          </div>
          
          {/* Right side - Elegant card with features */}
          <div className="md:w-1/2">
            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100/80 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#7BA7C2]/5 -mr-32 -mt-32 blur-xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#7BA7C2]/5 -ml-32 -mb-32 blur-xl"></div>
              
              {/* Premium badge */}
              <div className="absolute top-6 right-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#7BA7C2]/20 rounded-full blur-md"></div>
                  <div className="relative z-10 bg-gradient-to-r from-[#7BA7C2] to-[#5A8BA6] text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                    Gegen Aufpreis
                  </div>
                </div>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-light text-[#7BA7C2] mb-6">Vorteile der DPI-Technologie</h3>
                
                <div className="space-y-6">
                  {featureItems.map((item, index) => {
                    const isHovered = index === hoverFeature;
                    
                    return (
                      <div 
                        key={index}
                        className="relative group"
                        onMouseEnter={() => setHoverFeature(index)}
                        onMouseLeave={() => setHoverFeature(null)}
                      >
                        <div className={`flex gap-4 p-4 rounded-xl transition-all duration-300 ${
                          isHovered 
                            ? 'bg-[#7BA7C2]/5 shadow-sm' 
                            : 'hover:bg-[#7BA7C2]/5'
                        }`}>
                          <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                            isHovered 
                              ? 'bg-gradient-to-r from-[#7BA7C2] to-[#5A8BA6] text-white' 
                              : 'bg-[#7BA7C2]/10 text-[#7BA7C2]'
                          }`}>
                            {item.icon}
                          </div>
                          
                          <div className="flex-grow">
                            <h4 className={`text-base font-medium mb-1 transition-colors duration-300 ${
                              isHovered ? 'text-[#7BA7C2]' : 'text-gray-800'
                            }`}>
                              {item.title}
                            </h4>
                            <p className="text-sm text-gray-600 font-light leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DPISection;
