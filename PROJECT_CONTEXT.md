# SilverScreen - Project Context & Documentation

## Project Overview

**SilverScreen** is a modern, production-ready movie streaming website built with Next.js 16, React 19, TypeScript, and Tailwind CSS. The application fetches real-time movie data from The Movie Database (TMDB) API and implements user authentication via Supabase.

### Tech Stack
- **Framework:** Next.js 16.1.6 (App Router)
- **Runtime:** React 19.2.3
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Authentication:** Supabase (SSR)
- **API:** TMDB (The Movie Database) API v3
- **UI Components:** Lucide React (icons), Swiper.js (carousels)
- **Package Manager:** pnpm

---

## Project Structure

```
silver-screen/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── auth/                     # Authentication routes
│   │   │   ├── callback/             # OAuth callback handler
│   │   │   └── signout/              # Sign out handler
│   │   ├── dashboard/                # Protected dashboard page
│   │   ├── movie/[id]/               # Dynamic movie detail pages
│   │   ├── profile/                  # User profile page
│   │   ├── search/                   # Movie search functionality
│   │   ├── signin/                   # Sign in page
│   │   ├── signup/                   # Sign up page
│   │   ├── forgot-password/          # Password recovery
│   │   ├── reset-password/           # Password reset
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Homepage
│   │   └── globals.css               # Global styles
│   ├── components/                   # React components
│   │   ├── Core/                     # Core UI components
│   │   ├── Generic/                  # Reusable components
│   │   │   ├── Card/                 # Movie cards
│   │   │   ├── Footer/               # Footer component
│   │   │   ├── Header/               # Navigation header
│   │   │   ├── Section/              # Page sections (Hero, MovieRow, etc.)
│   │   │   └── Skeleton/             # Loading skeletons
│   │   └── Layouts/                  # Layout components
│   ├── lib/                          # Core business logic
│   │   ├── auth/                     # Authentication utilities
│   │   ├── constants/                # Configuration constants
│   │   │   └── tmdb.ts               # TMDB API configuration
│   │   ├── services/                 # API service layers
│   │   │   ├── tmdbService.ts        # TMDB API service
│   │   │   └── userService.ts        # User management service
│   │   ├── supabase/                 # Supabase client configuration
│   │   │   ├── client.ts             # Client-side Supabase client
│   │   │   ├── server.ts             # Server-side Supabase client
│   │   │   └── database-types.ts     # Database type definitions
│   │   ├── types/                    # TypeScript type definitions
│   │   │   └── movie.ts              # Movie interface
│   │   ├── data-fetching.ts          # Server-side data fetching functions
│   │   └── sample-data.ts            # Fallback sample data
│   └── proxy.ts                      # Middleware for auth & routing
├── public/                           # Static assets
├── .env                              # Environment variables (production)
├── .env.local                        # Environment variables (local dev)
├── next.config.ts                    # Next.js configuration
├── tsconfig.json                     # TypeScript configuration
├── tailwind.config.ts                # Tailwind CSS configuration
├── package.json                      # Dependencies & scripts
└── pnpm-lock.yaml                    # Lock file

```

---

## Core Features

### 1. Movie Browsing
- **Homepage:** Displays trending, popular, and upcoming movies
- **Hero Section:** Swiper carousel showcasing featured trending movies
- **Movie Rows:** Horizontal scrollable lists of movies by category
- **Movie Cards:** Interactive cards with poster, title, rating, and year

### 2. Movie Details
- **Dynamic Routes:** `/movie/[id]` for individual movie pages
- **Comprehensive Info:** Title, tagline, overview, runtime, genres, ratings
- **Production Details:** Budget, revenue, production companies, countries
- **Similar Movies:** Recommendations based on current movie
- **Backdrop & Poster:** High-quality images from TMDB

### 3. Search Functionality
- **Real-time Search:** Search movies by title
- **Search Results:** Grid layout with movie cards
- **Empty States:** Handles no results gracefully

### 4. Authentication (Supabase)
- **Sign Up:** Email/password registration
- **Sign In:** Email/password login
- **OAuth Callback:** Handles third-party auth
- **Protected Routes:** Dashboard, profile pages require authentication
- **Route Guards:** Middleware redirects unauthenticated users
- **Password Recovery:** Forgot/reset password flow

### 5. User Profile
- **Profile Management:** View and edit user information
- **Watchlist:** (Planned feature)
- **Favorites:** (Planned feature)

