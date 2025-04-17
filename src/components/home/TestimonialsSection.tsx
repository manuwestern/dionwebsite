import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, tracking } from '../../utils/typography';
import OptimizedImage from '../common/elements/OptimizedImage';
import CTASection from '../common/elements/CTASection';

interface Testimonial {
  id: number;
  nameKey: string;
  ageKey: string;
  treatmentKey: string;
  quoteKey: string;
  image: string;
  rating: number;
}

const TestimonialsSection: React.FC = () => {
  const { t } = useTranslation(['home', 'common']);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Trigger entrance animations on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      
      if (sectionRef.current) {
        const elementPosition = sectionRef.current.offsetTop + 200;
        
        if (scrollPosition > elementPosition) {
          setIsVisible(true);
        }
      }
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Images for testimonials - using patient images
  const testimonialImages = [
    "/images/Patient_Michael_K.webp",
    "/images/Patient_Pedro_S.webp",
    "/images/Patient_Kerstin_M.webp"
  ];

  // Create testimonials from translation keys
  const testimonials: Testimonial[] = Array.from(
    { length: (t('testimonialsSection.testimonials', { returnObjects: true }) as any[]).length },
    (_, index) => ({
      id: index + 1,
      nameKey: `testimonialsSection.testimonials.${index}.name`,
      ageKey: `testimonialsSection.testimonials.${index}.age`,
      treatmentKey: `testimonialsSection.testimonials.${index}.treatment`,
      quoteKey: `testimonialsSection.testimonials.${index}.quote`,
      image: testimonialImages[index],
      rating: 5
    })
  );

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const currentTestimonial = testimonials[activeTestimonial];

  return (
    <section 
      ref={sectionRef}
      id="testimonials-section" 
      className="py-20 md:py-28 relative overflow-hidden"
    >
      {/* Background is now provided by the SectionWrapper component */}
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header with elegant design */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6 relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-[#7BA7C2]/10 blur-xl"></div>
            <h2 className={`${textStyle.sectionTitle}`} lang="de">{t('testimonialsSection.title')}</h2>
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[300px] mt-6 mx-auto`}></div>
          </div>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-6`} lang="de">
            {t('testimonialsSection.subtitle')}
          </p>
        </div>

        <div className={`relative w-full mx-auto transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {/* Navigation Arrows */}
          <button 
            onClick={handlePrevTestimonial}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-[#7BA7C2] bg-opacity-80 rounded-full p-2 hover:bg-opacity-100 transition-all shadow-md md:bg-white md:bg-opacity-90 md:p-3 md:shadow-md md:left-0 md:-translate-x-6 md:hover:bg-[#7BA7C2] md:hover:text-white"
            aria-label={t('testimonialsSection.navigation.previous')}
          >
            <ChevronLeft className="w-5 h-5 text-white md:text-gray-700 md:group-hover:text-white" />
          </button>
          
          <button 
            onClick={handleNextTestimonial}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-[#7BA7C2] bg-opacity-80 rounded-full p-2 hover:bg-opacity-100 transition-all shadow-md md:bg-white md:bg-opacity-90 md:p-3 md:shadow-md md:right-0 md:translate-x-6 md:hover:bg-[#7BA7C2] md:hover:text-white"
            aria-label={t('testimonialsSection.navigation.next')}
          >
            <ChevronRight className="w-5 h-5 text-white md:text-gray-700 md:group-hover:text-white" />
          </button>
          
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
            <div className="flex flex-col md:flex-row">
              {/* Patient Image - Left Side */}
              <div className="w-full md:w-2/5 h-[220px] md:h-[400px] relative">
                {/* Image with overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#7BA7C2]/20 to-transparent z-10"></div>
                <OptimizedImage 
                  sources={{
                    webp: currentTestimonial.image,
                    original: currentTestimonial.image.replace('.webp', '.jpg'),
                    width: 800,
                    height: 600
                  }}
                  alt={`Patient ${t(currentTestimonial.nameKey)}`}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                
                {/* Mobile Rating Stars - Only visible on mobile */}
                <div className="absolute top-4 left-4 flex md:hidden z-20">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
              </div>
              
              {/* Testimonial Content - Right Side */}
              <div className="w-full md:w-3/5 p-6 md:p-10 flex flex-col justify-between h-auto md:h-[400px] relative">
                {/* Large quote icon */}
                <div className="absolute top-6 right-6 opacity-5">
                  <Quote className="w-24 h-24 text-[#7BA7C2]" />
                </div>
                
                {/* Desktop Rating Stars - Only visible on desktop */}
                <div className="hidden md:flex mb-6">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                
                {/* Quote */}
                <blockquote className={`${textStyle.quote} mb-8 relative z-10`} lang="de">
                  "{t(currentTestimonial.quoteKey)}"
                </blockquote>
                
                {/* Spacer */}
                <div className="flex-grow"></div>
                
                {/* Patient Info */}
                <div className="mb-2 text-center md:text-left">
                  <h3 className={`text-lg md:${fontSize.h3} ${fontWeight.light} ${textColor.primary} mb-1`}>{t(currentTestimonial.nameKey)}</h3>
                  <p className={`text-xs md:${fontSize.base} ${textColor.medium} ${fontWeight.light}`}>
                    {t(currentTestimonial.ageKey)}, {t(currentTestimonial.treatmentKey)}
                  </p>
                </div>
                
                {/* Pagination Dots */}
                <div className="flex justify-center md:justify-start space-x-2 mt-6">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        index === activeTestimonial ? 'bg-[#7BA7C2] scale-125' : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Gehe zu Testimonial ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section using the reusable component */}
        <div className={`mt-16 transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <CTASection 
            translationNamespace="common"
            titleKey="testimonials.nextSuccessStory"
            descriptionKey="testimonials.nextSuccessStoryText"
            ctaTextKey="buttons.consultation"
            ctaLink="/kontakt"
            showAnimation={false}
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
