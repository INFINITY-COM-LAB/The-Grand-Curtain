import { useCallback } from 'react';

export type EventType = 
  | 'page_view'
  | 'section_view'
  | 'show_click'
  | 'ticket_click'
  | 'email_signup'
  | 'email_error';

export interface AnalyticsEvent {
  type: EventType;
  label?: string;
  value?: string | number;
  timestamp: number;
  userAgent: string;
  url: string;
}

// In-memory event queue (would sync to backend)
const eventQueue: AnalyticsEvent[] = [];

export function useAnalytics() {
  const trackEvent = useCallback((
    type: EventType,
    label?: string,
    value?: string | number
  ) => {
    const event: AnalyticsEvent = {
      type,
      label,
      value,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    eventQueue.push(event);
    console.log('[Analytics]', event);

    // If queue reaches threshold, flush to backend
    if (eventQueue.length >= 10) {
      flushEvents();
    }
  }, []);

  const trackPageView = useCallback(() => {
    trackEvent('page_view', document.title);
  }, [trackEvent]);

  const trackSectionView = useCallback((sectionId: string) => {
    trackEvent('section_view', sectionId);
  }, [trackEvent]);

  const trackShowClick = useCallback((showTitle: string, action: 'details' | 'tickets') => {
    trackEvent('show_click', showTitle, action);
  }, [trackEvent]);

  const trackEmailSignup = useCallback((email: string) => {
    trackEvent('email_signup', email);
  }, [trackEvent]);

  const trackEmailError = useCallback((error: string) => {
    trackEvent('email_error', error);
  }, [trackEvent]);

  return {
    trackEvent,
    trackPageView,
    trackSectionView,
    trackShowClick,
    trackEmailSignup,
    trackEmailError,
    getQueueLength: () => eventQueue.length,
    flushEvents,
  };
}

export function flushEvents() {
  if (eventQueue.length === 0) return;

  const eventsToSend = [...eventQueue];
  eventQueue.length = 0;

  // TODO: Send to backend
  // fetch('/api/analytics', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ events: eventsToSend })
  // }).catch(err => console.error('[Analytics] Failed to send:', err));

  console.log('[Analytics] Flushed', eventsToSend.length, 'events');
}
