# Backend Integration Guide

## Overview

Wave 13 establishes a production-ready backend infrastructure layer for The Grand Curtain. This guide explains how to integrate the frontend with your backend services.

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    React Components                      │
├─────────────────────────────────────────────────────────┤
│              Hooks (useEmailSubmit, useAnalytics)        │
├─────────────────────────────────────────────────────────┤
│          Service Layer (Newsletter, Analytics, Ticketing)│
├─────────────────────────────────────────────────────────┤
│               API Client (with retry logic)              │
├─────────────────────────────────────────────────────────┤
│                    HTTP / Fetch API                      │
└─────────────────────────────────────────────────────────┘
```

## Services

### 1. ApiClient (`src/services/apiClient.ts`)

Central HTTP client with:
- Automatic retry logic (configurable)
- Request timeouts
- Error handling
- Type-safe responses

**Usage:**
```typescript
import { apiClient } from '@/services/apiClient';

const response = await apiClient.post('/newsletter/subscribe', { email });
if (response.success) {
  // Handle success
  console.log(response.data);
} else {
  // Handle error
  console.error(response.error);
}
```

### 2. NewsletterService (`src/services/newsletterService.ts`)

Newsletter management:
- Subscribe users
- Unsubscribe users
- Check subscription status
- Update preferences
- Email validation

**Usage:**
```typescript
import { newsletterService } from '@/services/newsletterService';

const response = await newsletterService.subscribe('user@example.com');
if (response.success) {
  console.log('Subscribed!');
}
```

### 3. AnalyticsService (`src/services/analyticsService.ts`)

Event tracking with:
- Event queuing
- Auto-batching (flushes at 50+ events)
- Session tracking
- Configurable flush intervals

**Usage:**
```typescript
import { analyticsService } from '@/services/analyticsService';

// Track individual events
await analyticsService.trackPageView('Home');
await analyticsService.trackButtonClick('Get Tickets', { showId: 'phantom-waltz' });
await analyticsService.trackNewsletterSignup('hero-section');

// Manual flush (automatic every 30 seconds)
await analyticsService.flush();
```

### 4. TicketingService (`src/services/ticketingService.ts`)

Ticket management:
- Get available shows
- Check ticket availability
- Create bookings
- Check booking status
- Cancel bookings
- Calculate prices

**Usage:**
```typescript
import { ticketingService } from '@/services/ticketingService';

const shows = await ticketingService.getAvailableShows();
const booking = await ticketingService.createBooking({
  showId: 'phantom-waltz',
  quantity: 2,
  ticketType: 'general',
  customerEmail: 'user@example.com',
  totalPrice: 90.00,
});
```

## Environment Configuration

### Setup

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Update values for your environment:
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_TIMEOUT=10000
VITE_ANALYTICS_ENABLED=true
```

### Configuration Options

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE_URL` | `http://localhost:3000/api` | API base URL |
| `VITE_API_TIMEOUT` | `10000` | Request timeout (ms) |
| `VITE_API_MAX_RETRIES` | `2` | Number of retries |
| `VITE_ANALYTICS_ENABLED` | `true` | Enable analytics |
| `VITE_ANALYTICS_FLUSH_INTERVAL` | `30000` | Auto-flush interval (ms) |
| `VITE_MAX_ANALYTICS_QUEUE` | `50` | Max queued events |
| `VITE_FEATURE_EMAIL_VALIDATION` | `true` | Enable email validation |
| `VITE_FEATURE_ANALYTICS` | `true` | Enable tracking |
| `VITE_FEATURE_TICKETING` | `true` | Enable ticketing |
| `VITE_FEATURE_NEWSLETTER` | `true` | Enable newsletter |

## Implementation Steps

### Step 1: Implement Newsletter API

**Required Endpoints:**
- `POST /newsletter/subscribe` - Add subscriber
- `POST /newsletter/unsubscribe` - Remove subscriber
- `GET /newsletter/status/{email}` - Check status
- `PUT /newsletter/{email}/preferences` - Update preferences

**Database Schema (Example):**
```sql
CREATE TABLE subscribers (
  id UUID PRIMARY KEY,
  email VARCHAR(254) UNIQUE NOT NULL,
  status ENUM('active', 'unsubscribed', 'pending'),
  subscribed_at TIMESTAMP,
  updated_at TIMESTAMP,
  preferences JSONB DEFAULT '{}',
  tags JSONB DEFAULT '[]'
);

CREATE INDEX idx_subscribers_email ON subscribers(email);
CREATE INDEX idx_subscribers_status ON subscribers(status);
```

### Step 2: Implement Analytics API

