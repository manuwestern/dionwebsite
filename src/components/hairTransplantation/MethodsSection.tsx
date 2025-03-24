import React from 'react';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';

const MethodsSection: React.FC = () => {
  const { t } = useTranslation('hairTransplantation');

  // Get methods from translation
  const methods = t('methodsSection.methods', { returnObjects: true }) as any[];

  return (
    <div className="bg-white py-16 md:py-24 relative">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light mb-3 md:text-5xl md:mb-4">{t('methodsSection.title')}</h2>
          <p className="text-base text-gray-600 font-light md:text-xl">
            {t('methodsSection.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {methods.map((method, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:translate-y-[-4px] border border-gray-100"
            >
              {/* Method image at the top */}
              <div className="h-64 bg-white relative overflow-hidden">
                <div className="absolute inset-0">
                  <img 
                    src={`/images/${method.image || 'FUE_Haartransplantation_Schema.svg'}`}
                    alt={method.title}
                    className={`h-full w-full ${method.image === 'saphir_fue.jpg' || method.image === 'dhi_fue.jpg' ? 'object-cover' : 'object-contain p-4'}`}
                  />
                </div>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                {/* Title overlay at bottom of image */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-2xl font-medium">{method.title}</h3>
                  <p className="text-sm text-gray-100 font-light">{method.subtitle}</p>
                </div>
              </div>
              
              {/* Content container with responsive height for mobile and fixed height for desktop */}
              <div className="p-4 bg-white relative md:h-[800px]">
                {/* Mobile: Stacked layout, Desktop: Absolute positioning */}
                <div className="md:absolute md:top-4 md:left-4 md:right-4 md:h-[120px] mb-6 md:mb-0">
                  <p className="text-gray-700 font-light text-center md:text-left">
                    {method.description}
                  </p>
                </div>
                
                {/* Benefits section */}
                <div className="md:absolute md:top-[140px] md:left-4 md:right-4 md:h-[280px] mb-6 md:mb-0">
                  <h4 className="text-lg font-medium mb-4 text-center md:text-left">Vorteile:</h4>
                  <ul className="space-y-3 text-center md:text-left">
                    {method.benefits.map((benefit: string, i: number) => (
                      <li key={i} className="flex flex-row items-start mb-3 md:mb-0 pl-4 md:pl-0">
                        <div className="mr-3 flex-shrink-0">
                          <Check className="h-4 w-4 text-[#333333]" />
                        </div>
                        <span className="text-gray-700 font-light text-left">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Process section */}
                <div className="md:absolute md:top-[440px] md:left-4 md:right-4 md:h-[340px]">
                  <h4 className="text-lg font-medium mb-4 text-center md:text-left">Prozess:</h4>
                  <ol className="space-y-4 text-center md:text-left">
                    {method.process.map((step: string, i: number) => (
                      <li key={i} className="flex flex-row items-start mb-6 md:mb-0 pl-4 md:pl-0">
                        <div className="mr-3 flex-shrink-0 w-6 h-6 rounded-full bg-[#333333] text-white flex items-center justify-center font-light">
                          {i + 1}
                        </div>
                        <span className="text-gray-700 font-light text-left">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              
              {/* Footer */}
              <div className="bg-white border-t border-gray-200 p-3 text-center font-light text-sm text-gray-700">
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
