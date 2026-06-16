# ContentHub AI — Personalized Content Dashboard

A modern, personalized dashboard that combines **News**, **Movies**, and **Social Posts** into one unified feed. Built as a high-quality MVP demonstrating frontend engineering skills with Next.js 15, Redux Toolkit, and a premium UI.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2-purple?logo=redux)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-teal?logo=tailwindcss)

---

## ✨ Features

### Core
- **Unified Feed** — News, movies, and social posts interleaved in one dashboard
- **Search** — Debounced (500ms) search across all content types
- **Favorites** — Save any content to your favorites, persisted across sessions
- **Dark Mode** — Premium dark/light theme with smooth transitions
- **Drag & Drop** — Reorder feed cards using react-dnd
- **Settings** — Choose content categories (Technology, Sports, Finance, AI, Entertainment, etc.)
- **Responsive** — Fully responsive from mobile to desktop

### Technical
- **RTK Query** — Automatic caching, loading/error states for API calls
- **Redux Persist** — Preferences and favorites survive page refreshes
- **Framer Motion** — Animated cards, page transitions, hover effects, micro-interactions
- **Infinite Scroll** — Load more content as you scroll (via Intersection Observer)
- **Memoization** — React.memo on cards, useMemo for feed interleaving

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript + React 19 |
| State | Redux Toolkit + RTK Query + Redux Persist |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Drag & Drop | react-dnd + HTML5 Backend |
| Infinite Scroll | react-intersection-observer |
| Unit Testing | Jest + React Testing Library |
| E2E Testing | Playwright |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ and npm

### 1. Clone & Install

```bash
cd contenthub
npm install
```

### 2. API Keys

Create a `.env.local` file (or edit the existing one):

```
NEXT_PUBLIC_GNEWS_API_KEY=your_gnews_key_here
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_key_here
```

Get free API keys:
- **GNews**: [gnews.io](https://gnews.io) (100 requests/day)
- **TMDB**: [themoviedb.org](https://www.themoviedb.org/settings/api) (generous free tier)

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Architecture

```
contenthub/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Dashboard (/)
│   ├── globals.css         # Design system & global styles
│   ├── trending/page.tsx   # Trending page
│   ├── favorites/page.tsx  # Favorites page
│   └── settings/page.tsx   # Settings page
├── components/
│   ├── layout/             # Header, Sidebar, DashboardLayout
│   ├── cards/              # NewsCard, MovieCard, SocialCard, DraggableCard
│   ├── feed/               # UnifiedFeed
│   ├── search/             # SearchBar
│   ├── providers/          # StoreProvider, DndProviderWrapper
│   └── ui/                 # CategoryChip, SkeletonCard, EmptyState, ErrorState
├── redux/
│   ├── store.ts            # Store with persist config
│   ├── hooks.ts            # Typed useAppDispatch, useAppSelector
│   ├── StoreProvider.tsx   # Client-side Redux + PersistGate
│   ├── slices/             # preferencesSlice, favoritesSlice, feedSlice
│   └── api/                # newsApi (GNews), tmdbApi (TMDB) — RTK Query
├── hooks/                  # useDebounce, useDarkMode, useFeedInterleave
├── types/                  # TypeScript interfaces + utility maps
├── data/                   # Mock social posts
├── utils/                  # Helper functions
├── tests/
│   └── unit/               # Jest unit tests for all slices
├── e2e/                    # Playwright E2E tests
├── jest.config.ts
└── playwright.config.ts
```

---

## 🧪 Testing

### Unit Tests (Jest)

```bash
npm test
```

Tests cover:
- **preferencesSlice** — Dark mode toggle, category management
- **favoritesSlice** — Add/remove/toggle favorites, duplicate prevention
- **feedSlice** — Item management, reordering, pagination, search query

### E2E Tests (Playwright)

```bash
npm run test:e2e
```

Tests cover:
- **Search** — Type query → debounced results appear → clear returns to dashboard
- **Favorites** — Click heart → navigate to /favorites → item visible
- **Drag & Drop** — Drag card #3 above card #1 → order updates

---

## ⚡ Performance Optimizations

| Optimization | Implementation |
|-------------|---------------|
| **RTK Query Caching** | Automatic cache with `keepUnusedDataFor` |
| **Memoization** | `React.memo` on all card components, `useMemo` for feed interleaving |
| **Debouncing** | 500ms debounce on search to reduce API calls |
| **Lazy Loading** | Images use `loading="lazy"` attribute |
| **Redux Persist** | Only persists preferences + favorites (not API cache) |
| **Code Splitting** | Next.js automatic page-level code splitting |

---

## 🎨 Design System

- **Color Palette**: Violet/Indigo gradients with curated accent colors per content type
  - News: Blue
  - Movies: Amber
  - Social: Emerald
- **Typography**: Inter (Google Fonts)
- **Glassmorphism**: Backdrop blur on header and sidebar
- **Dark Mode**: Full dark theme with smooth transitions
- **Animations**: Framer Motion for card hover (scale 1.03), stagger load, page transitions, icon animations

---

## 📄 Pages

| Route | Description |
|-------|------------|
| `/` | Unified dashboard feed with drag-drop, search, infinite scroll |
| `/trending` | Trending news and movies sections |
| `/favorites` | Saved items with type-based filtering tabs |
| `/settings` | Category preferences, dark mode toggle, dashboard stats |

---

## 📋 API Integration

### GNews API
- **Top Headlines**: `/top-headlines?category=...&lang=en`
- **Search**: `/search?q=...&lang=en`
- Rate limit: 100 requests/day (free tier)

### TMDB API
- **Trending**: `/trending/movie/week`
- **Search**: `/search/movie?query=...`
- **Popular**: `/movie/popular`
- Free tier with generous limits

### Social Posts
- Mock data in `/data/socialPosts.ts`
- 16 realistic posts across multiple categories

---

## Redux Store Shape

```typescript
{
  preferences: {
    categories: CategoryType[],
    darkMode: boolean
  },
  favorites: {
    items: FeedItem[]
  },
  feed: {
    items: FeedItem[],
    order: string[],        // Controls drag-drop order
    searchQuery: string,
    newsPage: number,
    moviesPage: number,
    hasMoreNews: boolean,
    hasMoreMovies: boolean
  },
  newsApi: { ... },         // RTK Query cache
  tmdbApi: { ... }          // RTK Query cache
}
```

---

Built with ❤️ for the SDE Frontend Internship Assignment.
