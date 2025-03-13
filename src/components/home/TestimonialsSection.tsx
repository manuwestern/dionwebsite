import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  age: number;
  treatment: string;
  quote: string;
  image: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Michael Schneider",
    age: 42,
    treatment: "Saphir-FUE Haartransplantation",
    quote: "Nach jahrelangem Haarausfall hat die Behandlung in der Dion Hair Clinic mein Leben verändert. Das Team war professionell und einfühlsam, und die Ergebnisse haben meine Erwartungen übertroffen. Ich fühle mich wieder selbstbewusst und jünger.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    rating: 5
  },
  {
    id: 2,
    name: "Thomas Weber",
    age: 38,
    treatment: "DHI-Technik Haartransplantation",
    quote: "Die Entscheidung für eine Haartransplantation in der Dion Hair Clinic war die beste, die ich je getroffen habe. Der gesamte Prozess war schmerzfrei und die Betreuung erstklassig. Heute, ein Jahr später, kann ich mein volles Haar kaum glauben.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    rating: 5
  },
  {
    id: 3,
    name: "Julia Becker",
    age: 35,
    treatment: "Augenbrauen-Transplantation",
    quote: "Nach einem Unfall hatte ich kaum noch Augenbrauen. Die Spezialisten der Dion Hair Clinic haben mir mit einer Transplantation geholfen. Das Ergebnis sieht unglaublich natürlich aus und hat mir mein Selbstvertrauen zurückgegeben.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    rating: 5
  }
];

const TestimonialsSection: React.FC = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const currentTestimonial = testimonials[activeTestimonial];

  return (
    <div className="bg-white py-16 md:py-24">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light mb-3 md:text-5xl md:mb-4">Patientenerfahrungen</h2>
          <p className="text-base text-gray-600 font-light md:text-xl">
            Erfahren Sie, wie unsere Behandlungen das Leben unserer Patienten verändert haben
          </p>
        </div>

        <div className="relative w-full mx-auto">
          {/* Navigation Arrows */}
          <button 
            onClick={handlePrevTestimonial}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-[#333333] bg-opacity-60 rounded-full p-1.5 hover:bg-opacity-80 transition-all md:bg-white md:bg-opacity-80 md:p-2 md:shadow-md md:left-0 md:-translate-x-12"
            aria-label="Vorheriger Patient"
          >
            <ChevronLeft className="w-5 h-5 text-white md:w-6 md:h-6 md:text-gray-700" />
          </button>
          
          <button 
            onClick={handleNextTestimonial}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-[#333333] bg-opacity-60 rounded-full p-1.5 hover:bg-opacity-80 transition-all md:bg-white md:bg-opacity-80 md:p-2 md:shadow-md md:right-0 md:translate-x-12"
            aria-label="Nächster Patient"
          >
            <ChevronRight className="w-5 h-5 text-white md:w-6 md:h-6 md:text-gray-700" />
          </button>
          
          <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg">
            <div className="flex flex-col md:flex-row">
              {/* Patient Image - Left Side */}
              <div className="w-full md:w-2/5 h-[220px] md:h-[320px]">
                <img 
                  src={currentTestimonial.image} 
                  alt={`Patient ${currentTestimonial.name}`}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              
              {/* Testimonial Content - Right Side */}
              <div className="w-full md:w-3/5 p-6 md:p-10 flex flex-col justify-between h-auto md:h-[320px]">
                {/* Rating Stars */}
                <div className="flex mb-6">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gray-700 fill-gray-700" />
                  ))}
                </div>
                
                {/* Quote */}
                <blockquote className="text-base md:text-lg font-light text-gray-700 italic mb-8">
                  "{currentTestimonial.quote}"
                </blockquote>
                
                {/* Spacer */}
                <div className="flex-grow"></div>
                
                {/* Patient Info */}
                <div className="mb-2">
                  <h3 className="text-xl font-light text-gray-800 mb-1">{currentTestimonial.name}</h3>
                  <p className="text-sm text-gray-600 font-light">
                    {currentTestimonial.age} Jahre, {currentTestimonial.treatment}
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
