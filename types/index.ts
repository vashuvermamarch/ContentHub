// =============================================
// ContentHub AI Dashboard — Type Definitions
// =============================================

export type FeedItemType = 'news' | 'movie' | 'social';

export type CategoryType =
  | 'technology'
  | 'sports'
  | 'finance'
  | 'ai'
  | 'entertainment'
  | 'general'
  | 'science'
  | 'health';

// ----- News -----
export interface NewsItem {
  id: string;
  type: 'news';
  title: string;
  description: string;
  content: string;
  image: string | null;
  url: string;
  source: {
    name: string;
    url: string;
  };
  publishedAt: string;
}

export interface GNewsArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string | null;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

export interface GNewsResponse {
  totalArticles: number;
  articles: GNewsArticle[];
}

// ----- Movies -----
export interface MovieItem {
  id: string;
  type: 'movie';
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date: string;
  genre_ids: number[];
  popularity: number;
}

export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date: string;
  genre_ids: number[];
  popularity: number;
}

export interface TMDBResponse {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
}

// ----- Social Posts -----
export interface SocialPost {
  id: string;
  type: 'social';
  author: string;
  handle: string;
  avatar: string;
  hashtag: string;
  content: string;
  timestamp: string;
  likes: number;
  retweets: number;
  comments: number;
}

// ----- Union Feed Item -----
export type FeedItem = NewsItem | MovieItem | SocialPost;

// ----- Redux State Types -----
export interface PreferencesState {
  categories: CategoryType[];
  darkMode: boolean;
}

export interface FavoritesState {
  items: FeedItem[];
}

export interface FeedState {
  items: FeedItem[];
  order: string[];
  searchQuery: string;
  newsPage: number;
  moviesPage: number;
  hasMoreNews: boolean;
  hasMoreMovies: boolean;
}

// ----- Drag & Drop -----
export interface DragItem {
  index: number;
  id: string;
  type: string;
}

// ----- TMDB Genre Map -----
export const TMDB_GENRES: Record<number, string> = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Sci-Fi',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

// ----- Category to GNews mapping -----
export const CATEGORY_TO_GNEWS: Record<CategoryType, string> = {
  technology: 'technology',
  sports: 'sports',
  finance: 'business',
  ai: 'technology',
  entertainment: 'entertainment',
  general: 'general',
  science: 'science',
  health: 'health',
};
