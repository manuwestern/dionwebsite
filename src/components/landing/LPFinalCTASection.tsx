import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle, Phone, Clock } from 'lucide-react';

const LPFinalCTASection: React.FC = () => {
  const { t } = useTranslation('landing');
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Urgency Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
            <Clock className="w-5 h-5" />
            <span className="font-semibold">
              {t('finalCTA.urgency')}: {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {t('finalCTA.title')}
          </h2>

          <p className="text-xl md:text-2xl mb-8 text-white/90">
            {t('finalCTA.subtitle')}
          </p>

          {/* Benefits List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 max-w-2xl mx-auto">
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">✓</span>
                </div>
                <span className="text-left">{t(`finalCTA.benefits.${index}`)}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => {
                const message = encodeURIComponent(t('whatsapp.messages.general'));
                window.open(`https://wa.me/491702637818?text=${message}`, '_blank');
                
                if (typeof window !== 'undefined' && window.dataLayer) {
                  window.dataLayer.push({
                    event: 'lp_whatsapp_click',
                    eventCategory: 'CTA',
                    eventAction: 'WhatsApp Click',
                    eventLabel: 'final',
                    value: 1
                  });
                }
              }}
              className="group relative px-10 py-5 bg-[#25D366] text-white rounded-full font-bold text-xl shadow-2xl hover:bg-[#1EBE57] transition-all duration-300 hover:scale-105 flex items-center gap-3"
            >
              <MessageCircle className="w-7 h-7" />
              <span>{t('finalCTA.whatsappCTA')}</span>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
            </button>

            <button
              onClick={() => {
                window.open('tel:+491702637818', '_self');
              }}
              className="px-10 py-5 bg-white text-primary rounded-full font-bold text-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center gap-3"
            >
              <Phone className="w-7 h-7" />
              <span>{t('finalCTA.phoneCTA')}</span>
            </button>
          </div>

          {/* Trust Signals */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div>
                <div className="text-3xl font-bold mb-1">98%</div>
                <div className="text-sm text-white/80">{t('finalCTA.stats.0')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">5.000+</div>
                <div className="text-sm text-white/80">{t('finalCTA.stats.1')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">15+</div>
                <div className="text-sm text-white/80">{t('finalCTA.stats.2')}</div>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-8">
            <p className="text-white/80 flex items-center justify-center gap-2">
              <span className="text-yellow-300">★★★★★</span>
              <span>{t('finalCTA.socialProof')}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default LPFinalCTASection;