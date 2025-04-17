import React from 'react';
import { useTranslation } from 'react-i18next';
import TreatmentAreasSection, { TreatmentArea } from '../common/TreatmentAreasSection';

/**
 * This is an example component demonstrating how to use the reusable TreatmentAreasSection
 * with custom data and styling for different pages.
 */
const CustomTreatmentAreasExample: React.FC = () => {
  const { t } = useTranslation(['hairTransplantation', 'common']);
  
  // Example of custom treatment areas for a hair transplantation page
  const customTreatmentAreas: TreatmentArea[] = [
    {
      id: 'fue',
      imageUrl: '/images/FUE_Haartransplantation_Schema.svg',
      titleKey: 'FUE Methode',
      descriptionKey: 'Die FUE-Methode ist ein minimal-invasives Verfahren zur Haartransplantation.',
      altText: 'FUE Haartransplantation Schema',
      features: [
        'Keine sichtbaren Narben',
        'Schnelle Heilung',
        'Natürliches Ergebnis'
      ],
      path: '/haartransplantation/fue'
    },
    {
      id: 'dhi',
      imageUrl: '/images/DHI_Haartransplantation_Schema.svg',
      titleKey: 'DHI Methode',
      descriptionKey: 'Die DHI-Methode ermöglicht eine präzise Platzierung der Haarfollikel.',
      altText: 'DHI Haartransplantation Schema',
      features: [
        'Höhere Dichte möglich',
        'Präzise Platzierung',
        'Kürzere Erholungszeit'
      ],
      path: '/haartransplantation/dhi'
    },
    {
      id: 'sapphire',
      imageUrl: '/images/Saphir_Haartransplantation_Schema.svg',
      titleKey: 'Saphir FUE',
      descriptionKey: 'Die Saphir FUE-Methode verwendet spezielle Saphirklingen für präzisere Schnitte.',
      altText: 'Saphir Haartransplantation Schema',
      features: [
        'Weniger Trauma',
        'Schnellere Heilung',
        'Minimale Narbenbildung'
      ],
      path: '/haartransplantation/saphir'
    }
  ];

  return (
    <TreatmentAreasSection 
      title="Transplantationsmethoden"
      subtitle="Wir bieten verschiedene moderne Methoden für Ihre individuelle Haartransplantation an."
      treatmentAreas={customTreatmentAreas}
      backgroundColor="from-[#4A90E2]/5 via-[#4A90E2]/10 to-[#4A90E2]/5"
      accentColor="bg-[#4A90E2]"
      sectionId="transplantation-methods-section"
    />
  );
};

export default CustomTreatmentAreasExample;
