/**
 * SEO Utilities for The Grand Curtain
 * Handles meta tags, OpenGraph, and structured data
 */

interface MetaConfig {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
}

/**
 * Update document meta tags for SEO
 */
export function updateMetaTags(config: MetaConfig) {
  // Title
  document.title = config.title;
  
  // Description
  updateOrCreateMetaTag("description", config.description);
  
  // OpenGraph tags
  updateOrCreateMetaTag("og:title", config.title, "property");
  updateOrCreateMetaTag("og:description", config.description, "property");
  updateOrCreateMetaTag("og:type", config.type || "website", "property");
  if (config.image) {
    updateOrCreateMetaTag("og:image", config.image, "property");
  }
  if (config.url) {
    updateOrCreateMetaTag("og:url", config.url, "property");
  }
  
  // Twitter Card
  updateOrCreateMetaTag("twitter:card", "summary_large_image");
  updateOrCreateMetaTag("twitter:title", config.title);
  updateOrCreateMetaTag("twitter:description", config.description);
  if (config.image) {
    updateOrCreateMetaTag("twitter:image", config.image);
  }
}

/**
 * Helper to create or update meta tag
 */
function updateOrCreateMetaTag(
  name: string,
  content: string,
  type: "name" | "property" = "name"
) {
  let tag = document.querySelector(
    `meta[${type}="${name}"]`
  ) as HTMLMetaElement;
  
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(type, name);
    document.head.appendChild(tag);
  }
  
  tag.content = content;
}

/**
 * Add canonical URL to prevent duplicate content issues
 */
export function setCanonicalUrl(url: string) {
  let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = url;
}

/**
 * Add structured data (JSON-LD) for rich snippets
 */
export function addStructuredData(data: Record<string, unknown>) {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

/**
 * Theatre Organization Schema
 */
export function addTheatreSchema() {
  const theatreSchema = {
    "@context": "https://schema.org",
    "@type": "TheaterComplex",
    name: "The Grand Curtain Theatre",
    image: `${window.location.origin}/og-image.png`,
    description: "Step into The Grand Curtain, where stories come alive on stage.",
    url: window.location.origin,
    telephone: "+1-555-THEATRE",
    sameAs: [
      "https://twitter.com/thegrandcurtain",
      "https://facebook.com/thegrandcurtain",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Stage Avenue",
      addressLocality: "Theatre District",
      addressCountry: "US",
    },
  };
  
  addStructuredData(theatreSchema);
}

/**
 * Event Schema for shows (use for each show)
 */
export function addEventSchema(event: {
  name: string;
  description: string;
  startDate: string;
  location: string;
}) {
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    location: {
      "@type": "Place",
      name: "The Grand Curtain Theatre",
      address: "123 Stage Avenue, Theatre District",
    },
    offers: {
      "@type": "Offer",
      url: window.location.href,
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };
  
  addStructuredData(eventSchema);
}

/**
 * Initialize SEO for the application
 */
export function initializeSEO() {
  const baseUrl = window.location.origin;
  const ogImage = `${baseUrl}/og-image.png`;

  // Set default meta tags
  updateMetaTags({
    title: "The Grand Curtain Theatre | Live Theatre & Performances",
    description:
      "Experience captivating performances and unforgettable talent at The Grand Curtain. World-class theatre productions from timeless classics to modern masterpieces.",
    image: ogImage,
    url: baseUrl,
  });

  // Set canonical URL
  setCanonicalUrl(baseUrl);

  // Add theatre schema
  addTheatreSchema();

  // Add preconnect hints for performance
  addDNSPrefetch("https://fonts.googleapis.com");
  addDNSPrefetch("https://fonts.gstatic.com");
}

/**
 * Add DNS prefetch for external resources (performance optimization)
 */
function addDNSPrefetch(url: string) {
  const link = document.createElement("link");
  link.rel = "dns-prefetch";
  link.href = url;
  document.head.appendChild(link);
}
