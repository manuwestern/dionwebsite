/**
 * Scroll Effects Utility
 * 
 * This utility adds scroll-based background transitions to sections.
 * When scrolling into a new section, the previous section becomes slightly darker,
 * and the new section becomes white.
 */

// Options for the Intersection Observer
const observerOptions: IntersectionObserverInit = {
  root: null, // Use the viewport as the root
  rootMargin: '0px',
  threshold: [0.1, 0.3, 0.5, 0.7, 0.9] // More thresholds for smoother transitions
};

// Track the currently visible sections
interface SectionVisibility {
  isVisible: boolean;
  ratio: number;
}

let visibleSections: Map<Element, SectionVisibility> = new Map();
let currentObserver: IntersectionObserver | null = null;
let scrollEventListener: (() => void) | null = null;

/**
 * Initialize scroll effects for the given sections
 * @param {string} sectionSelector - CSS selector for the sections to observe
 */
export function initScrollEffects(sectionSelector = 'section, [data-section]'): void {
  console.log('Initializing scroll effects with selector:', sectionSelector);
  
  // Clean up any existing observers and event listeners
  if (currentObserver) {
    currentObserver.disconnect();
    currentObserver = null;
    console.log('Cleaned up previous observer');
  }
  
  if (scrollEventListener) {
    window.removeEventListener('scroll', scrollEventListener);
    scrollEventListener = null;
    console.log('Cleaned up previous scroll event listener');
  }
  
  // Reset the visible sections map
  visibleSections.clear();
  
  // Function to initialize the effects
  const initialize = () => {
    // Use a more comprehensive selector but exclude navigation and before/after labels
    const sections = document.querySelectorAll(
      sectionSelector + 
      ', .py-8, .py-16, .py-20, .py-24, div[class*="py-"], ' +
      'div[class*="bg-gradient-to-b"]' // Specifically target gradient backgrounds like in BeforeAfterSection
    );
    console.log('Found sections:', sections.length);
    
    if (sections.length === 0) {
      console.warn('No sections found with selector:', sectionSelector);
      return;
    }
    
    // Set initial styles for all sections
    sections.forEach(section => {
      const htmlSection = section as HTMLElement;
      
      // Skip navigation, top bar, and footer elements
      if (
        htmlSection.classList.contains('navigation') || 
        htmlSection.classList.contains('nav') || 
        htmlSection.id === 'navigation' ||
        htmlSection.closest('.navigation') ||
        htmlSection.closest('nav') ||
        htmlSection.tagName.toLowerCase() === 'nav' ||
        htmlSection.tagName.toLowerCase() === 'footer' ||
        htmlSection.closest('footer') ||
        (htmlSection.classList.contains('bg-gray-100') && htmlSection.classList.contains('py-2')) || // TopBar
        htmlSection.closest('.bg-gray-100.py-2')
      ) {
        return;
      }
      
      // Store the original background color or set a default
      htmlSection.dataset.originalBg = getComputedStyle(section).backgroundColor || 'rgba(255, 255, 255, 1)';
      
      // Store if the section has a background image
      const bgImage = getComputedStyle(section).backgroundImage;
      if (bgImage && bgImage !== 'none') {
        htmlSection.dataset.hasBgImage = 'true';
        htmlSection.dataset.originalBgImage = bgImage;
      }
      
      // Add transition for smoother color changes
      htmlSection.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      
      // Set all sections to the same initial background color - a very light gray
      htmlSection.style.backgroundColor = 'rgb(248, 248, 248)';
      
      // Create an overlay div for darkening background images if needed
      if (bgImage && bgImage !== 'none') {
        const overlay = document.createElement('div');
        overlay.className = 'bg-overlay';
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.05)'; // Very light overlay (5% opacity)
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        overlay.style.pointerEvents = 'none';
        overlay.style.zIndex = '1';
        
        // Make sure the section has position relative for the overlay to work
        if (getComputedStyle(htmlSection).position === 'static') {
          htmlSection.style.position = 'relative';
        }
        
        htmlSection.appendChild(overlay);
        htmlSection.dataset.hasOverlay = 'true';
      }
      
      // Special handling for BeforeAfterSection
      if (
        htmlSection.classList.contains('bg-gradient-to-b') || 
        htmlSection.querySelector('.before-after-slider')
      ) {
        console.log('Found BeforeAfterSection:', htmlSection);
        htmlSection.dataset.isBeforeAfterSection = 'true';
        
        // Find and exclude all before/after labels
        // These are typically positioned absolutely with classes like "absolute top-4 left-4"
        const possibleLabels = htmlSection.querySelectorAll('.absolute');
        possibleLabels.forEach(label => {
          const labelElement = label as HTMLElement;
          const computedStyle = getComputedStyle(labelElement);
          
          // Check if this is likely a label (positioned at the top of the container)
          if (
            computedStyle.position === 'absolute' && 
            (computedStyle.top === '4px' || computedStyle.top === '16px' || computedStyle.top.startsWith('1'))
          ) {
            console.log('Excluding label from effect:', labelElement);
            labelElement.dataset.excludeFromEffect = 'true';
            
            // Make sure the background color of the label is preserved
            if (labelElement.style.backgroundColor.includes('333333') || 
                computedStyle.backgroundColor.includes('51, 51, 51')) {
              labelElement.style.backgroundColor = '#333333';
              labelElement.style.color = 'white';
            }
          }
        });
      }
      
      // Exclude all elements with text content that includes "before" or "after" in various languages
      const allElements = htmlSection.querySelectorAll('*');
      allElements.forEach(el => {
        const text = el.textContent?.toLowerCase() || '';
        if (
          text.includes('before') || 
          text.includes('after') || 
          text.includes('vorher') || 
          text.includes('nachher')
        ) {
          console.log('Excluding before/after text element from effect:', el);
          (el as HTMLElement).dataset.excludeFromEffect = 'true';
          
          // If this element has a dark background, make sure to preserve its styling
          const elStyle = getComputedStyle(el as HTMLElement);
          if (elStyle.backgroundColor.includes('51, 51, 51') || // rgb(51, 51, 51)
              (el as HTMLElement).style.backgroundColor.includes('333333')) {
            (el as HTMLElement).style.backgroundColor = '#333333';
            (el as HTMLElement).style.color = 'white';
          }
        }
      });
    });
    
    // Create an observer instance
    currentObserver = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Start observing each section
    sections.forEach(section => {
      const htmlSection = section as HTMLElement;
      
      // Skip navigation, top bar, footer elements and elements that should be excluded
      if (
        htmlSection.classList.contains('navigation') || 
        htmlSection.classList.contains('nav') || 
        htmlSection.id === 'navigation' ||
        htmlSection.closest('.navigation') ||
        htmlSection.closest('nav') ||
        htmlSection.tagName.toLowerCase() === 'nav' ||
        htmlSection.tagName.toLowerCase() === 'footer' ||
        htmlSection.closest('footer') ||
        (htmlSection.classList.contains('bg-gray-100') && htmlSection.classList.contains('py-2')) || // TopBar
        htmlSection.closest('.bg-gray-100.py-2') ||
        htmlSection.dataset.excludeFromEffect === 'true'
      ) {
        return;
      }
      
      if (currentObserver) {
        currentObserver.observe(section);
      }
    });
    
    // Also listen for scroll events for more fluid updates
    scrollEventListener = () => {
      requestAnimationFrame(updateSectionBackgrounds);
    };
    window.addEventListener('scroll', scrollEventListener, { passive: true });
  };
  
  // Call initialize function
  initialize();
  
  // Also wait for DOM content to be loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    // If the document is already loaded, wait a bit and try again
    // This helps with dynamic content that might be loaded after the initial page load
    setTimeout(initialize, 1000);
  }
}

