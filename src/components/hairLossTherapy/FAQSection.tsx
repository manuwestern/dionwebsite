import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Search, Clock, Stethoscope, HelpCircle, DollarSign, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, tracking, lineHeight } from '../../utils/typography';
import { buttonStyle, buttonRippleClass, buttonArrowClass } from '../../utils/buttons';
import StructuredData from '../../components/seo/StructuredData';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

// FAQ categories with icons - ensuring consistent sizing
const getCategoryIcons = () => ({
  general: { icon: <Stethoscope strokeWidth={1.5} /> },
  procedure: { icon: <Stethoscope strokeWidth={1.5} /> },
  recovery: { icon: <Clock strokeWidth={1.5} /> },
  results: { icon: <HelpCircle strokeWidth={1.5} /> },
  costs: { icon: <DollarSign strokeWidth={1.5} /> }
});

const FAQSection: React.FC = () => {
  const { t } = useTranslation(['hairLossTherapy', 'common']);
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Trigger entrance animations
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Create FAQs from translation keys with categories from JSON
  const faqs: FAQ[] = Array.from(
    { length: (t('faqSection.faqs', { returnObjects: true }) as any[]).length },
    (_, index) => ({
      question: t(`faqSection.faqs.${index}.question`),
      answer: t(`faqSection.faqs.${index}.answer`),
      category: t(`faqSection.faqs.${index}.category`, { defaultValue: 'general' })
    })
  );

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Filter FAQs based on search term and active category
  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === null || faq.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Add Schema.org structured data for FAQs */}
      <StructuredData 
        type="FAQPage"
        data={{
          questions: filteredFAQs.map(faq => ({
            question: faq.question,
            answer: faq.answer
          }))
        }}
      />
      {/* Decorative elements */}
      <div className="absolute -z-10 w-full h-full inset-0 bg-gradient-to-b from-white via-gray-50 to-white"></div>
      <div className="absolute -z-10 w-[800px] h-[800px] rounded-full bg-[#7BA7C2]/5 -top-[400px] -right-[400px] blur-3xl"></div>
      <div className="absolute -z-10 w-[600px] h-[600px] rounded-full bg-[#7BA7C2]/5 -bottom-[300px] -left-[300px] blur-3xl"></div>
      
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] z-0" 
        style={{ 
          backgroundImage: 'url("/images/dionhairclinic_bg.svg")',
          backgroundSize: '200px',
          backgroundRepeat: 'repeat'
        }}
      ></div>
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header with elegant design */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4 relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-[#7BA7C2]/10 blur-xl"></div>
            <h2 className={`${textStyle.sectionTitle}`} lang="de">{t('faqSection.title')}</h2>
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[350px] mt-3 mx-auto`}></div>
          </div>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-4`}>
            {t('faqSection.subtitle')}
          </p>
        </div>

        {/* Search and filter with elegant design */}
        <div className={`w-full mb-12 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative mb-8">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-[#7BA7C2]" />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7BA7C2] focus:border-transparent transition-all duration-300"
              placeholder={t('faq.searchPlaceholder', { ns: 'common' })}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-0 -z-10 rounded-xl bg-[#7BA7C2]/5 blur-sm"></div>
          </div>
          
          {/* Category filters with elegant design */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-6 py-3 rounded-xl ${fontSize.sm} ${fontWeight.light} transition-all duration-300 ${
                activeCategory === null
                  ? 'bg-gradient-to-r from-[#7BA7C2] to-[#5A8BA6] text-white shadow-md transform -translate-y-1'
                  : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:shadow-md border border-gray-100'
              }`}
            >
              {t('faq.allQuestions', { ns: 'common' })}
            </button>
            {Object.entries(getCategoryIcons()).map(([key, { icon }]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-6 py-3 rounded-xl ${fontSize.sm} ${fontWeight.light} transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === key
                    ? 'bg-gradient-to-r from-[#7BA7C2] to-[#5A8BA6] text-white shadow-md transform -translate-y-1'
                    : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:shadow-md border border-gray-100'
                }`}
              >
                {t(`faq.categories.${key}`, { ns: 'common' })}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion with elegant design */}
        <div className={`w-full transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {filteredFAQs.length > 0 ? (
            <div className="space-y-5">
              {filteredFAQs.map((faq, index) => (
                <div 
                  key={index} 
                  className="relative group"
                >
                  {/* Card with glass morphism effect */}
                  <div className={`relative bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-md transition-all duration-500 border border-gray-100/80 ${
                    openFAQ === index 
                      ? 'shadow-lg border-[#7BA7C2]/30' 
                      : 'hover:shadow-lg hover:border-[#7BA7C2]/20'
                  }`}>
                    {/* Question button */}
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center transition-all duration-300"
                      aria-controls={`faq-answer-${index}`}
                    >
                      {/* Mobile layout: Icon on top, question below, centered */}
                      <div className="flex flex-col sm:flex-row items-center text-center sm:text-left w-full sm:w-auto">
                        {/* Question text - centered on mobile */}
                        <span className={`${fontSize.base} ${fontWeight.normal} ${textColor.dark} text-center sm:text-left`}>
                          {faq.question}
                        </span>
                      </div>
                      
                      {/* Chevron icon - below question on mobile */}
                      <div className={`min-w-8 min-h-8 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 mt-4 sm:mt-0 ${
                        openFAQ === index 
                          ? 'bg-[#7BA7C2] text-white rotate-180' 
                          : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                      }`}>
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </button>
                    
                    {/* Divider */}
                    <div className={`border-t border-gray-100 ${openFAQ === index ? 'opacity-100' : 'opacity-0'}`}></div>
                    
                    {/* Answer content */}
                    <div 
                      id={`faq-answer-${index}`}
                      className={`overflow-hidden transition-all duration-500 ${
                        openFAQ === index 
                          ? 'max-h-[500px] opacity-100' 
                          : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="p-6 pt-4">
                        <p className={`${fontSize.base} ${textColor.medium} ${fontWeight.light} ${lineHeight.relaxed} text-center md:text-left`}>
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className={`absolute -z-10 w-full h-full rounded-2xl bg-[#7BA7C2]/10 top-2 left-2 transition-all duration-500 ${
                    openFAQ === index ? 'opacity-70' : 'opacity-0 group-hover:opacity-30'
                  }`}></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-10 text-center shadow-md border border-gray-100">
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-[#7BA7C2]/5 -mr-20 -mt-20 blur-xl"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-[#7BA7C2]/10 flex items-center justify-center mx-auto mb-4">
                  <div className="flex items-center justify-center w-8 h-8">
                    <HelpCircle className="w-full h-full text-[#7BA7C2]" />
                  </div>
                </div>
                <h3 className={`${fontSize.h4} ${fontWeight.light} ${textColor.dark} mb-2`}>{t('faq.noResults.title', { ns: 'common' })}</h3>
                <p className={`${textColor.medium} ${fontWeight.light}`}>{t('faq.noResults.description', { ns: 'common' })}</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Still have questions with elegant design */}
        <div className={`w-full mt-16 relative transition-all duration-1000 delay-600 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#7BA7C2]/5 -mr-32 -mt-32 blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#7BA7C2]/5 -ml-32 -mb-32 blur-xl"></div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div className="md:w-2/3">
                <h3 className={`${textStyle.primaryHeading} mb-4 text-center md:text-left`}>{t('faq.moreQuestions.title', { ns: 'common' })}</h3>
                <p className={`${textStyle.bodyText} text-center md:text-left px-2 md:px-0`}>
                  {t('faq.moreQuestions.description', { ns: 'common' })}
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center md:justify-end">
                <Link to="/kontakt" className={`${buttonStyle.primary} shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]`}>
                  <span className={buttonRippleClass}></span>
                  <span className={`relative flex items-center ${textStyle.button} uppercase tracking-widest`}>
                    {t('buttons.consultation', { ns: 'common' })}
                    <ArrowRight className={`${buttonArrowClass} ml-2`} />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
