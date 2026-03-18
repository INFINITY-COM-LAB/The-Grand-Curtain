/**
 * Email Validation Utility
 * RFC 5322 compliant email validation with length checks
 */

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false;
  if (email.length > 254) return false; // RFC 5321
  return emailRegex.test(email.trim());
}

export function sanitizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Validates email and returns detailed feedback
 */
export function validateEmailWithFeedback(email: string): { 
  valid: boolean; 
  error?: string 
} {
  if (!email) {
    return { valid: false, error: "Email is required" };
  }

  const trimmed = email.trim();

  if (trimmed.length > 254) {
    return { valid: false, error: "Email is too long (max 254 characters)" };
  }

  if (!isValidEmail(trimmed)) {
    return { valid: false, error: "Please enter a valid email address" };
  }

  return { valid: true };
}
