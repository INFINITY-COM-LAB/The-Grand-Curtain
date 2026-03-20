export const ANALYTICS_CONFIG = {
  enableLogging: true,
  flushInterval: 30000, // 30 seconds
  queueThreshold: 10,
  batchSize: 20,
  retryAttempts: 3,
  retryDelay: 1000,
};

export const TRACKED_SECTIONS = [
  'now-showing',
  'upcoming',
  'about',
  'reviews',
  'contact',
] as const;

export type TrackedSection = typeof TRACKED_SECTIONS[number];
