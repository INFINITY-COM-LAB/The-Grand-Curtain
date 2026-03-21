# Grand Curtain - API Documentation

## Overview

This document describes the API endpoints required by the Grand Curtain frontend application. The backend should implement these endpoints to support newsletter subscriptions, analytics tracking, and ticketing functionality.

## Base URL

- **Development**: `http://localhost:3000/api`
- **Production**: `https://api.grandcurtain.com/api`

Configure via `VITE_API_BASE_URL` environment variable.

## Authentication

Currently, all endpoints are public. Add authentication headers as needed.

## Newsletter Endpoints

### Subscribe
```
POST /newsletter/subscribe
{ "email": "user@example.com" }
```

### Unsubscribe
```
POST /newsletter/unsubscribe
{ "email": "user@example.com" }
```

### Check Status
```
GET /newsletter/status/{email}
```

### Update Preferences
```
PUT /newsletter/{email}/preferences
{ "frequency": "daily" }
```

## Analytics Endpoints

### Log Events
```
POST /analytics/events
{
  "events": [...],
  "batchSize": 5,
  "timestamp": 1703001234567
}
```

### Get Report
```
GET /analytics/reports?startDate=2024-01-01&endDate=2024-01-31
```

## Ticketing Endpoints

### Get Shows
```
GET /ticketing/shows
```

### Get Show
```
GET /ticketing/shows/{showId}
```

### Check Availability
```
GET /ticketing/shows/{showId}/availability?quantity=4
```

### Create Booking
```
POST /ticketing/bookings
{
  "showId": "phantom-waltz",
  "quantity": 2,
  "ticketType": "general",
  "customerEmail": "user@example.com",
  "totalPrice": 90.00
}
```

### Get Booking
```
GET /ticketing/bookings/{bookingId}
```

### Cancel Booking
```
DELETE /ticketing/bookings/{bookingId}
```

### Calculate Price
```
GET /ticketing/shows/{showId}/price?type=general&quantity=3
```

## Implementation Timeline

- Phase 1: Newsletter endpoints
- Phase 2: Ticketing (read-only)
- Phase 3: Booking management
- Phase 4: Payment & advanced features
