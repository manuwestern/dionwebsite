import React from 'react';
import TestimonialsSectionComponent from '../common/TestimonialsSection';

const TestimonialsSection: React.FC = () => {
  // Before/After image pairs
  const beforeAfterPairs = [
    { 
      before: '/images/Bart_undicht.webp', 
      after: '/images/Bart_komplett.webp',
      beforeAlt: 'Vor der Barthaartransplantation - Patient mit lückigem Bartwuchs vor der Behandlung',
      afterAlt: 'Nach der Barthaartransplantation - Erfolgreiche Behandlung mit vollem Bartwuchs'
    },
    { 
      before: '/images/Bart_Lücken.webp', 
      after: '/images/Bart_Kontur.webp',
      beforeAlt: 'Vor der Barthaartransplantation - Patient mit ungleichmäßigem Bartwuchs',
      afterAlt: 'Nach der Barthaartransplantation - Gleichmäßiger, definierter Bartwuchs mit klarer Kontur'
    },
    { 
      before: '/images/Bart_undicht.webp', 
      after: '/images/Bart_komplett.webp',
      beforeAlt: 'Vor der Barthaartransplantation - Patient mit spärlichem Bartwuchs',
      afterAlt: 'Nach der Barthaartransplantation - Vollständiger, dichter Bart'
    }
  ];

  return (
    <TestimonialsSectionComponent
      translationNamespace="beardTransplantation"
      beforeAfterPairs={beforeAfterPairs}
      ctaLink="/kontakt"
      showTestimonials={false}
    />
  );
};

export default TestimonialsSection;
