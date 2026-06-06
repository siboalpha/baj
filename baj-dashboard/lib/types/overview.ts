import type { LucideIcon } from 'lucide-react';
import type { CollectionStatus } from './collection';
import type { ClientType } from './client';

/* ── Overview domain ─────────────────────────────────────── */
export interface AlertItem {
  id:        string;
  level:     'danger' | 'warning' | 'info';
  icon:      LucideIcon;
  message:   string;
  linkLabel: string;
  href:      string;
}

export interface OverdueItem {
  name:        string;
  type:        ClientType;
  zone:        string;
  amount:      number;
  daysOverdue: number;
}

export interface RecentCollection {
  zone:   string;
  code:   string;
  driver: string;
  time:   string;
  status: CollectionStatus;
}
