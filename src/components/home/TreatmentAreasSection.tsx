import React from 'react';
import { useTranslation } from 'react-i18next';

const TreatmentAreasSection: React.FC = () => {
  const { t } = useTranslation(['home', 'common']);

  // Treatment areas data with images
  const treatmentAreas = [
    {
      id: 'beard',
      imageUrl: 'https://images.unsplash.com/photo-1621607512022-6aecc4fed814?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      titleKey: 'treatmentAreasSection.areas.1.title',
      descriptionKey: 'treatmentAreasSection.areas.1.description',
      altText: 'Barthaartransplantation in der Dion Hair Clinic - Verdichtung und Neugestaltung des Bartwuchses für einen volleren Bart'
    },
    {
      id: 'head',
      imageUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      titleKey: 'treatmentAreasSection.areas.0.title',
      descriptionKey: 'treatmentAreasSection.areas.0.description',
      altText: 'Haartransplantation in Mönchengladbach - Wiederherstellung des Haupthaars mit modernsten FUE und DHI Techniken'
    },
    {
      id: 'eyebrows',
      imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      titleKey: 'treatmentAreasSection.areas.2.title',
      descriptionKey: 'treatmentAreasSection.areas.2.description',
      altText: 'Augenbrauentransplantation bei Dion Hair Clinic - Wiederherstellung oder Verdichtung der Augenbrauen für einen ausdrucksstarken Blick'
    },
    {
      id: 'hairloss',
      imageUrl: 'https://images.unsplash.com/photo-1626954079673-f3c3a7a5af61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      titleKey: 'treatmentAreasSection.areas.3.title',
      descriptionKey: 'treatmentAreasSection.areas.3.description',
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
          {treatmentAreas.map((area) => (
            <div key={area.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105 md:rounded-3xl md:flex md:flex-col">
              <div className="h-48 overflow-hidden md:h-80">
                <img
                  src={area.imageUrl}
                  alt={area.altText}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-center md:p-8 md:flex md:flex-col md:flex-grow">
                <div className="md:flex-grow">
                  <h3 className="text-lg font-light mb-3 md:text-2xl md:mb-4">{t(area.titleKey)}</h3>
                  <p className="text-gray-600 mb-4 font-light md:mb-6">
                    {t(area.descriptionKey)}
                  </p>
                </div>
                <div className="md:mt-auto">
                  <button className="w-3/4 bg-[#333333] text-white px-6 py-3 rounded-lg hover:bg-[#444444] transition-colors text-sm font-light tracking-wider md:w-auto">
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
