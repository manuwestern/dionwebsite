import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Star, Quote, ChevronLeft, ChevronRight, Play } from 'lucide-react';

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
  const { t } = useTranslation(['hairTransplantation', 'common']);
  const [activeBeforeAfter, setActiveBeforeAfter] = useState(0);

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

  // Before/After image pairs (placeholders)
  const beforeAfterPairs = [
    { before: 'bg-gray-300', after: 'bg-gray-300' },
    { before: 'bg-gray-400', after: 'bg-gray-400' },
    { before: 'bg-gray-500', after: 'bg-gray-500' }
  ];

  const nextBeforeAfter = () => {
    setActiveBeforeAfter((prev) => (prev + 1) % beforeAfterPairs.length);
  };

  const prevBeforeAfter = () => {
    setActiveBeforeAfter((prev) => (prev - 1 + beforeAfterPairs.length) % beforeAfterPairs.length);
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24 relative">
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light mb-3 md:text-5xl md:mb-4">{t('testimonialsSection.title')}</h2>
          <p className="text-base text-gray-600 font-light md:text-xl max-w-3xl mx-auto">
            {t('testimonialsSection.subtitle')}
          </p>
          <p className="text-base text-gray-700 font-light mt-4 max-w-3xl mx-auto">
            {t('testimonialsSection.intro')}
          </p>
        </div>

        {/* Stats Section with accent color */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-md p-8 text-center transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 border border-gray-100"
              data-exclude-from-effect="true"
            >
              <div className="text-5xl font-light text-[#7BA7C2] mb-3">{stat.value}</div>
              <div className="text-gray-600 font-light">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Before/After Slider with controls */}
        <div className="mb-20 relative">
          <h3 className="text-2xl font-light mb-6 text-center">Vorher / Nachher Ergebnisse</h3>
          
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className={`${beforeAfterPairs[activeBeforeAfter].before} rounded-xl h-80 flex items-center justify-center relative overflow-hidden`}>
                <span className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">Vorher</span>
                <span className="text-white text-xl font-light">Vorher</span>
              </div>
              <div className={`${beforeAfterPairs[activeBeforeAfter].after} rounded-xl h-80 flex items-center justify-center relative overflow-hidden`}>
                <span className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">Nachher</span>
                <span className="text-white text-xl font-light">Nachher</span>
              </div>
            </div>
            
            {/* Navigation arrows */}
            <button 
              onClick={prevBeforeAfter}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
              aria-label="Previous result"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button 
              onClick={nextBeforeAfter}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
              aria-label="Next result"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
            
            {/* Dots indicator */}
            <div className="flex justify-center mt-4">
              {beforeAfterPairs.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveBeforeAfter(index)}
                  className={`w-3 h-3 rounded-full mx-1 ${activeBeforeAfter === index ? 'bg-[#7BA7C2]' : 'bg-gray-300'}`}
                  aria-label={`Go to result ${index + 1}`}
                  title={`Result ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Video section removed as requested */}

        {/* Testimonials Grid - Staggered layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100 h-full transform hover:-translate-y-1 ${index % 3 === 1 ? 'md:mt-6' : ''}`}
              data-exclude-from-effect="true"
            >
              <div className="p-6 flex flex-col h-full">
                {/* Quote Icon with accent color */}
                <div className="mb-4 text-gradient">
                  <div className="bg-[#7BA7C2] w-12 h-12 rounded-full flex items-center justify-center">
                    <Quote className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                {/* Testimonial Text */}
                <p className="text-gray-700 font-light mb-6 flex-grow italic">"{testimonial.text}"</p>
                
                {/* Rating */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                
                {/* Patient Info */}
                <div className="border-t border-gray-100 pt-4">
                  <div className="font-light text-gray-800">{testimonial.name}</div>
                  <div className="text-sm text-[#7BA7C2]">{testimonial.procedure}</div>
                  <div className="text-sm text-gray-500">{testimonial.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button with accent color */}
        <div className="text-center">
          <button className="inline-block bg-[#7BA7C2] text-white px-10 py-4 rounded-lg hover:shadow-lg transition-all duration-300 text-base font-light tracking-wider transform hover:scale-105">
            {t('testimonialsSection.cta')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
