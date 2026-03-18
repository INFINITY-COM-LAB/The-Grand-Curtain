/**
 * Email validation with RFC 5322 standard patterns
 * Safe to use for client-side validation (server-side validation recommended for security)
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

/**
 * Sanitize user input to prevent XSS attacks
 * Removes potential script tags and dangerous attributes
 */
export const sanitizeInput = (input: string): string => {
  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML;
};

/**
 * Validate that a value is not null, undefined, or empty string
 */
export const isNonEmpty = (value: string | null | undefined): boolean => {
  return typeof value === "string" && value.trim().length > 0;
};

/**
 * Truncate text with ellipsis if it exceeds max length
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

/**
 * Validate URL format for external links
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
