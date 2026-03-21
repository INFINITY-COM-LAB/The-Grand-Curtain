/**
 * AnalyticsProvider Component
 * Wraps the app with Web Vitals monitoring and analytics tracking
 */

import { useEffect, ReactNode } from 'react';
import { initWebVitals, Vital } from '../utils/webVitals';
import { useAnalytics } from '../hooks/useAnalytics';

interface AnalyticsProviderProps {
  children: ReactNode;
  enableVitals?: boolean;
  enablePageViews?: boolean;
}

export function AnalyticsProvider({
  children,
  enableVitals = true,
  enablePageViews = true,
}: AnalyticsProviderProps) {
  const analytics = useAnalytics({
    enabled: process.env.VITE_ANALYTICS_ENABLED !== 'false',
  });

  useEffect(() => {
    // Track page view on mount
    if (enablePageViews) {
      analytics.trackPageView('app_init');
    }

    // Initialize Web Vitals monitoring
    if (enableVitals) {
      const handleVital = (vital: Vital) => {
        console.debug(`[${vital.name}] ${vital.value.toFixed(2)}ms (${vital.rating})`);
        analytics.trackVital(vital);
      };

      initWebVitals(handleVital);
    }

    // Track visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        analytics.trackEvent({
          type: 'custom',
          name: 'page_hidden',
          metadata: { timestamp: Date.now() },
        });
        analytics.flush();
      } else {
        analytics.trackEvent({
          type: 'custom',
          name: 'page_visible',
          metadata: { timestamp: Date.now() },
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      // Flush remaining events on unmount
      analytics.flush();
    };
  }, []);

  return <>{children}</>;
}
