/**
 * Reusable ShowCard component for NowShowing and Upcoming sections
 * Handles both featured and regular show cards with consistent styling
 */

import { Calendar, Clock, Star } from "lucide-react";
import type { Show } from "../data/showsData";

interface ShowCardProps {
  show: Show;
  onGetTickets?: (showId: string) => void;
}

export function ShowCard({ show, onGetTickets }: ShowCardProps) {
  return (
    <div
      key={show.id}
      className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-1"
    >
      {/* Card top gradient area with emoji image */}
      <div
        className={`relative h-56 bg-gradient-to-br ${show.gradient} flex items-center justify-center`}
      >
        <span className="text-7xl group-hover:scale-110 transition-transform duration-500">
          {show.image}
        </span>

        {/* Featured badge */}
        {show.featured && (
          <div className="absolute top-4 left-4 rounded-full bg-amber-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black">
            Featured
          </div>
        )}

        {/* Rating badge */}
        <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 backdrop-blur-sm">
          <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
          <span className="text-xs text-white font-medium">
            {show.rating}
          </span>
        </div>
      </div>

      {/* Card content */}
      <div className="p-6 space-y-4">
        {/* Genre and Title */}
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-amber-400/80">
            {show.genre}
          </span>
          <h3 className="mt-1 text-xl font-bold text-white font-serif">
            {show.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm text-white/50 leading-relaxed">
          {show.description}
        </p>

        {/* Dates and Time */}
        <div className="flex items-center gap-4 text-white/40 text-sm">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <span>{show.dates}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>{show.time}</span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => onGetTickets?.(show.id)}
          className="w-full rounded-full border border-amber-500/30 bg-amber-500/10 py-3 text-sm font-semibold uppercase tracking-wider text-amber-400 hover:bg-amber-500 hover:text-black transition-all duration-300"
          aria-label={`Get tickets for ${show.title}`}
        >
          Get Tickets
        </button>
      </div>
    </div>
  );
}
