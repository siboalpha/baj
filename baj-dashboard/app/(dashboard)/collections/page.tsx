'use client';

import { useState, useMemo } from 'react';
import {
  Truck, CheckCircle2, AlertTriangle, XCircle,
  Search, ChevronUp, ChevronDown, ChevronsUpDown,
} from 'lucide-react';
import type { BadgeVariant } from '@/components/ui/Badge/Badge';
import Badge from '@/components/ui/Badge/Badge';
import { useCollections } from '@/lib/hooks/useCollections';
import type { SortDir } from '@/lib/types/dashboard';
import styles from './page.module.css';

/* ── Local types ─────────────────────────────────────────── */
type CollectionStatus = 'completed' | 'partial' | 'missed';
type SortKey = 'date' | 'zone' | 'driver' | 'status';

/* ── Helpers ─────────────────────────────────────────────── */
function SortIcon({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey; sortDir: SortDir }) {
  if (col !== sortKey) return <ChevronsUpDown size={13} className={styles.sortIconInactive} />;
  return sortDir === 'asc'
    ? <ChevronUp size={13} className={styles.sortIconActive} />
    : <ChevronDown size={13} className={styles.sortIconActive} />;
}

/* ── Page ────────────────────────────────────────────────── */
export default function CollectionsPage() {
  const { data, loading, error } = useCollections();

  const [query,   setQuery]   = useState('');
  const [status,  setStatus]  = useState<CollectionStatus | 'all'>('all');
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const COLLECTIONS_DATA = (data?.collections ?? []) as Record<string, unknown>[];
  const STATUS_BADGE = (data?.statusBadge ?? {}) as Record<string, string>;
  const STATUS_LABEL = (data?.statusLabel ?? {}) as Record<string, string>;

  /* Stats derived from full dataset */
  const total     = COLLECTIONS_DATA.length;
  const completed = COLLECTIONS_DATA.filter((d: Record<string, unknown>) => d.status === 'completed').length;
  const partial   = COLLECTIONS_DATA.filter((d: Record<string, unknown>) => d.status === 'partial').length;
  const missed    = COLLECTIONS_DATA.filter((d: Record<string, unknown>) => d.status === 'missed').length;
  const rate      = total > 0 ? Math.round((completed / total) * 100) : 0;

  /* Filtered + sorted rows */
  const rows = useMemo(() => {
    const q = query.toLowerCase();
    let out = COLLECTIONS_DATA.filter((d: Record<string, unknown>) => {
      const matchSearch = !q || String(d.zone).toLowerCase().includes(q) || String(d.driver).toLowerCase().includes(q);
      const matchStatus = status === 'all' || d.status === status;
      return matchSearch && matchStatus;
    });

    out = [...out].sort((a: Record<string, unknown>, b: Record<string, unknown>) => {
      let cmp = 0;
      if (sortKey === 'date')   cmp = String(a.date).localeCompare(String(b.date));
      if (sortKey === 'zone')   cmp = String(a.zone).localeCompare(String(b.zone));
      if (sortKey === 'driver') cmp = String(a.driver).localeCompare(String(b.driver));
      if (sortKey === 'status') cmp = String(a.status).localeCompare(String(b.status));
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return out;
  }, [query, status, sortKey, sortDir, COLLECTIONS_DATA]);

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.pageHeader}>
          <h2 className={styles.pageTitle}>Collections</h2>
        </div>
        <div className={styles.empty}>Loading collections…</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.page}>
        <div className={styles.pageHeader}>
          <h2 className={styles.pageTitle}>Collections</h2>
        </div>
        <div className={styles.empty} data-level="danger">
          {error ?? 'Failed to load collections.'}
        </div>
      </div>
    );
  }

  function toggleSort(col: SortKey) {
    if (sortKey === col) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(col);
      setSortDir('desc');
    }
  }

  return (
    <div className={styles.page}>

      {/* ── Page header ──────────────────────────────── */}
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>Collections</h2>
      </div>

      {/* ── Stat cards ───────────────────────────────── */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} data-color="accent">
            <Truck size={20} />
          </div>
          <div className={styles.statBody}>
            <span className={styles.statLabel}>Total records</span>
            <span className={styles.statValue}>{total}</span>
            <span className={styles.statSub}>across {new Set(COLLECTIONS_DATA.map((d: Record<string, unknown>) => d.zoneCode)).size} zones</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} data-color="success">
            <CheckCircle2 size={20} />
          </div>
          <div className={styles.statBody}>
            <span className={styles.statLabel}>Completed</span>
            <span className={styles.statValue}>{completed}</span>
            <span className={styles.statSub}>{rate}% completion rate</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} data-color="warning">
            <AlertTriangle size={20} />
          </div>
          <div className={styles.statBody}>
            <span className={styles.statLabel}>Partial</span>
            <span className={styles.statValue}>{partial}</span>
            <span className={styles.statSub}>incomplete runs</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} data-color="danger">
            <XCircle size={20} />
          </div>
          <div className={styles.statBody}>
            <span className={styles.statLabel}>Missed</span>
            <span className={styles.statValue}>{missed}</span>
            <span className={styles.statSub}>no collection made</span>
          </div>
        </div>
      </div>

      {/* ── Table card ───────────────────────────────── */}
      <div className={styles.tableCard}>

        {/* Toolbar */}
        <div className={styles.toolbar}>
          <div className={styles.searchWrap}>
            <Search size={15} className={styles.searchIcon} aria-hidden="true" />
            <input
              className={styles.searchInput}
              type="search"
              placeholder="Search by zone or driver…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search collections"
            />
          </div>

          <div className={styles.filters} role="group" aria-label="Filter by status">
            {(['all', 'completed', 'partial', 'missed'] as const).map((s) => (
              <button
                key={s}
                className={styles.filterChip}
                data-active={status === s}
                onClick={() => setStatus(s)}
              >
                {s === 'all' ? 'All' : STATUS_LABEL[s]}
                <span className={styles.chipCount}>
                  {s === 'all' ? total : COLLECTIONS_DATA.filter((d: Record<string, unknown>) => d.status === s).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className={styles.resultsMeta}>
          Showing <strong>{rows.length}</strong> of <strong>{total}</strong> collections
        </div>

        {/* Table */}
        <div className={styles.tableWrap} role="region" aria-label="Collections table">
          <div className={styles.tableHead}>
            <button className={styles.thBtn} onClick={() => toggleSort('date')}>
              Date <SortIcon col="date" sortKey={sortKey} sortDir={sortDir} />
            </button>
            <button className={styles.thBtn} onClick={() => toggleSort('zone')}>
              Zone <SortIcon col="zone" sortKey={sortKey} sortDir={sortDir} />
            </button>
            <button className={styles.thBtn} onClick={() => toggleSort('driver')}>
              Driver <SortIcon col="driver" sortKey={sortKey} sortDir={sortDir} />
            </button>
            <span className={styles.thStatic}>Clients</span>
            <button className={styles.thBtn} onClick={() => toggleSort('status')}>
              Status <SortIcon col="status" sortKey={sortKey} sortDir={sortDir} />
            </button>
            <span className={styles.thStatic}>Notes</span>
          </div>

          {rows.length === 0 ? (
            <div className={styles.empty}>
              No collections match your search or filter.
            </div>
          ) : (
            rows.map((row: Record<string, unknown>) => (
              <div key={String(row.id)} className={styles.tableRow}>
                <span className={styles.dateCell}>{String(row.dateLabel)}</span>
                <div className={styles.zoneCell}>
                  <span className={styles.zoneName}>{String(row.zone)}</span>
                  <span className={styles.zoneCode}>{String(row.zoneCode)}</span>
                </div>
                <span className={styles.driverCell}>{String(row.driver)}</span>
                <span className={styles.clientsCell}>
                  <span className={styles.clientsServed}>{Number(row.clientsServed)}</span>
                  <span className={styles.clientsTotal}>/{Number(row.clientsTotal)}</span>
                </span>
                <span>
                  <Badge variant={STATUS_BADGE[String(row.status)] as BadgeVariant}>{STATUS_LABEL[String(row.status)]}</Badge>
                </span>
                <span className={styles.notesCell}>{String(row.notes)}</span>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
