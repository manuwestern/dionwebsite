/**
 * Scroll Effects Utility
 * 
 * This utility adds scroll-based background transitions to sections.
 * When scrolling into a new section, the previous section becomes slightly darker,
 * and the new section becomes slightly lighter.
 */

// Options for the Intersection Observer
const observerOptions: IntersectionObserverInit = {
  root: null, // Use the viewport as the root
  rootMargin: '0px',
  threshold: [0.1, 0.5, 0.9] // Trigger at different visibility thresholds
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
  // Wait for DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll(sectionSelector);
    
    if (sections.length === 0) {
      console.warn('No sections found with selector:', sectionSelector);
      return;
    }
    
    // Set initial styles for all sections
    sections.forEach(section => {
      const htmlSection = section as HTMLElement;
      // Store the original background color or set a default
      htmlSection.dataset.originalBg = getComputedStyle(section).backgroundColor || 'rgba(255, 255, 255, 1)';
      
      // Add transition for smooth color changes
      htmlSection.style.transition = 'background-color 0.5s ease-in-out';
    });
    
    // Create an observer instance
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Start observing each section
    sections.forEach(section => {
      observer.observe(section);
    });
    
    // Also listen for scroll events for more fluid updates
    window.addEventListener('scroll', () => {
      requestAnimationFrame(updateSectionBackgrounds);
    }, { passive: true });
  });
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
  
  // Update backgrounds based on visibility and position relative to most visible section
  sortedSections.forEach(section => {
    const data = visibleSections.get(section);
    if (!data) return;
    
    const htmlSection = section as HTMLElement;
    const originalBg = htmlSection.dataset.originalBg || 'rgba(255, 255, 255, 1)';
    
    if (section === mostVisibleSection) {
      // Make the most visible section slightly lighter
      htmlSection.style.backgroundColor = lightenColor(originalBg, 0.08);
    } else if (data.isVisible) {
      // Sections that are visible but not the most visible
      const sectionIndex = sortedSections.indexOf(section);
      const mostVisibleIndex = mostVisibleSection ? sortedSections.indexOf(mostVisibleSection) : -1;
      
      if (sectionIndex < mostVisibleIndex) {
        // Sections above the most visible one - slightly darker
        // The further away, the darker it gets
        const distance = mostVisibleIndex - sectionIndex;
        const darkenFactor = Math.min(0.15, 0.05 + (distance * 0.03));
        htmlSection.style.backgroundColor = darkenColor(originalBg, darkenFactor);
      } else {
        // Sections below the most visible one - normal or slightly darker
        const distance = sectionIndex - mostVisibleIndex;
        if (distance <= 1) {
          // Next section - normal
          htmlSection.style.backgroundColor = originalBg;
        } else {
          // Sections further below - slightly darker
          const darkenFactor = Math.min(0.1, 0.03 + ((distance - 1) * 0.02));
          htmlSection.style.backgroundColor = darkenColor(originalBg, darkenFactor);
        }
      }
    } else {
      // Sections that are not visible at all - reset to original
      htmlSection.style.backgroundColor = originalBg;
    }
  });
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
