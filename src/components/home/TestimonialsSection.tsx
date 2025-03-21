import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('home');
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Images for testimonials
  const testimonialImages = [
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
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
    <div className="bg-gradient-to-b from-gray-100 via-gray-50 to-white bg-size-200 animate-gradient-slow py-16 md:py-28 min-h-[800px] flex items-center">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light mb-3 md:text-5xl md:mb-4">{t('testimonialsSection.title')}</h2>
          <p className="text-base text-gray-600 font-light md:text-xl">
            {t('testimonialsSection.subtitle')}
          </p>
        </div>

        <div className="relative w-full mx-auto">
          {/* Navigation Arrows */}
          <button 
            onClick={handlePrevTestimonial}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-[#333333] bg-opacity-60 rounded-full p-1.5 hover:bg-opacity-80 transition-all md:bg-white md:bg-opacity-80 md:p-2 md:shadow-md md:left-0 md:-translate-x-12"
            aria-label={t('testimonialsSection.navigation.previous')}
          >
            <ChevronLeft className="w-5 h-5 text-white md:w-6 md:h-6 md:text-gray-700" />
          </button>
          
          <button 
            onClick={handleNextTestimonial}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-[#333333] bg-opacity-60 rounded-full p-1.5 hover:bg-opacity-80 transition-all md:bg-white md:bg-opacity-80 md:p-2 md:shadow-md md:right-0 md:translate-x-12"
            aria-label={t('testimonialsSection.navigation.next')}
          >
            <ChevronRight className="w-5 h-5 text-white md:w-6 md:h-6 md:text-gray-700" />
          </button>
          
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
            <div className="flex flex-col md:flex-row">
              {/* Patient Image - Left Side */}
              <div className="w-full md:w-2/5 h-[220px] md:h-[320px]">
                <img 
                  src={currentTestimonial.image} 
                  alt={`Patient ${t(currentTestimonial.nameKey)}`}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              
              {/* Testimonial Content - Right Side */}
              <div className="w-full md:w-3/5 p-6 md:p-10 flex flex-col justify-between h-auto md:h-[320px]">
                {/* Rating Stars */}
                <div className="flex justify-center md:justify-start mb-6">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gray-700 fill-gray-700" />
                  ))}
                </div>
                
                {/* Quote */}
                <blockquote className="text-base md:text-lg font-light text-gray-700 italic mb-8 text-center md:text-left">
                  "{t(currentTestimonial.quoteKey)}"
                </blockquote>
                
                {/* Spacer */}
                <div className="flex-grow"></div>
                
                {/* Patient Info */}
                <div className="mb-2 text-center md:text-left">
                  <h3 className="text-xl font-light text-gray-800 mb-1">{t(currentTestimonial.nameKey)}</h3>
                  <p className="text-sm text-gray-600 font-light">
                    {t(currentTestimonial.ageKey)}, {t(currentTestimonial.treatmentKey)}
                  </p>
                </div>
                
                {/* No pagination dots as requested */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
