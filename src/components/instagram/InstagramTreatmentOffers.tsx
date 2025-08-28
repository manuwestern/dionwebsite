import React from 'react';
import { CheckCircle } from 'lucide-react';
import { buttonStyle, buttonRippleClass } from '../../utils/buttons';
import OptimizedImage from '../common/elements/OptimizedImage';

interface InstagramTreatmentOffersProps {
  onWhatsAppContact: (message: string) => void;
}

const InstagramTreatmentOffers: React.FC<InstagramTreatmentOffersProps> = ({
  onWhatsAppContact
}) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Unsere Behandlungen
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Professionelle Haartransplantationen mit modernsten Methoden
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Hair Transplantation */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="relative mb-4">
              <OptimizedImage
                sources={{ original: "/images/Behandlung_Haartransplantation.webp" }}
                alt="Haartransplantation"
                className="w-full h-48 object-cover rounded-xl"
              />
              <div className="absolute top-3 right-3 bg-[#86C166] text-white px-2 py-1 rounded-full text-xs font-medium">
                Bestseller
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Haartransplantation</h3>
            <p className="text-gray-600 mb-4">Saphir FUE für natürliche Ergebnisse</p>
            
            <div className="mb-4">
              <div className="flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-[#86C166]">ab 2.599€</span>
              </div>
            </div>

            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-[#86C166] mr-2 flex-shrink-0" />
                Maximale Anzahl Grafts inklusive
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-[#86C166] mr-2 flex-shrink-0" />
                3 zusätzliche kostenlose Mesotherapiebehandlungen
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-[#86C166] mr-2 flex-shrink-0" />
                Umfassende Nachsorge
              </li>
            </ul>

            <button
              onClick={() => onWhatsAppContact('Hallo! Ich interessiere mich für die Haartransplantation (ab 2.599€). Können Sie mir weitere Informationen geben?')}
              className={`${buttonStyle.primary} w-full bg-gradient-to-r from-[#7BA7C2] to-[#5A8BA6]`}
            >
              <span className={buttonRippleClass}></span>
              <span className="relative">Jetzt beraten lassen</span>
            </button>
          </div>

          {/* Beard Transplantation */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="relative mb-4">
              <OptimizedImage
                sources={{ original: "/images/Behandlung_Barthaartransplantation.webp" }}
                alt="Barthaartransplantation"
                className="w-full h-48 object-cover rounded-xl"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Barthaartransplantation</h3>
            <p className="text-gray-600 mb-4">Vollbart oder Verdichtung nach Wunsch</p>
            
            <div className="mb-4">
              <div className="flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-[#86C166]">ab 2.599€</span>
              </div>
            </div>

            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-[#86C166] mr-2 flex-shrink-0" />
                Individuelle Bartgestaltung
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-[#86C166] mr-2 flex-shrink-0" />
                Natürliche Wuchsrichtung
              </li>
              <li className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-[#86C166] mr-2 flex-shrink-0" />
                Präzise Konturierung
              </li>
            </ul>

            <button
              onClick={() => onWhatsAppContact('Hallo! Ich interessiere mich für die Barthaartransplantation (ab 2.599€). Können Sie mir weitere Informationen geben?')}
              className={`${buttonStyle.primary} w-full bg-gradient-to-r from-[#7BA7C2] to-[#5A8BA6]`}
            >
              <span className={buttonRippleClass}></span>
              <span className="relative">Jetzt beraten lassen</span>
            </button>
          </div>

          {/* Eyebrow Transplantation */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="relative mb-4">
              <OptimizedImage
                sources={{ original: "/images/Behandlung_Augenbrauentransplantation.webp" }}
                alt="Augenbrauentransplantation"
                className="w-full h-48 object-cover rounded-xl"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Augenbrauentransplantation</h3>
            <p className="text-gray-600 mb-4">Ausdrucksstarke, natürliche Augenbrauen</p>
            
            <div className="mb-4">
              <div className="flex items-center justify-center mb-2">
                <span className="text-2xl font-bold text-[#86C166]">ab 1.699€</span>
              </div>
            </div>

            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-[#86C166] mr-2 flex-shrink-0" />
                Maßgeschneiderte Form
              </li>
                <li className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-[#86C166] mr-2 flex-shrink-0" />
                2 zusätzliche kostenlose Mesotherapiebehandlungen
              </li>            
              <li className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-[#86C166] mr-2 flex-shrink-0" />
                Präzise Platzierung
              </li>
            </ul>

            <button
              onClick={() => onWhatsAppContact('Hallo! Ich interessiere mich für die Augenbrauentransplantation (ab 1.699€). Können Sie mir weitere Informationen geben?')}
              className={`${buttonStyle.primary} w-full bg-gradient-to-r from-[#7BA7C2] to-[#5A8BA6]`}
            >
              <span className={buttonRippleClass}></span>
              <span className="relative">Jetzt beraten lassen</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstagramTreatmentOffers;
