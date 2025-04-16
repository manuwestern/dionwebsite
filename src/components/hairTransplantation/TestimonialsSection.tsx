import React from 'react';
import TestimonialsSectionComponent from '../common/TestimonialsSectionComponent';

const TestimonialsSection: React.FC = () => {
  // Before/After image pairs
  const beforeAfterPairs = [
    { 
      before: '/images/Haartransplantation_vorher_1.webp', 
      after: '/images/Haartransplantation_nachher_1.webp',
      beforeAlt: 'Vor der Haartransplantation - Patient mit Haarausfall vor der Behandlung',
      afterAlt: 'Nach der Haartransplantation - Erfolgreiche Behandlung mit sichtbaren Ergebnissen'
    },
    { 
      before: '/images/Haartransplantation_vorher_2.webp', 
      after: '/images/Haartransplantation_nachher_2.webp',
      beforeAlt: 'Vor der Haartransplantation - Patient mit fortgeschrittenem Haarausfall',
      afterAlt: 'Nach der Haartransplantation - Deutlich verbessertes Erscheinungsbild mit natürlichem Haaransatz'
    },
    { 
      before: '/images/Haartransplantation_vorher_3.webp', 
      after: '/images/Haartransplantation_nachher_3.webp',
      beforeAlt: 'Vor der Haartransplantation - Patient mit lichtem Haar im Scheitelbereich',
      afterAlt: 'Nach der Haartransplantation - Volleres Haar mit natürlicher Dichte'
    }
  ];

  return (
    <TestimonialsSectionComponent
      translationNamespace="hairTransplantation"
      beforeAfterPairs={beforeAfterPairs}
      ctaLink="/kontakt"
      showTestimonials={false}
    />
  );
};

export default TestimonialsSection;
