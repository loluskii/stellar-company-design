# Wellstocked Nigeria Limited - Website

A modern, responsive website for Wellstocked Nigeria Limited, featuring offline support and a content management system.

## Features

### Offline Support
The website includes comprehensive offline functionality:

- **Service Worker**: Caches static assets and API responses for offline access
- **Offline Page**: Custom offline page shown when users lose connection
- **Local Storage Caching**: Content is cached locally for offline browsing
- **Offline Status Indicator**: Visual indicator when users are offline
- **PWA Support**: Installable as a Progressive Web App

### Offline Features
- Browse previously visited pages without internet connection
- View cached content (hero, services, products, about, contact info)
- Automatic retry when connection is restored
- Background sync for offline form submissions (future enhancement)

### How Offline Works
1. **First Visit**: Service worker caches essential assets and content
2. **Subsequent Visits**: Content loads from cache for faster performance
3. **Offline Mode**: Users can browse cached pages and content
4. **Reconnection**: App automatically detects when connection is restored

### PWA Features
- Installable on mobile devices
- App-like experience
- Offline functionality
- Background sync capabilities

## Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Testing Offline Functionality
1. Build the project: `npm run build`
2. Serve the dist folder: `npx serve dist`
3. Open browser dev tools → Application → Service Workers
4. Check "Offline" in Network tab
5. Refresh page to see offline functionality

## Technology Stack
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Supabase for CMS
- Service Worker for offline support
- PWA capabilities

## Content Management
The website uses Supabase as a headless CMS with the following content types:
- Hero content
- Services
- Products
- Clients
- About information
- Contact details
- About page sections
- Services page content

All content is cached locally for offline access and updates automatically when online.
