'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/layout/DashboardLayout';
import CategoryChip from '@/components/ui/CategoryChip';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  toggleDarkMode,
  toggleCategory,
} from '@/redux/slices/preferencesSlice';
import { useDarkMode } from '@/hooks/useDarkMode';
import { CategoryType } from '@/types';

const allCategories: { key: CategoryType; label: string }[] = [
  { key: 'technology', label: 'Technology' },
  { key: 'sports', label: 'Sports' },
  { key: 'finance', label: 'Finance' },
  { key: 'ai', label: 'AI' },
  { key: 'entertainment', label: 'Entertainment' },
  { key: 'general', label: 'General' },
  { key: 'science', label: 'Science' },
  { key: 'health', label: 'Health' },
];

export default function SettingsPage() {
  const dispatch = useAppDispatch();
  const darkMode = useDarkMode();
  const categories = useAppSelector((state) => state.preferences.categories);
  const favoritesCount = useAppSelector(
    (state) => state.favorites.items.length
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: [0.2, 0, 0, 1] }}
        className="mb-8"
      >
        <h1 className="text-3xl font-medium tracking-tight text-md-on-surface sm:text-4xl">
          ⚙ <span className="text-gradient-md3">Settings</span>
        </h1>
        <p className="mt-2 text-sm text-md-on-surface-variant">
          Customize your content preferences. Changes are saved automatically.
        </p>
      </motion.div>

      <div className="max-w-2xl space-y-6">
        {/* Categories */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, ease: [0.2, 0, 0, 1] }}
          className="rounded-[--radius-md-lg] bg-md-surface-container p-6 shadow-sm"
        >
          <h2 className="mb-1 text-lg font-medium text-md-on-surface">
            Content Categories
          </h2>
          <p className="mb-5 text-sm text-md-on-surface-variant">
            Select the topics you&apos;re interested in. Your feed will
            prioritize content from these categories.
          </p>
          <div className="flex flex-wrap gap-2.5" data-testid="category-list">
            {mounted && allCategories.map((cat) => (
              <CategoryChip
                key={cat.key}
                category={cat.key}
                label={cat.label}
                selected={categories.includes(cat.key)}
                onToggle={() => dispatch(toggleCategory(cat.key))}
              />
            ))}
          </div>
          <p className="mt-4 text-xs text-md-on-surface-variant/60">
            {mounted ? categories.length : 0} categor{(mounted ? categories.length : 0) !== 1 ? 'ies' : 'y'}{' '}
            selected
          </p>
        </motion.section>

        {/* Appearance */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, ease: [0.2, 0, 0, 1] }}
          className="rounded-[--radius-md-lg] bg-md-surface-container p-6 shadow-sm"
        >
          <h2 className="mb-1 text-lg font-medium text-md-on-surface">
            Appearance
          </h2>
          <p className="mb-5 text-sm text-md-on-surface-variant">
            Choose your preferred color scheme.
          </p>

          <div className="flex items-center justify-between rounded-[--radius-md-md] bg-md-surface-container-high p-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{darkMode ? '🌙' : '☀️'}</span>
              <div>
                <p className="text-sm font-medium text-md-on-surface">
                  {darkMode ? 'Dark Mode' : 'Light Mode'}
                </p>
                <p className="text-xs text-md-on-surface-variant">
                  {darkMode
                    ? 'Easy on the eyes in low light'
                    : 'Bright and clear for daytime use'}
                </p>
              </div>
            </div>

            {/* MD3 Toggle switch */}
            <button
              onClick={() => dispatch(toggleDarkMode())}
              className={`relative h-8 w-13 rounded-full transition-colors duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
                darkMode ? 'bg-md-primary' : 'bg-md-outline'
              }`}
              aria-label="Toggle dark mode"
              data-testid="dark-mode-toggle"
            >
              <motion.div
                className={`absolute top-1 h-6 w-6 rounded-full shadow-sm transition-colors duration-300 ${
                  darkMode ? 'bg-md-on-primary' : 'bg-md-surface'
                }`}
                animate={{ left: darkMode ? '24px' : '4px' }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
          </div>
        </motion.section>

        {/* Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, ease: [0.2, 0, 0, 1] }}
          className="rounded-[--radius-md-lg] bg-md-surface-container p-6 shadow-sm"
        >
          <h2 className="mb-5 text-lg font-medium text-md-on-surface">
            Dashboard Stats
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="rounded-[--radius-md-md] bg-md-primary-container/40 p-4">
              <p className="text-2xl font-bold text-md-primary">
                {mounted ? categories.length : 0}
              </p>
              <p className="text-xs text-md-on-surface-variant">
                Categories
              </p>
            </div>
            <div className="rounded-[--radius-md-md] bg-md-tertiary-container/40 p-4">
              <p className="text-2xl font-bold text-md-tertiary">
                {mounted ? favoritesCount : 0}
              </p>
              <p className="text-xs text-md-on-surface-variant">
                Favorites
              </p>
            </div>
            <div className="rounded-[--radius-md-md] bg-md-secondary-container/40 p-4">
              <p className="text-2xl font-bold text-md-secondary">
                3
              </p>
              <p className="text-xs text-md-on-surface-variant">
                Sources
              </p>
            </div>
          </div>
        </motion.section>

        {/* About */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, ease: [0.2, 0, 0, 1] }}
          className="rounded-[--radius-md-lg] bg-md-surface-container p-6 shadow-sm"
        >
          <h2 className="mb-2 text-lg font-medium text-md-on-surface">
            About ContentHub
          </h2>
          <p className="text-sm text-md-on-surface-variant leading-relaxed">
            ContentHub AI is a personalized content dashboard that combines news,
            movies, and social posts into one unified feed. Built with Next.js 15,
            Redux Toolkit, Tailwind CSS, and Framer Motion.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              'Next.js 15',
              'React 19',
              'TypeScript',
              'Redux Toolkit',
              'RTK Query',
              'Tailwind CSS',
              'Framer Motion',
              'React DnD',
            ].map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-md-secondary-container px-3 py-1 text-[11px] font-medium text-md-on-secondary-container"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.section>
      </div>
    </DashboardLayout>
  );
}
