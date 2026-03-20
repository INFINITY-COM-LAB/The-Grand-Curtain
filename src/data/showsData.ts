/**
 * Unified shows data for NowShowing and Upcoming sections
 * Centralized source of truth for all theatre performances
 */

export interface Show {
  id: string;
  title: string;
  genre: string;
  image: string;
  gradient: string;
  dates: string;
  time: string;
  rating: number;
  description: string;
  featured: boolean;
  section: 'now-showing' | 'upcoming';
}

export const SHOWS_DATA: Show[] = [
  // Now Showing
  {
    id: 'phantoms-waltz',
    title: "The Phantom's Waltz",
    genre: "Musical Drama",
    image: "🎭",
    gradient: "from-rose-900/40 to-purple-900/40",
    dates: "Mar 15 – Apr 20",
    time: "7:30 PM",
    rating: 4.9,
    description:
      "A haunting tale of love and obsession set beneath the grand opera house of Vienna.",
    featured: true,
    section: 'now-showing',
  },
  {
    id: 'midnight-paris',
    title: "Midnight in Paris",
    genre: "Romantic Comedy",
    image: "🌹",
    gradient: "from-blue-900/40 to-indigo-900/40",
    dates: "Apr 1 – May 10",
    time: "8:00 PM",
    rating: 4.7,
    description:
      "A whimsical journey through the city of lights, where past and present collide.",
    featured: false,
    section: 'now-showing',
  },
  {
    id: 'last-emperor',
    title: "The Last Emperor",
    genre: "Historical Epic",
    image: "👑",
    gradient: "from-amber-900/40 to-red-900/40",
    dates: "Apr 15 – Jun 1",
    time: "7:00 PM",
    rating: 4.8,
    description:
      "The rise and fall of a dynasty told through breathtaking choreography and song.",
    featured: false,
    section: 'now-showing',
  },

  // Upcoming
  {
    id: 'romeo-juliet',
    title: "Romeo & Juliet",
    genre: "Classic Tragedy",
    image: "💔",
    gradient: "from-red-900/40 to-pink-900/40",
    dates: "Jun 15 – Jul 20",
    time: "7:30 PM",
    rating: 4.9,
    description:
      "Shakespeare's timeless love story reimagined with modern choreography and stunning visuals.",
    featured: true,
    section: 'upcoming',
  },
  {
    id: 'pirates-penzance',
    title: "The Pirates of Penzance",
    genre: "Musical Comedy",
    image: "🏴‍☠️",
    gradient: "from-slate-900/40 to-blue-900/40",
    dates: "Jul 1 – Aug 15",
    time: "8:00 PM",
    rating: 4.6,
    description:
      "Gilbert & Sullivan's hilarious operetta featuring witty lyrics, catchy tunes, and comedic chaos.",
    featured: false,
    section: 'upcoming',
  },
  {
    id: 'les-miserables',
    title: "Les Misérables",
    genre: "Historical Musical",
    image: "⚔️",
    gradient: "from-purple-900/40 to-indigo-900/40",
    dates: "Aug 1 – Sep 30",
    time: "7:00 PM",
    rating: 4.8,
    description:
      "The epic tale of love, sacrifice, and redemption during the French Revolution.",
    featured: false,
    section: 'upcoming',
  },
];

export const NOW_SHOWING_SHOWS = SHOWS_DATA.filter(s => s.section === 'now-showing');
export const UPCOMING_SHOWS = SHOWS_DATA.filter(s => s.section === 'upcoming');
