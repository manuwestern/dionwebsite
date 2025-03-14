import React from 'react';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';

const MethodsSection: React.FC = () => {
  const { t } = useTranslation('hairTransplantation');

  // Get methods from translation
  const methods = t('methodsSection.methods', { returnObjects: true }) as any[];

  return (
    <div className="bg-white py-16 md:py-24">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light mb-3 md:text-5xl md:mb-4">{t('methodsSection.title')}</h2>
          <p className="text-base text-gray-600 font-light md:text-xl">
            {t('methodsSection.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {methods.map((method, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-2xl font-light mb-4 text-center">{method.title}</h3>
              <p className="text-gray-600 mb-6 font-light">
                {method.description}
              </p>
              
              <div className="bg-white rounded-xl p-4">
                <h4 className="text-lg font-light mb-3 text-center">Vorteile</h4>
                <ul className="space-y-2">
                  {method.benefits.map((benefit: string, i: number) => (
                    <li key={i} className="flex items-start">
                      <div className="mt-1 mr-2 flex-shrink-0">
                        <Check className="h-4 w-4 text-[#333333]" />
                      </div>
                      <span className="text-gray-700 font-light">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MethodsSection;