---

## API Integration

### TMDB API (The Movie Database)

**Base URL:** `https://api.themoviedb.org/3`

**Endpoints Used:**
- `/movie/popular` - Get popular movies
- `/trending/movie/day` - Get trending movies (daily)
- `/movie/top_rated` - Get top-rated movies
- `/movie/upcoming` - Get upcoming movies
- `/movie/{id}` - Get movie details by ID
- `/movie/{id}?append_to_response=credits,videos,images,recommendations,similar` - Get detailed movie info
- `/movie/{id}/recommendations` - Get similar movies
- `/search/movie?query={query}` - Search movies by title

**Image URLs:**
- Base: `https://image.tmdb.org/t/p`
- Sizes: `w300`, `w500`, `original`
- Format: `{base}/{size}{path}`

**Configuration:**
- API Key: Stored in `NEXT_PUBLIC_TMDB_API_KEY`
- Timeout: 10 seconds
- Cache: 5 minutes (300s revalidation)
- Error Handling: Fallback to sample data on homepage, null on detail pages

### Supabase Authentication

**Configuration:**
- URL: `NEXT_PUBLIC_SUPABASE_URL`
- Anon Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- SSR: Uses `@supabase/ssr` for server-side rendering

**Protected Routes:**
- `/dashboard` - User dashboard
- `/profile` - User profile management

**Auth Routes (redirect if logged in):**
- `/signin` - Sign in page
- `/signup` - Sign up page

---

## Environment Variables

### Required Variables (.env or .env.local)

```env
# TMDB API
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Getting API Keys

**TMDB API Key:**
1. Create account at https://www.themoviedb.org/
2. Go to Settings > API
3. Request API key (free)
4. Copy API Key (v3 auth)

**Supabase:**
1. Create project at https://supabase.com/
2. Go to Project Settings > API
3. Copy Project URL and anon/public key

---

## Data Flow Architecture

### Homepage Data Flow

```
1. User visits homepage (/)
2. page.tsx calls data-fetching functions:
   - getPopularMovies()
   - getTrendingMovies()
   - getUpcomingMovies()
