/**
 * useAnalytics Hook
 * Central hook for event tracking, page views, and performance metrics
 * Batches events for efficient transmission
 */

import { useCallback, useEffect, useRef } from 'react';
import { Vital } from '../utils/webVitals';

export interface AnalyticsEvent {
  type: 'page_view' | 'click' | 'form_submit' | 'web_vital' | 'error' | 'custom';
  name: string;
  value?: number;
  metadata?: Record<string, any>;
  timestamp: number;
}

interface AnalyticsConfig {
  enabled: boolean;
  apiUrl: string;
  batchSize: number;
  flushInterval: number;
  sessionId: string;
}

const DEFAULT_CONFIG: AnalyticsConfig = {
  enabled: true,
  apiUrl: process.env.VITE_ANALYTICS_API_URL || 'https://api.example.com/analytics',
  batchSize: 50,
  flushInterval: 30000,
  sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
};

let eventQueue: AnalyticsEvent[] = [];
let flushTimer: NodeJS.Timeout | null = null;

async function flushEvents(config: AnalyticsConfig): Promise<void> {
  if (eventQueue.length === 0) return;

  const eventsToSend = [...eventQueue];
  eventQueue = [];

  if (!config.enabled) {
    console.debug('Analytics disabled, queued events:', eventsToSend.length);
    return;
  }

  try {
    const response = await fetch(`${config.apiUrl}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: config.sessionId,
        events: eventsToSend,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      }),
    });

    if (!response.ok) {
      console.warn('Analytics flush failed:', response.statusText);
      eventQueue = [...eventsToSend, ...eventQueue].slice(0, config.batchSize);
    }
  } catch (error) {
    console.error('Analytics flush error:', error);
    eventQueue = [...eventsToSend, ...eventQueue].slice(0, config.batchSize);
  }
}

function scheduleFlush(config: AnalyticsConfig): void {
  if (flushTimer) clearInterval(flushTimer);
  flushTimer = setInterval(() => {
    flushEvents(config);
  }, config.flushInterval);
}

export function trackEvent(
  event: Omit<AnalyticsEvent, 'timestamp'>,
  config: AnalyticsConfig = DEFAULT_CONFIG
): void {
  const fullEvent: AnalyticsEvent = {
    ...event,
    timestamp: Date.now(),
  };

  eventQueue.push(fullEvent);

  if (eventQueue.length >= config.batchSize) {
    flushEvents(config);
  }
}

export function trackVital(vital: Vital, config: AnalyticsConfig = DEFAULT_CONFIG): void {
  trackEvent(
    {
      type: 'web_vital',
      name: vital.name,
      value: vital.value,
      metadata: {
        rating: vital.rating,
        delta: vital.delta,
        id: vital.id,
      },
    },
    config
  );
}

export function trackPageView(
  pageName: string,
  config: AnalyticsConfig = DEFAULT_CONFIG
): void {
  trackEvent(
    {
      type: 'page_view',
      name: pageName,
      metadata: {
        pathname: window.location.pathname,
        referrer: document.referrer,
      },
    },
    config
  );
}

export function useAnalytics(customConfig?: Partial<AnalyticsConfig>) {
  const configRef = useRef({ ...DEFAULT_CONFIG, ...customConfig });

  useEffect(() => {
    scheduleFlush(configRef.current);

    const handleUnload = () => {
      flushEvents(configRef.current);
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      if (flushTimer) clearInterval(flushTimer);
    };
  }, []);

  const track = useCallback(
    (event: Omit<AnalyticsEvent, 'timestamp'>) => {
      trackEvent(event, configRef.current);
    },
    []
  );

  const trackVitalData = useCallback((vital: Vital) => {
    trackVital(vital, configRef.current);
  }, []);

  const trackPageViewData = useCallback((pageName: string) => {
    trackPageView(pageName, configRef.current);
  }, []);

  const flush = useCallback(() => {
    flushEvents(configRef.current);
  }, []);

  return {
    track,
    trackVital: trackVitalData,
    trackPageView: trackPageViewData,
    flush,
    getQueueSize: () => eventQueue.length,
    getSessionId: () => configRef.current.sessionId,
  };
}
