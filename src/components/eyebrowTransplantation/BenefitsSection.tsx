import React from 'react';
import BenefitsSectionComponent from '../common/BenefitsSection';

const BenefitsSection: React.FC = () => {
  return (
    <BenefitsSectionComponent
      translationNamespace="eyebrowTransplantation"
      showCTA={true}
      ctaLink="/kontakt"
    />
  );
};

export default BenefitsSection;
