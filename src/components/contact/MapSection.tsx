import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { textStyle, fontSize, fontWeight, textColor, gradientUnderline } from '../../utils/typography';

// Fix für Leaflet-Marker-Icons
import L from 'leaflet';

const MapSection: React.FC = () => {
  const { t } = useTranslation('contact');
  
  // Koordinaten der Dion Hair Clinic
  const position: [number, number] = [51.1956, 6.4378]; // Ersetzen Sie dies durch die genauen Koordinaten
  
  // Fix für Leaflet-Marker-Icons
  useEffect(() => {
    // Lösung für das fehlende Marker-Icon-Problem in Leaflet mit Webpack/Vite
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
  }, []);

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
          {/* Echte Karte mit React-Leaflet */}
          <div className="aspect-[16/9]">
            {/* TypeScript-Fehler mit Typ-Cast umgehen */}
            {React.createElement(
              MapContainer as any, 
              {
                center: position,
                zoom: 15,
                style: { height: '100%', width: '100%' },
                scrollWheelZoom: false
              },
              [
                React.createElement(
                  TileLayer as any, 
                  {
                    key: 'tile',
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                  }
                ),
                React.createElement(
                  Marker as any, 
                  { 
                    key: 'marker',
                    position: position 
                  },
                  React.createElement(
                    Popup as any, 
                    { key: 'popup' },
                    <div>
                      <strong>Dion Hair Clinic</strong><br />
                      Schürenweg 61<br />
                      41063 Mönchengladbach
                    </div>
                  )
                )
              ]
            )}
          </div>
          
          {/* Map caption */}
          <div className="bg-white p-4 border-t border-gray-100">
            <p className={`${textStyle.bodyText} text-center`}>
              <span className={`${fontWeight.medium}`}>Dion Hair Clinic</span> • Schürenweg 61, 41063 Mönchengladbach
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
                <span className={textStyle.listItem}>Parkmöglichkeiten in der Nähe des Schürenwegs</span>
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
                <span className={textStyle.listItem}>Bushaltestelle Schürenweg (2 Gehminuten)</span>
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
