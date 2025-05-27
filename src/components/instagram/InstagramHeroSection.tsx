import React from 'react';
import { ArrowRight, Sparkles, CheckCircle, Phone, MessageCircle } from 'lucide-react';
import { buttonStyle, buttonRippleClass, buttonArrowClass } from '../../utils/buttons';

interface InstagramHeroSectionProps {
  onWhatsAppContact: (message: string) => void;
  onCallContact: () => void;
}

const InstagramHeroSection: React.FC<InstagramHeroSectionProps> = ({
  onWhatsAppContact,
  onCallContact
}) => {
  return (
    <section className="relative bg-gradient-to-br from-[#F8FAFC] via-white to-[#F0F8EA] overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#7BA7C2]/10 rounded-full"></div>
        <div className="absolute top-1/3 -left-10 w-32 h-32 bg-[#86C166]/10 rounded-full"></div>
        <div className="absolute bottom-10 right-1/4 w-6 h-6 bg-[#7BA7C2]/20 rounded-full"></div>
      </div>

      <div className="relative px-4 py-8 max-w-4xl mx-auto text-center">
        {/* Instagram Special Badge */}
        <div className="inline-flex items-center bg-gradient-to-r from-[#E1306C] to-[#F56040] text-white px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-lg">
          <Sparkles className="w-4 h-4 mr-2" />
          Exklusiv für Instagram-Follower
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
          <span className="text-[#7BA7C2]">50€ Rabatt</span> auf Ihre
          <br />
          Haar- oder Barthaartransplantation
        </h1>

        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Kombinierbar mit unseren aktuellen Frühjahrsaktionen. Angebot gültig bis zum 30. Juni.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onWhatsAppContact('Hallo! Ich interessiere mich für das 50€ Instagram-Special und möchte eine kostenlose Beratung.')}
            className={`${buttonStyle.primary} bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white px-8 py-4 text-lg`}
          >
            <span className={buttonRippleClass}></span>
            <span className="relative flex items-center justify-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp Beratung
              <ArrowRight className={buttonArrowClass} />
            </span>
          </button>
          
          <button
            onClick={onCallContact}
            className={`${buttonStyle.secondary} border-2 border-[#7BA7C2] text-[#7BA7C2] px-8 py-4 text-lg hover:bg-[#7BA7C2] hover:text-white`}
          >
            <span className={buttonRippleClass}></span>
            <span className="relative flex items-center justify-center">
              <Phone className="w-5 h-5 mr-2" />
              Jetzt anrufen
            </span>
          </button>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center items-center gap-6 mt-8 text-sm text-gray-600">
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 text-[#86C166] mr-2" />
            15+ Jahre Erfahrung
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 text-[#86C166] mr-2" />
            Kostenlose Beratung
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 text-[#86C166] mr-2" />
            Mönchengladbach, NRW
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstagramHeroSection;
