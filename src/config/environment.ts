/**
 * Environment Configuration
 * Centralized configuration for API endpoints, feature flags, and settings
 */

export interface EnvironmentConfig {
  apiBaseUrl: string;
  apiTimeout: number;
  maxRetries: number;
  analyticsEnabled: boolean;
  analyticsFlushInterval: number;
  maxAnalyticsQueueSize: number;
  features: {
    emailValidation: boolean;
    analyticsTracking: boolean;
    ticketingIntegration: boolean;
    newsletterSubscription: boolean;
  };
  environment: 'development' | 'staging' | 'production';
}

const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

export const environmentConfig: EnvironmentConfig = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || (isDevelopment ? 'http://localhost:3000/api' : 'https://api.grandcurtain.com/api'),
  apiTimeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),
  maxRetries: parseInt(import.meta.env.VITE_API_MAX_RETRIES || '2'),
  analyticsEnabled: import.meta.env.VITE_ANALYTICS_ENABLED !== 'false',
  analyticsFlushInterval: parseInt(import.meta.env.VITE_ANALYTICS_FLUSH_INTERVAL || '30000'),
  maxAnalyticsQueueSize: parseInt(import.meta.env.VITE_MAX_ANALYTICS_QUEUE || '50'),
  features: {
    emailValidation: import.meta.env.VITE_FEATURE_EMAIL_VALIDATION !== 'false',
    analyticsTracking: import.meta.env.VITE_FEATURE_ANALYTICS !== 'false',
    ticketingIntegration: import.meta.env.VITE_FEATURE_TICKETING !== 'false',
    newsletterSubscription: import.meta.env.VITE_FEATURE_NEWSLETTER !== 'false',
  },
  environment: isProduction ? 'production' : isDevelopment ? 'development' : 'staging',
};

/**
 * Log environment configuration (development only)
 */
if (isDevelopment) {
  console.log('🎭 Grand Curtain Environment:', {
    env: environmentConfig.environment,
    api: environmentConfig.apiBaseUrl,
    features: environmentConfig.features,
  });
}
