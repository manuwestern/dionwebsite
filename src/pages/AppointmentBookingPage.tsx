import React, { useState } from 'react';

// Main appointment booking page component
const AppointmentBookingPage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  // Appointment options
  const options = [
    {
      id: 'personal',
      title: 'Kostenloses Persönliches Beratungsgespräch',
      description: 'Besuchen Sie uns in unserer Klinik für ein ausführliches Beratungsgespräch mit einem unserer Experten.'
    },
    {
      id: 'phone',
      title: 'Kostenloses Telefonisches Beratungsgespräch',
      description: 'Sprechen Sie bequem von zu Hause aus mit einem unserer Experten über Ihre Fragen und Anliegen.'
    },
    {
      id: 'mesotherapy',
      title: 'Kostenlose Mesotherapie Behandlung',
      description: 'Für Haartransplantationspatienten bieten wir eine kostenlose Mesotherapie-Behandlung an.'
    }
  ];
  
  return (
    <>
      <div className="bg-gradient-to-b from-[#F8FAFC] to-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Terminbuchung
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Wählen Sie die Art der Beratung, die Sie wünschen
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {options.map(option => (
              <div 
                key={option.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedOption(option.id)}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{option.title}</h3>
                <p className="text-gray-600 mb-4">{option.description}</p>
                <button 
                  className="bg-[#7BA7C2] text-white px-6 py-2 rounded-md hover:bg-[#6A96B1] transition-colors"
                  onClick={() => setSelectedOption(option.id)}
                >
                  Termin vereinbaren
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentBookingPage;