3. Each function calls tmdbService methods
4. tmdbService uses tmdb.fetchFromEndpoint()
5. API response mapped to Movie interface
6. On error: Falls back to sampleMovies
7. Data passed to components (Hero, MovieRow)
8. Components render movie cards
```

### Movie Detail Page Data Flow

```
1. User clicks movie card → navigates to /movie/[id]
2. page.tsx extracts movie ID from params
3. Calls fetchMovieDetails(id)
4. fetchMovieDetails calls getMovieById() from data-fetching
5. getMovieById calls tmdbService.getDetailedMovieById()
6. API fetches movie with appended data (credits, videos, etc.)
7. On success: Returns full movie details
8. On error: Returns null → shows error page
9. Separately fetches similar movies
10. Renders movie detail page with all data
```

### Search Flow

```
1. User types in search input
2. SearchContent component calls searchMovies(query)
3. searchMovies calls tmdbService.searchMovies()
4. API returns matching movies
5. Results mapped to Movie interface
6. Displayed in grid layout
```

---

## Key Components

### Hero Section (`src/components/Generic/Section/Hero.tsx`)
- Swiper carousel with navigation and pagination
- Displays trending movies
- Auto-play with fade effect
- Responsive design

### Movie Row (`src/components/Generic/Section/MovieRow.tsx`)
- Horizontal scrollable movie list
- Category title
- Movie cards in a row
- Smooth scrolling

### Movie Card (`src/components/Generic/Card/MovieCard.tsx`)
- Movie poster image
- Title, year, rating
- Hover effects
- Links to movie detail page

### Header (`src/components/Generic/Header/Header.tsx`)
- Navigation menu
- Search bar
- User authentication status
- Sign in/out buttons

---

## Production-Level Considerations

### 1. Performance Optimization

**Current Implementation:**
- ✅ Server-side rendering (SSR) for SEO
- ✅ Image optimization via Next.js Image component
- ✅ API response caching (5-minute revalidation)
- ✅ Lazy loading for images

**Recommended Improvements:**
- ⚠️ Implement React Query or SWR for client-side caching
- ⚠️ Add loading skeletons for all pages (currently only Hero)
- ⚠️ Implement code splitting for heavy components
- ⚠️ Add service worker for offline support
- ⚠️ Optimize bundle size (analyze with `next build --analyze`)
- ⚠️ Implement virtual scrolling for long movie lists
- ⚠️ Add image placeholders with blur effect

### 2. Error Handling & Resilience

**Current Implementation:**
- ✅ Try-catch blocks in all API calls
- ✅ Fallback to sample data on homepage
- ✅ Null checks before rendering
- ✅ User-friendly error messages
- ✅ Detailed console logging with prefixes

**Recommended Improvements:**
- ⚠️ Implement global error boundary
- ⚠️ Add retry logic with exponential backoff
- ⚠️ Implement circuit breaker pattern for API calls
- ⚠️ Add error tracking (Sentry, LogRocket)
- ⚠️ Create custom error pages (404, 500)
- ⚠️ Add toast notifications for errors
- ⚠️ Implement graceful degradation

### 3. Security

**Current Implementation:**
- ✅ Environment variables for sensitive keys
- ✅ Supabase SSR for secure authentication
- ✅ Protected routes via middleware
- ✅ HTTPS for API calls

**Recommended Improvements:**
- ⚠️ Move API keys to server-side only (remove NEXT_PUBLIC_ prefix)
- ⚠️ Implement rate limiting for API calls
- ⚠️ Add CSRF protection
- ⚠️ Implement Content Security Policy (CSP)
- ⚠️ Add input sanitization for search queries
- ⚠️ Implement API key rotation strategy
- ⚠️ Add security headers (helmet.js)
- ⚠️ Validate and sanitize all user inputs

### 4. SEO & Accessibility

**Current Implementation:**
- ✅ Server-side rendering for SEO
- ✅ Semantic HTML structure
- ✅ Alt text for images

**Recommended Improvements:**
- ⚠️ Add meta tags (title, description, OG tags)
- ⚠️ Implement structured data (JSON-LD)
- ⚠️ Add sitemap.xml and robots.txt
- ⚠️ Implement ARIA labels for interactive elements
- ⚠️ Add keyboard navigation support
- ⚠️ Ensure color contrast meets WCAG standards
- ⚠️ Add focus indicators
- ⚠️ Implement skip-to-content links

### 5. Monitoring & Analytics

**Recommended Implementation:**
- ⚠️ Add Google Analytics or Plausible
- ⚠️ Implement error tracking (Sentry)
- ⚠️ Add performance monitoring (Vercel Analytics, Web Vitals)
- ⚠️ Track API success/failure rates
- ⚠️ Monitor user engagement metrics
- ⚠️ Add logging service (Datadog, LogRocket)
- ⚠️ Implement A/B testing framework

### 6. Testing

**Current Implementation:**
- ❌ No tests implemented

**Recommended Implementation:**
- ⚠️ Unit tests (Jest, Vitest)
- ⚠️ Component tests (React Testing Library)
- ⚠️ E2E tests (Playwright, Cypress)
- ⚠️ API integration tests
- ⚠️ Visual regression tests (Chromatic)
- ⚠️ Performance tests (Lighthouse CI)
- ⚠️ Accessibility tests (axe-core)

### 7. Deployment & CI/CD

**Recommended Implementation:**
- ⚠️ Set up CI/CD pipeline (GitHub Actions, Vercel)
- ⚠️ Automated testing on PR
- ⚠️ Automated deployment to staging/production
- ⚠️ Environment-specific configurations
- ⚠️ Database migrations strategy
- ⚠️ Rollback strategy
- ⚠️ Health check endpoints

### 8. Database & State Management

**Current Implementation:**
- ✅ Supabase for user authentication
- ❌ No persistent user data (watchlist, favorites)

**Recommended Implementation:**
- ⚠️ Create database schema for user preferences
- ⚠️ Implement watchlist functionality
- ⚠️ Add favorites/liked movies
- ⚠️ Store user viewing history
- ⚠️ Implement user ratings
- ⚠️ Add global state management (Zustand, Redux)
- ⚠️ Implement optimistic updates

### 9. API Rate Limiting & Caching

**Current Implementation:**
- ✅ 5-minute cache revalidation
- ✅ 10-second timeout

**Recommended Improvements:**
- ⚠️ Implement Redis for distributed caching
- ⚠️ Add request deduplication
- ⚠️ Implement API rate limiting on client
- ⚠️ Add request queue for failed requests
- ⚠️ Implement stale-while-revalidate strategy
- ⚠️ Add CDN for static assets

### 10. User Experience

**Current Implementation:**
- ✅ Responsive design
- ✅ Loading skeletons (Hero only)
- ✅ Error messages

**Recommended Improvements:**
- ⚠️ Add loading states for all async operations
- ⚠️ Implement infinite scroll for movie lists
- ⚠️ Add filters (genre, year, rating)
- ⚠️ Implement sorting options
- ⚠️ Add movie trailers (YouTube embed)
- ⚠️ Implement dark/light theme toggle
- ⚠️ Add animations and transitions
- ⚠️ Implement progressive web app (PWA)

---

## Common Issues & Solutions

### Issue 1: API Data Not Showing on Movie Detail Pages

**Symptoms:**
- Homepage shows data after refresh
- Movie detail pages show "Unknown Title" or error
- Console shows API errors

**Root Causes:**
- Aggressive caching (1 hour) causing stale data
- Poor error handling returning minimal objects
- No fallback mechanism for individual movies

**Solutions Applied:**
- Reduced cache from 1 hour to 5 minutes
- Changed error handling to return `null` instead of minimal object
- Added proper null checks and error pages
- Enhanced logging with prefixes (`[tmdb]`, `[MovieDetailPage]`)
- Centralized data fetching in `data-fetching.ts`

**Prevention:**
- Always test API calls in both development and production
- Monitor API response times and error rates
- Implement proper error boundaries

### Issue 2: Sample Data Showing Instead of API Data

**Symptoms:**
- Homepage shows placeholder images
- Sample movies (Inception, Dark Knight) appear
- Refresh fixes the issue

**Root Causes:**
- API key not loaded on first render
- Network timeout or connection issues
- TMDB API rate limiting

**Solutions:**
- Verify API key in `.env.local`
- Check network connectivity
- Implement retry logic
- Add better error messages

### Issue 3: Authentication Redirect Loops

**Symptoms:**
- Infinite redirects between signin and dashboard
- User can't access protected pages

**Root Causes:**
- Middleware not properly checking auth state
- Cookie issues with Supabase SSR

**Solutions:**
- Verify Supabase configuration
- Check cookie handling in `proxy.ts`
- Clear browser cookies and cache
- Ensure `getUser()` is called correctly

### Issue 4: Images Not Loading

**Symptoms:**
- Broken image icons
- 404 errors for TMDB images

**Root Causes:**
- Missing `remotePatterns` in `next.config.ts`
- Invalid image paths from API
- CORS issues

**Solutions:**
- Add TMDB domain to `next.config.ts`
- Use fallback placeholder images
- Verify image URLs in API responses

---

## Development Workflow

### Setup
```bash
# Clone repository
git clone <repository-url>
cd silver-screen

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Run development server
pnpm dev
```

### Development Commands
```bash
# Start dev server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint

