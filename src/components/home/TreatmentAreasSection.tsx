import React from 'react';

const TreatmentAreasSection: React.FC = () => {
  return (
    <div className="bg-gray-50 py-8 md:py-20">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl font-light mb-3 md:text-5xl md:mb-4">Behandlungsbereiche</h2>
          <p className="text-base text-gray-600 font-light md:text-xl">
            Professionelle Haartransplantationen für Kopf, Bart und Augenbrauen mit modernsten Methoden
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
          {/* Beard Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105 md:rounded-3xl md:flex md:flex-col">
            <div className="h-48 overflow-hidden md:h-80">
              <img
                src="https://images.unsplash.com/photo-1621607512022-6aecc4fed814?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Barttransplantation in der Dion Hair Clinic"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 text-center md:p-8 md:flex md:flex-col md:flex-grow">
              <div className="md:flex-grow">
                <h3 className="text-lg font-light mb-3 md:text-2xl md:mb-4">Barthaare</h3>
                <p className="text-gray-600 mb-4 font-light md:mb-6">
                  Wünschen Sie sich einen volleren Bart ohne Lücken?
                </p>
              </div>
              <div className="md:mt-auto">
                <button className="w-3/4 bg-[#333333] text-white px-6 py-3 rounded-lg hover:bg-[#444444] transition-colors text-sm font-light tracking-wider md:w-auto">
                  MEHR INFOS
                </button>
              </div>
            </div>
          </div>

          {/* Head Hair Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105 md:rounded-3xl md:flex md:flex-col">
            <div className="h-48 overflow-hidden md:h-80">
              <img
                src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Haartransplantation am Kopf in der Dion Hair Clinic"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 text-center md:p-8 md:flex md:flex-col md:flex-grow">
              <div className="md:flex-grow">
                <h3 className="text-lg font-light mb-3 md:text-2xl md:mb-4">Kopfhaare</h3>
                <p className="text-gray-600 mb-4 font-light md:mb-6">
                  Leiden Sie unter kahlen Stellen oder Geheimratsecken?
                </p>
              </div>
              <div className="md:mt-auto">
                <button className="w-3/4 bg-[#333333] text-white px-6 py-3 rounded-lg hover:bg-[#444444] transition-colors text-sm font-light tracking-wider md:w-auto">
                  MEHR INFOS
                </button>
              </div>
            </div>
          </div>

          {/* Eyebrows Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105 md:rounded-3xl md:flex md:flex-col">
            <div className="h-48 overflow-hidden md:h-80">
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Augenbrauentransplantation in der Dion Hair Clinic"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 text-center md:p-8 md:flex md:flex-col md:flex-grow">
              <div className="md:flex-grow">
                <h3 className="text-lg font-light mb-3 md:text-2xl md:mb-4">Augenbrauen</h3>
                <p className="text-gray-600 mb-4 font-light md:mb-6">
                  Sie sind mit der Form oder Dichte Ihrer Augenbrauen unzufrieden?
                </p>
              </div>
              <div className="md:mt-auto">
                <button className="w-3/4 bg-[#333333] text-white px-6 py-3 rounded-lg hover:bg-[#444444] transition-colors text-sm font-light tracking-wider md:w-auto">
                  MEHR INFOS
                </button>
              </div>
            </div>
          </div>

          {/* Hair Loss Therapy Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105 md:rounded-3xl md:flex md:flex-col">
            <div className="h-48 overflow-hidden md:h-80">
              <img
                src="https://images.unsplash.com/photo-1626954079673-f3c3a7a5af61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Haarausfalltherapie in der Dion Hair Clinic"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 text-center md:p-8 md:flex md:flex-col md:flex-grow">
              <div className="md:flex-grow">
                <h3 className="text-lg font-light mb-3 md:text-2xl md:mb-4">Haarausfalltherapie</h3>
                <p className="text-gray-600 mb-4 font-light md:mb-6">
                  Möchten Sie Ihren Haarausfall stoppen und das Wachstum fördern?
                </p>
              </div>
              <div className="md:mt-auto">
                <button className="w-3/4 bg-[#333333] text-white px-6 py-3 rounded-lg hover:bg-[#444444] transition-colors text-sm font-light tracking-wider md:w-auto">
                  MEHR INFOS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentAreasSection;
