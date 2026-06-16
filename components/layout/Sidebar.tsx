'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAppSelector } from '@/redux/hooks';
import { CategoryType } from '@/types';

const navLinks = [
  { href: '/', label: 'Dashboard', icon: '◫' },
  { href: '/trending', label: 'Trending', icon: '🔥' },
  { href: '/favorites', label: 'Favorites', icon: '♥' },
  { href: '/settings', label: 'Settings', icon: '⚙' },
];

const categoryLabels: Record<CategoryType, string> = {
  technology: '💻 Technology',
  sports: '⚽ Sports',
  finance: '📈 Finance',
  ai: '🤖 AI',
  entertainment: '🎬 Entertainment',
  general: '📰 General',
  science: '🔬 Science',
  health: '🏥 Health',
};

export default function Sidebar() {
  const pathname = usePathname();
  const categories = useAppSelector((state) => state.preferences.categories);
  const favoritesCount = useAppSelector((state) => state.favorites.items.length);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <aside className="hidden w-64 shrink-0 border-r border-md-outline-variant/20 bg-md-surface-container-low/50 lg:block transition-colors duration-300">
      <div className="sticky top-16 flex h-[calc(100vh-4rem)] flex-col overflow-y-auto p-3">
        {/* Navigation */}
        <nav className="space-y-0.5">
          <p className="mb-2 px-4 text-xs font-medium uppercase tracking-wider text-md-on-surface-variant/60">
            Navigation
          </p>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.97] ${
                  isActive
                    ? 'text-md-on-secondary-container'
                    : 'text-md-on-surface-variant hover:bg-md-surface-variant/30 hover:text-md-on-surface'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebarActive"
                    className="absolute inset-0 rounded-full bg-md-secondary-container"
                    transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
                  />
                )}
                <span className="relative z-10 text-lg">{link.icon}</span>
                <span className="relative z-10">{link.label}</span>
                {link.href === '/favorites' && mounted && favoritesCount > 0 && (
                  <span className="relative z-10 ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-md-primary px-1.5 text-[10px] font-bold text-md-on-primary">
                    {favoritesCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Active Categories */}
        <div className="mt-8">
          <p className="mb-2 px-4 text-xs font-medium uppercase tracking-wider text-md-on-surface-variant/60">
            Your Categories
          </p>
          <div className="flex flex-wrap gap-1.5 px-2">
            {mounted && categories.map((cat) => (
              <span
                key={cat}
                className="inline-flex items-center rounded-full bg-md-secondary-container px-3 py-1 text-xs font-medium text-md-on-secondary-container"
              >
                {categoryLabels[cat] || cat}
              </span>
            ))}
            {mounted && categories.length === 0 && (
              <p className="px-2 text-xs text-md-on-surface-variant/60">
                No categories selected.{' '}
                <Link
                  href="/settings"
                  className="text-md-primary hover:underline"
                >
                  Add some →
                </Link>
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto border-t border-md-outline-variant/20 pt-4">
          <div className="rounded-[--radius-md-lg] bg-md-primary-container/40 p-4">
            <p className="text-xs font-medium text-md-on-primary-container">
              ContentHub AI
            </p>
            <p className="mt-0.5 text-[11px] text-md-on-surface-variant">
              Your personalized content dashboard powered by AI curation.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
