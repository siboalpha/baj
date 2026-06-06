'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Menu, LogOut } from 'lucide-react';
import { useAuth } from '@/lib/context/AuthContext';
import { PAGE_TITLES } from '@/lib/constants/nav';
import Avatar from '@/components/ui/Avatar/Avatar';
import styles from './Topbar.module.css';

function getTitle(pathname: string): string {
  // Exact match first
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname];
  // Prefix match for nested routes
  for (const [prefix, title] of Object.entries(PAGE_TITLES)) {
    if (pathname.startsWith(prefix + '/')) return title;
  }
  return 'Dashboard';
}

interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router   = useRouter();

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2)
    : '??';

  function handleLogout() {
    logout();
    router.replace('/auth/login');
  }

  return (
    <header className={styles.topbar}>

      {/* ── Left ──────────────────────────────────────── */}
      <div className={styles.left}>
        <button
          className={styles.menuBtn}
          onClick={onMenuClick}
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>
        <h1 className={styles.pageTitle}>{getTitle(pathname)}</h1>
      </div>

      {/* ── Right ─────────────────────────────────────── */}
      <div className={styles.right}>
        {user && (
          <div className={styles.userChip}>
            <Avatar initials={initials} variant="accent" size={32} label={user.name} />
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user.name}</span>
              <span className={styles.userRole}>{user.role}</span>
            </div>
          </div>
        )}
        <button
          className={styles.logoutBtn}
          onClick={handleLogout}
          aria-label="Sign out"
          title="Sign out"
        >
          <LogOut size={16} />
          <span className={styles.logoutLabel}>Sign out</span>
        </button>
      </div>

    </header>
  );
}
