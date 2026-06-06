'use client';

import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';
const STORAGE_KEY = 'baj_theme';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const resolved: Theme = stored ? stored : prefersDark ? 'dark' : 'light';
    apply(resolved);
    setTheme(resolved);
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'light' ? 'dark' : 'light';
      apply(next);
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  return { theme, toggle };
}

function apply(t: Theme) {
  if (t === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}
