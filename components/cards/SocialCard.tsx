'use client';

import { memo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SocialPost } from '@/types';
import { formatRelativeTime, formatCompactNumber } from '@/utils/helpers';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleFavorite } from '@/redux/slices/favoritesSlice';

interface SocialCardProps {
  item: SocialPost;
  index?: number;
}

function SocialCardInner({ item, index = 0 }: SocialCardProps) {
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
      <div className="absolute right-3 top-3 z-10 rounded-full bg-md-secondary px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-md-on-secondary">
        Social
      </div>

      <div className="p-5">
        {/* Author */}
        <div className="mb-3 flex items-center gap-3">
          <img
            src={item.avatar}
            alt={item.author}
            className="h-10 w-10 rounded-full ring-2 ring-md-outline-variant/30"
            loading="lazy"
          />
          <div>
            <p className="text-sm font-medium text-md-on-surface">
              {item.author}
            </p>
            <p className="text-[11px] text-md-on-surface-variant">{item.handle}</p>
          </div>
        </div>

        {/* Content */}
        <p className="mb-3 text-sm leading-relaxed text-md-on-surface/90">
          {item.content}
        </p>

        {/* Hashtag — MD3 pill chip */}
        <span className="inline-block rounded-full bg-md-secondary-container px-3 py-1 text-xs font-medium text-md-on-secondary-container">
          {item.hashtag}
        </span>

        {/* Engagement */}
        <div className="mt-3 flex items-center justify-between border-t border-md-outline-variant/20 pt-3">
          <div className="flex gap-4">
            <motion.button
              whileTap={{ scale: 1.3 }}
              onClick={() => dispatch(toggleFavorite(item))}
              className="flex items-center gap-1 rounded-full px-1 text-xs text-md-on-surface-variant transition-colors duration-200 hover:text-md-error active:scale-95"
              data-testid={`favorite-${item.id}`}
            >
              <span>{mounted && isFavorite ? '❤️' : '🤍'}</span>
              {formatCompactNumber(item.likes)}
            </motion.button>
            <span className="flex items-center gap-1 text-xs text-md-on-surface-variant">
              🔄 {formatCompactNumber(item.retweets)}
            </span>
            <span className="flex items-center gap-1 text-xs text-md-on-surface-variant">
              💬 {formatCompactNumber(item.comments)}
            </span>
          </div>
          <span className="text-[11px] text-md-outline">
            {formatRelativeTime(item.timestamp)}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export const SocialCard = memo(SocialCardInner);
export default SocialCard;
