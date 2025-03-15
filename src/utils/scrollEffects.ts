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

/**
 * Initialize scroll effects for the given sections
 * @param {string} sectionSelector - CSS selector for the sections to observe
 */
export function initScrollEffects(sectionSelector = 'section, [data-section]'): void {
  console.log('Initializing scroll effects with selector:', sectionSelector);
  
  // Function to initialize the effects
  const initialize = () => {
    // Use a more comprehensive selector but exclude navigation and before/after labels
    const sections = document.querySelectorAll(
      sectionSelector + 
      ', .py-8, .py-16, .py-20, .py-24, .BeforeAfterSection, div[class*="py-"]'
    );
    console.log('Found sections:', sections.length);
    
    if (sections.length === 0) {
      console.warn('No sections found with selector:', sectionSelector);
      return;
    }
    
    // Set initial styles for all sections
    sections.forEach(section => {
      const htmlSection = section as HTMLElement;
      
      // Skip navigation elements and before/after labels
      if (
        htmlSection.classList.contains('navigation') || 
        htmlSection.classList.contains('nav') || 
        htmlSection.id === 'navigation' ||
        htmlSection.classList.contains('before-label') ||
        htmlSection.classList.contains('after-label') ||
        htmlSection.closest('.navigation') ||
        htmlSection.closest('nav')
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
        htmlSection.classList.contains('BeforeAfterSection') || 
        htmlSection.querySelector('.before-after-slider')
      ) {
        // Find the container that should receive the background color change
        const container = htmlSection.querySelector('.container') || htmlSection;
        if (container) {
          (container as HTMLElement).style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
          (container as HTMLElement).style.backgroundColor = 'rgb(248, 248, 248)';
          (container as HTMLElement).dataset.isBeforeAfterContainer = 'true';
        }
        
        // Make sure the before/after labels are not affected
        const labels = htmlSection.querySelectorAll('.before-label, .after-label');
        labels.forEach(label => {
          (label as HTMLElement).style.transition = 'none';
          (label as HTMLElement).dataset.excludeFromEffect = 'true';
        });
      }
    });
    
    // Create an observer instance
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Start observing each section
    sections.forEach(section => {
      const htmlSection = section as HTMLElement;
      
      // Skip navigation elements and before/after labels
      if (
        htmlSection.classList.contains('navigation') || 
        htmlSection.classList.contains('nav') || 
        htmlSection.id === 'navigation' ||
        htmlSection.classList.contains('before-label') ||
        htmlSection.classList.contains('after-label') ||
        htmlSection.closest('.navigation') ||
        htmlSection.closest('nav') ||
        htmlSection.dataset.excludeFromEffect === 'true'
      ) {
        return;
      }
      
      observer.observe(section);
    });
    
    // Also listen for scroll events for more fluid updates
    window.addEventListener('scroll', () => {
      requestAnimationFrame(updateSectionBackgrounds);
    }, { passive: true });
  };
  
  // Call initialize function
  initialize();
  
  // Also wait for DOM content to be loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
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
    
    // Skip elements that should be excluded
    if (htmlSection.dataset.excludeFromEffect === 'true') {
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
    if (htmlSection.classList.contains('BeforeAfterSection') || htmlSection.querySelector('.before-after-slider')) {
      const container = htmlSection.querySelector('.container') || htmlSection;
      if (container && (container as HTMLElement).dataset.isBeforeAfterContainer === 'true') {
        (container as HTMLElement).style.backgroundColor = 'rgb(245, 245, 245)';
      }
    }
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
    if (htmlSection.classList.contains('BeforeAfterSection') || htmlSection.querySelector('.before-after-slider')) {
      const container = htmlSection.querySelector('.container') || htmlSection;
      if (container && (container as HTMLElement).dataset.isBeforeAfterContainer === 'true') {
        (container as HTMLElement).style.backgroundColor = 'rgb(255, 255, 255)';
      }
    }
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
