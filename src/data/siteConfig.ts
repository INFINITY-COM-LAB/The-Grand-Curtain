/**
 * Site Configuration
 * Centralized source of truth for site content, shows, stats, and metadata
 * Easy to update without touching component code
 */

export const siteConfig = {
  // Theatre branding
  theatre: {
    name: "The Grand Curtain",
    tagline: "Where Stories Come Alive",
    description:
      "Experience the magic of live theatre at The Grand Curtain. World-class performances, breathtaking productions, and unforgettable nights await you under our historic proscenium.",
    contact: "webstitch2026@gmail.com",
  },

  // Hero section
  hero: {
    title: {
      line1: "Where Stories",
      line2: "Come",
      accent: "Alive",
    },
    subtitle:
      "Experience the magic of live theatre at The Grand Curtain. World-class performances, breathtaking productions, and unforgettable nights await you under our historic proscenium.",
    cta: {
      primary: { label: "View Current Shows", href: "#now-showing" },
      secondary: { label: "Explore the Theatre", href: "#about" },
    },
    stats: [
      { value: "127", label: "Years of Legacy" },
      { value: "50+", label: "Shows per Season" },
      { value: "98%", label: "Audience Satisfaction" },
    ],
    season: "Season 2025 Now Open",
  },

  // Now Showing (Sample shows — replace with real data)
  nowShowing: [
    {
      id: "1",
      title: "Romeo & Juliet",
      composer: "William Shakespeare",
      duration: "2h 45min",
      image:
        "https://images.unsplash.com/photo-1485095329183-d0dba0491641?w=400&h=500&fit=crop",
      tags: ["Classic", "Drama"],
    },
    {
      id: "2",
      title: "The Phantom of the Opera",
      composer: "Andrew Lloyd Webber",
      duration: "2h 30min",
      image:
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=500&fit=crop",
      tags: ["Musical", "Romance"],
    },
    {
      id: "3",
      title: "Hamlet",
      composer: "William Shakespeare",
      duration: "3h 10min",
      image:
        "https://images.unsplash.com/photo-1514306688772-e1fcf76fa89f?w=400&h=500&fit=crop",
      tags: ["Classic", "Tragedy"],
    },
  ],

  // Upcoming Shows (Sample data)
  upcoming: [
    {
      id: "4",
      title: "The Lion King",
      date: "April 2026",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    },
    {
      id: "5",
      title: "Les Misérables",
      date: "May 2026",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop",
    },
    {
      id: "6",
      title: "Cabaret",
      date: "June 2026",
      image:
        "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=500&fit=crop",
    },
  ],

  // About Section
  about: {
    title: "About The Grand Curtain",
    description:
      "Founded in 1899, The Grand Curtain Theatre has been the heart of our city's cultural renaissance. Our iconic building, with its ornate detailing and world-class acoustics, hosts world-renowned productions and emerging artists alike.",
    highlights: [
      "127 years of theatrical excellence",
      "1,200 seat capacity with perfect sightlines",
      "State-of-the-art lighting and sound systems",
      "Home to 50+ productions annually",
      "Award-winning artist residencies",
      "Community outreach and education programs",
    ],
  },

  // Footer links
  footerLinks: {
    quick: [
      "Current Season",
      "Upcoming Shows",
      "Membership",
      "Gift Cards",
      "Group Sales",
      "Education",
    ],
    social: [
      { label: "Facebook", url: "#" },
      { label: "Instagram", url: "#" },
      { label: "Twitter", url: "#" },
      { label: "YouTube", url: "#" },
    ],
  },

  // Newsletter
  newsletter: {
    title: "Never Miss a Performance",
    subtitle:
      "Subscribe to our newsletter for exclusive pre-sale access, behind-the-scenes content, and special member discounts.",
    placeholder: "Enter your email",
  },

  // Image optimization settings
  images: {
    // Lazy loading threshold (how many pixels before viewport to start loading)
    lazyLoadingThreshold: "100px",
    // Image sizes for responsive images
    sizes: {
      thumbnail: { width: 200, height: 250 },
      card: { width: 400, height: 500 },
      hero: { width: 1440, height: 900 },
      banner: { width: 1200, height: 300 },
    },
  },
};

export type SiteConfig = typeof siteConfig;
