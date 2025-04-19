import React from 'react';
import TestimonialsSectionComponent from '../common/TestimonialsSection';

const TestimonialsSection: React.FC = () => {
  // Before/After image pairs
  const beforeAfterPairs = [
    { 
      before: '/images/Augenbrauentransplantation_Vorher_1.webp', 
      after: '/images/Augenbrauentransplantation_Nachher_1.webp',
      beforeAlt: 'Vor der Augenbrauentransplantation - Patient mit dünnen, lückenhaften Augenbrauen',
      afterAlt: 'Nach der Augenbrauentransplantation - Natürlich aussehende, volle Augenbrauen'
    },
    { 
      before: '/images/Augenbrauentransplantation_Vorher_2.webp', 
      after: '/images/Augenbrauentransplantation_Nachher_2.webp',
      beforeAlt: 'Vor der Augenbrauentransplantation - Patient mit ungleichmäßigen Augenbrauen',
      afterAlt: 'Nach der Augenbrauentransplantation - Symmetrische, ausdrucksstarke Augenbrauen'
  ];

  return (
    <TestimonialsSectionComponent
      translationNamespace="eyebrowTransplantation"
      beforeAfterPairs={beforeAfterPairs}
      ctaLink="/kontakt"
      showTestimonials={false}
    />
  );
};

export default TestimonialsSection;
