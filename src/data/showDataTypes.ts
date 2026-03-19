/**
 * Show Data Types
 * 
 * Strict TypeScript types for show data across the application.
 * Ensures consistency and type safety throughout components.
 */

export interface ShowData {
  id: string;
  title: string;
  composer: string;
  image: string;
  description: string;
  duration: string;
  rating: number;
  tags: string[];
  venue?: string;
  date?: string;
  featured?: boolean;
  availableSeats?: number;
  price?: number;
}

export interface TheatreInfo {
  name: string;
  tagline: string;
  description: string;
  email: string;
  phone?: string;
  address?: string;
  founded?: number;
}

export interface NavLink {
  href: string;
  label: string;
  ariaLabel?: string;
}

export interface NewsletterConfig {
  title: string;
  subtitle: string;
  placeholder: string;
  successMessage: string;
}

export interface SiteConfigType {
  theatre: TheatreInfo;
  navigation: NavLink[];
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
  };
  nowShowing: ShowData[];
  upcoming: ShowData[];
  about: {
    title: string;
    content: string;
    stats: Array<{
      label: string;
      value: string;
    }>;
  };
  newsletter: NewsletterConfig;
  footer: {
    sections: Array<{
      title: string;
      links: NavLink[];
    }>;
    copyright: string;
  };
}
