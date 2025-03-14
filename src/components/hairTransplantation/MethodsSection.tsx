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
              className="bg-gradient-to-b from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-lg"
            >
              {/* Header with title */}
              <div className="border-b border-gray-300 p-4">
                <h3 className="text-xl font-medium text-gray-800">{method.title}</h3>
                <p className="text-sm text-gray-600 font-light">{method.subtitle}</p>
              </div>
              
              {/* Method image - would be replaced with actual images */}
              <div className="h-48 bg-gray-300 relative">
                {/* Placeholder for image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-light text-white">{method.title}</span>
                </div>
              </div>
              
              {/* Content container with fixed height */}
              <div className="p-4 bg-white flex flex-col h-[500px]">
                {/* Description - fixed height */}
                <div className="h-24 mb-6">
                  <p className="text-gray-700 font-light">
                    {method.description}
                  </p>
                </div>
                
                {/* Benefits - fixed height */}
                <div className="mb-6 h-48">
                  <h4 className="text-lg font-medium mb-3">Vorteile:</h4>
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
                
                {/* Process - flex-grow to fill remaining space */}
                <div className="flex-grow">
                  <h4 className="text-lg font-medium mb-3">Prozess:</h4>
                  <ol className="space-y-3">
                    {method.process.map((step: string, i: number) => (
                      <li key={i} className="flex items-start">
                        <div className="mr-3 flex-shrink-0 w-6 h-6 rounded-full bg-[#333333] text-white flex items-center justify-center font-light">
                          {i + 1}
                        </div>
                        <span className="text-gray-700 font-light">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              
              {/* Footer */}
              <div className="bg-gray-700 text-white p-3 text-center font-light text-sm">
                {method.idealFor}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MethodsSection;
