import React, { useState, useEffect } from 'react';
import { ChevronDown, Search, Stethoscope, HelpCircle, Clock, DollarSign, User, Scissors, Droplet } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, lineHeight } from '../../utils/typography';
import StructuredData from '../seo/StructuredData';
import CTASection from './elements/CTASection';

export interface FAQ {
  question: string;
  answer: string;
  category: string;
  source?: string;
}

export interface CategoryIcon {
  key: string;
  icon: React.ReactNode;
}

export interface FAQAccordionSectionProps {
  // Required props
  translationNamespace: string;
  
  // Optional props
  additionalNamespaces?: string[];
  categoryIcons?: CategoryIcon[];
  sectionId?: string;
  maxFaqsPerNamespace?: number;
  enableSearch?: boolean;
  enableCategoryFilters?: boolean;
  initialOpenFaqIndex?: number | null;
}

// Default category icons
const defaultCategoryIcons: CategoryIcon[] = [
  { key: 'general', icon: <Stethoscope strokeWidth={1.5} /> },
  { key: 'procedure', icon: <Stethoscope strokeWidth={1.5} /> },
  { key: 'recovery', icon: <Clock strokeWidth={1.5} /> },
  { key: 'results', icon: <HelpCircle strokeWidth={1.5} /> },
  { key: 'costs', icon: <DollarSign strokeWidth={1.5} /> },
  { key: 'hair', icon: <User strokeWidth={1.5} /> },
  { key: 'beard', icon: <Scissors strokeWidth={1.5} /> },
  { key: 'eyebrows', icon: <HelpCircle strokeWidth={1.5} /> },
  { key: 'therapy', icon: <Droplet strokeWidth={1.5} /> },
  { key: 'aftercare', icon: <Clock strokeWidth={1.5} /> }
];

const FAQAccordionSection: React.FC<FAQAccordionSectionProps> = ({
  // Required props
  translationNamespace,
  
  // Optional props with defaults
  additionalNamespaces = [],
  categoryIcons = defaultCategoryIcons,
  sectionId = "faq-section",
  maxFaqsPerNamespace = 0, // 0 means no limit
  enableSearch = true,
  enableCategoryFilters = true,
  initialOpenFaqIndex = 0
}) => {
  const { t, i18n } = useTranslation([translationNamespace, 'common', ...additionalNamespaces]);
  const [openFAQ, setOpenFAQ] = useState<number | null>(initialOpenFaqIndex);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Trigger entrance animations
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Reset state when language changes
  useEffect(() => {
    setOpenFAQ(initialOpenFaqIndex);
    setSearchTerm('');
    setActiveCategory(null);
  }, [i18n.language, initialOpenFaqIndex]);

  // Get FAQs from main namespace
  const getFaqsFromNamespace = (namespace: string, limit: number = 0): FAQ[] => {
    try {
      const faqsData = t('faqSection.faqs', { returnObjects: true, ns: namespace }) as any[];
      
      if (!Array.isArray(faqsData)) {
        return [];
      }
      
      const faqs = Array.from(
        { length: faqsData.length },
        (_, index) => ({
          question: t(`faqSection.faqs.${index}.question`, { ns: namespace }),
          answer: t(`faqSection.faqs.${index}.answer`, { ns: namespace }),
          category: t(`faqSection.faqs.${index}.category`, { ns: namespace, defaultValue: 'general' }),
          source: namespace
        })
      );
      
      return limit > 0 ? faqs.slice(0, limit) : faqs;
    } catch (error) {
      console.error(`Error getting FAQs from namespace ${namespace}:`, error);
      return [];
    }
  };

  // Get all FAQs from main and additional namespaces
  const getAllFaqs = (): FAQ[] => {
    const mainFaqs = getFaqsFromNamespace(translationNamespace);
    
    // Get FAQs from additional namespaces
    const additionalFaqs = additionalNamespaces.flatMap(namespace => 
      getFaqsFromNamespace(namespace, maxFaqsPerNamespace)
    );
    
    // Combine all FAQs
    const combinedFaqs = [...mainFaqs, ...additionalFaqs];
    
    // Remove duplicates based on question text
    return combinedFaqs.filter((faq, index, self) => 
      index === self.findIndex((f) => f.question === faq.question)
    );
  };

  const faqs = getAllFaqs();

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Filter FAQs based on search term and active category
  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = !enableSearch || searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !enableCategoryFilters || activeCategory === null || faq.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get category icons map
  const getCategoryIconsMap = () => {
    return categoryIcons.reduce((acc, { key, icon }) => {
      acc[key] = { icon };
      return acc;
    }, {} as Record<string, { icon: React.ReactNode }>);
  };

  // Get unique categories from FAQs
  const getUniqueCategories = (): string[] => {
    const categories = faqs.map(faq => faq.category);
    return [...new Set(categories)].filter(category => 
      categoryIcons.some(icon => icon.key === category)
    );
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden" id={sectionId}>
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
        className="absolute inset-0 opacity-[0.03] z-0 bg-[url('/images/dionhairclinic_bg.svg')] bg-[length:200px_200px] bg-repeat"
      ></div>
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header with elegant design */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4 relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-[#7BA7C2]/10 blur-xl"></div>
            <h2 className={`${textStyle.sectionTitle} break-words hyphens-auto`} lang="de">{t('faqSection.title', { ns: translationNamespace })}</h2>
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[350px] mt-3 mx-auto`}></div>
          </div>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-4 break-words hyphens-auto`} lang="de">
            {t('faqSection.subtitle', { ns: translationNamespace })}
          </p>
        </div>

        {/* Search and filter with elegant design */}
        {(enableSearch || enableCategoryFilters) && (
          <div className={`w-full mb-12 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Search input */}
            {enableSearch && (
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
            )}
            
            {/* Category filters */}
            {enableCategoryFilters && (
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
                {getUniqueCategories().map(key => (
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
            )}
          </div>
        )}

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
                        <span className={`${fontSize.base} ${fontWeight.normal} ${textColor.dark} text-center sm:text-left break-words hyphens-auto`} lang="de">
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
                        <p className={`${fontSize.base} ${textColor.medium} ${fontWeight.light} ${lineHeight.relaxed} text-center md:text-left break-words hyphens-auto`} lang="de">
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
                <h3 className={`${fontSize.h4} ${fontWeight.light} ${textColor.dark} mb-2 break-words hyphens-auto`} lang="de">{t('faq.noResults.title', { ns: 'common' })}</h3>
                <p className={`${textColor.medium} ${fontWeight.light} break-words hyphens-auto`} lang="de">{t('faq.noResults.description', { ns: 'common' })}</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Still have questions - using the reusable CTASection component */}
        <div className={`w-full mt-16 transition-all duration-1000 delay-600 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <CTASection 
            translationNamespace="common"
            titleKey="faq.moreQuestions.title"
            descriptionKey="faq.moreQuestions.description"
            ctaTextKey="buttons.consultation"
            ctaLink="/kontakt"
            showAnimation={false}
          />
        </div>
      </div>
    </section>
  );
};

export default FAQAccordionSection;
