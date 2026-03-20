import { ShowCard } from "./ShowCard";
import { NOW_SHOWING_SHOWS } from "../data/showsData";

export function NowShowing() {
  const handleGetTickets = (showId: string) => {
    console.log(`Tickets clicked for show: ${showId}`);
    // TODO: Integrate with ticket booking system
  };

  return (
    <section id="now-showing" className="relative py-24 bg-[#0d0d0d]">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-900/5 rounded-full blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-medium">
            On Stage Now
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-white font-serif">
            Now Showing
          </h2>
          <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
        </div>

        {/* Shows Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {NOW_SHOWING_SHOWS.map((show) => (
            <ShowCard
              key={show.id}
              show={show}
              onGetTickets={handleGetTickets}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
