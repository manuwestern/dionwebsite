import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, lineHeight } from '../../utils/typography';
import OptimizedImage from '../common/elements/OptimizedImage';
import CTASection from '../common/elements/CTASection';

interface Testimonial {
  name: string;
  rating: number;
  text: string;
  procedure: string;
  date: string;
}

interface Stat {
  value: string;
  label: string;
}

const TestimonialsSection: React.FC = () => {
  const { t } = useTranslation(['hairLossTherapy', 'common']);
  const [activeBeforeAfter, setActiveBeforeAfter] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoverStat, setHoverStat] = useState<number | null>(null);

  // Trigger entrance animations
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Get testimonials from translation
  const testimonials: Testimonial[] = (t('testimonialsSection.testimonials', { returnObjects: true }) as any[]).map(
    (testimonial: any) => ({
      name: testimonial.name,
      rating: testimonial.rating,
      text: testimonial.text,
      procedure: testimonial.procedure,
      date: testimonial.date
    })
  );

  // Get stats from translation
  const stats: Stat[] = (t('testimonialsSection.stats', { returnObjects: true }) as any[]).map(
    (stat: any) => ({
      value: stat.value,
      label: stat.label
    })
  );

  // Before/After image pairs
  const beforeAfterPairs = [
    { 
      before: '/images/frau_lichter_scheitel.webp', 
      after: '/images/Haarausfall_Model.webp' 
    },
    { 
      before: '/images/frau_lichter_scheitel.webp', 
      after: '/images/Haarausfall_Model.webp' 
    },
    { 
      before: '/images/frau_lichter_scheitel.webp', 
      after: '/images/Haarausfall_Model.webp' 
    }
  ];

  const nextBeforeAfter = () => {
    setActiveBeforeAfter((prev) => (prev + 1) % beforeAfterPairs.length);
  };

  const prevBeforeAfter = () => {
    setActiveBeforeAfter((prev) => (prev - 1 + beforeAfterPairs.length) % beforeAfterPairs.length);
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -z-10 w-full h-full inset-0 bg-gradient-to-b from-white via-gray-50 to-white"></div>
      <div className="absolute -z-10 w-[800px] h-[800px] rounded-full bg-[#7BA7C2]/5 -top-[400px] -right-[400px] blur-3xl"></div>
      <div className="absolute -z-10 w-[600px] h-[600px] rounded-full bg-[#7BA7C2]/5 -bottom-[300px] -left-[300px] blur-3xl"></div>
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header with elegant design */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4 relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-[#7BA7C2]/10 blur-xl"></div>
            <h2 className={`${textStyle.sectionTitle}`} lang="de">{t('testimonialsSection.title')}</h2>
            <div className={`${gradientUnderline.primary} w-[90%] max-w-[350px] mt-3 mx-auto`}></div>
          </div>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-4`}>
            {t('testimonialsSection.subtitle')}
          </p>
          <p className={`${fontSize.base} ${textColor.dark} ${fontWeight.light} ${lineHeight.relaxed} mt-4 max-w-3xl mx-auto`}>
            {t('testimonialsSection.intro')}
          </p>
        </div>

        {/* Featured Testimonial Showcase removed as requested */}

        {/* Stats Section with elegant cards */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {stats.map((stat, index) => {
            const isHovered = index === hoverStat;
            
            return (
              <div 
                key={index}
                className="relative group"
                onMouseEnter={() => setHoverStat(index)}
                onMouseLeave={() => setHoverStat(null)}
              >
                {/* Card with glass morphism effect */}
                <div className={`relative bg-white backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-500 h-full p-8 text-center border-2 ${
                  isHovered 
                    ? 'shadow-xl transform -translate-y-1 border-[#7BA7C2]/80' 
                    : 'border-gray-100/80 hover:border-[#7BA7C2]/30 hover:shadow-xl'
                }`}>
                  {/* Decorative circle */}
                  <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-[#7BA7C2]/5 -mr-20 -mt-20 blur-xl transition-opacity duration-500 opacity-50 group-hover:opacity-100"></div>
                  
                  {/* Stat content */}
                  <div className="relative z-10">
                    <div className={`${fontSize.h2} ${fontWeight.light} transition-all duration-500 ${
                      isHovered ? textColor.primaryDark : textColor.primary
                    } mb-3`}>
                      {stat.value}
                    </div>
                    <div className={`${textColor.medium} ${fontWeight.light} ${lineHeight.relaxed}`}>{stat.label}</div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className={`absolute -z-10 w-full h-full rounded-2xl bg-[#7BA7C2]/10 top-2 left-2 transition-all duration-500 ${
                  isHovered ? 'opacity-70' : 'opacity-0'
                }`}></div>
              </div>
            );
          })}
        </div>

        {/* Before/After Slider with elegant design */}
        <div className={`mb-20 transition-all duration-1000 delay-600 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-8">
            <h3 className={`${textStyle.primaryHeading} text-center md:text-left`}>{t('testimonialsSection.beforeAfterTitle')}</h3>
            <div className={`h-0.5 w-40 ${gradientUnderline.light} mx-auto mt-3`}></div>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <div className="h-96 w-full transition-all duration-700 ease-in-out transform group-hover:scale-105">
                  <OptimizedImage 
                    sources={{
                      webp: beforeAfterPairs[activeBeforeAfter].before,
                      original: beforeAfterPairs[activeBeforeAfter].before.replace('.webp', '.jpg'),
                      width: 1000,
                      height: 667
                    }}
                    alt={`Vor der Haarausfall-Therapie - Patient mit Haarausfall vor der Behandlung`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute top-4 left-4 bg-black/70 text-white px-4 py-1.5 rounded-full text-sm font-light backdrop-blur-sm">{t('testimonialsSection.before')}</div>
              </div>
              
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <div className="h-96 w-full transition-all duration-700 ease-in-out transform group-hover:scale-105">
                  <OptimizedImage 
                    sources={{
                      webp: beforeAfterPairs[activeBeforeAfter].after,
                      original: beforeAfterPairs[activeBeforeAfter].after.replace('.webp', '.jpg'),
                      width: 1000,
                      height: 667
                    }}
                    alt={`Nach der Haarausfall-Therapie - Erfolgreiche Behandlung mit sichtbaren Ergebnissen`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute top-4 left-4 bg-[#7BA7C2]/90 text-white px-4 py-1.5 rounded-full text-sm font-light backdrop-blur-sm">{t('testimonialsSection.after')}</div>
              </div>
            </div>
            
            {/* Navigation arrows */}
            <button 
              onClick={prevBeforeAfter}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-colors z-10 border border-gray-100"
              aria-label="Previous result"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button 
              onClick={nextBeforeAfter}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-colors z-10 border border-gray-100"
              aria-label="Next result"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
            
            {/* Dots indicator */}
            <div className="flex justify-center mt-6">
              {beforeAfterPairs.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveBeforeAfter(index)}
                  className={`w-3 h-3 rounded-full mx-2 transition-all duration-300 ${
                    activeBeforeAfter === index 
                      ? 'bg-[#7BA7C2] scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to result ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Grid - Elegant cards */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 transition-all duration-1000 delay-900 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="relative bg-white backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl border border-gray-100/80 hover:border-[#7BA7C2]/30 transform hover:-translate-y-1 h-full"
            >
              <div className="p-8 flex flex-col h-full relative">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-[#7BA7C2]/5 -mr-20 -mt-20 opacity-50"></div>
                
                {/* Quote Icon with elegant design */}
                <div className="mb-6 relative z-10 flex justify-center md:justify-start">
                  <div className="bg-gradient-to-br from-[#7BA7C2] to-[#5A8BA6] w-12 h-12 rounded-full flex items-center justify-center shadow-md">
                    <Quote className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                {/* Testimonial Text */}
                <p className={`${textColor.dark} ${fontWeight.light} ${lineHeight.relaxed} mb-6 flex-grow italic relative z-10 text-center md:text-left`}>"{testimonial.text}"</p>
                
                {/* Rating */}
                <div className="flex justify-center md:justify-start mb-4 relative z-10">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${textColor.accent} fill-current`} />
                  ))}
                </div>
                
                {/* Patient Info */}
                <div className="border-t border-gray-100 pt-4 relative z-10 text-center md:text-left">
                  <div className={`${fontWeight.medium} ${textColor.dark}`}>{testimonial.name}</div>
                  <div className={`${fontSize.sm} ${textColor.primary}`}>{testimonial.procedure}</div>
                  <div className={`${fontSize.sm} ${textColor.light}`}>{testimonial.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section using the reusable component */}
        <div className={`transition-all duration-1000 delay-1200 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <CTASection 
            translationNamespace="hairLossTherapy"
            titleKey="testimonialsSection.ctaSection.title"
            descriptionKey="testimonialsSection.ctaSection.description"
            ctaTextKey="testimonialsSection.cta"
            ctaLink="/kontakt"
            showAnimation={false}
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
