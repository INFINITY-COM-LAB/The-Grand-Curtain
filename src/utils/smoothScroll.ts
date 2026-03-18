/**
 * Smooth scroll utility for internal navigation
 * Handles scroll-to-section with smooth animation
 */

export const smoothScrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (!element) return;

  const offset = 60; // Account for fixed navbar
  const top = element.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top,
    behavior: "smooth",
  });
};

/**
 * Detects if an element is in the viewport with optional margin
 */
export const isElementInViewport = (element: Element, margin = 0): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) + margin &&
    rect.bottom >= -margin
  );
};

/**
 * Get the currently active section based on scroll position
 */
export const getActiveSectionId = (): string | null => {
  const sections = document.querySelectorAll("section[id]");
  let activeId: string | null = null;
  let maxVisibility = 0;

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const visibility = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);

    if (visibility > maxVisibility) {
      maxVisibility = visibility;
      activeId = section.id;
    }
  });

  return activeId;
};
