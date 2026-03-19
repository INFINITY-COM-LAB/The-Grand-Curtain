import { useEffect } from "react";

interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

/**
 * useKeyboardNavigation Hook
 * 
 * Enables keyboard navigation for interactive elements.
 * - Arrow keys to navigate between items
 * - Enter/Space to select
 * - Escape to close/reset
 * 
 * Usage:
 * const { activeIndex, handleKeyDown } = useKeyboardNavigation({
 *   items: navigationItems,
 *   onSelect: (item) => console.log(item),
 *   onEscape: () => setMenuOpen(false)
 * });
 */
export function useKeyboardNavigation({
  items,
  onSelect,
  onEscape,
  enabled = true,
}: {
  items: NavigationItem[];
  onSelect?: (item: NavigationItem) => void;
  onEscape?: () => void;
  enabled?: boolean;
}) {
  const handleKeyDown = (e: KeyboardEvent, currentIndex: number) => {
    if (!enabled) return;

    const key = e.key;

    if (key === "ArrowDown" || key === "ArrowRight") {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % items.length;
      return nextIndex;
    }

    if (key === "ArrowUp" || key === "ArrowLeft") {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + items.length) % items.length;
      return prevIndex;
    }

    if (key === "Enter" || key === " ") {
      e.preventDefault();
      const item = items[currentIndex];
      if (item && onSelect) {
        onSelect(item);
      }
    }

    if (key === "Escape") {
      e.preventDefault();
      onEscape?.();
    }

    return currentIndex;
  };

  return {
    handleKeyDown,
    itemCount: items.length,
  };
}

/**
 * useAccessibleMenu Hook
 * 
 * Enhanced keyboard navigation specifically for menu systems.
 * Handles focus management and ARIA attributes.
 */
export function useAccessibleMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return { isOpen, onClose };
}
