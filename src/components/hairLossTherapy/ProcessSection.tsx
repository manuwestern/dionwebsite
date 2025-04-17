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

  // Custom card heights for this specific page - larger heights for hair loss therapy content
  const cardMinHeight = "500px";  // Minimum height on mobile
  const cardHeight = "580px";     // Height on desktop
  const contentMinHeight = "220px"; // Content area minimum height
  const contentHeight = "280px";   // Content area height on desktop

  return (
    <ProcessStepsSection
      translationNamespace="hairLossTherapy"
      stepImages={stepImages}
      imageAltTemplate="{title} - Haarausfalltherapie Prozess Schritt {number}"
      objectFit="cover"
      // Pass custom card heights
      cardMinHeight={cardMinHeight}
      cardHeight={cardHeight}
      contentMinHeight={contentMinHeight}
      contentHeight={contentHeight}
    />
  );
};

export default ProcessSection;
