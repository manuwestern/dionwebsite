import React from 'react';
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';

interface InstagramFinalCTAProps {
  onWhatsAppContact: (message: string) => void;
  onCallContact: () => void;
}

const InstagramFinalCTA: React.FC<InstagramFinalCTAProps> = ({
  onWhatsAppContact,
  onCallContact
}) => {
  return (
    <section className="py-16 bg-gradient-to-br from-[#7BA7C2] to-[#5A8BA6] text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Sichern Sie sich jetzt Ihren 50€ Instagram-Rabatt!
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Kostenlose Beratung + 50€ Rabatt + Sommeraktionen kombinierbar
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={() => onWhatsAppContact('Hallo! Ich komme von Instagram und möchte den 50€ Rabatt nutzen. Bitte beraten Sie mich kostenlos zu Ihren Behandlungen.')}
            className="bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-4 rounded-xl font-medium text-lg transition-colors flex items-center justify-center"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            WhatsApp: Kostenlose Beratung
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
          
          <button
            onClick={onCallContact}
            className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-8 py-4 rounded-xl font-medium text-lg transition-colors flex items-center justify-center"
          >
            <Phone className="w-5 h-5 mr-2" />
            02161 2963017
          </button>
        </div>

        <div className="text-sm opacity-75">
          <p>✓ Kostenlose Erstberatung ✓ Keine Wartezeit ✓ Sofortige Antwort</p>
          
        </div>
      </div>
    </section>
  );
};

export default InstagramFinalCTA;
