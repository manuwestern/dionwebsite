import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, lineHeight } from '../../utils/typography';

interface FAQ {
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const { t } = useTranslation('prices');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // FAQs aus Übersetzungen holen
  const faqs = t('faqSection.faqs', { returnObjects: true }) as FAQ[];

  // FAQ öffnen/schließen
  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -z-10 w-full h-full inset-0 bg-gradient-to-b from-white via-gray-50 to-white"></div>
      <div className="absolute -z-10 w-[800px] h-[800px] rounded-full bg-[#7BA7C2]/5 -top-[400px] -right-[400px] blur-3xl"></div>
      <div className="absolute -z-10 w-[600px] h-[600px] rounded-full bg-[#7BA7C2]/5 -bottom-[300px] -left-[300px] blur-3xl"></div>
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <h2 className={`${textStyle.sectionTitle}`} lang="de">{t('faqSection.title')}</h2>
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[350px] mt-3 mx-auto`}></div>
          </div>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-4`}>
            {t('faqSection.subtitle')}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`mb-4 bg-white rounded-xl shadow-sm border transition-all duration-300 ${
                openFAQ === index 
                  ? 'border-[#7BA7C2]/50 shadow-md' 
                  : 'border-gray-100 hover:border-[#7BA7C2]/30'
              }`}
            >
              {/* Question */}
              <button 
                className="w-full px-6 py-5 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openFAQ === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className={`${fontSize.base} ${fontWeight.medium} ${textColor.dark} pr-4 mb-3 sm:mb-0`}>
                  {faq.question}
                </h3>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  openFAQ === index 
                    ? 'bg-[#7BA7C2] text-white transform rotate-180' 
                    : 'bg-[#7BA7C2]/10 text-[#7BA7C2]'
                }`}>
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>
              
              {/* Answer */}
              <div 
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openFAQ === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-5">
                  <div className={`w-full h-px ${gradientUnderline.light} mb-4`}></div>
                  <p className={`${fontSize.base} ${textColor.medium} ${fontWeight.light} ${lineHeight.relaxed} text-center sm:text-left`}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
