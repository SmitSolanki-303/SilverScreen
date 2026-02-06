# SilverScreen 🎬

A modern movie streaming website built with Next.js 16, React 19, TypeScript, and Tailwind CSS. Browse trending movies, search for your favorites, and manage your watchlist with a beautiful, responsive interface.

## 📚 Documentation

**For complete project context, architecture, and production guidelines, see:**
👉 **[PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md)**

This comprehensive document includes:
- Complete project structure and architecture
- API integration details (TMDB, Supabase)
- Production-level considerations and best practices
- Common issues and solutions
- Development workflow and debugging tips
- Deployment checklist
- Future roadmap

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get your API keys:
- **TMDB:** https://www.themoviedb.org/settings/api
- **Supabase:** https://supabase.com/dashboard

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Authentication:** Supabase
- **API:** TMDB (The Movie Database)
- **UI:** Lucide React, Swiper.js

## 📦 Available Scripts

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## 🎯 Features

- ✅ Browse trending, popular, and upcoming movies
- ✅ Search movies by title
- ✅ Detailed movie information pages
- ✅ User authentication (sign up/sign in)
- ✅ Responsive design
- ✅ Server-side rendering for SEO

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [TMDB API Documentation](https://developers.themoviedb.org/3)
- [Supabase Documentation](https://supabase.com/docs)

## 🚢 Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

See [PROJECT_CONTEXT.md](./PROJECT_CONTEXT.md) for detailed deployment instructions.
