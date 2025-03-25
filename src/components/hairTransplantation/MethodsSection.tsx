import React from 'react';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';

const MethodsSection: React.FC = () => {
  const { t } = useTranslation('hairTransplantation');

  // Get methods from translation
  const methods = t('methodsSection.methods', { returnObjects: true }) as any[];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24 relative">
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-5 z-0" 
        style={{ 
          backgroundImage: 'url("/images/dionhairclinic_bg.svg")',
          backgroundSize: '200px',
          backgroundRepeat: 'repeat'
        }}
      ></div>
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#7BA7C2]/80 to-transparent"></div>
                {/* Title overlay at bottom of image */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-2xl font-light">{method.title}</h3>
                  <p className="text-sm text-gray-100 font-light">{method.subtitle}</p>
                </div>
              </div>
              
              {/* Content container with grid layout for alignment */}
              <div className="p-6 bg-white grid grid-rows-[auto_auto_auto_auto] gap-6">
                {/* Description section */}
                <div>
                  <p className="text-gray-700 leading-relaxed">
                    {method.description}
                  </p>
                </div>
                
                {/* Benefits section */}
                <div>
                  <h4 className="text-lg font-light mb-4 border-b pb-2 border-gray-100">Vorteile:</h4>
                  <ul className="grid gap-2">
                    {method.benefits.map((benefit: string, i: number) => (
                      <li key={i} className="flex items-start">
                        <div className="mr-3 flex-shrink-0 mt-1">
                          <Check className="h-4 w-4 text-[#7BA7C2]" />
                        </div>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Process section */}
                <div>
                  <h4 className="text-lg font-light mb-4 border-b pb-2 border-gray-100">Prozess:</h4>
                  <ol className="grid gap-2">
                    {method.process.map((step: string, i: number) => (
                      <li key={i} className="flex items-start">
                        <div className="mr-3 flex-shrink-0 w-6 h-6 rounded-full bg-[#7BA7C2] text-white flex items-center justify-center font-light">
                          {i + 1}
                        </div>
                        <span className="text-gray-700">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                
                {/* Ideal for section */}
                <div className="text-center">
                  <div className="pt-4 border-t border-gray-100">
                    <span className="inline-block px-4 py-2 bg-[#7BA7C2]/10 rounded-full text-sm font-light text-[#7BA7C2]">
                      {method.idealFor}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MethodsSection;
