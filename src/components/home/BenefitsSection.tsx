import React from 'react';
import BenefitsSectionComponent from '../common/BenefitsSectionComponent';

const BenefitsSection: React.FC = () => {
  return (
    <BenefitsSectionComponent
      translationNamespace="home"
      showCTA={false}
    />
  );
};

export default BenefitsSection;
