import React, { useState } from 'react';

/**
 * CacheResetButton-Komponente, die einen Button anzeigt, der die Seite neu lädt
 * Diese Komponente kann verwendet werden, wenn der Benutzer auf einen 404-Fehler stößt
 */
const CacheResetButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleReload = (): void => {
    setIsLoading(true);
    // Kurze Verzögerung, um den Ladeindikator anzuzeigen
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handleDismiss = (): void => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-xs w-full bg-white rounded-lg shadow-lg border border-gray-200 p-4 text-center">
      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#7BA7C2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </div>
      <h3 className="text-sm font-medium text-gray-900 mb-1">Probleme mit der Seite?</h3>
      <p className="text-xs text-gray-600 mb-3">
        Wenn Sie Probleme beim Laden der Seite haben, versuchen Sie die Seite neu zu laden.
      </p>
      <div className="flex flex-col space-y-2">
        <button
          onClick={handleReload}
          disabled={isLoading}
          className="w-full bg-[#7BA7C2] hover:bg-[#5A8BA6] text-white text-xs font-medium py-2 px-3 rounded transition-colors duration-300 flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Seite wird neu geladen...
            </>
          ) : (
            'Seite neu laden'
          )}
        </button>
        <button
          onClick={handleDismiss}
          className="w-full bg-transparent hover:bg-gray-100 text-gray-600 text-xs font-medium py-2 px-3 rounded border border-gray-300 transition-colors duration-300"
        >
          Ausblenden
        </button>
      </div>
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        aria-label="Schließen"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default CacheResetButton;
