'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import Sidebar from '@/components/layout/Sidebar/Sidebar';
import Topbar from '@/components/layout/Topbar/Topbar';
import Spinner from '@/components/ui/Spinner/Spinner';
import styles from './layout.module.css';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/auth/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className={styles.loadingScreen}>
        <Spinner size="lg" label="Loading" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className={styles.shell}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className={styles.main}>
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
}
