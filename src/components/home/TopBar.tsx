import React from 'react';
import { Phone, Mail, Instagram, Apple as WhatsApp, BookText as TikTok } from 'lucide-react';

const TopBar: React.FC = () => {
  return (
    <div className="bg-gray-100 py-2">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between md:items-center">
          <div className="flex justify-center gap-4 w-full md:w-auto md:justify-start">
            <button className="flex items-center gap-1 text-sm">
              <img src="/de.svg" alt="Deutsch" className="w-6 h-4" /> Deutsch
            </button>
            <button className="flex items-center gap-1 text-sm">
              <img src="/gb.svg" alt="English" className="w-6 h-4" /> English
            </button>
          </div>
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:gap-6 text-sm">
            <a href="mailto:info@dionhairclinic.de" className="flex items-center justify-center w-full md:w-auto md:justify-start gap-1 hover:text-gray-600">
              <Mail size={16} /> info@dionhairclinic.de
            </a>
            <a href="tel:+491702637818" className="flex items-center justify-center w-full md:w-auto md:justify-start gap-1 hover:text-gray-600">
              <Phone size={16} /> +49 170 2637818
            </a>
            <div className="flex items-center justify-center w-full md:w-auto md:justify-start gap-3">
              <a href="#" className="hover:text-gray-600"><WhatsApp size={20} /></a>
              <a href="#" className="hover:text-gray-600"><Instagram size={20} /></a>
              <a href="#" className="hover:text-gray-600"><TikTok size={20} /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
