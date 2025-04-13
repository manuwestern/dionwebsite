import { useEffect, useState } from 'react';

/**
 * Interface for CSS file configuration
 */
interface CSSFile {
  href: string;
  id: string;
  media?: string;
}

/**
 * Hook to load CSS files only when needed
 * 
 * This hook helps improve performance by loading non-critical CSS files
 * only when they are needed, rather than on initial page load.
 * 
 * @param cssFiles Array of CSS files to load
 * @param loadImmediately Whether to load the CSS files immediately or wait for a trigger
 * @returns Object with loaded state and load function
 */
export const useCriticalCSS = (
  cssFiles: CSSFile[],
  loadImmediately = false
): { loaded: boolean; load: () => void } => {
  const [loaded, setLoaded] = useState(false);

  // Function to load CSS files
  const loadCSS = () => {
    if (loaded) return;

    // Create link elements for each CSS file
    cssFiles.forEach((file) => {
      // Skip if already loaded
      if (document.getElementById(file.id)) return;

      // Create link element
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = file.href;
      link.id = file.id;
      if (file.media) link.media = file.media;

      // Add onload handler
      link.onload = () => {
        console.log(`CSS file loaded: ${file.href}`);
      };

      // Add link to document
      document.head.appendChild(link);
    });

    setLoaded(true);
  };

  // Load CSS files immediately if requested
  useEffect(() => {
    if (loadImmediately) {
      loadCSS();
    }
  }, [loadImmediately]);

  return { loaded, load: loadCSS };
};

/**
 * Hook to load CSS files when an element is visible
 * 
 * This hook uses the Intersection Observer API to load CSS files
 * only when an element is visible in the viewport.
 * 
 * @param cssFiles Array of CSS files to load
 * @param elementRef Reference to the element to observe
 * @returns Object with loaded state
 */
export const useLazyCSS = (
  cssFiles: CSSFile[],
  elementRef: React.RefObject<HTMLElement>
): { loaded: boolean } => {
  const [loaded, setLoaded] = useState(false);
  const { load } = useCriticalCSS(cssFiles, false);

  useEffect(() => {
    if (!elementRef.current || loaded) return;

    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        // If element is visible, load CSS files
        if (entries[0].isIntersecting) {
          load();
          setLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Load CSS when element is within 200px of viewport
    );

    // Start observing element
    observer.observe(elementRef.current);

    // Clean up observer
    return () => {
      observer.disconnect();
    };
  }, [elementRef, load, loaded]);

  return { loaded };
};

/**
 * Hook to preload CSS files
 * 
 * This hook adds preload links for CSS files to improve loading performance.
 * 
 * @param cssFiles Array of CSS files to preload
 */
export const usePreloadCSS = (cssFiles: CSSFile[]): void => {
  useEffect(() => {
    cssFiles.forEach((file) => {
      // Skip if already preloaded
      if (document.querySelector(`link[rel="preload"][href="${file.href}"]`)) return;

      // Create preload link
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = file.href;
      link.as = 'style';
      if (file.media) link.media = file.media;

      // Add link to document
      document.head.appendChild(link);
    });
  }, [cssFiles]);
};

export default useCriticalCSS;
