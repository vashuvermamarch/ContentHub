'use client';

import { useEffect } from 'react';
import { useAppSelector } from '@/redux/hooks';

export function useDarkMode() {
  const darkMode = useAppSelector((state) => state.preferences.darkMode);

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [darkMode]);

  return darkMode;
}
