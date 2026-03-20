import { useState, useEffect } from "react";

interface SectionConfig {
  id: string;
  offset?: number; // Extra offset from top (default: 100px for fixed navbar)
}

/**
 * Custom hook to track which section is currently visible in viewport.
 * Useful for highlighting active navigation links based on scroll position.
 * 
 * @param sections - Array of section IDs to track
 * @param offset - Optional vertical offset from top (default: 100px)
 * @returns Currently active section ID or null
 */
export function useActiveSectionScroll(sections: string[], offset: number = 100) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Find the section that's currently in view
      let currentActive: string | null = null;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        // Check if section top is above the viewport bottom with offset
        if (rect.top <= offset) {
          currentActive = sectionId;
        } else {
          break; // Stop checking once we're past the current scroll position
        }
      }

      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections, offset]);

  return activeSection;
}
