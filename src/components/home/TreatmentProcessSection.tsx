import React, { useState, useRef } from 'react';
import { PhoneCall, CalendarCheck, Microscope, HeartPulse, Sparkles, ChevronDown } from 'lucide-react';

interface ProcessStep {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
}

const TreatmentProcessSection: React.FC<{ 
  stepRefs: React.MutableRefObject<(HTMLDivElement | null)[]>, 
  visibleSteps: Set<number> 
}> = ({ stepRefs, visibleSteps }) => {
  const [activeStep, setActiveStep] = useState(0);

  const processSteps: ProcessStep[] = [
    {
      icon: <PhoneCall className="w-6 h-6" />,
      title: "Erstkontakt",
      description: "Vereinbaren Sie ein kostenloses Beratungsgespräch. Wir besprechen Ihre Wünsche und Möglichkeiten.",
      image: "https://images.unsplash.com/photo-1557425493-6f90ae4659fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      icon: <CalendarCheck className="w-6 h-6" />,
      title: "Analyse & Planung",
      description: "Detaillierte Haaranalyse und Erstellung eines individuellen Behandlungsplans.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      icon: <Microscope className="w-6 h-6" />,
      title: "Behandlung",
      description: "Schmerzfreie Durchführung der Haartransplantation mit modernster Technologie.",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      icon: <HeartPulse className="w-6 h-6" />,
      title: "Heilungsprozess",
      description: "Engmaschige Nachsorge und Begleitung während der Heilungsphase.",
      image: "https://images.unsplash.com/photo-1614859324669-927e70f7e6ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Endergebnis",
      description: "Nach 12 Monaten zeigt sich das volle, natürliche Ergebnis Ihrer Behandlung.",
      image: "https://images.unsplash.com/photo-1595163791530-b99f6c0dd4b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  return (
    <div className="bg-white py-16 md:py-24">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light mb-3 md:text-5xl md:mb-4">Ihr Weg zu neuem Haar</h2>
          <p className="text-base text-gray-600 font-light md:text-xl">
            Professionelle Haartransplantation in 5 Schritten - von der Beratung bis zum Endergebnis
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:flex justify-center gap-4 mb-12">
          {processSteps.map((step, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`flex items-center gap-2 p-3 rounded-lg transition-all duration-300 ${
                activeStep === index
                  ? 'bg-[#333333] text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <div className="w-8 h-8 flex items-center justify-center">
                {step.icon}
              </div>
              <span className="font-light">{step.title}</span>
            </button>
          ))}
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden space-y-4">
          {processSteps.map((step, index) => (
            <div 
              key={index}
              ref={el => stepRefs.current[index] = el}
              className="scroll-mt-4"
            >
              {/* Step Button */}
              <button
                onClick={() => {
                  if (visibleSteps.has(index)) {
                    setActiveStep(index);
                  } else {
                    setActiveStep(index);
                  }
                }}
                className={`w-full flex items-center gap-4 p-4 rounded-lg transition-all duration-300 ${
                  visibleSteps.has(index)
                    ? 'bg-[#333333] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  visibleSteps.has(index) ? 'bg-white text-[#333333]' : 'bg-gray-200'
                }`}>
                  {step.icon}
                </div>
                <div className="flex-1 text-left">
                  <div className="font-light text-lg">{step.title}</div>
                  <div className={`text-sm ${visibleSteps.has(index) ? 'text-gray-200' : 'text-gray-500'}`}>
                    Schritt {index + 1} von {processSteps.length}
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform ${visibleSteps.has(index) ? 'rotate-180' : ''}`} />
              </button>

              {/* Expanded Content */}
              <div 
                className={`mt-4 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-500 ${
                  visibleSteps.has(index) ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <p className="text-gray-600 font-light">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Active Step Card */}
        <div className="hidden md:block w-full mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 transform hover:scale-[1.02]">
            <div className="md:flex">
              <div className="md:w-1/2 h-48 md:h-80 overflow-hidden">
                <img
                  src={processSteps[activeStep].image}
                  alt={processSteps[activeStep].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:w-1/2 md:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full bg-[#333333] text-white">
                    {processSteps[activeStep].icon}
                  </div>
                  <h3 className="text-2xl font-light">{processSteps[activeStep].title}</h3>
                </div>
                <p className="text-gray-600 font-light text-lg">
                  {processSteps[activeStep].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentProcessSection;
