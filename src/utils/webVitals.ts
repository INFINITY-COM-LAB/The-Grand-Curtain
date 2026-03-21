/**
 * Web Vitals Monitoring
 * Captures Core Web Vitals (LCP, FID, CLS) and sends to analytics backend
 * Implements Google Web Vitals library pattern
 */

export interface Vital {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType?: string;
  entries?: PerformanceEntries[];
}

export interface PerformanceEntries {
  name?: string;
  entryType?: string;
  startTime?: number;
  duration?: number;
  size?: number;
  renderTime?: number;
  loadTime?: number;
}

// Thresholds for rating (good/needs-improvement/poor)
const THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 },
  FID: { good: 100, needsImprovement: 300 },
  CLS: { good: 0.1, needsImprovement: 0.25 },
  TTFB: { good: 800, needsImprovement: 1800 },
};

/**
 * Get rating based on value and metric thresholds
 */
export function getRating(
  metricName: string,
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  const thresholds = THRESHOLDS[metricName as keyof typeof THRESHOLDS];
  if (!thresholds) return 'poor';

  if (value <= thresholds.good) return 'good';
  if (value <= thresholds.needsImprovement) return 'needs-improvement';
  return 'poor';
}

/**
 * Track Largest Contentful Paint (LCP)
 * Measures when the largest content element becomes visible
 */
export function onLCP(callback: (vital: Vital) => void): void {
  if (!('PerformanceObserver' in window)) return;

  let lastEntryTime = 0;

  const observer = new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const lastEntry = entries[entries.length - 1];
    lastEntryTime = lastEntry.renderTime || lastEntry.loadTime || 0;

    const vital: Vital = {
      name: 'LCP',
      value: lastEntryTime,
      delta: lastEntryTime,
      rating: getRating('LCP', lastEntryTime),
      id: `lcp-${Date.now()}`,
      entries: entries as unknown as PerformanceEntries[],
    };

    callback(vital);
  });

  observer.observe({ entryTypes: ['largest-contentful-paint'] });

  // Cleanup on page hide
  if ('onhidden' in document) {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) observer.disconnect();
    });
  }
}

/**
 * Track First Input Delay (FID)
 * Measures response time to user input
 */
export function onFID(callback: (vital: Vital) => void): void {
  if (!('PerformanceObserver' in window)) return;

  const observer = new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const firstInputEntry = entries[0];

    const vital: Vital = {
      name: 'FID',
      value: (firstInputEntry as any).processingDuration || 0,
      delta: (firstInputEntry as any).processingDuration || 0,
      rating: getRating('FID', (firstInputEntry as any).processingDuration || 0),
      id: `fid-${Date.now()}`,
      entries: entries as unknown as PerformanceEntries[],
    };

    callback(vital);
  });

  observer.observe({ entryTypes: ['first-input'] });
}

/**
 * Track Cumulative Layout Shift (CLS)
 * Measures visual stability and unexpected layout shifts
 */
export function onCLS(callback: (vital: Vital) => void): void {
  if (!('PerformanceObserver' in window)) return;

  let clsValue = 0;
  let clsDelta = 0;

  const observer = new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (!(entry as any).hadRecentInput) {
        const firstSessionEntry = clsValue + (entry as any).value;
        clsDelta = (entry as any).value;
        clsValue = firstSessionEntry;

        const vital: Vital = {
          name: 'CLS',
          value: clsValue,
          delta: clsDelta,
          rating: getRating('CLS', clsValue),
          id: `cls-${Date.now()}`,
          entries: [entry as unknown as PerformanceEntries],
        };

        callback(vital);
      }
    }
  });

  observer.observe({ entryTypes: ['layout-shift'] });
}

/**
 * Track Time to First Byte (TTFB)
 * Measures server response time
 */
export function onTTFB(callback: (vital: Vital) => void): void {
  if (!('PerformanceNavigationTiming' in window)) return;

  const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

  if (navEntry) {
    const ttfb = navEntry.responseStart - navEntry.fetchStart;

    const vital: Vital = {
      name: 'TTFB',
      value: ttfb,
      delta: ttfb,
      rating: getRating('TTFB', ttfb),
      id: `ttfb-${Date.now()}`,
    };

    callback(vital);
  }
}

/**
 * Initialize all Web Vitals monitoring
 */
export function initWebVitals(callback: (vital: Vital) => void): void {
  onTTFB(callback);
  onLCP(callback);
  onFID(callback);
  onCLS(callback);
}
