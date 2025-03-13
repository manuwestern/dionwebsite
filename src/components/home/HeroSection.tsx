import React from 'react';
import { Award, Stethoscope, Users, HeartPulse } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-gray-50">
      <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-20">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="w-full text-center md:text-left md:max-w-xl">
            <h1 className="text-4xl font-light mb-3 md:text-5xl md:mb-4">
              Ihre Experten
              <span className="block text-2xl mt-2 text-gray-600 md:text-4xl font-light">
                für Haartransplantationen in Mönchengladbach
              </span>
            </h1>
            
            {/* Benefits Points */}
            <div className="mt-5 mb-7 grid grid-cols-2 gap-5 text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Award className="w-5 h-5 text-gray-700" />
                </div>
                <span className="text-base font-light text-gray-700">15+ Jahre Erfahrung</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-gray-700" />
                </div>
                <span className="text-base font-light text-gray-700">Modernste Technologie</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-gray-700" />
                </div>
                <span className="text-base font-light text-gray-700">Persönliche Betreuung</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <HeartPulse className="w-5 h-5 text-gray-700" />
                </div>
                <span className="text-base font-light text-gray-700">Natürliche Ergebnisse</span>
              </div>
            </div>
            
            {/* SEO Welcome Text */}
            <p className="text-sm font-light text-gray-600 mb-6 md:text-base md:mb-8 text-left">
              Willkommen in der führenden Klinik für Haartransplantation in NRW und ganz Deutschland. Unsere Experten bieten hochwertige Lösungen für Haartransplantationen, Augenbrauentransplantationen und Barthaartransplantationen mit modernsten Methoden. Erleben Sie natürliche Ergebnisse und professionelle Betreuung in unserer Haarklinik in Mönchengladbach.
            </p>
            
            <button className="w-full mt-6 bg-[#333333] text-white px-6 py-3 rounded-lg hover:bg-[#444444] transition-colors text-sm font-light tracking-wider md:w-auto md:mt-8 md:px-8">
              KOSTENLOSE BERATUNG
            </button>
          </div>
          <div className="relative w-full md:w-[500px]">
            <img 
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
              alt="Haartransplantation Experte in der Dion Hair Clinic"
              className="w-full rounded-lg shadow-xl h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
