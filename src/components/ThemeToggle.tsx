import { Moon, Sun } from 'lucide-react';
import type { Theme } from '../hooks/useTheme';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
  className?: string;
}

/**
 * ThemeToggle - Button to switch between light and dark themes
 * 
 * Shows moon icon in dark mode, sun icon in light mode
 * Smooth transition with accessibility features
 */
export function ThemeToggle({ theme, onToggle, className = '' }: ThemeToggleProps) {
  const isDark = theme === 'dark';

  return (
    <button
      onClick={onToggle}
      className={`
        relative inline-flex items-center justify-center
        w-10 h-10 rounded-lg
        transition-all duration-300 ease-out
        ${isDark 
          ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400' 
          : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-600'
        }
        focus:outline-none focus:ring-2 focus:ring-offset-2 
        focus:ring-amber-500/50 focus:ring-offset-[#0d0d0d]
        group
        ${className}
      `}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      {/* Dark mode icon */}
      <Moon
        size={20}
        className={`
          absolute transition-all duration-300
          ${isDark 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-75'
          }
        `}
      />

      {/* Light mode icon */}
      <Sun
        size={20}
        className={`
          absolute transition-all duration-300
          ${isDark 
            ? 'opacity-0 scale-75' 
            : 'opacity-100 scale-100'
          }
        `}
      />

      {/* Focus ring animation */}
      <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-500 to-red-500 opacity-0 group-focus:opacity-10 transition-opacity duration-300" />
    </button>
  );
}
