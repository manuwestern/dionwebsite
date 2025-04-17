import React from 'react';
import ProcessStepsSection from '../common/ProcessStepsSection';

const ProcessSection: React.FC = () => {
  // Images for each step
  const stepImages = [
    "/images/haaranalyse.webp",
    "/images/mesotherapie.webp",
    "/images/hairselection.webp",
    "/images/frau_lichter_scheitel.webp"
  ];

  return (
    <ProcessStepsSection
      translationNamespace="hairLossTherapy"
      stepImages={stepImages}
      imageAltTemplate="{title} - Haarausfalltherapie Prozess Schritt {number}"
      objectFit="cover"
    />
  );
};

export default ProcessSection;
