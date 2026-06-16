'use client';

import { memo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NewsItem } from '@/types';
import { formatRelativeTime, truncateText } from '@/utils/helpers';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleFavorite } from '@/redux/slices/favoritesSlice';

interface NewsCardProps {
  item: NewsItem;
  index?: number;
}

function NewsCardInner({ item, index = 0 }: NewsCardProps) {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) =>
    state.favorites.items.some((f) => f.id === item.id)
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: [0.2, 0, 0, 1] }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="group relative overflow-hidden rounded-[--radius-md-lg] bg-md-surface-container shadow-sm transition-shadow duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:shadow-md"
    >
      {/* Type badge — pill */}
      <div className="absolute left-3 top-3 z-10 rounded-full bg-md-primary px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-md-on-primary">
        News
      </div>

      {/* Favorite button — circular MD3 icon button */}
      <motion.button
        whileTap={{ scale: 1.3 }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          dispatch(toggleFavorite(item));
        }}
        className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-md-inverse-surface/30 text-md-inverse-on-surface backdrop-blur-sm transition-all duration-200 hover:bg-md-inverse-surface/50 active:scale-95"
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        data-testid={mounted ? `favorite-${item.id}` : undefined}
        tabIndex={0}
        style={{}}
      >
        <span className="text-sm">{mounted && isFavorite ? '❤️' : '🤍'}</span>
      </motion.button>

      {/* Image */}
      <div className="relative h-44 w-full overflow-hidden bg-md-surface-variant/50">
        <img
          src={item.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800'}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="mb-2 line-clamp-2 text-sm font-medium leading-snug text-md-on-surface">
          {item.title}
        </h3>
        <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-md-on-surface-variant">
          {truncateText(item.description, 120)}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-md-primary-container text-[9px] font-bold text-md-on-primary-container">
              {item.source.name.charAt(0)}
            </div>
            <span className="text-[11px] font-medium text-md-on-surface-variant">
              {item.source.name}
            </span>
          </div>
          <span className="text-[11px] text-md-outline">
            {formatRelativeTime(item.publishedAt)}
          </span>
        </div>
      </div>

      {/* External link overlay */}
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-[5]"
        aria-label={`Read more: ${item.title}`}
      />
    </motion.article>
  );
}

export const NewsCard = memo(NewsCardInner);
export default NewsCard;
