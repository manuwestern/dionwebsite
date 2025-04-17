import React from 'react';
import CTASection from '../common/elements/CTASection';

const KnowledgeCTASection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute -z-10 w-full h-full inset-0 bg-gradient-to-b from-white via-gray-50 to-white"></div>
      <div className="absolute -z-10 w-[800px] h-[800px] rounded-full bg-[#7BA7C2]/5 -top-[400px] -left-[400px] blur-3xl"></div>
      <div className="absolute -z-10 w-[600px] h-[600px] rounded-full bg-[#7BA7C2]/5 -bottom-[300px] -right-[300px] blur-3xl"></div>

      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        <CTASection 
          translationNamespace="knowledge"
          titleKey="ctaSection.title"
          descriptionKey="ctaSection.description"
          ctaTextKey="buttons.consultation"
          ctaLink="/kontakt"
        />
      </div>
    </section>
  );
};

export default KnowledgeCTASection;
