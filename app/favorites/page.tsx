'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '@/components/layout/DashboardLayout';
import NewsCard from '@/components/cards/NewsCard';
import MovieCard from '@/components/cards/MovieCard';
import SocialCard from '@/components/cards/SocialCard';
import EmptyState from '@/components/ui/EmptyState';
import { useAppSelector } from '@/redux/hooks';
import { useDarkMode } from '@/hooks/useDarkMode';
import { FeedItem } from '@/types';
import { useRouter } from 'next/navigation';

type FilterTab = 'all' | 'news' | 'movie' | 'social';

const tabs: { key: FilterTab; label: string; icon: string }[] = [
  { key: 'all', label: 'All', icon: '📋' },
  { key: 'news', label: 'News', icon: '📰' },
  { key: 'movie', label: 'Movies', icon: '🎬' },
  { key: 'social', label: 'Social', icon: '💬' },
];

export default function FavoritesPage() {
  useDarkMode();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const favorites = useAppSelector((state) => state.favorites.items);

  const filteredItems = useMemo(() => {
    if (activeTab === 'all') return favorites;
    return favorites.filter((item) => item.type === activeTab);
  }, [favorites, activeTab]);

  const renderCard = (item: FeedItem, index: number) => {
    switch (item.type) {
      case 'news':
        return <NewsCard item={item} index={index} />;
      case 'movie':
        return <MovieCard item={item} index={index} />;
      case 'social':
        return <SocialCard item={item} index={index} />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: [0.2, 0, 0, 1] }}
        className="mb-8"
      >
        <h1 className="text-3xl font-medium tracking-tight text-md-on-surface sm:text-4xl">
          ♥ <span className="text-gradient-md3">Favorites</span>
        </h1>
        <p className="mt-2 text-sm text-md-on-surface-variant">
          Your saved content — {favorites.length} item
          {favorites.length !== 1 ? 's' : ''} saved.
        </p>
      </motion.div>

      {/* MD3 Filter Chips — pill-shaped */}
      <div className="mb-8 flex gap-2 overflow-x-auto pb-1">
        {tabs.map((tab) => {
          const count =
            tab.key === 'all'
              ? favorites.length
              : favorites.filter((f) => f.type === tab.key).length;
          return (
            <motion.button
              key={tab.key}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] active:scale-95 ${
                activeTab === tab.key
                  ? 'bg-md-primary text-md-on-primary shadow-sm'
                  : 'bg-md-surface-container text-md-on-surface-variant hover:bg-md-surface-variant/40'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
              <span
                className={`ml-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                  activeTab === tab.key
                    ? 'bg-md-on-primary/20'
                    : 'bg-md-surface-variant/60'
                }`}
              >
                {count}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Cards */}
      <AnimatePresence mode="wait">
        {filteredItems.length === 0 ? (
          <EmptyState
            key="empty"
            title="No favorites yet"
            description="Click the heart icon on any card to save it here."
            icon="💫"
            action={{
              label: 'Browse Dashboard',
              onClick: () => router.push('/'),
            }}
          />
        ) : (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ ease: [0.2, 0, 0, 1] }}
            className="columns-1 gap-6 sm:columns-2 lg:columns-3 [column-fill:_balance] w-full"
          >
            {filteredItems.map((item, index) => (
              <div key={item.id} className="break-inside-avoid mb-6">
                {renderCard(item, index)}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
