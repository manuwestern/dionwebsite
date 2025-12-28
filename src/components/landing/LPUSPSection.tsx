import React from 'react';
import { useTranslation } from 'react-i18next';
import { Scissors, MapPin, Euro, Sparkles, Award, Heart } from 'lucide-react';

const LPUSPSection: React.FC = () => {
  const { t } = useTranslation('landing');

  const usps = [
    {
      icon: Scissors,
      title: t('usps.items.0.title'),
      description: t('usps.items.0.description'),
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: MapPin,
      title: t('usps.items.1.title'),
      description: t('usps.items.1.description'),
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Euro,
      title: t('usps.items.2.title'),
      description: t('usps.items.2.description'),
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: Sparkles,
      title: t('usps.items.3.title'),
      description: t('usps.items.3.description'),
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Award,
      title: t('usps.items.4.title'),
      description: t('usps.items.4.description'),
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      icon: Heart,
      title: t('usps.items.5.title'),
      description: t('usps.items.5.description'),
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t('usps.title')}
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            {t('usps.subtitle')}
          </p>
        </div>

        {/* USP Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {usps.map((usp, index) => {
            const Icon = usp.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-6 md:p-8 border-2 border-gray-100 hover:border-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className={`w-16 h-16 ${usp.bgColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-8 h-8 ${usp.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  {usp.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {usp.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 md:mt-16">
          <button
            onClick={() => {
              const message = encodeURIComponent(t('whatsapp.messages.general'));
              window.open(`https://wa.me/491702637818?text=${message}`, '_blank');
              
              if (typeof window !== 'undefined' && window.dataLayer) {
                window.dataLayer.push({
                  event: 'lp_whatsapp_click',
                  eventCategory: 'CTA',
                  eventAction: 'WhatsApp Click',
                  eventLabel: 'usp',
                  value: 1
                });
              }
            }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-full font-semibold text-lg shadow-lg hover:bg-[#1EBE57] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span>{t('usps.cta')}</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default LPUSPSection;