# Type check
tsc --noEmit
```

### Debugging

**Console Logging:**
- `[tmdb]` - TMDB API fetch operations
- `[tmdbService]` - Service layer operations
- `[data-fetching]` - Data fetching layer
- `[MovieDetailPage]` - Movie detail page operations

**Browser DevTools:**
- Network tab: Monitor API calls and responses
- Console: Check for errors and logs
- Application tab: Inspect cookies and local storage

**Clear Cache:**
```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules (if needed)
rm -rf node_modules
pnpm install
```

---

## Code Style & Conventions

### File Naming
- Components: PascalCase (e.g., `MovieCard.tsx`)
- Utilities: camelCase (e.g., `data-fetching.ts`)
- Types: PascalCase (e.g., `Movie`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_KEY`)

### Component Structure
```typescript
// 1. Imports
import React from 'react';
import { Movie } from '@/lib/types/movie';

// 2. Type definitions
interface MovieCardProps {
  movie: Movie;
}

// 3. Component
const MovieCard = ({ movie }: MovieCardProps) => {
  // Component logic
  return (
    // JSX
  );
};

// 4. Export
export default MovieCard;
```

### API Service Pattern
```typescript
// Service function
export const tmdbService = {
  getMovies: async (): Promise<Movie[]> => {
    try {
      const response = await tmdb.fetchFromEndpoint('/endpoint');
      return response.results;
    } catch (error) {
      console.error('[tmdbService] Error:', error);
      throw error;
    }
  }
};
```

