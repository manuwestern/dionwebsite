import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const LPBeforeAfterSection: React.FC = () => {
  const { t } = useTranslation('landing');
  const [currentCase, setCurrentCase] = useState(0);

  const cases = [
    {
      beforeImage: '/images/Haartransplantation_vorher_1.webp',
      afterImage: '/images/Haartransplantation_nachher_1.webp',
      name: 'Michael K.',
      age: 42,
      grafts: 2800,
      method: 'Saphir-FUE',
      months: 12
    },
    {
      beforeImage: '/images/Haartransplantation_vorher_2.webp',
      afterImage: '/images/Haartransplantation_nachher_2.webp',
      name: 'Pedro S.',
      age: 38,
      grafts: 2200,
      method: 'DHI',
      months: 12
    },
    {
      beforeImage: '/images/Haartransplantation_vorher_3.webp',
      afterImage: '/images/Haartransplantation_nachher_3.webp',
      name: 'Thomas M.',
      age: 35,
      grafts: 3500,
      method: 'Saphir-FUE',
      months: 12
    }
  ];

  const nextCase = () => {
    setCurrentCase((prev) => (prev + 1) % cases.length);
  };

  const prevCase = () => {
    setCurrentCase((prev) => (prev - 1 + cases.length) % cases.length);
  };

  const currentCaseData = cases[currentCase];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t('beforeAfter.title')}
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            {t('beforeAfter.subtitle')}
          </p>
        </div>

        {/* Before/After Comparison */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Before */}
              <div className="relative">
                <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full font-semibold z-10">
                  {t('beforeAfter.before')}
                </div>
                <img
                  src={currentCaseData.beforeImage}
                  alt={`${currentCaseData.name} - Before`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* After */}
              <div className="relative">
                <div className="absolute top-4 left-4 bg-green-500 text-white px-4 py-2 rounded-full font-semibold z-10">
                  {t('beforeAfter.after')}
                </div>
                <img
                  src={currentCaseData.afterImage}
                  alt={`${currentCaseData.name} - After`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Case Info */}
            <div className="p-6 md:p-8 bg-gradient-to-r from-primary/5 to-transparent">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {currentCaseData.name}, {currentCaseData.age} {t('beforeAfter.years')}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-gray-600">
                    <span>✓ {currentCaseData.grafts} Grafts</span>
                    <span>✓ {currentCaseData.method}</span>
                    <span>✓ {currentCaseData.months} {t('beforeAfter.monthsAfter')}</span>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevCase}
                    className="p-2 rounded-full bg-white border-2 border-gray-200 hover:border-primary transition-colors"
                    aria-label="Previous case"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <span className="px-4 text-gray-600">
                    {currentCase + 1} / {cases.length}
                  </span>
                  <button
                    onClick={nextCase}
                    className="p-2 rounded-full bg-white border-2 border-gray-200 hover:border-primary transition-colors"
                    aria-label="Next case"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <button
              onClick={() => {
                const message = encodeURIComponent(t('whatsapp.messages.beforeAfter'));
                window.open(`https://wa.me/491702637818?text=${message}`, '_blank');
                
                if (typeof window !== 'undefined' && window.dataLayer) {
                  window.dataLayer.push({
                    event: 'lp_whatsapp_click',
                    eventCategory: 'CTA',
                    eventAction: 'WhatsApp Click',
                    eventLabel: 'beforeAfter',
                    value: 1
                  });
                }
              }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-full font-semibold text-lg shadow-lg hover:bg-[#1EBE57] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>{t('beforeAfter.cta')}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LPBeforeAfterSection;