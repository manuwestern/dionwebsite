import React from 'react';
import BenefitsSectionComponent from '../common/BenefitsSection';

const BenefitsSection: React.FC = () => {
  return (
    <BenefitsSectionComponent
      translationNamespace="hairTransplantation"
      showCTA={false}
      ctaLink="/kontakt"
    />
  );
};

export default BenefitsSection;
