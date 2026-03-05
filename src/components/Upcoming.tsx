import { ArrowRight, Calendar } from "lucide-react";

const upcoming = [
  {
    title: "A Midsummer Night's Dream",
    date: "June 2025",
    emoji: "🧚",
    genre: "Shakespeare",
  },
  {
    title: "The Glass Menagerie",
    date: "July 2025",
    emoji: "🦋",
    genre: "Classic Drama",
  },
  {
    title: "Into the Woods",
    date: "August 2025",
    emoji: "🌲",
    genre: "Musical",
  },
  {
    title: "Death of a Salesman",
    date: "September 2025",
    emoji: "💼",
    genre: "Tragedy",
  },
  {
    title: "The Nutcracker: Reimagined",
    date: "December 2025",
    emoji: "❄️",
    genre: "Ballet",
  },
];

export function Upcoming() {
  return (
    <section id="upcoming" className="relative py-24 bg-[#0a0a0a]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-transparent to-[#0d0d0d]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-medium">
            Coming Soon
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-white font-serif">
            Upcoming Productions
          </h2>
          <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
        </div>

        {/* Timeline */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {upcoming.map((show, index) => (
            <div
              key={show.title}
              className="group flex items-center gap-6 rounded-xl border border-white/5 bg-white/[0.02] px-6 py-5 hover:border-amber-500/20 hover:bg-white/[0.04] transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl">{show.emoji}</div>

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
                  <span>{show.date}</span>
                </div>
              </div>

              <ArrowRight className="h-5 w-5 text-white/20 group-hover:text-amber-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
