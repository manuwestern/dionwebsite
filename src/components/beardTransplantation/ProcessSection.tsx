import React from 'react';
import ProcessStepsSection from '../common/ProcessStepsSection';

const ProcessSection: React.FC = () => {
  // Images for each step
  const stepImages = [
    "/images/Barthaartransplantation_Planung.svg",
    "/images/Barthaartransplantation_Entnahme.svg",
    "/images/Barthaartransplantation_Einpflanzung.svg",
    "/images/Barthaartransplantation_Endergebnise.svg"
  ];

  return (
    <ProcessStepsSection
      translationNamespace="beardTransplantation"
      stepImages={stepImages}
      imageAltTemplate="{title} - Barthaartransplantation Prozess Schritt {number}"
      objectFit="contain"
    />
  );
};

export default ProcessSection;
