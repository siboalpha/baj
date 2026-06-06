'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Settings,
  Sun,
  Moon,
  X,
} from 'lucide-react';
import { useTheme } from '@/lib/hooks/useTheme';
import { MAIN_NAV } from '@/lib/constants/nav';
import styles from './Sidebar.module.css';

interface SidebarProps {
  open:    boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + '/');
  }

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className={styles.backdrop}
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={styles.sidebar} data-open={open} aria-label="Main navigation">

        {/* ── Brand ───────────────────────────────────── */}
        <div className={styles.brand}>
          <span className={styles.brandMark}>BAJ</span>
          <div className={styles.brandText}>
            <span className={styles.brandName}>BAJ Ltd</span>
            <span className={styles.brandSub}>Staff Dashboard</span>
          </div>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Main nav ────────────────────────────────── */}
        <nav className={styles.nav} aria-label="Main">
          <span className={styles.navLabel}>Navigation</span>
          <ul className={styles.navList} role="list">
            {MAIN_NAV.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={styles.navItem}
                  data-active={isActive(href)}
                  onClick={onClose}
                  aria-current={isActive(href) ? 'page' : undefined}
                >
                  <Icon size={17} className={styles.navIcon} aria-hidden="true" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Spacer ──────────────────────────────────── */}
        <div className={styles.spacer} />

        {/* ── Bottom section ──────────────────────────── */}
        <div className={styles.bottom}>
          <Link
            href="/settings"
            className={styles.navItem}
            data-active={isActive('/settings')}
            onClick={onClose}
            aria-current={isActive('/settings') ? 'page' : undefined}
          >
            <Settings size={17} className={styles.navIcon} aria-hidden="true" />
            Settings
          </Link>

          <button
            className={styles.themeBtn}
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <>
                <Sun size={17} aria-hidden="true" />
                <span>Light mode</span>
              </>
            ) : (
              <>
                <Moon size={17} aria-hidden="true" />
                <span>Dark mode</span>
              </>
            )}
          </button>
        </div>

      </aside>
    </>
  );
}
