import React from 'react';
import ProcessStepsSection from '../common/ProcessStepsSection';

const ProcessSection: React.FC = () => {
  // Images for each step
  const stepImages = [
    "/images/Haartransplantation_Planung.svg",
    "/images/Haartransplantation_Entnahme.svg",
    "/images/Haartransplantation_Einpflanzung.svg",
    "/images/Haartransplantation_Endergebnis.svg"
  ];

  return (
    <ProcessStepsSection
      translationNamespace="hairTransplantation"
      stepImages={stepImages}
      imageAltTemplate="{title} - Haartransplantation Prozess Schritt {number}"
      objectFit="contain"
    />
  );
};

export default ProcessSection;
