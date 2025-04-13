import React from 'react';

/**
 * LoadingSpinner component
 * 
 * A simple loading spinner to display while lazy-loaded components are being loaded.
 * This helps improve perceived performance by providing visual feedback during loading.
 */
const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
