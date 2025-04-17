import React from 'react';
import BenefitsSectionComponent from '../common/BenefitsSection';

const BenefitsSection: React.FC = () => {
  return (
    <BenefitsSectionComponent
      translationNamespace="beardTransplantation"
      showCTA={false}
      ctaLink="/kontakt"
    />
  );
};

export default BenefitsSection;
