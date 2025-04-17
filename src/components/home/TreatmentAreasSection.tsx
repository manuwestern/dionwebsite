import React from 'react';
import CommonTreatmentAreasSection from '../common/TreatmentAreasSection';

const TreatmentAreasSection: React.FC = () => {
  return (
    <CommonTreatmentAreasSection 
      translationNamespace="home"
      backgroundColor="from-[#7BA7C2]/5 via-[#7BA7C2]/10 to-[#7BA7C2]/5"
      accentColor="bg-[#7BA7C2]"
      sectionId="treatment-areas-section"
    />
  );
};

export default TreatmentAreasSection;
