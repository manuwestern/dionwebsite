 import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, ChevronRight, ArrowRight } from 'lucide-react';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, tracking, lineHeight } from '../../utils/typography';
import { buttonStyle, buttonRippleClass, buttonArrowClass } from '../../utils/buttons';

// Interface für Preise
interface Price {
  title: string;
  price: string;
}

// Interface für Pakete
interface Package {
  title: string;
  description: string;
  prices: Price[];
  features: string[];
}

// Interface für Zusatzoptionen
interface AdditionalOption {
  title: string;
  price: string;
  description: string;
}

const PriceOverviewSection: React.FC = () => {
  const { t } = useTranslation(['prices', 'common']);
  const [activeTab, setActiveTab] = useState<string>('hair');
  const [hoverPackage, setHoverPackage] = useState<number | null>(null);
  const [hoverOption, setHoverOption] = useState<number | null>(null);

  // Behandlungspakete aus Übersetzungen holen
  const hairPackages = [
    t('priceOverviewSection.hairTransplantation.packages.basicSaphirFUE', { returnObjects: true }),
    t('priceOverviewSection.hairTransplantation.packages.advancedSaphirFUE', { returnObjects: true }),
    t('priceOverviewSection.hairTransplantation.packages.basicDHIFUE', { returnObjects: true }),
    t('priceOverviewSection.hairTransplantation.packages.advancedDHIFUE', { returnObjects: true })
  ] as Package[];

  const eyebrowPackages = [
    t('priceOverviewSection.eyebrowTransplantation.packages.saphirFUE', { returnObjects: true }),
    t('priceOverviewSection.eyebrowTransplantation.packages.dhiFUE', { returnObjects: true })
  ] as Package[];

  const beardPackages = [
    t('priceOverviewSection.beardTransplantation.packages.saphirFUE', { returnObjects: true }),
    t('priceOverviewSection.beardTransplantation.packages.dhiFUE', { returnObjects: true })
  ] as Package[];

  // Zusatzoptionen aus Übersetzungen holen
  const additionalOptions = t('priceOverviewSection.additionalOptions.options', { returnObjects: true }) as AdditionalOption[];

  // Aktive Pakete basierend auf dem ausgewählten Tab
  const activePackages = activeTab === 'hair' 
    ? hairPackages 
    : activeTab === 'eyebrow' 
      ? eyebrowPackages 
      : beardPackages;

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
            <h2 className={`${textStyle.sectionTitle}`} lang="de">{t('priceOverviewSection.title')}</h2>
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[350px] mt-3 mx-auto`}></div>
          </div>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-4`}>
            {t('priceOverviewSection.subtitle')}
          </p>
        </div>

        {/* Treatment Type Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button 
            onClick={() => setActiveTab('hair')}
            className={`px-6 py-3 rounded-full transition-all duration-300 ${
              activeTab === 'hair' 
                ? 'bg-[#7BA7C2] text-white shadow-md' 
                : 'bg-white border border-[#7BA7C2]/30 text-[#7BA7C2] hover:bg-[#7BA7C2]/10'
            }`}
          >
            <span className={`${fontSize.base} ${fontWeight.medium} ${tracking.wide}`}>
              {t('priceOverviewSection.hairTransplantation.title')}
            </span>
          </button>
          <button 
            onClick={() => setActiveTab('eyebrow')}
            className={`px-6 py-3 rounded-full transition-all duration-300 ${
              activeTab === 'eyebrow' 
                ? 'bg-[#7BA7C2] text-white shadow-md' 
                : 'bg-white border border-[#7BA7C2]/30 text-[#7BA7C2] hover:bg-[#7BA7C2]/10'
            }`}
          >
            <span className={`${fontSize.base} ${fontWeight.medium} ${tracking.wide}`}>
              {t('priceOverviewSection.eyebrowTransplantation.title')}
            </span>
          </button>
          <button 
            onClick={() => setActiveTab('beard')}
            className={`px-6 py-3 rounded-full transition-all duration-300 ${
              activeTab === 'beard' 
                ? 'bg-[#7BA7C2] text-white shadow-md' 
                : 'bg-white border border-[#7BA7C2]/30 text-[#7BA7C2] hover:bg-[#7BA7C2]/10'
            }`}
          >
            <span className={`${fontSize.base} ${fontWeight.medium} ${tracking.wide}`}>
              {t('priceOverviewSection.beardTransplantation.title')}
            </span>
          </button>
        </div>

        {/* Treatment Description */}
        <div className="text-center mb-12">
          <p className={`${textStyle.bodyText} max-w-3xl mx-auto`}>
            {activeTab === 'hair' 
              ? t('priceOverviewSection.hairTransplantation.description')
              : activeTab === 'eyebrow'
                ? t('priceOverviewSection.eyebrowTransplantation.description')
                : t('priceOverviewSection.beardTransplantation.description')
            }
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {activePackages.map((pkg, index) => {
            const isHovered = index === hoverPackage;
            
            return (
              <div 
                key={index} 
                className="group relative"
                onMouseEnter={() => setHoverPackage(index)}
                onMouseLeave={() => setHoverPackage(null)}
              >
                {/* Card with glass morphism effect */}
                <div className={`relative bg-white backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-500 h-full border-2 ${
                  isHovered 
                    ? 'shadow-xl transform -translate-y-1 border-[#7BA7C2]/80' 
                    : 'border-gray-100/80 hover:border-[#7BA7C2]/30 hover:shadow-xl'
                }`}>
                  {/* Package Header with gradient background */}
                  <div className="relative h-24 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#7BA7C2] to-[#7BA7C2]/80 z-0"></div>
                    
                    {/* Decorative circles */}
                    <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/10 -mr-20 -mt-20"></div>
                    <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-white/10 -ml-10 -mb-10"></div>
                    
                    {/* Package title */}
                    <div className="relative z-10 h-full flex flex-col justify-center px-8">
                      <h3 className={`${fontSize.lg} ${fontWeight.normal} ${textColor.white} drop-shadow-md`}>{pkg.title}</h3>
                    </div>
                  </div>
                  
                  {/* Package Content */}
                  <div className="p-8">
                    {/* Description */}
                    <p className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} ${lineHeight.relaxed} mb-8 min-h-[60px]`}>
                      {pkg.description}
                    </p>
                    
                    {/* Prices */}
                    <div className="mb-8">
                      {pkg.prices.map((price, i) => (
                        <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100 group">
                          <span className={`${fontSize.base} ${textColor.dark} ${fontWeight.normal}`}>{price.title}</span>
                          <span className={`${fontSize.lg} ${textColor.primary} ${fontWeight.medium} transition-all duration-300 group-hover:scale-110`}>{price.price}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Features */}
                    <div className="mb-6">
                      <h4 className={`${fontSize.base} ${fontWeight.medium} ${textColor.primary} ${tracking.wide} mb-4`}>
                        {t('priceOverviewSection.packageIncludes')}
                      </h4>
                      <ul className="grid gap-3">
                        {pkg.features.map((feature, i) => (
                          <li key={i} className="flex items-start group">
                            <div className="mr-3 flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[#7BA7C2]/10 flex items-center justify-center transition-all duration-300 group-hover:bg-[#7BA7C2]/20">
                              <Check className="h-3 w-3 text-[#7BA7C2]" />
                            </div>
                            <span className={`${fontSize.sm} ${textColor.dark} ${fontWeight.normal}`}>{feature}</span>
                          </li>
                        ))}
                      </ul>
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

        {/* Additional Options Section */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className={`${textStyle.sectionTitle}`} lang="de">{t('priceOverviewSection.additionalOptions.title')}</h2>
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[250px] mt-3 mx-auto`}></div>
            <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-4`}>
              {t('priceOverviewSection.additionalOptions.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalOptions.map((option, index) => {
              const isHovered = index === hoverOption;
              
              return (
                <div 
                  key={index} 
                  className="group relative"
                  onMouseEnter={() => setHoverOption(index)}
                  onMouseLeave={() => setHoverOption(null)}
                >
                  <div className={`relative bg-white backdrop-blur-sm rounded-xl overflow-hidden shadow-md transition-all duration-500 h-full border ${
                    isHovered 
                      ? 'shadow-lg transform -translate-y-1 border-[#7BA7C2]/60' 
                      : 'border-gray-100/80 hover:border-[#7BA7C2]/30 hover:shadow-md'
                  }`}>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className={`${fontSize.base} ${fontWeight.medium} ${textColor.dark}`}>{option.title}</h3>
                        <span className={`${fontSize.lg} ${textColor.primary} ${fontWeight.medium} transition-all duration-300 ${isHovered ? 'scale-110' : ''}`}>{option.price}</span>
                      </div>
                      <p className={`${fontSize.sm} ${textColor.medium} ${fontWeight.light} ${lineHeight.relaxed}`}>
                        {option.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Subtle decorative element */}
                  <div className={`absolute -z-10 w-full h-full rounded-xl bg-[#7BA7C2]/10 top-1 left-1 transition-all duration-500 ${
                    isHovered ? 'opacity-70' : 'opacity-0'
                  }`}></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Consultation Section */}
        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#7BA7C2]/5 -mr-32 -mt-32 blur-xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#7BA7C2]/5 -ml-32 -mb-32 blur-xl"></div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="md:w-2/3">
              <h3 className={`${fontSize.h3} ${fontWeight.normal} ${textColor.primary} mb-4 text-center md:text-left`}>
                {t('consultationSection.title')}
              </h3>
              <p className={`${textStyle.bodyText} text-center md:text-left px-2 md:px-0`}>
                {t('consultationSection.description')}
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center md:justify-end">
              <button className={`${buttonStyle.primary} shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]`}>
                <span className={buttonRippleClass}></span>
                <span className={`relative flex items-center ${textStyle.button} uppercase tracking-widest`}>
                  {t('consultationSection.buttonText')}
                  <ArrowRight className={`${buttonArrowClass} ml-2`} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceOverviewSection;
