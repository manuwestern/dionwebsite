import React from 'react';
import { Star } from 'lucide-react';
import OptimizedImage from '../common/elements/OptimizedImage';

const InstagramTestimonial: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F0F8EA] rounded-2xl p-8 text-center">
          <div className="flex justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
            ))}
          </div>
          <blockquote className="text-lg md:text-xl text-gray-800 mb-6 italic">
            "Die Haartransplantation bei Dion Hair Clinic war die beste Entscheidung. Das Ergebnis übertrifft alle meine Erwartungen! Das Team war professionell und einfühlsam."
          </blockquote>
          <div className="flex items-center justify-center">
            <OptimizedImage
              sources={{ original: "/images/Patient_Michael_K.webp" }}
              alt="Michael K."
              className="w-12 h-12 rounded-full mr-4"
            />
            <div className="text-left">
              <div className="font-bold text-gray-800">Michael K.</div>
              <div className="text-sm text-gray-600">Haartransplantation, März 2024</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstagramTestimonial;
