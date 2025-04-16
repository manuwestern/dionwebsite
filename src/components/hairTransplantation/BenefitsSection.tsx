import React from 'react';
import BenefitsSectionComponent from '../common/BenefitsSectionComponent';

const BenefitsSection: React.FC = () => {
  return (
    <BenefitsSectionComponent
      translationNamespace="hairTransplantation"
      showCTA={true}
      ctaLink="/kontakt"
    />
  );
};

export default BenefitsSection;
