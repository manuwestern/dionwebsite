import React from 'react';
import { Microscope, HeartPulse, Sparkles, Stethoscope } from 'lucide-react';

const HolisticConceptSection: React.FC = () => {
  return (
    <div className="bg-gray-100 w-full py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light mb-3 md:text-5xl md:mb-4">Ganzheitliches Konzept</h2>
          <p className="text-base text-gray-600 font-light md:text-xl">
            Unser umfassender Ansatz kombiniert verschiedene Therapien für optimale und langfristige Ergebnisse
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Hair Transplantation Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:transform hover:scale-105 transition-transform duration-300 flex flex-col h-full">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center">
              <Microscope className="w-8 h-8 text-gray-700" />
            </div>
            <h3 className="text-xl font-light mb-3">Haartransplantation</h3>
            <p className="text-gray-600 font-light mb-4 flex-grow">
              Dauerhafte Lösung für kahle Stellen durch modernste FUE-Technik. Natürliche Ergebnisse mit minimalen Ausfallzeiten.
            </p>
            <div className="mt-auto">
              <div className="w-12 h-0.5 bg-gray-200 mx-auto mb-4"></div>
              <p className="text-sm text-gray-500 font-light italic">
                "Die Basis unseres ganzheitlichen Konzepts"
              </p>
            </div>
          </div>

          {/* PRP Treatment Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:transform hover:scale-105 transition-transform duration-300 flex flex-col h-full">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center">
              <HeartPulse className="w-8 h-8 text-gray-700" />
            </div>
            <h3 className="text-xl font-light mb-3">PRP Behandlung</h3>
            <p className="text-gray-600 font-light mb-4 flex-grow">
              Eigenbluttherapie zur Stimulation des Haarwachstums. Aktiviert Stammzellen und verbessert die Durchblutung der Kopfhaut.
            </p>
            <div className="mt-auto">
              <div className="w-12 h-0.5 bg-gray-200 mx-auto mb-4"></div>
              <p className="text-sm text-gray-500 font-light italic">
                "Ideal zur Unterstützung der Haartransplantation"
              </p>
            </div>
          </div>

          {/* Nutritional Supplements Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:transform hover:scale-105 transition-transform duration-300 flex flex-col h-full">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-gray-700" />
            </div>
            <h3 className="text-xl font-light mb-3">Nahrungsergänzung</h3>
            <p className="text-gray-600 font-light mb-4 flex-grow">
              Speziell entwickelte Vitamine und Mineralien für gesundes Haarwachstum. Versorgt die Haarfollikel mit essentiellen Nährstoffen.
            </p>
            <div className="mt-auto">
              <div className="w-12 h-0.5 bg-gray-200 mx-auto mb-4"></div>
              <p className="text-sm text-gray-500 font-light italic">
                "Für langfristige Ergebnisse von innen"
              </p>
            </div>
          </div>

          {/* Medication Therapy Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:transform hover:scale-105 transition-transform duration-300 flex flex-col h-full">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center">
              <Stethoscope className="w-8 h-8 text-gray-700" />
            </div>
            <h3 className="text-xl font-light mb-3">Medikamentöse Therapie</h3>
            <p className="text-gray-600 font-light mb-4 flex-grow">
              Wirksame Medikamente zur Behandlung von Haarausfall. Hemmt den Haarverlust und stimuliert das Wachstum neuer Haare.
            </p>
            <div className="mt-auto">
              <div className="w-12 h-0.5 bg-gray-200 mx-auto mb-4"></div>
              <p className="text-sm text-gray-500 font-light italic">
                "Wissenschaftlich bewährte Wirksamkeit"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolisticConceptSection;
