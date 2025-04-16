import React from 'react';
import ProcessStepsSection from '../common/ProcessStepsSection';

const ProcessSection: React.FC = () => {
  // Images for each step
  const stepImages = [
    "/images/Augenbrauentransplantation_Planung.svg",
    "/images/Augenbrauentransplantation_Entnahme.svg",
    "/images/Augenbrauentransplantation_Einpflanzung.svg",
    "/images/Augenbrauentransplantation_Endergebnis.svg"
  ];

  return (
    <ProcessStepsSection
      translationNamespace="eyebrowTransplantation"
      stepImages={stepImages}
      imageAltTemplate="{title} - Augenbrauentransplantation Prozess Schritt {number}"
      objectFit="contain"
    />
  );
};

export default ProcessSection;