**Required Endpoints:**
- `POST /analytics/events` - Log event batch
- `GET /analytics/reports` - Get report

**Database Schema (Example):**
```sql
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY,
  event_type VARCHAR(50) NOT NULL,
  event_name VARCHAR(255) NOT NULL,
  session_id VARCHAR(255) NOT NULL,
  properties JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  user_agent TEXT,
  ip_address INET
);

CREATE INDEX idx_events_session ON analytics_events(session_id);
CREATE INDEX idx_events_type ON analytics_events(event_type);
CREATE INDEX idx_events_created ON analytics_events(created_at);
```

### Step 3: Implement Ticketing API

**Required Endpoints:**
- `GET /ticketing/shows` - List shows
- `GET /ticketing/shows/{showId}` - Get show details
- `GET /ticketing/shows/{showId}/availability` - Check availability
- `POST /ticketing/bookings` - Create booking
- `GET /ticketing/bookings/{bookingId}` - Get booking
- `DELETE /ticketing/bookings/{bookingId}` - Cancel booking
- `GET /ticketing/shows/{showId}/price` - Calculate price

**Database Schema (Example):**
```sql
CREATE TABLE shows (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  total_capacity INT NOT NULL,
  available_tickets INT NOT NULL,
  price_general DECIMAL(10,2),
  price_premium DECIMAL(10,2),
  price_student DECIMAL(10,2),
  created_at TIMESTAMP
);

CREATE TABLE bookings (
  id UUID PRIMARY KEY,
  show_id UUID NOT NULL REFERENCES shows(id),
  customer_email VARCHAR(254),
  quantity INT NOT NULL,
  ticket_type VARCHAR(50),
  total_price DECIMAL(10,2),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP,
  FOREIGN KEY (show_id) REFERENCES shows(id)
);

CREATE INDEX idx_bookings_show ON bookings(show_id);
CREATE INDEX idx_bookings_email ON bookings(customer_email);
```

## Error Handling

All services follow a consistent error response pattern:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode: number;
}
```

**Example Error Handling:**
```typescript
const response = await newsletterService.subscribe(email);

if (!response.success) {
  // Handle error
  if (response.statusCode === 409) {
    console.log('Email already subscribed');
  } else if (response.statusCode === 400) {
    console.log('Invalid email format');
  } else {
    console.log('Server error:', response.error);
  }
}
```

## Testing

### Manual Testing

```bash
# Test newsletter subscription
curl -X POST http://localhost:3000/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Test analytics event logging
curl -X POST http://localhost:3000/api/analytics/events \
  -H "Content-Type: application/json" \
  -d '{
    "events":[{"eventType":"page_view","eventName":"View: Home"}],
    "batchSize":1
  }'

# Test ticketing
curl http://localhost:3000/api/ticketing/shows
```

### Unit Testing

```typescript
import { newsletterService } from '@/services/newsletterService';

describe('NewsletterService', () => {
  it('should validate email format', async () => {
    const response = await newsletterService.subscribe('invalid-email');
    expect(response.success).toBe(false);
    expect(response.statusCode).toBe(400);
  });

  it('should subscribe valid email', async () => {
    const response = await newsletterService.subscribe('test@example.com');
    expect(response.success).toBe(true);
  });
});
```

## Monitoring & Debugging

### Enable Debug Logging

Development mode automatically logs:
- API configuration
- Environment variables
- Service initialization

View in browser console:
```
🎭 Grand Curtain Environment: {
  env: "development",
  api: "http://localhost:3000/api",
  features: { ... }
}
```

### Performance Monitoring

Check analytics queue size:
```typescript
console.log(analyticsService.getSessionId());
```

Manual event flush:
```typescript
await analyticsService.flush();
```

## Security Considerations

1. **HTTPS in Production**: Ensure all API calls use HTTPS
2. **CORS**: Configure backend CORS properly
3. **Rate Limiting**: Implement rate limits on backend
4. **Input Validation**: Validate all inputs on backend
5. **Email Verification**: Send confirmation emails for newsletter
6. **PII Protection**: Encrypt sensitive user data

## Next Steps (Wave 14+)

- [ ] Implement Stripe payment integration
- [ ] Add GDPR consent management
- [ ] Setup email confirmation flow
- [ ] Create analytics dashboard
- [ ] Add authentication (JWT/OAuth)
- [ ] Implement service worker for offline support

## Support & Documentation

- API Documentation: `docs/API_DOCUMENTATION.md`
- Service code: `src/services/`
- Environment config: `src/config/`
- Example hooks: `src/hooks/`

## Contact

For questions or issues, contact the development team.
