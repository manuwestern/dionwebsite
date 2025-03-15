import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * TreatmentAreasSection Component
 * 
 * Displays treatment areas offered by the clinic in a responsive grid layout.
 * Shows different layouts for mobile and desktop views.
 */
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
    // Main section container with background and padding
    <div className="bg-white py-8 md:py-20">
      {/* Content container with max width and horizontal padding */}
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Section header with title and subtitle */}
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl font-light mb-3 md:text-5xl md:mb-4">{t('treatmentAreasSection.title')}</h2>
          <p className="text-base text-gray-600 font-light md:text-xl">
            {t('treatmentAreasSection.subtitle')}
          </p>
        </div>

        {/* Mobile View - Only visible on small screens (hidden on md and up) */}
        <div className="md:hidden flex flex-col items-center gap-8">
          {treatmentAreas.map((area) => (
            // Treatment area card - white card with rounded corners and shadow
            <div key={area.id} className="bg-white rounded-3xl shadow-lg overflow-hidden w-[95%] max-w-[360px]">
              {/* Image container - square aspect ratio */}
              <div className="overflow-hidden">
                {/* Treatment area image */}
                <img
                  src={area.imageUrl}
                  alt={area.altText}
                  className="w-full h-full object-contain"
                />
              </div>
              {/* Text content container */}
              <div className="p-4 text-center">
                {/* Treatment area title */}
                <h3 className="text-xl font-light mb-2">{t(area.titleKey)}</h3>
                {/* Treatment area description */}
                <p className="text-gray-600 mb-4 font-light md:mb-2">
                  {area.mobileDescription}
                </p>
                {/* "More Info" button */}
                <button className="w-3/4 bg-[#333333] text-white px-1 py-2 rounded-lg hover:bg-[#444444] transition-colors text-sm font-light tracking-wider mb-5">
                  {t('buttons.moreInfo', { ns: 'common' })}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View - Hidden on small screens, grid layout on medium and up */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8">
          {treatmentAreas.map((area) => (
            // Treatment area card - white card with rounded corners and shadow
            <div key={area.id} className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105 md:rounded-3xl md:flex md:flex-col">
              {/* Image container - fixed height */}
              <div className="h-48 overflow-hidden md:h-80">
                {/* Treatment area image */}
                <img
                  src={area.imageUrl}
                  alt={area.altText}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Text content container */}
              <div className="p-4 text-center md:p-8 md:flex md:flex-col md:flex-grow">
                {/* Title and description container */}
                <div className="md:flex-grow">
                  {/* Treatment area title */}
                  <h3 className="text-lg font-light mb-3 md:text-2xl md:mb-4">{t(area.titleKey)}</h3>
                  {/* Treatment area description */}
                  <p className="text-gray-600 mb-4 font-light md:mb-6">
                    {t(area.descriptionKey)}
                  </p>
                </div>
                {/* Button container - pushed to bottom with mt-auto */}
                <div className="md:mt-auto">
                  {/* "More Info" button */}
                  <button className="w-3/4 bg-[#333333] text-white px-8 py-2 rounded-lg hover:bg-[#444444] transition-colors text-sm font-light tracking-wider md:w-auto">
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
