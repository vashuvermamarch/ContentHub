'use client';

import { useMemo, useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/layout/DashboardLayout';
import UnifiedFeed from '@/components/feed/UnifiedFeed';
import { SkeletonGrid } from '@/components/ui/SkeletonCard';
import ErrorState from '@/components/ui/ErrorState';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { useGetTopHeadlinesQuery, useSearchNewsQuery } from '@/redux/api/newsApi';
import { useGetTrendingQuery, useSearchMoviesQuery } from '@/redux/api/tmdbApi';
import { useFeedInterleave, transformNewsArticle, transformTMDBMovie } from '@/hooks/useFeedInterleave';
import { useDarkMode } from '@/hooks/useDarkMode';
import { socialPosts } from '@/data/socialPosts';
import { fallbackNewsArticles, fallbackMovies } from '@/data/mockFallbackData';
import { CATEGORY_TO_GNEWS, NewsItem, MovieItem, SocialPost } from '@/types';
import { setFeedItems } from '@/redux/slices/feedSlice';

export default function DashboardPage() {
  useDarkMode();
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.feed.searchQuery);
  const categories = useAppSelector((state) => state.preferences.categories);
  const feedOrder = useAppSelector((state) => state.feed.order);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    setVisibleCount(6);
  }, [searchQuery, categories]);

  const gnewsCategory = useMemo(() => {
    if (categories.length > 0) {
      return CATEGORY_TO_GNEWS[categories[0]] || 'general';
    }
    return 'general';
  }, [categories]);

  const isSearching = searchQuery.length > 0;

  const {
    data: headlinesData,
    isLoading: headlinesLoading,
    error: headlinesError,
    refetch: refetchHeadlines,
  } = useGetTopHeadlinesQuery(
    { category: gnewsCategory, max: 10 },
    { skip: isSearching }
  );

  const {
    data: searchNewsData,
    isLoading: searchNewsLoading,
    error: searchNewsError,
  } = useSearchNewsQuery({ q: searchQuery, max: 10 }, { skip: !isSearching });

  const {
    data: trendingData,
    isLoading: trendingLoading,
    error: trendingError,
    refetch: refetchTrending,
  } = useGetTrendingQuery({ page: 1 }, { skip: isSearching });

  const {
    data: searchMoviesData,
    isLoading: searchMoviesLoading,
  } = useSearchMoviesQuery(
    { query: searchQuery, page: 1 },
    { skip: !isSearching }
  );

  const newsItems: NewsItem[] = useMemo(() => {
    const data = isSearching ? searchNewsData : headlinesData;
    if (!data?.articles || data.articles.length === 0) {
      const articles = isSearching
        ? fallbackNewsArticles.filter(
            (a) =>
              a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              a.description.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : fallbackNewsArticles;
      return articles.map((article, idx) => transformNewsArticle(article, idx));
    }
    return data.articles.map((article, idx) => transformNewsArticle(article, idx));
  }, [headlinesData, searchNewsData, isSearching, searchQuery]);

  const movieItems: MovieItem[] = useMemo(() => {
    const data = isSearching ? searchMoviesData : trendingData;
    if (!data?.results || data.results.length === 0) {
      const movies = isSearching
        ? fallbackMovies.filter(
            (m) =>
              m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              m.overview.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : fallbackMovies;
      return movies.map(transformTMDBMovie);
    }
    return data.results.map(transformTMDBMovie);
  }, [trendingData, searchMoviesData, isSearching, searchQuery]);

  const filteredSocial: SocialPost[] = useMemo(() => {
    if (!isSearching) return socialPosts;
    const q = searchQuery.toLowerCase();
    return socialPosts.filter(
      (post) =>
        post.content.toLowerCase().includes(q) ||
        post.author.toLowerCase().includes(q) ||
        post.hashtag.toLowerCase().includes(q)
    );
  }, [searchQuery, isSearching]);

  const interleavedItems = useFeedInterleave(newsItems, movieItems, filteredSocial);

  useEffect(() => {
    if (interleavedItems.length > 0) {
      dispatch(setFeedItems(interleavedItems));
    }
  }, [interleavedItems, dispatch]);

  const orderedItems = useMemo(() => {
    if (feedOrder.length === 0) return interleavedItems;
    const itemMap = new Map(interleavedItems.map((item) => [item.id, item]));
    const ordered = feedOrder
      .map((id) => itemMap.get(id))
      .filter(Boolean) as typeof interleavedItems;
    const orderedIds = new Set(feedOrder);
    const newItems = interleavedItems.filter((item) => !orderedIds.has(item.id));
    return [...ordered, ...newItems];
  }, [feedOrder, interleavedItems]);

  const isLoading =
    headlinesLoading || trendingLoading || searchNewsLoading || searchMoviesLoading;

  return (
    <DashboardLayout>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: [0.2, 0, 0, 1] }}
        className="mb-8"
      >
        <h1 className="text-3xl font-medium tracking-tight text-md-on-surface sm:text-4xl">
          {isSearching ? (
            <>
              Results for{' '}
              <span className="text-gradient-md3">&ldquo;{searchQuery}&rdquo;</span>
            </>
          ) : (
            <>
              Your <span className="text-gradient-md3">Dashboard</span>
            </>
          )}
        </h1>
        <p className="mt-2 text-sm text-md-on-surface-variant leading-relaxed">
          {isSearching
            ? `Found ${orderedItems.length} results across news, movies, and social posts.`
            : 'Discover the latest news, trending movies, and social buzz — all in one place.'}
        </p>
      </motion.div>

      {/* Initial loading */}
      {isLoading && orderedItems.length === 0 && <SkeletonGrid count={6} />}

      {/* Feed */}
      {(!isLoading || orderedItems.length > 0) && (
        <UnifiedFeed
          items={orderedItems.slice(0, visibleCount)}
          isLoading={isLoading}
          hasMore={visibleCount < orderedItems.length}
          onLoadMore={() => setVisibleCount((prev) => prev + 6)}
          emptyTitle={
            isSearching ? 'No results found' : 'No content available'
          }
          emptyDescription={
            isSearching
              ? `No results found for "${searchQuery}". Try a different search term.`
              : 'Add API keys to .env.local to start seeing content.'
          }
          emptyIcon={isSearching ? '🔍' : '📡'}
        />
      )}
    </DashboardLayout>
  );
}
