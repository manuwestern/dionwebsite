import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { shouldUseMobileExperience } from '../../utils/deviceDetection';

interface MobileRedirectProps {
  children: React.ReactNode;
}

/**
 * Component that redirects users to the mobile landing page if they're on a mobile device
 * and not already on a mobile-specific page
 */
const MobileRedirect: React.FC<MobileRedirectProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  // Paths that should not redirect to mobile landing page
  const excludedPaths = [
    '/mobile',
    '/kontakt',
    '/impressum',
    '/datenschutz',
    '/agb'
  ];

  useEffect(() => {
    // Only check once on initial render
    if (!checked) {
      const isMobile = shouldUseMobileExperience();
      const currentPath = location.pathname;
      
      // If on mobile and not on an excluded path, redirect to mobile landing page
      if (isMobile && !excludedPaths.some(path => currentPath.startsWith(path))) {
        navigate('/mobile', { replace: true });
      }
      
      setChecked(true);
    }
  }, [checked, location.pathname, navigate]);

  return <>{children}</>;
};

export default MobileRedirect;
