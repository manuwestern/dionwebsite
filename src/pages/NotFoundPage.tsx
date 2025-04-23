import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * NotFoundPage-Komponente, die angezeigt wird, wenn eine Seite nicht gefunden wurde
 * Bietet auch die Möglichkeit, den Cache zu löschen und die Seite neu zu laden
 */
const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Automatische Umleitung zur Startseite nach 3 Sekunden
    const redirectTimer = setTimeout(() => {
      navigate('/');
    }, 3000);
    
    // Timer aufräumen, wenn die Komponente unmounted wird
    return () => clearTimeout(redirectTimer);
  }, [navigate]);
  
  const handleReload = (): void => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#7BA7C2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Seite nicht gefunden</h1>
        <p className="text-gray-600 mb-6">
          Die von Ihnen gesuchte Seite existiert nicht oder wurde verschoben. Dies könnte auch an einem veralteten Cache liegen.
        </p>
        <div className="space-y-4">
          <button
            onClick={handleReload}
            className="w-full bg-[#7BA7C2] hover:bg-[#5A8BA6] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
          >
            Seite neu laden
          </button>
          <Link
            to="/"
            className="block w-full border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-300"
          >
            Zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
