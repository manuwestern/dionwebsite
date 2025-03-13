import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FAQ {
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const { t } = useTranslation('home');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // Create FAQs from translation keys
  const faqs: FAQ[] = Array.from(
    { length: (t('faqSection.faqs', { returnObjects: true }) as any[]).length },
    (_, index) => ({
      question: t(`faqSection.faqs.${index}.question`),
      answer: t(`faqSection.faqs.${index}.answer`)
    })
  );

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="bg-gray-50 py-16 md:py-24">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light mb-3 md:text-5xl md:mb-4">{t('faqSection.title')}</h2>
          <p className="text-base text-gray-600 font-light md:text-xl">
            {t('faqSection.subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full text-left p-5 rounded-lg flex justify-between items-center transition-all duration-300 ${
                  openFAQ === index
                    ? 'bg-[#333333] text-white shadow-md'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                <span className="font-light text-lg">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 transition-transform duration-300 ${
                    openFAQ === index ? 'transform rotate-180' : ''
                  }`} 
                />
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 rounded-b-lg bg-white shadow-md ${
                  openFAQ === index 
                    ? 'max-h-[500px] opacity-100 p-5 mt-1' 
                    : 'max-h-0 opacity-0 p-0'
                }`}
              >
                <p className="text-gray-600 font-light">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
