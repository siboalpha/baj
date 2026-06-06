'use client';

import Link from 'next/link';
import {
  Users, Truck, AlertCircle, MapPin,
  ChevronRight,
} from 'lucide-react';
import type { BadgeVariant } from '@/components/ui/Badge/Badge';
import Badge from '@/components/ui/Badge/Badge';
import Button from '@/components/ui/Button/Button';
import DateRangeFilter from '@/components/ui/DateRangeFilter/DateRangeFilter';
import { useDashboard } from '@/lib/hooks/useDashboard';
import { COLLECTION_BADGE, CLIENT_TYPE_LABEL, overdueBadge } from '@/lib/constants/overview';
import styles from './page.module.css';

/* ── Page ─────────────────────────────────────────────────── */
export default function OverviewPage() {
  const { data, loading, error } = useDashboard();

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.pageHeader}>
          <h2 className={styles.pageTitle}>Overview</h2>
        </div>
        <div className={styles.empty}>Loading dashboard…</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.page}>
        <div className={styles.pageHeader}>
          <h2 className={styles.pageTitle}>Overview</h2>
        </div>
        <div className={styles.empty} data-level="danger">
          {error ?? 'Failed to load dashboard data.'}
        </div>
      </div>
    );
  }

  const STATS = data.stats;
  const ALERTS = data.alerts;
  const RECENT_COLLECTIONS = data.recentCollections;
  const OVERDUE = data.overdue;

  const collectionPct = Math.round(
    (STATS.collectionsThisWeek / STATS.collectionsTotalWeek) * 100
  );

  return (
    <div className={styles.page}>

      {/* ── Page header ──────────────────────────────── */}
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.pageTitle}>Overview</h2>
          <p className={styles.pageDate}>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
            })}
          </p>
        </div>
        <DateRangeFilter />
      </div>

      {/* ── KPI cards ────────────────────────────────── */}
      <div className={styles.statsGrid}>

        <div className={styles.statCard}>
          <div className={styles.statIcon} data-color="accent">
            <Users size={20} />
          </div>
          <div className={styles.statBody}>
            <span className={styles.statLabel}>Active clients</span>
            <span className={styles.statValue}>{STATS.totalClients.toLocaleString()}</span>
            <span className={styles.statSub}>across {STATS.totalZones} zones</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} data-color="warning">
            <Truck size={20} />
          </div>
          <div className={styles.statBody}>
            <span className={styles.statLabel}>Collections this week</span>
            <span className={styles.statValue}>
              {STATS.collectionsThisWeek.toLocaleString()}
              <span className={styles.statDenom}> / {STATS.collectionsTotalWeek}</span>
            </span>
            <span className={styles.statSub}>
              {collectionPct}% complete · {STATS.collectionsTotalWeek - STATS.collectionsThisWeek} remaining
            </span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} data-color="danger">
            <AlertCircle size={20} />
          </div>
          <div className={styles.statBody}>
            <span className={styles.statLabel}>Overdue payments</span>
            <span className={styles.statValue}>{STATS.overdueCount}</span>
            <span className={styles.statSub}>
              RWF {STATS.overdueAmountRwf.toLocaleString()} outstanding
            </span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} data-color="success">
            <MapPin size={20} />
          </div>
          <div className={styles.statBody}>
            <span className={styles.statLabel}>Zones active today</span>
            <span className={styles.statValue}>
              {STATS.zonesActiveToday}
              <span className={styles.statDenom}> / {STATS.totalZones}</span>
            </span>
            <span className={styles.statSub}>
              {STATS.zonesScheduledToday} zones on today&apos;s schedule
            </span>
          </div>
        </div>

      </div>

      {/* ── Alerts ───────────────────────────────────── */}
      <div className={styles.alerts}>
        {ALERTS.map(({ id, level, message, linkLabel, href }: Record<string, unknown>) => (
          <div key={String(id)} className={styles.alert} data-level={level}>
            <p className={styles.alertMessage}>{String(message)}</p>
            <Link href={String(href)} className={styles.alertLink}>
              {String(linkLabel)} <ChevronRight size={13} aria-hidden="true" />
            </Link>
          </div>
        ))}
      </div>

      {/* ── Detail panels ────────────────────────────── */}
      <div className={styles.panels}>

        {/* Recent collections */}
        <div className={styles.panel}>
          <div className={styles.panelHead}>
            <h3 className={styles.panelTitle}>Recent collections</h3>
            <Link href="/collections" className={styles.panelLink}>
              View all <ChevronRight size={14} aria-hidden="true" />
            </Link>
          </div>
          <div className={styles.table}>
            <div className={styles.collectionHead}>
              <span>Zone</span>
              <span>Driver</span>
              <span>Time</span>
              <span>Status</span>
            </div>
            {RECENT_COLLECTIONS.map((row: Record<string, unknown>, i: number) => (
              <div key={i} className={styles.collectionRow}>
                <div className={styles.zoneCell}>
                  <span className={styles.zoneName}>{String(row.zone)}</span>
                  <span className={styles.zoneCode}>{String(row.code)}</span>
                </div>
                <span className={styles.driver}>{String(row.driver)}</span>
                <span className={styles.time}>{String(row.time)}</span>
                <Badge variant={COLLECTION_BADGE[row.status as import("@/lib/types/collection").CollectionStatus]}>{String(row.status)}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Overdue payments */}
        <div className={styles.panel}>
          <div className={styles.panelHead}>
            <h3 className={styles.panelTitle}>Overdue payments</h3>
            <Link href="/financials" className={styles.panelLink}>
              View all ({STATS.overdueCount}) <ChevronRight size={14} aria-hidden="true" />
            </Link>
          </div>
          <div className={styles.table}>
            {OVERDUE.map((row: Record<string, unknown>, i: number) => (
              <div key={i} className={styles.overdueRow}>
                <div className={styles.overdueClient}>
                  <span className={styles.clientName}>{String(row.name)}</span>
                  <div className={styles.clientMeta}>
                    <span className={styles.clientZone}>{String(row.zone)}</span>
                    <Badge variant="neutral">{CLIENT_TYPE_LABEL[row.type as import('@/lib/types/client').ClientType]}</Badge>
                  </div>
                </div>
                <div className={styles.overdueRight}>
                  <span className={styles.overdueAmount}>
                    RWF {Number(row.amount).toLocaleString()}
                  </span>
                  <Badge variant={overdueBadge(Number(row.daysOverdue))}>
                    {Number(row.daysOverdue)}d overdue
                  </Badge>
                  <Button variant="ghost" size="sm">Record</Button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
