/**
 * Performance Monitoring Utility
 * 
 * This utility helps track Core Web Vitals and other performance metrics.
 * It uses the Web Vitals library to measure LCP, FID, CLS, and other metrics.
 * 
 * Core Web Vitals:
 * - LCP (Largest Contentful Paint): Measures loading performance
 * - FID (First Input Delay): Measures interactivity
 * - CLS (Cumulative Layout Shift): Measures visual stability
 */

// Types for performance metrics
type MetricName = 'LCP' | 'FID' | 'CLS' | 'TTFB' | 'FCP';

interface PerformanceMetric {
  name: MetricName;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta?: number;
  id?: string;
}

// Thresholds for Core Web Vitals
const thresholds = {
  LCP: { good: 2500, poor: 4000 }, // milliseconds
  FID: { good: 100, poor: 300 },   // milliseconds
  CLS: { good: 0.1, poor: 0.25 },  // unitless
  TTFB: { good: 800, poor: 1800 }, // milliseconds
  FCP: { good: 1800, poor: 3000 }, // milliseconds
};

// Function to determine rating based on metric value
function getRating(name: MetricName, value: number): 'good' | 'needs-improvement' | 'poor' {
  if (value <= thresholds[name].good) return 'good';
  if (value <= thresholds[name].poor) return 'needs-improvement';
  return 'poor';
}

// Function to log metrics to console with color coding
function logMetric(metric: PerformanceMetric) {
  const colors = {
    good: 'color: green; font-weight: bold',
    'needs-improvement': 'color: orange; font-weight: bold',
    poor: 'color: red; font-weight: bold',
  };

  console.log(
    `%c${metric.name}: %c${metric.value.toFixed(2)} %c(${metric.rating})`,
    'font-weight: bold',
    colors[metric.rating],
    'font-weight: normal'
  );
}

// Function to measure LCP (Largest Contentful Paint)
function measureLCP() {
  if (!PerformanceObserver) return;

  try {
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      if (lastEntry) {
        const lcp = lastEntry.startTime;
        const metric: PerformanceMetric = {
          name: 'LCP',
          value: lcp,
          rating: getRating('LCP', lcp),
        };
        
        logMetric(metric);
        
        // Store metric for later analysis
        window.performance.mark('measured-lcp');
        window.performance.measure('lcp', 'navigationStart', 'measured-lcp');
      }
    });
    
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (e) {
    console.error('Error measuring LCP:', e);
  }
}

// Function to measure FID (First Input Delay)
function measureFID() {
  if (!PerformanceObserver) return;

  try {
    const fidObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const firstEntry = entries[0];
      
      if (firstEntry) {
        // Need to cast to PerformanceEventTiming to access processingStart
        const entry = firstEntry as PerformanceEventTiming;
        const fid = entry.processingStart - entry.startTime;
        const metric: PerformanceMetric = {
          name: 'FID',
          value: fid,
          rating: getRating('FID', fid),
        };
        
        logMetric(metric);
      }
    });
    
    fidObserver.observe({ type: 'first-input', buffered: true });
  } catch (e) {
    console.error('Error measuring FID:', e);
  }
}

// Function to measure CLS (Cumulative Layout Shift)
function measureCLS() {
  if (!PerformanceObserver) return;

  try {
    let clsValue = 0;
    let clsEntries: PerformanceEntry[] = [];
    
    const clsObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      
      entries.forEach((entry) => {
        // Only count layout shifts without recent user input
        if (!(entry as any).hadRecentInput) {
          const value = (entry as any).value;
          clsValue += value;
          clsEntries.push(entry);
          
          const metric: PerformanceMetric = {
            name: 'CLS',
            value: clsValue,
            rating: getRating('CLS', clsValue),
          };
          
          logMetric(metric);
        }
      });
    });
    
    clsObserver.observe({ type: 'layout-shift', buffered: true });
    
    // Report final CLS when the page is being unloaded
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        const metric: PerformanceMetric = {
          name: 'CLS',
          value: clsValue,
          rating: getRating('CLS', clsValue),
        };
        
        // Send the final CLS value to analytics
        console.log('Final CLS:', metric);
      }
    });
  } catch (e) {
    console.error('Error measuring CLS:', e);
  }
}

// Function to measure TTFB (Time to First Byte)
function measureTTFB() {
  if (!performance || !performance.timing) return;

  try {
    const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (navigationTiming) {
      const ttfb = navigationTiming.responseStart;
      const metric: PerformanceMetric = {
        name: 'TTFB',
        value: ttfb,
        rating: getRating('TTFB', ttfb),
      };
      
      logMetric(metric);
    }
  } catch (e) {
    console.error('Error measuring TTFB:', e);
  }
}

// Function to measure FCP (First Contentful Paint)
function measureFCP() {
  if (!PerformanceObserver) return;

  try {
    const fcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const firstEntry = entries[0];
      
      if (firstEntry) {
        const fcp = firstEntry.startTime;
        const metric: PerformanceMetric = {
          name: 'FCP',
          value: fcp,
          rating: getRating('FCP', fcp),
        };
        
        logMetric(metric);
      }
    });
    
    fcpObserver.observe({ type: 'paint', buffered: true });
  } catch (e) {
    console.error('Error measuring FCP:', e);
  }
}

// Main function to initialize performance monitoring
export function initPerformanceMonitoring() {
  console.log('Initializing performance monitoring...');
  
  // Wait for the page to be fully loaded
  window.addEventListener('load', () => {
    // Use setTimeout to ensure metrics are captured after the page is stable
    setTimeout(() => {
      console.group('Core Web Vitals Metrics');
      measureLCP();
      measureFID();
      measureCLS();
      measureTTFB();
      measureFCP();
      console.groupEnd();
      
      // Log general performance metrics
      const pageLoadTime = performance.now();
      console.log(`Total page load time: ${pageLoadTime.toFixed(2)}ms`);
    }, 1000);
  });
}

// Export individual measurement functions for selective use
export { measureLCP, measureFID, measureCLS, measureTTFB, measureFCP };