### Data Fetching Pattern
```typescript
// Server-side data fetching
export const getMovies = async (): Promise<Movie[]> => {
  try {
    const tmdbMovies = await tmdbService.getMovies();
    
    if (tmdbMovies.length === 0) {
      console.warn('No movies returned, using fallback');
      return fallbackData;
    }
    
    return tmdbMovies.map(mapToMovie);
  } catch (error) {
    console.error('[data-fetching] Error:', error);
    return fallbackData;
  }
};
```

---

## TypeScript Interfaces

### Movie Interface
```typescript
interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  runtime: number;
  genre: string;
  poster: string;
  description: string;
  trending?: boolean;
}
```

### TMDB API Response
```typescript
interface TmdbMovie {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  runtime?: number;
  genre_ids: number[];
  poster_path: string;
  backdrop_path: string;
  overview: string;
  popularity: number;
}

interface TmdbResponse {
  page: number;
  results: TmdbMovie[];
  total_pages: number;
  total_results: number;
}
```

---

## Deployment Checklist

### Pre-Deployment

- [ ] All environment variables set in production
- [ ] API keys secured (not exposed in client bundle)
- [ ] Database migrations completed
- [ ] All tests passing
- [ ] Build succeeds without errors
- [ ] No console errors in production build
- [ ] Images optimized and compressed
- [ ] SEO meta tags added
- [ ] Analytics configured
- [ ] Error tracking configured

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

**Environment Variables in Vercel:**
1. Go to Project Settings > Environment Variables
2. Add all variables from `.env.local`
3. Set appropriate environment (Production, Preview, Development)

### Post-Deployment

- [ ] Verify all pages load correctly
- [ ] Test authentication flow
- [ ] Check API calls are working
- [ ] Verify images load
- [ ] Test on mobile devices
- [ ] Run Lighthouse audit
- [ ] Monitor error logs
- [ ] Check analytics data

---

## Performance Benchmarks

### Target Metrics (Lighthouse)
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 95

### Core Web Vitals
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

### API Response Times
- TMDB API: < 500ms (average)
- Supabase Auth: < 200ms (average)

---

## Future Roadmap

### Phase 1: Core Features (Current)
- ✅ Movie browsing (trending, popular, upcoming)
- ✅ Movie detail pages
- ✅ Search functionality
- ✅ User authentication
- ✅ Responsive design

### Phase 2: User Features
- ⚠️ Watchlist functionality
- ⚠️ Favorites/liked movies
- ⚠️ User ratings and reviews
- ⚠️ Viewing history
- ⚠️ Personalized recommendations

### Phase 3: Enhanced Experience
- ⚠️ Movie trailers (YouTube embed)
- ⚠️ Cast and crew information
- ⚠️ Advanced filters and sorting
- ⚠️ Genre-based browsing
- ⚠️ Year-based browsing
- ⚠️ Dark/light theme toggle

### Phase 4: Social Features
- ⚠️ User profiles (public)
- ⚠️ Follow other users
- ⚠️ Share watchlists
- ⚠️ Comments and discussions
- ⚠️ Social media integration

### Phase 5: Advanced Features
- ⚠️ Offline support (PWA)
- ⚠️ Push notifications
- ⚠️ Multi-language support
- ⚠️ Accessibility improvements
- ⚠️ Advanced analytics

---

## Contact & Support

### For AI Assistants
When helping with this project:
1. Always reference this document for context
2. Follow the established code patterns
3. Maintain TypeScript strict mode
4. Add proper error handling and logging
5. Consider production-level requirements
6. Test changes thoroughly
7. Update this document if architecture changes

### Key Files to Reference
- **API Configuration:** `src/lib/constants/tmdb.ts`
- **Data Fetching:** `src/lib/data-fetching.ts`
- **Type Definitions:** `src/lib/types/movie.ts`
- **Authentication:** `src/lib/supabase/`, `src/proxy.ts`
- **Homepage:** `src/app/page.tsx`
- **Movie Details:** `src/app/movie/[id]/page.tsx`

---

## Version History

- **v0.1.0** - Initial project setup
- **v0.2.0** - TMDB API integration
- **v0.3.0** - Supabase authentication
- **v0.4.0** - Movie detail pages
- **v0.5.0** - Search functionality
- **v0.6.0** - API error handling improvements (Current)

---

**Last Updated:** February 6, 2026
**Maintained By:** SilverScreen Development Team
