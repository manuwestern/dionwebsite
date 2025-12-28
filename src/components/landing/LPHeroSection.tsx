import React from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle, Phone } from 'lucide-react';

const LPHeroSection: React.FC = () => {
  const { t } = useTranslation('landing');

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(t('whatsapp.messages.hero'));
    window.open(`https://wa.me/491702637818?text=${message}`, '_blank');
    
    // Track event
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'lp_whatsapp_click',
        eventCategory: 'CTA',
        eventAction: 'WhatsApp Click',
        eventLabel: 'hero',
        value: 1
      });
    }
  };

  const handlePhoneClick = () => {
    window.open('tel:+491702637818', '_self');
    
    // Track event
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'lp_phone_click',
        eventCategory: 'CTA',
        eventAction: 'Phone Click',
        eventLabel: 'hero',
        value: 1
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#F8FAFC] to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #7BA7C2 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left space-y-6 lg:space-y-8">
            {/* Language Switcher */}
            <div className="flex justify-center lg:justify-start gap-3 mb-4">
              <button
                onClick={() => {
                  const { i18n } = useTranslation();
                  i18n.changeLanguage('de');
                  localStorage.setItem('lp-language', 'de');
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border-2 border-gray-200 hover:border-primary transition-colors"
              >
                <img src="/de.svg" alt="Deutsch" className="w-5 h-5" />
                <span className="text-sm font-medium">DE</span>
              </button>
              <button
                onClick={() => {
                  const { i18n } = useTranslation();
                  i18n.changeLanguage('en');
                  localStorage.setItem('lp-language', 'en');
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border-2 border-gray-200 hover:border-primary transition-colors"
              >
                <img src="/gb.svg" alt="English" className="w-5 h-5" />
                <span className="text-sm font-medium">EN</span>
              </button>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {t('hero.title')}
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              {t('hero.subtitle')}
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6 py-4">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl">✓</span>
                </div>
                <div className="text-left">
                  <div className="font-bold text-gray-900">98%</div>
                  <div className="text-sm text-gray-600">{t('hero.stats.satisfied')}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl">★</span>
                </div>
                <div className="text-left">
                  <div className="font-bold text-gray-900">5.000+</div>
                  <div className="text-sm text-gray-600">{t('hero.stats.treatments')}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl">🏆</span>
                </div>
                <div className="text-left">
                  <div className="font-bold text-gray-900">15+</div>
                  <div className="text-sm text-gray-600">{t('hero.stats.experience')}</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={handleWhatsAppClick}
                className="group relative px-8 py-4 bg-[#25D366] text-white rounded-full font-semibold text-lg shadow-lg hover:bg-[#1EBE57] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3"
              >
                <MessageCircle className="w-6 h-6" />
                <span>{t('hero.cta.whatsapp')}</span>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </button>
              
              <button
                onClick={handlePhoneClick}
                className="px-8 py-4 bg-white text-primary border-2 border-primary rounded-full font-semibold text-lg hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Phone className="w-6 h-6" />
                <span>{t('hero.cta.phone')}</span>
              </button>
            </div>

            {/* Social Proof */}
            <div className="pt-4">
              <p className="text-sm text-gray-500 flex items-center justify-center lg:justify-start gap-2">
                <span className="text-yellow-500">★★★★★</span>
                <span>{t('hero.socialProof')}</span>
              </p>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/images/Model_Home.webp"
                alt={t('hero.imageAlt')}
                className="w-full h-auto object-cover"
                loading="eager"
                fetchPriority="high"
              />
              
              {/* Floating Badge */}
              <div className="absolute top-6 right-6 bg-white rounded-2xl shadow-xl p-4 animate-float">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">1,50€</div>
                  <div className="text-sm text-gray-600">{t('hero.priceLabel')}</div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#25D366]/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-gray-400 rounded-full animate-scroll"></div>
        </div>
      </div>
    </section>
  );
};

export default LPHeroSection;