/**
 * Handle intersection events
 * @param {IntersectionObserverEntry[]} entries - Intersection entries
 */
function handleIntersection(entries: IntersectionObserverEntry[]): void {
  entries.forEach(entry => {
    // Update the visibility map
    visibleSections.set(entry.target, {
      isVisible: entry.isIntersecting,
      ratio: entry.intersectionRatio
    });
  });
  
  // Update the backgrounds based on new visibility data
  updateSectionBackgrounds();
}

/**
 * Update section backgrounds based on visibility
 */
function updateSectionBackgrounds(): void {
  // Sort sections by their position in the document
  const sortedSections = Array.from(visibleSections.keys()).sort((a, b) => {
    return a.getBoundingClientRect().top - b.getBoundingClientRect().top;
  });
  
  // Find the most visible section
  let mostVisibleSection: Element | null = null;
  let highestVisibility = 0;
  
  visibleSections.forEach((data, section) => {
    if (data.isVisible && data.ratio > highestVisibility) {
      highestVisibility = data.ratio;
      mostVisibleSection = section;
    }
  });
  
  // First, set all sections to a slightly darker background (but not too dark)
  sortedSections.forEach(section => {
    const htmlSection = section as HTMLElement;
    
    // Skip navigation, top bar, footer elements and elements that should be excluded
    if (
      htmlSection.tagName.toLowerCase() === 'nav' ||
      htmlSection.closest('nav') ||
      htmlSection.tagName.toLowerCase() === 'footer' ||
      htmlSection.closest('footer') ||
      (htmlSection.classList.contains('bg-gray-100') && htmlSection.classList.contains('py-2')) || // TopBar
      htmlSection.closest('.bg-gray-100.py-2') ||
      htmlSection.dataset.excludeFromEffect === 'true'
    ) {
      return;
    }
    
    // Make inactive sections slightly darker - using a lighter gray
    htmlSection.style.backgroundColor = 'rgb(245, 245, 245)';
    
    // If the section has an overlay, make it visible
    if (htmlSection.dataset.hasOverlay === 'true') {
      const overlay = htmlSection.querySelector('.bg-overlay') as HTMLElement;
      if (overlay) {
        overlay.style.opacity = '1';
      }
    }
    
    // Special handling for BeforeAfterSection
    if (htmlSection.dataset.isBeforeAfterSection === 'true') {
      console.log('Applying inactive style to BeforeAfterSection');
      htmlSection.style.backgroundColor = 'rgb(245, 245, 245)';
      htmlSection.style.background = 'rgb(245, 245, 245)';
    }
    
    // Make sure the before/after labels keep their original styling
    const labels = htmlSection.querySelectorAll('[data-exclude-from-effect="true"]');
    labels.forEach(label => {
      const labelElement = label as HTMLElement;
      if (labelElement.style.backgroundColor.includes('333333') || 
          getComputedStyle(labelElement).backgroundColor.includes('51, 51, 51')) {
        labelElement.style.backgroundColor = '#333333';
        labelElement.style.color = 'white';
      }
    });
  });
  
  // Then, only set the most visible section to white
  if (mostVisibleSection) {
    const htmlSection = mostVisibleSection as HTMLElement;
    
    // Skip elements that should be excluded
    if (htmlSection.dataset.excludeFromEffect === 'true') {
      return;
    }
    
    htmlSection.style.backgroundColor = 'rgb(255, 255, 255)';
    
    // If the section has an overlay, hide it
    if (htmlSection.dataset.hasOverlay === 'true') {
      const overlay = htmlSection.querySelector('.bg-overlay') as HTMLElement;
      if (overlay) {
        overlay.style.opacity = '0';
      }
    }
    
    // Special handling for BeforeAfterSection
    if (htmlSection.dataset.isBeforeAfterSection === 'true') {
      console.log('Applying active style to BeforeAfterSection');
      htmlSection.style.backgroundColor = 'rgb(255, 255, 255)';
      htmlSection.style.background = 'rgb(255, 255, 255)';
    }
    
    // Make sure the before/after labels keep their original styling
    const labels = htmlSection.querySelectorAll('[data-exclude-from-effect="true"]');
    labels.forEach(label => {
      const labelElement = label as HTMLElement;
      if (labelElement.style.backgroundColor.includes('333333') || 
          getComputedStyle(labelElement).backgroundColor.includes('51, 51, 51')) {
        labelElement.style.backgroundColor = '#333333';
        labelElement.style.color = 'white';
      }
    });
  }
}

interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

/**
 * Lighten a color by the given factor
 * @param {string} color - CSS color string
 * @param {number} factor - Factor to lighten by (0-1)
 * @returns {string} - Lightened color
 */
function lightenColor(color: string, factor = 0.2): string {
  const rgba = parseRgba(color);
  if (!rgba) return color;
  
  // Lighten the color
  rgba.r = Math.min(255, rgba.r + (255 - rgba.r) * factor);
  rgba.g = Math.min(255, rgba.g + (255 - rgba.g) * factor);
  rgba.b = Math.min(255, rgba.b + (255 - rgba.b) * factor);
  
  return `rgba(${Math.round(rgba.r)}, ${Math.round(rgba.g)}, ${Math.round(rgba.b)}, ${rgba.a})`;
}

/**
 * Darken a color by the given factor
 * @param {string} color - CSS color string
 * @param {number} factor - Factor to darken by (0-1)
 * @returns {string} - Darkened color
 */
function darkenColor(color: string, factor = 0.2): string {
  const rgba = parseRgba(color);
  if (!rgba) return color;
  
  // Darken the color
  rgba.r = Math.max(0, rgba.r * (1 - factor));
  rgba.g = Math.max(0, rgba.g * (1 - factor));
  rgba.b = Math.max(0, rgba.b * (1 - factor));
  
  return `rgba(${Math.round(rgba.r)}, ${Math.round(rgba.g)}, ${Math.round(rgba.b)}, ${rgba.a})`;
}

/**
 * Parse a CSS color string into RGBA components
 * @param {string} color - CSS color string
 * @returns {RGBA|null} - RGBA object or null if parsing failed
 */
function parseRgba(color: string): RGBA | null {
  // Handle rgba format
  let match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*\.?\d+))?\)/);
  if (match) {
    return {
      r: parseInt(match[1], 10),
      g: parseInt(match[2], 10),
      b: parseInt(match[3], 10),
      a: match[4] ? parseFloat(match[4]) : 1
    };
  }
  
  // For simplicity, we'll just handle rgb/rgba
  // In a production environment, you'd want to handle more color formats
  return null;
}
