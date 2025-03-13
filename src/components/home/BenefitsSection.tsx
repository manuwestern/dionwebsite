import React from 'react';
import { Award, Stethoscope, Users, Clock } from 'lucide-react';

const BenefitsSection: React.FC = () => {
  return (
    <div className="bg-white w-full max-w-7xl mx-auto px-4 py-12 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-light mb-3 md:text-5xl md:mb-4">Warum Dion Hair Clinic?</h2>
        <p className="text-base text-gray-600 font-light md:text-xl">
          Führende Haarklinik für hochwertige Haartransplantationen mit modernster Technologie
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Experience Card */}
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:transform hover:scale-105 transition-transform duration-300">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center">
            <Award className="w-8 h-8 text-gray-700" />
          </div>
          <h3 className="text-xl font-light mb-3">15+ Jahre Erfahrung</h3>
          <p className="text-gray-600 font-light">
            Langjährige Expertise und tausende erfolgreiche Behandlungen
          </p>
        </div>

        {/* Modern Technology Card */}
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:transform hover:scale-105 transition-transform duration-300">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center">
            <Stethoscope className="w-8 h-8 text-gray-700" />
          </div>
          <h3 className="text-xl font-light mb-3">Modernste Technologie</h3>
          <p className="text-gray-600 font-light">
            Innovative Methoden und hochmoderne Ausstattung
          </p>
        </div>

        {/* Personal Care Card */}
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:transform hover:scale-105 transition-transform duration-300">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center">
            <Users className="w-8 h-8 text-gray-700" />
          </div>
          <h3 className="text-xl font-light mb-3">Persönliche Betreuung</h3>
          <p className="text-gray-600 font-light">
            Individuelle Beratung und maßgeschneiderte Behandlungspläne
          </p>
        </div>

        {/* Quick Recovery Card */}
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:transform hover:scale-105 transition-transform duration-300">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center">
            <Clock className="w-8 h-8 text-gray-700" />
          </div>
          <h3 className="text-xl font-light mb-3">Schnelle Erholung</h3>
          <p className="text-gray-600 font-light">
            Minimale Ausfallzeit und optimale Heilungsprozesse
          </p>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
