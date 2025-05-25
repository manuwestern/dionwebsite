import React from 'react';
import { Star, CheckCircle, Gift, MessageCircle } from 'lucide-react';

const InstagramWhyChooseUs: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Warum Dion Hair Clinic?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Über 15 Jahre Erfahrung und modernste Technologien für Ihr perfektes Ergebnis
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6">
            <div className="bg-gradient-to-br from-[#7BA7C2] to-[#5A8BA6] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">15+ Jahre Erfahrung</h3>
            <p className="text-gray-600 text-sm">Über 5.000 erfolgreiche Behandlungen</p>
          </div>

          <div className="text-center p-6">
            <div className="bg-gradient-to-br from-[#86C166] to-[#6BA54A] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Modernste Technik</h3>
            <p className="text-gray-600 text-sm">FUE, DHI & Saphir-Methoden</p>
          </div>

          <div className="text-center p-6">
            <div className="bg-gradient-to-br from-[#E57098] to-[#D1477A] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Ohne Rasur möglich</h3>
            <p className="text-gray-600 text-sm">Diskrete Behandlung, schneller gesellschaftsfähig</p>
          </div>

          <div className="text-center p-6">
            <div className="bg-gradient-to-br from-[#7BA7C2] to-[#5A8BA6] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Mönchengladbach, NRW</h3>
            <p className="text-gray-600 text-sm">Zwischen Köln & Düsseldorf</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstagramWhyChooseUs;
