/**
 * Newsletter Service
 * Handles all newsletter subscription and email management API calls
 */

import { apiClient, ApiResponse } from './apiClient';

export interface NewsletterSubscriber {
  id?: string;
  email: string;
  subscribedAt?: string;
  status: 'active' | 'unsubscribed' | 'pending';
  tags?: string[];
}

export interface NewsletterResponse {
  message: string;
  subscriberId?: string;
  email?: string;
}

export interface NewsletterError {
  code: string;
  message: string;
  field?: string;
}

class NewsletterService {
  /**
   * Subscribe a user to the newsletter
   * @param email - User's email address
   * @returns Response with subscription status
   */
  async subscribe(email: string): Promise<ApiResponse<NewsletterResponse>> {
    // Validate email format
    if (!this.isValidEmail(email)) {
      return {
        success: false,
        error: 'Invalid email format',
        statusCode: 400,
      };
    }

    return apiClient.post<NewsletterResponse>('/newsletter/subscribe', { email });
  }

  /**
   * Unsubscribe a user from the newsletter
   * @param email - User's email address
   * @returns Response with unsubscribe status
   */
  async unsubscribe(email: string): Promise<ApiResponse<NewsletterResponse>> {
    return apiClient.post<NewsletterResponse>('/newsletter/unsubscribe', { email });
  }

  /**
   * Check if an email is already subscribed
   * @param email - User's email address
   * @returns Subscription status
   */
  async checkStatus(email: string): Promise<ApiResponse<{ subscribed: boolean; status?: string }>> {
    return apiClient.get(`/newsletter/status/${encodeURIComponent(email)}`);
  }

  /**
   * Update subscriber preferences
   * @param email - User's email address
   * @param preferences - Updated preferences object
   * @returns Updated subscriber info
   */
  async updatePreferences(
    email: string,
    preferences: Record<string, unknown>
  ): Promise<ApiResponse<NewsletterResponse>> {
    return apiClient.put<NewsletterResponse>(`/newsletter/${encodeURIComponent(email)}/preferences`, preferences);
  }

  /**
   * Validate email format
   * @param email - Email to validate
   * @returns True if valid email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  }

  /**
   * Format error response
   * @param error - Error object from API
   * @returns Formatted error message for UI
   */
  formatErrorMessage(error: unknown): string {
    if (typeof error === 'string') return error;
    if (error && typeof error === 'object' && 'message' in error) {
      return (error as { message: string }).message;
    }
    return 'An error occurred. Please try again.';
  }
}

export const newsletterService = new NewsletterService();
