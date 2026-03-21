/**
 * Ticketing Service
 * Handles ticket availability, pricing, and booking API calls
 */

import { apiClient, ApiResponse } from './apiClient';

export interface ShowTicketing {
  showId: string;
  showName: string;
  availableTickets: number;
  totalCapacity: number;
  prices: {
    general: number;
    premium: number;
    student?: number;
  };
}

export interface TicketBooking {
  bookingId?: string;
  showId: string;
  quantity: number;
  ticketType: 'general' | 'premium' | 'student';
  customerEmail: string;
  totalPrice: number;
}

export interface TicketingResponse {
  success: boolean;
  message: string;
  bookingId?: string;
  checkoutUrl?: string;
  confirmationDetails?: TicketBooking;
}

class TicketingService {
  /**
   * Get ticket availability for a show
   * @param showId - ID of the show
   * @returns Show ticketing information
   */
  async getShowTickets(showId: string): Promise<ApiResponse<ShowTicketing>> {
    return apiClient.get<ShowTicketing>(`/ticketing/shows/${encodeURIComponent(showId)}`);
  }

  /**
   * Check if tickets are available for a show
   * @param showId - ID of the show
   * @param quantity - Number of tickets needed
   * @returns Availability status
   */
  async checkAvailability(showId: string, quantity: number): Promise<ApiResponse<{ available: boolean; remainingTickets: number }>> {
    return apiClient.get(`/ticketing/shows/${encodeURIComponent(showId)}/availability?quantity=${quantity}`);
  }

  /**
   * Create a ticket booking
   * @param booking - Booking details
   * @returns Booking confirmation with checkout URL
   */
  async createBooking(booking: Omit<TicketBooking, 'bookingId'>): Promise<ApiResponse<TicketingResponse>> {
    return apiClient.post<TicketingResponse>('/ticketing/bookings', booking);
  }

  /**
   * Get booking status
   * @param bookingId - ID of the booking
   * @returns Booking status and details
   */
  async getBookingStatus(bookingId: string): Promise<ApiResponse<TicketBooking>> {
    return apiClient.get<TicketBooking>(`/ticketing/bookings/${encodeURIComponent(bookingId)}`);
  }

  /**
   * Cancel a booking
   * @param bookingId - ID of the booking to cancel
   * @returns Cancellation response
   */
  async cancelBooking(bookingId: string): Promise<ApiResponse<{ message: string; refundAmount?: number }>> {
    return apiClient.delete(`/ticketing/bookings/${encodeURIComponent(bookingId)}`);
  }

  /**
   * Get all active shows with available tickets
   * @returns List of shows with ticket info
   */
  async getAvailableShows(): Promise<ApiResponse<ShowTicketing[]>> {
    return apiClient.get<ShowTicketing[]>('/ticketing/shows');
  }

  /**
   * Calculate ticket price
   * @param showId - ID of the show
   * @param ticketType - Type of ticket
   * @param quantity - Number of tickets
   * @returns Price breakdown
   */
  async calculatePrice(
    showId: string,
    ticketType: string,
    quantity: number
  ): Promise<ApiResponse<{ unitPrice: number; totalPrice: number; fees: number; finalTotal: number }>> {
    return apiClient.get(
      `/ticketing/shows/${encodeURIComponent(showId)}/price?type=${ticketType}&quantity=${quantity}`
    );
  }
}

export const ticketingService = new TicketingService();
