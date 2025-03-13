import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full max-w-7xl mx-auto px-4 py-6 relative">
      <div className="flex justify-between items-center">
        <div className="text-xl md:text-2xl font-light tracking-wider">DH CLINIC</div>
        <button 
          className="block md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="hidden md:flex gap-8 text-sm font-light">
          <a href="#" className="hover:text-gray-600">Home</a>
          <a href="#" className="hover:text-gray-600">Behandlungen</a>
          <a href="#" className="hover:text-gray-600">Wissenswertes</a>
          <a href="#" className="hover:text-gray-600">Klinik</a>
          <a href="#" className="hover:text-gray-600">Kontakt</a>
          <a href="#" className="text-red-600 hover:text-red-700">Preisrechner</a>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg p-4 md:hidden z-50">
          <div className="flex flex-col gap-4 text-sm font-light">
            <a href="#" className="hover:text-gray-600">Home</a>
            <a href="#" className="hover:text-gray-600">Behandlungen</a>
            <a href="#" className="hover:text-gray-600">Wissenswertes</a>
            <a href="#" className="hover:text-gray-600">Klinik</a>
            <a href="#" className="hover:text-gray-600">Kontakt</a>
            <a href="#" className="text-red-600 hover:text-red-700">Preisrechner</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
