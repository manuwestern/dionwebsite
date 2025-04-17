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

  // Custom card heights for this specific page - medium heights for beard content
  const cardMinHeight = "450px";  // Minimum height on mobile
  const cardHeight = "520px";     // Height on desktop
  const contentMinHeight = "480px"; // Content area minimum height
  const contentHeight = "480px";   // Content area height on desktop

  return (
    <ProcessStepsSection
      translationNamespace="hairTransplantation"
      stepImages={stepImages}
      imageAltTemplate="{title} - Haartransplantation Prozess Schritt {number}"
      objectFit="contain"
      // Pass custom card heights
      cardMinHeight={cardMinHeight}
      cardHeight={cardHeight}
      contentMinHeight={contentMinHeight}
      contentHeight={contentHeight}
    />
  );
};

export default ProcessSection;
