import type { Metadata } from 'next';
import styles from './page.module.css';
import { Settings } from 'lucide-react';

export const metadata: Metadata = { title: 'Settings — BAJ Ltd' };

export default function SettingsPage() {
  return (
    <div className={styles.placeholder}>
      <div className={styles.icon}><Settings size={32} /></div>
      <h2 className={styles.title}>Settings</h2>
      <p className={styles.desc}>
        System configuration, staff accounts, notification preferences, and integrations will appear here.
      </p>
    </div>
  );
}
