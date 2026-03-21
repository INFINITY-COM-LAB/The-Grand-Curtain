# Wave 14: Web Vitals Monitoring & Analytics Integration

## Overview

This wave implements comprehensive Web Vitals monitoring and analytics event tracking.

## What's New

### 1. Web Vitals Monitoring (src/utils/webVitals.ts)
- Captures LCP, FID, CLS, TTFB metrics
- Rating system: good/needs-improvement/poor
- PerformanceObserver integration

### 2. Analytics Hook (src/hooks/useAnalytics.ts)
- Event batching (50 events per batch)
- Auto-flush (30 seconds)
- Session tracking
- Event types: page_view, click, form_submit, web_vital, error, custom

### 3. Analytics Provider (src/components/AnalyticsProvider.tsx)
- Wraps app with analytics
- Auto-initializes Web Vitals
- Tracks page visibility

### 4. Performance Debugger (src/components/PerformanceDebugger.tsx)
- Real-time metrics display
- Dev-only mode
- Enabled with ?debug=true

## Environment Variables

```env
VITE_ANALYTICS_ENABLED=true
VITE_ANALYTICS_API_URL=https://api.yourdomain.com/v1/analytics
VITE_DEBUG_METRICS=false
```

## Integration Steps

1. Wrap App with AnalyticsProvider
2. Track events in components via useAnalytics hook
3. Implement backend API endpoint for /v1/analytics/events
4. Create analytics dashboard

## Files Changed

New:
- src/utils/webVitals.ts
- src/hooks/useAnalytics.ts
- src/components/AnalyticsProvider.tsx
- src/components/PerformanceDebugger.tsx
- docs/WAVE-14-WEB-VITALS.md

Total: ~430 lines, 100% backward compatible
