import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Flower } from 'lucide-react';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, tracking } from '../../utils/typography';
import { buttonStyle, buttonRippleClass, buttonArrowClass } from '../../utils/buttons';
import ElegantPricePackageCard from '../common/elements/ElegantPricePackageCard';
import ElegantPriceOptionCard from '../common/elements/ElegantPriceOptionCard';

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
      {/* Spring Promotion Banner */}
      <div className="relative w-full bg-gradient-to-r from-[#86C166] to-[#7BA7C2] rounded-2xl mb-16 overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 -mr-32 -mt-32 blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/10 -ml-32 -mb-32 blur-xl"></div>
        
        <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-white text-center md:text-left mb-6 md:mb-0">
            <div className="flex items-center mb-3">
              <Flower className="h-5 w-5 mr-2" />
              <span className={`${fontSize.sm} ${fontWeight.semibold} ${tracking.wide}`}>
                {t('priceOverviewSection.springOffer.dateRange')}
              </span>
            </div>
            <h2 className={`${fontSize.h2} ${fontWeight.light} mb-2`}>
              {t('priceOverviewSection.springOffer.badge')}
            </h2>
            <p className={`${fontSize.lg} ${fontWeight.medium} max-w-xl`}>
              {t('heroSection.subtitle')}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-white/90 rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-md mb-2">
              <span className="text-[#86C166] text-xs font-medium">{t('priceOverviewSection.springOffer.saveText')}</span>
              <span className="text-[#86C166] text-2xl font-bold">{t('priceOverviewSection.springOffer.saveAmount')}</span>
            </div>
            <span className="text-white text-xs">{t('priceOverviewSection.springOffer.limitedTime')}</span>
          </div>
        </div>
      </div>
      
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
          {activePackages.map((pkg, index) => (
            <ElegantPricePackageCard
              key={index}
              title={pkg.title}
              description={pkg.description}
              prices={pkg.prices}
              features={pkg.features}
              index={index}
              hoverPackage={hoverPackage}
              setHoverPackage={setHoverPackage}
              packageIncludes={t('priceOverviewSection.packageIncludes')}
            />
          ))}
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
            {additionalOptions.map((option, index) => (
              <ElegantPriceOptionCard
                key={index}
                title={option.title}
                price={option.price}
                description={option.description}
                index={index}
                hoverOption={hoverOption}
                setHoverOption={setHoverOption}
              />
            ))}
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
                <span className={`relative flex items-center ${textStyle.button}`}>
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
