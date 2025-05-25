import React from 'react';
import OptimizedImage from '../common/elements/OptimizedImage';

const InstagramBeforeAfter: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Überzeugende Ergebnisse
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Sehen Sie selbst die beeindruckenden Transformationen unserer Patienten
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
            <div className="grid grid-cols-2">
              <div className="relative">
                <OptimizedImage
                  sources={{ original: "/images/Haartransplantation_vorher_1.webp" }}
                  alt="Vorher"
                  className="w-full h-32 object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  Vorher
                </div>
              </div>
              <div className="relative">
                <OptimizedImage
                  sources={{ original: "/images/Haartransplantation_nachher_1.webp" }}
                  alt="Nachher"
                  className="w-full h-32 object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-[#86C166] text-white px-2 py-1 rounded text-xs">
                  Nachher
                </div>
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-gray-800">Haartransplantation</h4>
              <p className="text-sm text-gray-600">3.500 Grafts, 12 Monate</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
            <div className="grid grid-cols-2">
              <div className="relative">
                <OptimizedImage
                  sources={{ original: "/images/Barthaartransplantation_Vorher-1.webp" }}
                  alt="Vorher"
                  className="w-full h-32 object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  Vorher
                </div>
              </div>
              <div className="relative">
                <OptimizedImage
                  sources={{ original: "/images/Barthaartransplantation_Nachher-1.webp" }}
                  alt="Nachher"
                  className="w-full h-32 object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-[#86C166] text-white px-2 py-1 rounded text-xs">
                  Nachher
                </div>
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-gray-800">Barthaartransplantation</h4>
              <p className="text-sm text-gray-600">2.200 Grafts, 8 Monate</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
            <div className="grid grid-cols-2">
              <div className="relative">
                <OptimizedImage
                  sources={{ original: "/images/Augenbrauentransplantation_Vorher_1.webp" }}
                  alt="Vorher"
                  className="w-full h-32 object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  Vorher
                </div>
              </div>
              <div className="relative">
                <OptimizedImage
                  sources={{ original: "/images/Augenbrauentransplantation_Nachher_1.webp" }}
                  alt="Nachher"
                  className="w-full h-32 object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-[#86C166] text-white px-2 py-1 rounded text-xs">
                  Nachher
                </div>
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-gray-800">Augenbrauentransplantation</h4>
              <p className="text-sm text-gray-600">350 Grafts, 6 Monate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstagramBeforeAfter;
