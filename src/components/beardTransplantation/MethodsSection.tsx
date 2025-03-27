import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, ChevronRight } from 'lucide-react';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, tracking, lineHeight } from '../../utils/typography';

const MethodsSection: React.FC = () => {
  const { t } = useTranslation('beardTransplantation');
  const [hoverMethod, setHoverMethod] = useState<number | null>(null);

  // Get methods from translation
  const methods = t('methodsSection.methods', { returnObjects: true }) as any[];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -z-10 w-full h-full inset-0 bg-gradient-to-b from-white via-gray-50 to-white"></div>
      <div className="absolute -z-10 w-[800px] h-[800px] rounded-full bg-[#7BA7C2]/5 -top-[400px] -left-[400px] blur-3xl"></div>
      <div className="absolute -z-10 w-[600px] h-[600px] rounded-full bg-[#7BA7C2]/5 -bottom-[300px] -right-[300px] blur-3xl"></div>
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <h2 className={`${textStyle.sectionTitle}`} lang="de">{t('methodsSection.title')}</h2>
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[350px] mt-3 mx-auto`}></div>
          </div>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-4`}>
            {t('methodsSection.subtitle')}
          </p>
        </div>

        {/* Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {methods.map((method, index) => {
            const isHovered = index === hoverMethod;
            
            return (
              <div 
                key={index} 
                className="group relative"
                onMouseEnter={() => setHoverMethod(index)}
                onMouseLeave={() => setHoverMethod(null)}
              >
                {/* Card with glass morphism effect */}
                <div className={`relative bg-white backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-500 ${
                  isHovered 
                    ? 'shadow-xl transform -translate-y-1 border-2 border-[#7BA7C2]/80' 
                    : 'border border-gray-100/80 hover:border-[#7BA7C2]/30 hover:shadow-xl'
                }`}>
                  {/* Method Image with background gradient */}
                  <div className="h-72 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#7BA7C2]/60 to-[#7BA7C2]/10 z-0"></div>
                    <img 
                      src={`/images/${method.image || 'FUE_Haartransplantation_Schema.svg'}`}
                      alt={method.title}
                      className={`h-full w-full relative z-10 transition-all duration-700 ${
                        isHovered ? 'scale-105' : 'scale-100'
                      } ${
                        method.image === 'saphir_fue.jpg' || method.image === 'dhi_fue.jpg' 
                          ? 'object-cover' 
                          : 'object-contain p-6'
                      }`}
                    />
                    
                    {/* Method title overlay with fixed height for consistent multi-line titles */}
                    <div className="absolute bottom-0 left-0 right-0 py-6 px-6 text-white bg-gradient-to-t from-black/60 to-transparent min-h-[90px] flex flex-col justify-end z-20">
                      <h3 className={`${fontSize.lg} ${fontWeight.normal} ${tracking.wide} drop-shadow-md leading-tight`}>{method.title}</h3>
                      <p className={`${fontSize.sm} text-white/90 ${fontWeight.normal} mt-1`}>{method.subtitle}</p>
                    </div>
                  </div>
                  
                  {/* Method Content */}
                  <div className="p-4 sm:p-6 md:p-8">
                    {/* Description */}
                    <p className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} ${lineHeight.relaxed} mb-8`}>
                      {method.description}
                    </p>
                    
                    {/* Benefits section */}
                    <div className="mb-8">
                      <h4 className={`${fontSize.base} ${fontWeight.medium} ${textColor.primary} ${tracking.wide} mb-4 flex items-center`}>
                        <span className="w-8 h-px bg-[#7BA7C2]/25 mr-3"></span>
                        {t('methodsSection.sectionLabels.benefits')}
                      </h4>
                      <ul className="grid gap-3">
                        {method.benefits.map((benefit: string, i: number) => (
                          <li key={i} className="flex items-start group">
                            <div className="mr-3 flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[#7BA7C2]/10 flex items-center justify-center transition-all duration-300 group-hover:bg-[#7BA7C2]/20">
                              <Check className="h-3 w-3 text-[#7BA7C2]" />
                            </div>
                            <span className={`${fontSize.sm} ${textColor.dark} ${fontWeight.normal}`}>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Process section */}
                    <div className="mb-8">
                      <h4 className={`${fontSize.base} ${fontWeight.medium} ${textColor.primary} ${tracking.wide} mb-4 flex items-center`}>
                        <span className="w-8 h-px bg-[#7BA7C2]/25 mr-3"></span>
                        {t('methodsSection.sectionLabels.process')}
                      </h4>
                      <ol className="grid gap-4">
                        {method.process.map((step: string, i: number) => (
                          <li key={i} className="flex items-start">
                            <div className="mr-3 flex-shrink-0 w-6 h-6 rounded-full bg-[#7BA7C2]/10 text-[#7BA7C2] flex items-center justify-center font-medium text-sm transition-all duration-300 group-hover:bg-[#7BA7C2]/20">
                              {i + 1}
                            </div>
                            <span className={`${fontSize.sm} ${textColor.dark} ${fontWeight.normal}`}>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    
                    {/* Ideal for section */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
                      <span className={`inline-block px-4 py-2 sm:px-5 sm:py-2.5 bg-[#7BA7C2]/10 rounded-full ${fontSize.sm} ${fontWeight.normal} ${textColor.primary} transition-all duration-300 group-hover:bg-[#7BA7C2]/15`}>
                        {method.idealFor}
                      </span>
                      
                      {/* Subtle indicator */}
                      <div className={`flex items-center ${fontSize.xs} ${textColor.primary} transition-opacity duration-300 ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <span className={`mr-1 ${fontWeight.normal}`}>{t('methodsSection.learnMore')}</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className={`absolute -z-10 w-full h-full rounded-2xl bg-[#7BA7C2]/10 top-2 left-2 transition-all duration-500 ${
                  isHovered ? 'opacity-70' : 'opacity-0'
                }`}></div>
              </div>
            );
          })}
        </div>
        
        {/* Additional information */}
        <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="md:w-1/2">
              <h3 className={`${textStyle.primaryHeading} mb-4 text-center md:text-left`}>{t('methodsSection.additionalInfo.personalConsultation.title')}</h3>
              <p className={`${textStyle.bodyText} text-center md:text-left px-2 md:px-0`}>
                {t('methodsSection.additionalInfo.personalConsultation.description')}
              </p>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <h3 className={`${textStyle.primaryHeading} mb-4 text-center md:text-left`}>{t('methodsSection.additionalInfo.combinedTechniques.title')}</h3>
              <p className={`${textStyle.bodyText} text-center md:text-left px-2 md:px-0`}>
                {t('methodsSection.additionalInfo.combinedTechniques.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodsSection;
