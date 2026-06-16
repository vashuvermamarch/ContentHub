'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from '@/components/search/SearchBar';
import { useAppDispatch } from '@/redux/hooks';
import { toggleDarkMode } from '@/redux/slices/preferencesSlice';
import { useDarkMode } from '@/hooks/useDarkMode';

const navLinks = [
  { href: '/', label: 'Dashboard', icon: '◫' },
  { href: '/trending', label: 'Trending', icon: '🔥' },
  { href: '/favorites', label: 'Favorites', icon: '♥' },
  { href: '/settings', label: 'Settings', icon: '⚙' },
];

export default function Header() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const darkMode = useDarkMode();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-md-outline-variant/30 bg-md-surface/80 backdrop-blur-xl transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo — pill-shaped icon */}
        <Link href="/" className="flex items-center gap-2.5 active:scale-95 transition-transform duration-200">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-md-primary text-lg font-bold text-md-on-primary shadow-sm">
            C
          </div>
          <span className="text-xl font-medium tracking-tight text-md-on-surface">
            Content<span className="text-md-primary">Hub</span>
          </span>
        </Link>

        {/* Desktop Nav — pill-shaped active indicator */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`state-layer relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] active:scale-95 ${
                  isActive
                    ? 'text-md-on-secondary-container'
                    : 'text-md-on-surface-variant hover:text-md-on-surface'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full bg-md-secondary-container"
                    transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <span>{link.icon}</span>
                  {link.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Search + Dark mode + Mobile menu */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <SearchBar />
          </div>

          {/* Dark mode toggle — pill icon button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => dispatch(toggleDarkMode())}
            className="state-layer flex h-10 w-10 items-center justify-center rounded-full text-lg text-md-on-surface-variant transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-md-surface-variant/40 active:scale-95"
            aria-label="Toggle dark mode"
            id="dark-mode-toggle"
          >
            <motion.span
              key={darkMode ? 'moon' : 'sun'}
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
            >
              {darkMode ? '☀️' : '🌙'}
            </motion.span>
          </motion.button>

          {/* Mobile menu — pill icon button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="state-layer flex h-10 w-10 items-center justify-center rounded-full text-lg text-md-on-surface-variant transition-all duration-300 hover:bg-md-surface-variant/40 md:hidden active:scale-95"
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile search */}
      <div className="border-t border-md-outline-variant/20 px-4 py-2 sm:hidden">
        <SearchBar />
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
            className="overflow-hidden border-t border-md-outline-variant/20 md:hidden"
          >
            <div className="space-y-1 px-4 py-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 active:scale-95 ${
                      isActive
                        ? 'bg-md-secondary-container text-md-on-secondary-container'
                        : 'text-md-on-surface-variant hover:bg-md-surface-variant/30'
                    }`}
                  >
                    <span>{link.icon}</span>
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
