/**
 * Analytics Service
 * Centralized analytics event tracking and reporting
 */

import { apiClient, ApiResponse } from './apiClient';

export type EventType =
  | 'page_view'
  | 'button_click'
  | 'form_submit'
  | 'form_error'
  | 'newsletter_signup'
  | 'show_interaction'
  | 'custom';

export interface AnalyticsEvent {
  eventType: EventType;
  eventName: string;
  properties?: Record<string, unknown>;
  timestamp?: number;
  sessionId?: string;
  userId?: string;
}

export interface AnalyticsResponse {
  success: boolean;
  eventId?: string;
  message?: string;
}

class AnalyticsService {
  private eventQueue: AnalyticsEvent[] = [];
  private queueSize = 0;
  private maxQueueSize = 50;
  private flushInterval = 30000; // 30 seconds
  private flushTimer: NodeJS.Timeout | null = null;
  private sessionId: string;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.startAutoFlush();
  }

  /**
   * Track an analytics event
   * @param event - Event to track
   * @returns Promise that resolves when event is queued
   */
  async trackEvent(event: Omit<AnalyticsEvent, 'timestamp' | 'sessionId'>): Promise<void> {
    const enrichedEvent: AnalyticsEvent = {
      ...event,
      timestamp: Date.now(),
      sessionId: this.sessionId,
    };

    this.eventQueue.push(enrichedEvent);
    this.queueSize++;

    // Auto-flush if queue exceeds max size
    if (this.queueSize >= this.maxQueueSize) {
      await this.flush();
    }
  }

  /**
   * Track page view
   * @param pageName - Name of the page
   * @param properties - Optional additional properties
   */
  async trackPageView(pageName: string, properties?: Record<string, unknown>): Promise<void> {
    await this.trackEvent({
      eventType: 'page_view',
      eventName: `View: ${pageName}`,
      properties,
    });
  }

  /**
   * Track button click
   * @param buttonName - Name/identifier of button
   * @param properties - Optional additional properties
   */
  async trackButtonClick(buttonName: string, properties?: Record<string, unknown>): Promise<void> {
    await this.trackEvent({
      eventType: 'button_click',
      eventName: `Click: ${buttonName}`,
      properties,
    });
  }

  /**
   * Track form submission
   * @param formName - Name/identifier of form
   * @param properties - Form data or submission properties
   */
  async trackFormSubmit(formName: string, properties?: Record<string, unknown>): Promise<void> {
    await this.trackEvent({
      eventType: 'form_submit',
      eventName: `Submit: ${formName}`,
      properties,
    });
  }

  /**
   * Track form error
   * @param formName - Name/identifier of form
   * @param errorMessage - Error message from form
   * @param properties - Additional properties
   */
  async trackFormError(formName: string, errorMessage: string, properties?: Record<string, unknown>): Promise<void> {
    await this.trackEvent({
      eventType: 'form_error',
      eventName: `Error: ${formName}`,
      properties: { error: errorMessage, ...properties },
    });
  }

  /**
   * Track newsletter signup
   * @param source - Where the signup came from
   * @param properties - Additional properties
   */
  async trackNewsletterSignup(source: string, properties?: Record<string, unknown>): Promise<void> {
    await this.trackEvent({
      eventType: 'newsletter_signup',
      eventName: 'Newsletter Signup',
      properties: { source, ...properties },
    });
  }

  /**
   * Track show/performance interaction
   * @param showName - Name of the show
   * @param action - Type of interaction (view, click, etc.)
   * @param properties - Additional properties
   */
  async trackShowInteraction(showName: string, action: string, properties?: Record<string, unknown>): Promise<void> {
    await this.trackEvent({
      eventType: 'show_interaction',
      eventName: `Show: ${action}`,
      properties: { showName, ...properties },
    });
  }

  /**
   * Flush queued events to server
   * @returns Promise resolving when flush completes
   */
  async flush(): Promise<ApiResponse<AnalyticsResponse>> {
    if (this.queueSize === 0) {
      return {
        success: true,
        statusCode: 200,
      };
    }

    const eventsToSend = [...this.eventQueue];
    this.eventQueue = [];
    this.queueSize = 0;

    return apiClient.post<AnalyticsResponse>('/analytics/events', {
      events: eventsToSend,
      batchSize: eventsToSend.length,
      timestamp: Date.now(),
    });
  }

  /**
   * Start auto-flush timer
   */
  private startAutoFlush(): void {
    this.flushTimer = setInterval(() => {
      this.flush().catch(console.error);
    }, this.flushInterval);
  }

  /**
   * Stop auto-flush timer
   */
  stopAutoFlush(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
      this.flushTimer = null;
    }
  }

  /**
   * Generate a unique session ID
   */
  private generateSessionId(): string {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get current session ID
   */
  getSessionId(): string {
    return this.sessionId;
  }
}

export const analyticsService = new AnalyticsService();
