import { Calendar, MapPin } from "lucide-react";
import { LazyImage } from "./LazyImage";
import { cn } from "../utils/cn";

export interface Show {
  id: string;
  title: string;
  composer: string;
  image: string;
  duration: string;
  rating: number;
  venue?: string;
  date?: string;
  tags: string[];
  description?: string;
}

interface ShowCardProps {
  show: Show;
  variant?: "default" | "compact";
  onClick?: (show: Show) => void;
  className?: string;
}

/**
 * ShowCard Component
 * 
 * Reusable card component for displaying theatre shows.
 * Supports multiple variants and click handlers.
 * 
 * Features:
 * - Lazy-loaded images
 * - Responsive design
 * - Hover animations
 * - Rating display
 * - Tag system
 */
export function ShowCard({
  show,
  variant = "default",
  onClick,
  className,
}: ShowCardProps) {
  const handleClick = () => {
    onClick?.(show);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === "Enter" || e.key === " ") && onClick) {
      e.preventDefault();
      onClick(show);
    }
  };

  if (variant === "compact") {
    return (
      <div className={cn("flex gap-4", className)}>
        <div className="w-24 h-32 shrink-0 rounded-lg overflow-hidden">
          <LazyImage
            src={show.image}
            alt={show.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white line-clamp-2">{show.title}</h3>
          <p className="text-sm text-amber-400">{show.composer}</p>
          <p className="text-xs text-white/50 mt-1">{show.duration}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group rounded-2xl overflow-hidden border border-white/10 hover:border-amber-500/30 transition-colors bg-[#1a1a1a]",
        onClick && "cursor-pointer",
        className
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `View details for ${show.title}` : undefined}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-[#2a2a2a] aspect-[3/4]">
        <LazyImage
          src={show.image}
          alt={show.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          containerClassName="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
          {show.title}
        </h3>
        <p className="text-amber-400 text-sm font-medium mb-3">{show.composer}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {show.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300 border border-amber-500/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Details */}
        <div className="space-y-2 text-sm text-white/60">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-amber-500" aria-hidden="true" />
            {show.duration}
          </div>
          {show.date && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-amber-500" aria-hidden="true" />
              {show.date}
            </div>
          )}
          {show.venue && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-amber-500" aria-hidden="true" />
              {show.venue}
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-sm font-semibold text-white">
            {show.rating.toFixed(1)} ★
          </span>
          {onClick && (
            <span className="text-xs text-amber-400 group-hover:translate-x-1 transition-transform">
              View more →
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// Icon component (assuming you have lucide-react)
function Clock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
