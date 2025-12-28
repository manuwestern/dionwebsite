import React from 'react';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';

const LPPricingSection: React.FC = () => {
  const { t } = useTranslation('landing');

  const packages = [
    {
      name: t('pricing.packages.0.name'),
      grafts: '1.500',
      price: '2.250€',
      ideal: t('pricing.packages.0.ideal'),
      popular: false
    },
    {
      name: t('pricing.packages.1.name'),
      grafts: '3.000',
      price: '4.500€',
      ideal: t('pricing.packages.1.ideal'),
      popular: true
    },
    {
      name: t('pricing.packages.2.name'),
      grafts: '5.000+',
      price: '7.500€+',
      ideal: t('pricing.packages.2.ideal'),
      popular: false
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t('pricing.title')}
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            {t('pricing.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-3xl p-8 border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                pkg.popular ? 'border-primary shadow-xl scale-105' : 'border-gray-200'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-6 py-2 rounded-full font-semibold text-sm">
                  {t('pricing.popular')}
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                <div className="text-4xl font-bold text-primary mb-2">{pkg.price}</div>
                <p className="text-gray-600">{pkg.grafts} Grafts</p>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2 text-gray-700">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>{t('pricing.features.0')}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>{t('pricing.features.1')}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>{t('pricing.features.2')}</span>
                </div>
              </div>

              <div className="text-sm text-gray-600 mb-6 p-4 bg-gray-50 rounded-xl">
                <strong>{t('pricing.idealFor')}:</strong> {pkg.ideal}
              </div>

              <button
                onClick={() => {
                  const message = encodeURIComponent(t('whatsapp.messages.pricing'));
                  window.open(`https://wa.me/491702637818?text=${message}`, '_blank');
                }}
                className={`w-full py-4 rounded-full font-semibold text-lg transition-all duration-300 ${
                  pkg.popular
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {t('pricing.cta')}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 max-w-2xl mx-auto">
          <p className="text-gray-600 mb-4">{t('pricing.note')}</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span>✓ {t('pricing.benefits.0')}</span>
            <span>✓ {t('pricing.benefits.1')}</span>
            <span>✓ {t('pricing.benefits.2')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LPPricingSection;