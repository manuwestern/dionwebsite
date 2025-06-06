import React from 'react';
import FAQAccordionSection, { CategoryIcon } from '../common/FAQAccordionSection';
import { Clock, Stethoscope, HelpCircle, DollarSign } from 'lucide-react';

const FAQSection: React.FC = () => {
  // Define category icons for beard transplantation
  const categoryIcons: CategoryIcon[] = [
    { key: 'general', icon: <Stethoscope strokeWidth={1.5} /> },
    { key: 'procedure', icon: <Stethoscope strokeWidth={1.5} /> },
    { key: 'recovery', icon: <Clock strokeWidth={1.5} /> },
    { key: 'results', icon: <HelpCircle strokeWidth={1.5} /> },
    { key: 'costs', icon: <DollarSign strokeWidth={1.5} /> }
  ];

  return (
    <FAQAccordionSection
      translationNamespace="beardTransplantation"
      categoryIcons={categoryIcons}
      initialOpenFaqIndex={0}
    />
  );
};

export default FAQSection;
