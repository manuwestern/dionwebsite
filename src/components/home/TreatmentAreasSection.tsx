import React from 'react';
import { useTranslation } from 'react-i18next';

const TreatmentAreasSection: React.FC = () => {
  const { t } = useTranslation(['home', 'common']);

  // Treatment areas data with images and custom descriptions for mobile view
  const treatmentAreas = [
    {
      id: 'beard',
      imageUrl: '/images/Behandlung_Barthaartransplantation.webp',
      titleKey: 'treatmentAreasSection.areas.1.title',
      descriptionKey: 'treatmentAreasSection.areas.1.description',
      mobileDescription: 'Wünschen Sie sich einen volleren Bart ohne Lücken?',
      altText: 'Barthaartransplantation in der Dion Hair Clinic - Verdichtung und Neugestaltung des Bartwuchses für einen volleren Bart'
    },
    {
      id: 'head',
      imageUrl: '/images/Behandlung_Haartransplantation.webp',
      titleKey: 'treatmentAreasSection.areas.0.title',
      descriptionKey: 'treatmentAreasSection.areas.0.description',
      mobileDescription: 'Leiden Sie unter kahlen Stellen oder Geheimratsecken?',
      altText: 'Haartransplantation in Mönchengladbach - Wiederherstellung des Haupthaars mit modernsten FUE und DHI Techniken'
    },
    {
      id: 'eyebrows',
      imageUrl: '/images/Behandlung_Augenbrauentransplantation.webp',
      titleKey: 'treatmentAreasSection.areas.2.title',
      descriptionKey: 'treatmentAreasSection.areas.2.description',
      mobileDescription: 'Möchten Sie ausdrucksstarke, volle Augenbrauen?',
      altText: 'Augenbrauentransplantation bei Dion Hair Clinic - Wiederherstellung oder Verdichtung der Augenbrauen für einen ausdrucksstarken Blick'
    },
    {
      id: 'hairloss',
      imageUrl: 'https://images.unsplash.com/photo-1626954079673-f3c3a7a5af61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      titleKey: 'treatmentAreasSection.areas.3.title',
      descriptionKey: 'treatmentAreasSection.areas.3.description',
      mobileDescription: 'Suchen Sie nach nicht-chirurgischen Lösungen gegen Haarausfall?',
      altText: 'Haarausfalltherapie in der Dion Hair Clinic - Nicht-chirurgische Behandlungen zur Vorbeugung und Behandlung von Haarausfall'
    }
  ];

  return (
    <div className="bg-white py-8 md:py-20">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl font-light mb-3 md:text-5xl md:mb-4">{t('treatmentAreasSection.title')}</h2>
          <p className="text-base text-gray-600 font-light md:text-xl">
            {t('treatmentAreasSection.subtitle')}
          </p>
        </div>

        {/* Mobile View */}
        <div className="md:hidden flex flex-col items-center gap-8">
          {treatmentAreas.map((area) => (
            <div key={area.id} className="bg-white rounded-3xl shadow-lg overflow-hidden w-[85%] max-w-[320px]">
              {/* Square image container */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={area.imageUrl}
                  alt={area.altText}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-medium mb-3">{t(area.titleKey)}</h3>
                <p className="text-gray-700 mb-6 font-light">
                  {area.mobileDescription}
                </p>
                <button className="w-full bg-[#333333] text-white px-6 py-3 rounded-lg hover:bg-[#444444] transition-colors text-sm font-medium tracking-wider">
                  {t('buttons.moreInfo', { ns: 'common' })}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8">
          {treatmentAreas.map((area) => (
            <div key={area.id} className="bg-white rounded-3xl shadow-lg overflow-hidden transition-transform hover:scale-105 flex flex-col">
              <div className="h-64 lg:h-80 overflow-hidden">
                <img
                  src={area.imageUrl}
                  alt={area.altText}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6 lg:p-8 flex flex-col flex-grow">
                <div className="flex-grow">
                  <h3 className="text-xl lg:text-2xl font-medium mb-3 lg:mb-4">{t(area.titleKey)}</h3>
                  <p className="text-gray-600 mb-6 font-light">
                    {t(area.descriptionKey)}
                  </p>
                </div>
                <div className="mt-auto">
                  <button className="w-full lg:w-auto bg-[#333333] text-white px-6 py-3 rounded-lg hover:bg-[#444444] transition-colors text-sm font-medium tracking-wider">
                    {t('buttons.moreInfo', { ns: 'common' })}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TreatmentAreasSection;
