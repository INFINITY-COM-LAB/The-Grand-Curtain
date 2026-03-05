import { Armchair, Music, Sparkles, Users } from "lucide-react";

const features = [
  {
    icon: Armchair,
    title: "1,200 Velvet Seats",
    description:
      "Luxurious seating with perfect sightlines from every angle of our grand auditorium.",
  },
  {
    icon: Music,
    title: "Live Orchestra Pit",
    description:
      "A 40-piece orchestra accompanies every musical, delivering an unparalleled sonic experience.",
  },
  {
    icon: Sparkles,
    title: "State-of-the-Art Stage",
    description:
      "Cutting-edge lighting, sound, and flying systems bring productions to life.",
  },
  {
    icon: Users,
    title: "World-Class Talent",
    description:
      "Award-winning directors, actors, and designers from Broadway and the West End.",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-24 bg-[#0d0d0d]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-900/5 rounded-full blur-[200px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - text */}
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-medium">
              Est. 1898
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-white font-serif leading-tight">
              A Legacy of
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">
                Dramatic Excellence
              </span>
            </h2>

            <p className="mt-6 text-white/50 leading-relaxed text-lg">
              For over a century, The Grand Curtain has been the crown jewel of
              the city's cultural landscape. Our ornate Beaux-Arts building,
              designed by renowned architect Charles Garnier Jr., has hosted
              legends of the stage from Sarah Bernhardt to contemporary icons.
            </p>

            <p className="mt-4 text-white/50 leading-relaxed">
              Today, we continue our tradition of presenting bold, imaginative
              theatre that challenges, inspires, and moves audiences. Whether
              you're a seasoned theatregoer or stepping inside for the first
              time, The Grand Curtain promises an experience you'll never forget.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="rounded-full bg-amber-500 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-black hover:bg-amber-400 transition-colors"
              >
                Plan Your Visit
              </a>
              <a
                href="#reviews"
                className="rounded-full border border-white/20 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white hover:bg-white/5 transition-colors"
              >
                Read Reviews
              </a>
            </div>
          </div>

          {/* Right side - features */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-amber-500/20 hover:bg-white/[0.05] transition-all duration-300"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 mb-4 group-hover:bg-amber-500/20 transition-colors">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-white font-serif">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-white/40 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
