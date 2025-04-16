import React from 'react';
import FAQAccordionSection, { CategoryIcon } from '../common/FAQAccordionSection';
import { User, Scissors, HelpCircle, Droplet, Stethoscope } from 'lucide-react';

const FAQSection: React.FC = () => {
  // Define category icons for the home page
  const categoryIcons: CategoryIcon[] = [
    { key: 'general', icon: <Stethoscope strokeWidth={1.5} /> },
    { key: 'hair', icon: <User strokeWidth={1.5} /> },
    { key: 'beard', icon: <Scissors strokeWidth={1.5} /> },
    { key: 'eyebrows', icon: <HelpCircle strokeWidth={1.5} /> },
    { key: 'therapy', icon: <Droplet strokeWidth={1.5} /> }
  ];

  return (
    <FAQAccordionSection
      translationNamespace="home"
      additionalNamespaces={[
        'hairTransplantation',
        'beardTransplantation',
        'eyebrowTransplantation',
        'hairLossTherapy'
      ]}
      categoryIcons={categoryIcons}
      sectionId="faq-section"
      maxFaqsPerNamespace={3}
      enableSearch={true}
      enableCategoryFilters={true}
      initialOpenFaqIndex={0}
    />
  );
};

export default FAQSection;
