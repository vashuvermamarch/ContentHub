'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch } from '@/redux/hooks';
import { setSearchQuery } from '@/redux/slices/feedSlice';
import { useDebounce } from '@/hooks/useDebounce';
import { useEffect } from 'react';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useAppDispatch();
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    dispatch(setSearchQuery(debouncedQuery));
  }, [debouncedQuery, dispatch]);

  const handleClear = useCallback(() => {
    setQuery('');
    dispatch(setSearchQuery(''));
  }, [dispatch]);

  return (
    <div className="relative">
      {/* Search icon */}
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
        <svg
          className={`h-4 w-4 transition-colors duration-200 ${
            isFocused ? 'text-md-primary' : 'text-md-on-surface-variant/60'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* MD3 Filled Text Field Style: rounded-top, flat-bottom with border */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search news, movies, posts..."
        className={`h-11 w-full rounded-t-[--radius-md-sm] rounded-b-none border-b-2 bg-md-surface-variant/40 py-2 pl-10 pr-9 text-sm font-normal text-md-on-surface placeholder-md-on-surface-variant/50 outline-none transition-all duration-200 sm:w-64 ${
          isFocused
            ? 'border-b-md-primary bg-md-surface-variant/60'
            : 'border-b-md-outline'
        }`}
        id="search-input"
        data-testid="search-input"
      />

      {/* Clear button */}
      {query && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={handleClear}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-md-on-surface-variant/60 transition-colors hover:text-md-on-surface active:scale-95"
          aria-label="Clear search"
        >
          ✕
        </motion.button>
      )}
    </div>
  );
}
