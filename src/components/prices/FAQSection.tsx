import React from 'react';
import FAQAccordionSection from '../common/FAQAccordionSection';

const FAQSection: React.FC = () => {
  return (
    <FAQAccordionSection
      translationNamespace="prices"
      enableSearch={false}
      enableCategoryFilters={false}
      initialOpenFaqIndex={null}
    />
  );
};

export default FAQSection;
