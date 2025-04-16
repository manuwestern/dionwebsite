import React from 'react';
import TestimonialsSectionComponent from '../common/TestimonialsSectionComponent';

const TestimonialsSection: React.FC = () => {
  // Before/After image pairs
  const beforeAfterPairs = [
    { 
      before: '/images/Augenbrauen_kahl.webp', 
      after: '/images/Augenbrauen_Model.webp',
      beforeAlt: 'Vor der Augenbrauentransplantation - Patientin mit fehlenden Augenbrauen',
      afterAlt: 'Nach der Augenbrauentransplantation - Natürlich aussehende, volle Augenbrauen'
    },
    { 
      before: '/images/Augenbrauen_undicht.webp', 
      after: '/images/Augenbrauen_Model.webp',
      beforeAlt: 'Vor der Augenbrauentransplantation - Patientin mit dünnen, lückenhaften Augenbrauen',
      afterAlt: 'Nach der Augenbrauentransplantation - Dichte, ausdrucksstarke Augenbrauen'
    },
    { 
      before: '/images/Augenbrauen_Microblading.webp', 
      after: '/images/Augenbrauen_Model.webp',
      beforeAlt: 'Vor der Augenbrauentransplantation - Patientin mit Microblading-Augenbrauen',
      afterAlt: 'Nach der Augenbrauentransplantation - Natürliche Augenbrauen mit echten Haaren'
    }
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
