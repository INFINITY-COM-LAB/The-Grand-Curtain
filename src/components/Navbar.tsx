import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import type { Theme } from "../hooks/useTheme";

interface NavbarProps {
  theme: Theme;
  onThemeToggle: () => void;
}

export function Navbar({ theme, onThemeToggle }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navItems = [
    { label: "Now Showing", href: "#now-showing" },
    { label: "Upcoming", href: "#upcoming" },
    { label: "About", href: "#about" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 ${
        theme === "dark"
          ? "bg-[rgba(13,13,13,0.8)] border-b border-amber-500/20"
          : "bg-white/80 border-b border-slate-200"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a
            href="#"
            className={`text-2xl font-bold font-serif tracking-wider transition-colors ${
              theme === "dark"
                ? "text-amber-400 hover:text-amber-300"
                : "text-amber-600 hover:text-amber-700"
            }`}
            aria-label="The Grand Curtain home"
          >
            🎭 The Grand Curtain
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`transition-colors font-medium ${
                  theme === "dark"
                    ? "text-gray-300 hover:text-amber-400"
                    : "text-slate-700 hover:text-amber-600"
                }`}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
            <ThemeToggle theme={theme} onToggle={onThemeToggle} />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle theme={theme} onToggle={onThemeToggle} />
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-lg transition-colors ${
                theme === "dark"
                  ? "hover:bg-amber-500/10 text-amber-400"
                  : "hover:bg-amber-500/10 text-amber-600"
              }`}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className={`md:hidden pb-4 space-y-2 border-t ${
            theme === "dark"
              ? "border-amber-500/20"
              : "border-slate-200"
          }`}>
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`block px-3 py-2 rounded-lg transition-colors ${
                  theme === "dark"
                    ? "text-gray-300 hover:bg-amber-500/10 hover:text-amber-400"
                    : "text-slate-700 hover:bg-amber-500/10 hover:text-amber-600"
                }`}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
