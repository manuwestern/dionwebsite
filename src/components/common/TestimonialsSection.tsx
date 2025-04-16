import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Star, Quote, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline, tracking, lineHeight } from '../../utils/typography';
import { buttonStyle, buttonRippleClass, buttonArrowClass } from '../../utils/buttons';
import OptimizedImage from './elements/OptimizedImage';

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

interface BeforeAfterPair {
  before: string;
  after: string;
  beforeAlt?: string;
  afterAlt?: string;
}

interface TestimonialsSectionComponentProps {
  translationNamespace: string;
  beforeAfterPairs: BeforeAfterPair[];
  ctaLink?: string;
  beforeLabel?: string;
  afterLabel?: string;
  showTestimonials?: boolean;
}

const TestimonialsSectionComponent: React.FC<TestimonialsSectionComponentProps> = ({
  translationNamespace,
  beforeAfterPairs,
  ctaLink = '/kontakt',
  beforeLabel,
  afterLabel,
  showTestimonials = false
}) => {
  const { t } = useTranslation([translationNamespace, 'common']);
  const [activeBeforeAfter, setActiveBeforeAfter] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoverStat, setHoverStat] = useState<number | null>(null);

  // Trigger entrance animations
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-rotate testimonials if they are shown
  useEffect(() => {
    if (showTestimonials && testimonials.length > 0) {
      const interval = setInterval(() => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [showTestimonials]);

  // Get testimonials from translation if they are shown
  const testimonials: Testimonial[] = showTestimonials 
    ? (t('testimonialsSection.testimonials', { returnObjects: true }) as any[]).map(
        (testimonial: any) => ({
          name: testimonial.name,
          rating: testimonial.rating,
          text: testimonial.text,
          procedure: testimonial.procedure,
          date: testimonial.date
        })
      )
    : [];

  // Get stats from translation if they are shown
  const stats: Stat[] = showTestimonials
    ? (t('testimonialsSection.stats', { returnObjects: true }) as any[]).map(
        (stat: any) => ({
          value: stat.value,
          label: stat.label
        })
      )
    : [];

  const nextBeforeAfter = () => {
    setActiveBeforeAfter((prev) => (prev + 1) % beforeAfterPairs.length);
  };

  const prevBeforeAfter = () => {
    setActiveBeforeAfter((prev) => (prev - 1 + beforeAfterPairs.length) % beforeAfterPairs.length);
  };

  // Get labels with fallbacks
  const beforeLabelText = beforeLabel || t('testimonialsSection.before');
  const afterLabelText = afterLabel || t('testimonialsSection.after');

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
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto mt-4`} lang="de">
            {t('testimonialsSection.subtitle')}
          </p>
        </div>

        {/* Before/After Slider with elegant design */}
        <div className={`mb-20 transition-all duration-1000 delay-600 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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
                    alt={beforeAfterPairs[activeBeforeAfter].beforeAlt || `Vor der Behandlung - Patient vor dem Eingriff`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute top-4 left-4 bg-black/70 text-white px-4 py-1.5 rounded-full text-sm font-light backdrop-blur-sm">{beforeLabelText}</div>
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
                    alt={beforeAfterPairs[activeBeforeAfter].afterAlt || `Nach der Behandlung - Erfolgreiche Behandlung mit sichtbaren Ergebnissen`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute top-4 left-4 bg-[#7BA7C2]/90 text-white px-4 py-1.5 rounded-full text-sm font-light backdrop-blur-sm">{afterLabelText}</div>
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

        {/* CTA Section with elegant design */}
        <div className={`relative transition-all duration-1000 delay-1200 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#7BA7C2]/5 -mr-32 -mt-32 blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#7BA7C2]/5 -ml-32 -mb-32 blur-xl"></div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div className="md:w-2/3">
                <h3 className={`${textStyle.primaryHeading} mb-4 text-center md:text-left`}>{t('testimonialsSection.ctaSection.title')}</h3>
                <p className={`${textStyle.bodyText} text-center md:text-left px-2 md:px-0`} lang="de">
                  {t('testimonialsSection.ctaSection.description')}
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center md:justify-end">
                <Link to={ctaLink} className={`${buttonStyle.primary} shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]`}>
                  <span className={buttonRippleClass}></span>
                  <span className={`relative flex items-center ${textStyle.button}`}>
                    {t('testimonialsSection.cta')}
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

export default TestimonialsSectionComponent;
