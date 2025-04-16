import React from 'react';
import BenefitsSectionComponent from '../common/BenefitsSection';

const BenefitsSection: React.FC = () => {
  return (
    <BenefitsSectionComponent
      translationNamespace="hairLossTherapy"
      showCTA={true}
      ctaLink="/kontakt"
    />
  );
};

export default BenefitsSection;
