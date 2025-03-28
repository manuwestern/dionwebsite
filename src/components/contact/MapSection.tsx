import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin } from 'lucide-react';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline } from '../../utils/typography';

const MapSection: React.FC = () => {
  const { t } = useTranslation('contact');

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`${textStyle.sectionTitle} mb-4`}>
            {t('mapSection.title')}
          </h2>
          <p className={`${textStyle.sectionSubtitle} max-w-3xl mx-auto`}>
            {t('mapSection.description')}
          </p>
          <div className={`${gradientUnderline.primary} w-[90%] max-w-[350px] mt-6 mx-auto`}></div>
        </div>
        
        {/* Map Container */}
        <div className="relative rounded-xl overflow-hidden shadow-lg border border-gray-100">
          {/* Map Placeholder - In a real application, this would be replaced with an actual map component */}
          <div className="aspect-[16/9] bg-gray-100 relative">
            {/* Stylized map placeholder with gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#7BA7C2]/10 to-[#7BA7C2]/5"></div>
            
            {/* Grid lines */}
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-4">
              {Array.from({ length: 32 }).map((_, index) => (
                <div 
                  key={index} 
                  className="border border-[#7BA7C2]/10"
                ></div>
              ))}
            </div>
            
            {/* Location marker */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                {/* Pulse animation */}
                <div className="absolute -inset-8 rounded-full bg-[#7BA7C2]/20 animate-ping opacity-75"></div>
                
                {/* Marker */}
                <div className="relative bg-white rounded-full p-3 shadow-lg">
                  <MapPin className="w-8 h-8 text-[#7BA7C2]" />
                </div>
              </div>
            </div>
            
            {/* Map label */}
            <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-lg shadow-md border border-gray-100">
              <p className={`${fontSize.sm} ${fontWeight.medium} ${textColor.dark}`}>
                Dion Hair Clinic, Mönchengladbach
              </p>
            </div>
            
            {/* Map controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <button className="bg-white w-8 h-8 rounded-md shadow-md border border-gray-100 flex items-center justify-center">
                <span className="text-gray-600 font-bold">+</span>
              </button>
              <button className="bg-white w-8 h-8 rounded-md shadow-md border border-gray-100 flex items-center justify-center">
                <span className="text-gray-600 font-bold">−</span>
              </button>
            </div>
          </div>
          
          {/* Map caption */}
          <div className="bg-white p-4 border-t border-gray-100">
            <p className={`${textStyle.bodyText} text-center`}>
              <span className={`${fontWeight.medium}`}>Dion Hair Clinic</span> • Hindenburgstraße 45, 41061 Mönchengladbach
            </p>
          </div>
        </div>
        
        {/* Directions */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className={`${textStyle.cardTitle} mb-4`}>Mit dem Auto</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className={`${textStyle.listItemBullet} mr-2`}>•</span>
                <span className={textStyle.listItem}>Autobahn A61, Ausfahrt Mönchengladbach-Zentrum</span>
              </li>
              <li className="flex items-start">
                <span className={`${textStyle.listItemBullet} mr-2`}>•</span>
                <span className={textStyle.listItem}>Folgen Sie der Beschilderung Richtung Zentrum</span>
              </li>
              <li className="flex items-start">
                <span className={`${textStyle.listItemBullet} mr-2`}>•</span>
                <span className={textStyle.listItem}>Parkmöglichkeiten in der Tiefgarage Hindenburgstraße</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className={`${textStyle.cardTitle} mb-4`}>Mit öffentlichen Verkehrsmitteln</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className={`${textStyle.listItemBullet} mr-2`}>•</span>
                <span className={textStyle.listItem}>Hauptbahnhof Mönchengladbach (10 Gehminuten)</span>
              </li>
              <li className="flex items-start">
                <span className={`${textStyle.listItemBullet} mr-2`}>•</span>
                <span className={textStyle.listItem}>Bushaltestelle Hindenburgstraße (2 Gehminuten)</span>
              </li>
              <li className="flex items-start">
                <span className={`${textStyle.listItemBullet} mr-2`}>•</span>
                <span className={textStyle.listItem}>Straßenbahnhaltestelle Marktplatz (5 Gehminuten)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
