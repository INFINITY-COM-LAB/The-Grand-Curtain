/**
 * Upcoming Productions section with timeline layout
 * Uses ShowCard component for full show details
 * Timeline view for quick browsing
 */

import { ArrowRight, Calendar } from "lucide-react";
import { ShowCard } from "./ShowCard";
import { UPCOMING_SHOWS } from "../data/showsData";

export function Upcoming() {
  const handleGetTickets = (showId: string) => {
    console.log(`Tickets pre-ordered for show: ${showId}`);
    // TODO: Integrate with mailing list & waitlist system
  };

  // For timeline view - show compact version
  const timelineShows = UPCOMING_SHOWS.slice(0, 3);

  return (
    <section id="upcoming" className="relative py-24 bg-[#0d0d0d]">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-900/5 rounded-full blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-medium">
            Coming Soon
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-white font-serif">
            Upcoming Shows
          </h2>
          <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
        </div>

        {/* Shows Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {UPCOMING_SHOWS.map((show) => (
            <ShowCard
              key={show.id}
              show={show}
              onGetTickets={handleGetTickets}
            />
          ))}
        </div>

        {/* Quick Timeline Preview */}
        <div className="mt-24">
          <h3 className="text-2xl font-bold text-white font-serif text-center mb-8">
            Quick Timeline
          </h3>
          <div className="space-y-4 max-w-3xl mx-auto">
            {timelineShows.map((show, index) => (
              <div
                key={show.id}
                className="group flex items-center gap-6 rounded-xl border border-white/5 bg-white/[0.02] px-6 py-5 hover:border-amber-500/20 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="text-4xl">{show.image}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-lg font-semibold text-white font-serif group-hover:text-amber-400 transition-colors">
                      {show.title}
                    </h3>
                    <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-white/40">
                      {show.genre}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-white/40 text-sm">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{show.dates}</span>
                  </div>
                </div>

                <ArrowRight className="h-5 w-5 text-white/20 group-hover:text-amber-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
