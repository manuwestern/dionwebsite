import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, ClipboardCheck, Scissors, Heart } from 'lucide-react';

const LPProcessSection: React.FC = () => {
  const { t } = useTranslation('landing');

  const steps = [
    {
      icon: Calendar,
      title: t('process.steps.0.title'),
      description: t('process.steps.0.description'),
      duration: t('process.steps.0.duration')
    },
    {
      icon: ClipboardCheck,
      title: t('process.steps.1.title'),
      description: t('process.steps.1.description'),
      duration: t('process.steps.1.duration')
    },
    {
      icon: Scissors,
      title: t('process.steps.2.title'),
      description: t('process.steps.2.description'),
      duration: t('process.steps.2.duration')
    },
    {
      icon: Heart,
      title: t('process.steps.3.title'),
      description: t('process.steps.3.description'),
      duration: t('process.steps.3.duration')
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t('process.title')}
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            {t('process.subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative flex gap-6 mb-12 last:mb-0">
                {/* Timeline Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-6 top-16 w-0.5 h-full bg-primary/20"></div>
                )}

                {/* Icon */}
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center relative z-10">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <div className="flex-1 bg-gray-50 rounded-2xl p-6 md:p-8">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                      {step.title}
                    </h3>
                    <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full whitespace-nowrap ml-4">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => {
              const message = encodeURIComponent(t('whatsapp.messages.general'));
              window.open(`https://wa.me/491702637818?text=${message}`, '_blank');
            }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-full font-semibold text-lg shadow-lg hover:bg-[#1EBE57] transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span>{t('process.cta')}</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default LPProcessSection;