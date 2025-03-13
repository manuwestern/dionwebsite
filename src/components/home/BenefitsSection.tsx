import React from 'react';
import { Award, Stethoscope, Users, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const BenefitsSection: React.FC = () => {
  const { t } = useTranslation('home');

  const benefits = [
    {
      icon: <Award className="w-8 h-8 text-gray-700" />,
      titleKey: 'benefitsSection.benefits.0.title',
      descriptionKey: 'benefitsSection.benefits.0.description'
    },
    {
      icon: <Stethoscope className="w-8 h-8 text-gray-700" />,
      titleKey: 'benefitsSection.benefits.1.title',
      descriptionKey: 'benefitsSection.benefits.1.description'
    },
    {
      icon: <Users className="w-8 h-8 text-gray-700" />,
      titleKey: 'benefitsSection.benefits.2.title',
      descriptionKey: 'benefitsSection.benefits.2.description'
    },
    {
      icon: <Clock className="w-8 h-8 text-gray-700" />,
      titleKey: 'benefitsSection.benefits.3.title',
      descriptionKey: 'benefitsSection.benefits.3.description'
    }
  ];

  return (
    <div className="bg-white w-full max-w-7xl mx-auto px-4 py-12 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-light mb-3 md:text-5xl md:mb-4">{t('benefitsSection.title')}</h2>
        <p className="text-base text-gray-600 font-light md:text-xl">
          {t('benefitsSection.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((benefit, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-lg text-center hover:transform hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center">
              {benefit.icon}
            </div>
            <h3 className="text-xl font-light mb-3">{t(benefit.titleKey)}</h3>
            <p className="text-gray-600 font-light">
              {t(benefit.descriptionKey)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitsSection;
