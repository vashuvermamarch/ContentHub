'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/layout/DashboardLayout';
import NewsCard from '@/components/cards/NewsCard';
import MovieCard from '@/components/cards/MovieCard';
import { SkeletonGrid } from '@/components/ui/SkeletonCard';
import ErrorState from '@/components/ui/ErrorState';
import { useDarkMode } from '@/hooks/useDarkMode';
import { useGetTopHeadlinesQuery } from '@/redux/api/newsApi';
import { useGetTrendingQuery } from '@/redux/api/tmdbApi';
import { transformNewsArticle, transformTMDBMovie } from '@/hooks/useFeedInterleave';
import { fallbackNewsArticles, fallbackMovies } from '@/data/mockFallbackData';

export default function TrendingPage() {
  useDarkMode();
  const [visibleNews, setVisibleNews] = useState(3);
  const [visibleMovies, setVisibleMovies] = useState(3);

  const {
    data: newsData,
    isLoading: newsLoading,
    error: newsError,
    refetch: refetchNews,
  } = useGetTopHeadlinesQuery({ category: 'general', max: 10 });

  const {
    data: moviesData,
    isLoading: moviesLoading,
    error: moviesError,
    refetch: refetchMovies,
  } = useGetTrendingQuery({ page: 1 });

  const newsItems = useMemo(() => {
    if (!newsData?.articles || newsData.articles.length === 0) {
      return fallbackNewsArticles.map((a, i) => transformNewsArticle(a, i));
    }
    return newsData.articles.map((a, i) => transformNewsArticle(a, i));
  }, [newsData]);

  const movieItems = useMemo(() => {
    if (!moviesData?.results || moviesData.results.length === 0) {
      return fallbackMovies.map(transformTMDBMovie);
    }
    return moviesData.results.map(transformTMDBMovie);
  }, [moviesData]);

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: [0.2, 0, 0, 1] }}
        className="mb-8"
      >
        <h1 className="text-3xl font-medium tracking-tight text-md-on-surface sm:text-4xl">
          🔥 <span className="text-gradient-md3">Trending</span>
        </h1>
        <p className="mt-2 text-sm text-md-on-surface-variant">
          What&apos;s hot right now across news and entertainment.
        </p>
      </motion.div>

      {/* Trending News */}
      <section className="mb-12 border-b border-md-outline-variant/20 pb-8">
        <motion.h2
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, ease: [0.2, 0, 0, 1] }}
          className="mb-5 flex items-center gap-2 text-xl font-medium text-md-on-surface"
        >
          📰 Trending News
        </motion.h2>

        {newsLoading && <SkeletonGrid count={3} />}

        {!newsLoading && (
          <>
            <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [column-fill:_balance] w-full">
              {newsItems.slice(0, visibleNews).map((item, index) => (
                <div key={item.id} className="break-inside-avoid mb-6">
                  <NewsCard item={item} index={index} />
                </div>
              ))}
            </div>
            {visibleNews < newsItems.length && (
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => setVisibleNews((prev) => prev + 3)}
                  className="flex items-center gap-2 rounded-full bg-md-primary px-5 py-2.5 text-xs font-semibold text-md-on-primary shadow-sm hover:shadow-md hover:bg-md-primary/90 transition-all active:scale-95 duration-200 cursor-pointer"
                >
                  Load More News
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Trending Movies */}
      <section className="pb-8">
        <motion.h2
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, ease: [0.2, 0, 0, 1] }}
          className="mb-5 flex items-center gap-2 text-xl font-medium text-md-on-surface"
        >
          🎬 Trending Movies
        </motion.h2>

        {moviesLoading && <SkeletonGrid count={3} />}

        {!moviesLoading && (
          <>
            <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [column-fill:_balance] w-full">
              {movieItems.slice(0, visibleMovies).map((item, index) => (
                <div key={item.id} className="break-inside-avoid mb-6">
                  <MovieCard item={item} index={index} />
                </div>
              ))}
            </div>
            {visibleMovies < movieItems.length && (
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => setVisibleMovies((prev) => prev + 3)}
                  className="flex items-center gap-2 rounded-full bg-md-primary px-5 py-2.5 text-xs font-semibold text-md-on-primary shadow-sm hover:shadow-md hover:bg-md-primary/90 transition-all active:scale-95 duration-200 cursor-pointer"
                >
                  Load More Movies
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </DashboardLayout>
  );
}
