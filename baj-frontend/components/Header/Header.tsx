'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Menu,
  X,
  ChevronDown,
  Sun,
  Moon,
  LogIn,
  LogOut,
  LayoutDashboard,
} from 'lucide-react';
import { useAuth } from '@/lib/context/AuthContext';
import { marketingNav, moreNav, authPaths } from '@/lib/constants/nav';
import type { NavItem } from '@/lib/types/nav';
import Button from '@/components/ui/Button/Button';
import Avatar from '@/components/ui/Avatar/Avatar';
import styles from './Header.module.css';

function useTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const active = saved ? saved === 'dark' : prefersDark;
    setIsDark(active);
    if (active) {
      html.dataset.theme = 'dark';
    } else {
      delete html.dataset.theme;
    }
  }, []);

  const toggle = useCallback(() => {
    const html = document.documentElement;
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        html.dataset.theme = 'dark';
        localStorage.setItem('theme', 'dark');
      } else {
        delete html.dataset.theme;
        localStorage.setItem('theme', 'light');
      }
      return next;
    });
  }, []);

  return { isDark, toggle };
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const moreRef = useRef<HTMLLIElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const { isDark, toggle } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isAuthPage = authPaths.includes(pathname);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 8);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (mobileOpen) setMobileOpen(false);
        if (moreOpen) setMoreOpen(false);
        if (userOpen) setUserOpen(false);
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [mobileOpen, moreOpen, userOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setUserOpen(false);
      }
    };
    if (moreOpen || userOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [moreOpen, userOpen]);

  const handleNavClick = () => {
    setMobileOpen(false);
    setMoreOpen(false);
    setUserOpen(false);
  };

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    setUserOpen(false);
    router.replace('/auth/login');
  };

  const allMobileItems: NavItem[] = isAuthenticated
    ? [{ label: 'Dashboard', href: '/dashboard' }, ...marketingNav, ...moreNav]
    : [...marketingNav, ...moreNav];

  const userInitials = user?.phone
    ? user.phone.slice(-2).toUpperCase()
    : 'U';

  if (isAuthPage) {
    return (
      <header className={styles.header} data-scrolled={scrolled}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            <img src="/logo.png" alt="BAJ Ltd" className={styles.logoImg} />
          </Link>
          <button
            type="button"
            className={styles.themeToggle}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={toggle}
          >
            {isDark ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </header>
    );
  }

  return (
    <header
      className={styles.header}
      data-scrolled={scrolled}
      data-mobile-open={mobileOpen}
    >
      <div className={styles.container}>
        <Link href="/" className={styles.logo} onClick={handleNavClick}>
          <img src="/logo.png" alt="BAJ Ltd" className={styles.logoImg} />
        </Link>

        <nav className={styles.navDesktop} aria-label="Primary">
          <ul className={styles.navList}>
            {isAuthenticated && (
              <li>
                <Link
                  href="/dashboard"
                  className={styles.navLink}
                  data-active={pathname === '/dashboard'}
                >
                  Dashboard
                </Link>
              </li>
            )}
            {marketingNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={styles.navLink}
                  data-active={pathname === item.href}
                  onClick={handleNavClick}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li ref={moreRef} className={styles.moreItem}>
              <button
                type="button"
                className={styles.moreTrigger}
                aria-expanded={moreOpen}
                aria-haspopup="true"
                aria-controls="more-dropdown"
                onClick={() => setMoreOpen((prev) => !prev)}
              >
                More
                <ChevronDown
                  size={14}
                  strokeWidth={1.5}
                  className={styles.moreIcon}
                  data-open={moreOpen}
                />
              </button>
              <div
                id="more-dropdown"
                className={styles.moreDropdown}
                aria-hidden={!moreOpen}
                data-open={moreOpen}
              >
                <ul className={styles.moreList}>
                  {moreNav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={styles.moreLink}
                        onClick={handleNavClick}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.themeToggle}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={toggle}
          >
            {isDark ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
          </button>

          {isAuthenticated ? (
            <div ref={userRef} className={styles.userMenu}>
              <button
                type="button"
                className={styles.userTrigger}
                aria-expanded={userOpen}
                aria-haspopup="true"
                aria-controls="user-dropdown"
                onClick={() => setUserOpen((prev) => !prev)}
              >
                <Avatar initials={userInitials} variant="accent" size={32} />
                <ChevronDown
                  size={14}
                  strokeWidth={1.5}
                  className={styles.userIcon}
                  data-open={userOpen}
                />
              </button>
              <div
                id="user-dropdown"
                className={styles.userDropdown}
                aria-hidden={!userOpen}
                data-open={userOpen}
              >
                <span className={styles.userPhone}>{user?.phone}</span>
                <Link
                  href="/dashboard"
                  className={styles.userLink}
                  onClick={handleNavClick}
                >
                  <LayoutDashboard size={14} strokeWidth={1.5} />
                  Dashboard
                </Link>
                <button
                  type="button"
                  className={styles.userLogout}
                  onClick={handleLogout}
                >
                  <LogOut size={14} strokeWidth={1.5} />
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <Button
              variant="primary"
              size="md"
              href="/auth/login"
              icon={<LogIn size={16} strokeWidth={1.5} />}
            >
              Login
            </Button>
          )}
        </div>

        <button
          type="button"
          className={styles.mobileToggle}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={styles.mobileMenu}
        aria-hidden={!mobileOpen}
      >
        <nav aria-label="Mobile primary">
          <ul className={styles.mobileNavList}>
            {allMobileItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={styles.mobileNavLink}
                  data-active={pathname === item.href}
                  onClick={handleNavClick}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.mobileActions}>
          <button
            type="button"
            className={styles.mobileThemeToggle}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={toggle}
          >
            {isDark ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
            <span>{isDark ? 'Light mode' : 'Dark mode'}</span>
          </button>
          {isAuthenticated ? (
            <button
              type="button"
              className={styles.mobileLogout}
              onClick={handleLogout}
            >
              <LogOut size={18} strokeWidth={1.5} />
              <span>Sign out</span>
            </button>
          ) : (
            <Button
              variant="primary"
              size="lg"
              href="/auth/login"
              icon={<LogIn size={18} strokeWidth={1.5} />}
              onClick={handleNavClick}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
