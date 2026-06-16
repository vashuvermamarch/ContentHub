'use client';

import { memo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MovieItem, TMDB_GENRES } from '@/types';
import { getTMDBImageUrl } from '@/utils/helpers';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleFavorite } from '@/redux/slices/favoritesSlice';

interface MovieCardProps {
  item: MovieItem;
  index?: number;
}

function MovieCardInner({ item, index = 0 }: MovieCardProps) {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector((state) =>
    state.favorites.items.some((f) => f.id === item.id)
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const posterUrl = getTMDBImageUrl(item.poster_path, 'w500');
  const year = item.release_date ? new Date(item.release_date).getFullYear() : '';
  const rating = item.vote_average?.toFixed(1);
  const genres = item.genre_ids
    ?.slice(0, 2)
    .map((id) => TMDB_GENRES[id])
    .filter(Boolean);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: [0.2, 0, 0, 1] }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="group relative overflow-hidden rounded-[--radius-md-lg] bg-md-surface-container shadow-sm transition-shadow duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:shadow-md"
    >
      {/* Type badge — pill */}
      <div className="absolute left-3 top-3 z-10 rounded-full bg-md-tertiary px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-md-on-tertiary">
        Movie
      </div>

      {/* Rating badge — tonal pill */}
      {rating && (
        <div className="absolute right-12 top-3 z-10 flex items-center gap-1 rounded-full bg-md-tertiary-container px-2.5 py-0.5 text-[11px] font-bold text-md-on-tertiary-container">
          ⭐ {rating}
        </div>
      )}

      {/* Favorite button */}
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

      {/* Poster */}
      <div className="relative h-56 w-full overflow-hidden bg-md-surface-variant">
        <img
          src={posterUrl || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=800'}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=800';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="mb-1.5 line-clamp-1 text-sm font-medium text-md-on-surface">
          {item.title}
          {year && (
            <span className="ml-1.5 text-xs font-normal text-md-on-surface-variant">
              ({year})
            </span>
          )}
        </h3>
        <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-md-on-surface-variant">
          {item.overview}
        </p>

        {/* Genre chips — MD3 pills */}
        {genres && genres.length > 0 && (
          <div className="flex gap-1.5">
            {genres.map((genre) => (
              <span
                key={genre}
                className="rounded-full bg-md-tertiary-container/60 px-2.5 py-0.5 text-[10px] font-medium text-md-on-tertiary-container"
              >
                {genre}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}

export const MovieCard = memo(MovieCardInner);
export default MovieCard;
