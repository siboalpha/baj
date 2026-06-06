'use client';

import { useState, useMemo } from 'react';
import {
  Banknote, AlertCircle, TrendingUp, CheckCircle2,
  Search, ChevronUp, ChevronDown, ChevronsUpDown,
  PlusCircle,
} from 'lucide-react';
import type { BadgeVariant } from '@/components/ui/Badge/Badge';
import Badge from '@/components/ui/Badge/Badge';
import Button from '@/components/ui/Button/Button';
import Modal from '@/components/ui/Modal/Modal';
import InputField from '@/components/ui/InputField/InputField';
import { useFinancials } from '@/lib/hooks/useFinancials';
import { EMPTY_FORM, DUMMY_FORM } from '@/lib/constants/financials';
import type { SortDir } from '@/lib/types/dashboard';
import styles from './page.module.css';

/* ── Local types ─────────────────────────────────────────── */
type PayStatus = 'paid' | 'overdue' | 'waived';
type SortKey = 'date' | 'client' | 'amount' | 'period' | 'status';

/* ── Helpers ─────────────────────────────────────────────── */
function SortIcon({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey; sortDir: SortDir }) {
  if (col !== sortKey) return <ChevronsUpDown size={13} className={styles.sortIconInactive} />;
  return sortDir === 'asc'
    ? <ChevronUp size={13} className={styles.sortIconActive} />
    : <ChevronDown size={13} className={styles.sortIconActive} />;
}

/* ── Record Payment Modal ────────────────────────────────── */
function RecordPaymentModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState(EMPTY_FORM);

  function set(field: keyof typeof EMPTY_FORM, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleClose() {
    setForm(EMPTY_FORM);
    onClose();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: persist payment
    handleClose();
  }

  return (
    <Modal open={open} onClose={handleClose} title="Record payment">
      <form className={styles.form} onSubmit={handleSubmit}>

        <div className={styles.formDummy}>
          <Button type="button" variant="ghost" size="sm" onClick={() => setForm(DUMMY_FORM)}>
            Use dummy data
          </Button>
        </div>

        {/* Client + Period */}
        <div className={styles.formRow}>
          <div className={styles.selectField}>
            <label className={styles.selectLabel} htmlFor="pay-client">Client</label>
            <select
              id="pay-client"
              className={styles.select}
              value={form.client}
              onChange={(e) => set('client', e.target.value)}
            >
              <option value="Chez Lando Restaurant">Chez Lando Restaurant</option>
              <option value="Sunrise Apartments">Sunrise Apartments</option>
              <option value="Kacyiru Household #112">Kacyiru Household #112</option>
              <option value="Guest House Kigali">Guest House Kigali</option>
              <option value="Bright Star Shop">Bright Star Shop</option>
              <option value="Gasabo Household #204">Gasabo Household #204</option>
              <option value="Claire Uwamahoro">Claire Uwamahoro</option>
              <option value="Espérance Uwineza">Espérance Uwineza</option>
              <option value="Cécile Murindangabo">Cécile Murindangabo</option>
              <option value="Kanombe Inn">Kanombe Inn</option>
              <option value="Kigali Office Park">Kigali Office Park</option>
              <option value="Kibagabaga Medical Ctr">Kibagabaga Medical Ctr</option>
            </select>
          </div>
          <div className={styles.selectField}>
            <label className={styles.selectLabel} htmlFor="pay-period">Billing period</label>
            <select
              id="pay-period"
              className={styles.select}
              value={form.period}
              onChange={(e) => set('period', e.target.value)}
            >
              <option value="Jun 2026">Jun 2026</option>
              <option value="May 2026">May 2026</option>
              <option value="Apr 2026">Apr 2026</option>
            </select>
          </div>
        </div>

        {/* Amount + Method */}
        <div className={styles.formRow}>
          <InputField
            label="Amount (RWF)"
            type="number"
            min="0"
            placeholder="e.g. 3000"
            value={form.amount}
            onChange={(e) => set('amount', (e.target as HTMLInputElement).value)}
            required
          />
          <div className={styles.selectField}>
            <label className={styles.selectLabel} htmlFor="pay-method">Payment method</label>
            <select
              id="pay-method"
              className={styles.select}
              value={form.method}
              onChange={(e) => set('method', e.target.value)}
            >
              <option value="cash">Cash</option>
              <option value="momo">Mobile money (MoMo)</option>
              <option value="bank">Bank transfer</option>
            </select>
          </div>
        </div>

        {/* Date */}
        <InputField
          label="Payment date"
          type="date"
          value={form.date}
          onChange={(e) => set('date', (e.target as HTMLInputElement).value)}
          required
        />

        {/* Notes */}
        <InputField
          as="textarea"
          label="Notes"
          placeholder="Optional notes about this payment…"
          value={form.notes}
          onChange={(e) => set('notes', (e.target as HTMLTextAreaElement).value)}
        />

        <div className={styles.formFooter}>
          <Button type="button" variant="ghost" onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="primary">Record payment</Button>
        </div>
      </form>
    </Modal>
  );
}

/* ── Page ────────────────────────────────────────────────── */
export default function FinancialsPage() {
  const { data, loading, error } = useFinancials();

  const [query,     setQuery]     = useState('');
  const [status,    setStatus]    = useState<PayStatus | 'all'>('all');
  const [period,    setPeriod]    = useState<string>('all');
  const [sortKey,   setSortKey]   = useState<SortKey>('date');
  const [sortDir,   setSortDir]   = useState<SortDir>('desc');
  const [modalOpen, setModalOpen] = useState(false);

  const PAYMENTS_DATA = (data?.payments ?? []) as Record<string, unknown>[];
  const STATUS_BADGE = (data?.statusBadge ?? {}) as Record<string, string>;
  const STATUS_LABEL = (data?.statusLabel ?? {}) as Record<string, string>;
  const METHOD_LABEL = (data?.methodLabel ?? {}) as Record<string, string>;
  const STATUS_SORT = (data?.statusSort ?? {}) as Record<string, number>;
  const PERIODS = (data?.periods ?? []) as string[];

  /* Stat card values derived from full dataset */
  const collectedJun = PAYMENTS_DATA
    .filter((p: Record<string, unknown>) => p.period === 'Jun 2026' && p.status === 'paid')
    .reduce((s: number, p: Record<string, unknown>) => s + Number(p.amountRwf), 0);

  const collectedMay = PAYMENTS_DATA
    .filter((p: Record<string, unknown>) => p.period === 'May 2026' && p.status === 'paid')
    .reduce((s: number, p: Record<string, unknown>) => s + Number(p.amountRwf), 0);

  const outstanding = PAYMENTS_DATA
    .filter((p: Record<string, unknown>) => p.status === 'overdue')
    .reduce((s: number, p: Record<string, unknown>) => s + Number(p.amountRwf), 0);

  const mayTotal   = PAYMENTS_DATA.filter((p: Record<string, unknown>) => p.period === 'May 2026' && p.status !== 'waived').length;
  const mayPaid    = PAYMENTS_DATA.filter((p: Record<string, unknown>) => p.period === 'May 2026' && p.status === 'paid').length;
  const mayRate    = mayTotal > 0 ? Math.round((mayPaid / mayTotal) * 100) : 0;

  /* Filtered + sorted rows */
  const rows = useMemo(() => {
    const q = query.toLowerCase();
    let out = PAYMENTS_DATA.filter((p: Record<string, unknown>) => {
      const matchSearch = !q || String(p.client).toLowerCase().includes(q) || String(p.zone).toLowerCase().includes(q);
      const matchStatus = status === 'all' || p.status === status;
      const matchPeriod = period === 'all' || p.period === period;
      return matchSearch && matchStatus && matchPeriod;
    });

    out = [...out].sort((a: Record<string, unknown>, b: Record<string, unknown>) => {
      let cmp = 0;
      if (sortKey === 'date')   cmp = String(a.date).localeCompare(String(b.date));
      if (sortKey === 'client') cmp = String(a.client).localeCompare(String(b.client));
      if (sortKey === 'amount') cmp = Number(a.amountRwf) - Number(b.amountRwf);
      if (sortKey === 'period') cmp = String(a.periodSort).localeCompare(String(b.periodSort));
      if (sortKey === 'status') cmp = STATUS_SORT[String(a.status)] - STATUS_SORT[String(b.status)];
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return out;
  }, [query, status, period, sortKey, sortDir, PAYMENTS_DATA, STATUS_SORT]);

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.pageHeader}>
          <h2 className={styles.pageTitle}>Financials</h2>
        </div>
        <div className={styles.empty}>Loading financials…</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.page}>
        <div className={styles.pageHeader}>
          <h2 className={styles.pageTitle}>Financials</h2>
        </div>
        <div className={styles.empty} data-level="danger">
          {error ?? 'Failed to load financials.'}
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
        <h2 className={styles.pageTitle}>Financials</h2>
        <Button variant="primary" icon={<PlusCircle size={15} />} onClick={() => setModalOpen(true)}>
          Record payment
        </Button>
      </div>

      <RecordPaymentModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* ── Stat cards ───────────────────────────────── */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} data-color="success">
            <Banknote size={20} />
          </div>
          <div className={styles.statBody}>
            <span className={styles.statLabel}>Collected this month</span>
            <span className={styles.statValue} style={{ fontSize: 'var(--fs-2xl)' }}>
              {collectedJun.toLocaleString()}
            </span>
            <span className={styles.statSub}>RWF · June 2026</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} data-color="danger">
            <AlertCircle size={20} />
          </div>
          <div className={styles.statBody}>
            <span className={styles.statLabel}>Outstanding balance</span>
            <span className={styles.statValue} style={{ fontSize: 'var(--fs-2xl)' }}>
              {outstanding.toLocaleString()}
            </span>
            <span className={styles.statSub}>
              RWF · {PAYMENTS_DATA.filter((p: Record<string, unknown>) => p.status === 'overdue').length} overdue clients
            </span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} data-color="accent">
            <TrendingUp size={20} />
          </div>
          <div className={styles.statBody}>
            <span className={styles.statLabel}>Collected last month</span>
            <span className={styles.statValue} style={{ fontSize: 'var(--fs-2xl)' }}>
              {collectedMay.toLocaleString()}
            </span>
            <span className={styles.statSub}>RWF · May 2026</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} data-color={mayRate >= 80 ? 'success' : 'warning'}>
            <CheckCircle2 size={20} />
          </div>
          <div className={styles.statBody}>
            <span className={styles.statLabel}>May collection rate</span>
            <span className={styles.statValue}>{mayRate}%</span>
            <span className={styles.statSub}>{mayPaid} of {mayTotal} clients paid</span>
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
              placeholder="Search by client or zone…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search payments"
            />
          </div>

          <div className={styles.filterGroup}>
            {/* Status filter */}
            <div className={styles.filters} role="group" aria-label="Filter by status">
              {(['all', 'overdue', 'paid', 'waived'] as const).map((s) => (
                <button
                  key={s}
                  className={styles.filterChip}
                  data-active={status === s}
                  onClick={() => setStatus(s)}
                >
                  {s === 'all' ? 'All' : STATUS_LABEL[s]}
                  <span className={styles.chipCount}>
                    {s === 'all' ? PAYMENTS_DATA.length : PAYMENTS_DATA.filter((p: Record<string, unknown>) => p.status === s).length}
                  </span>
                </button>
              ))}
            </div>

            <div className={styles.filterDivider} aria-hidden="true" />

            {/* Period filter */}
            <div className={styles.filters} role="group" aria-label="Filter by billing period">
              <button
                className={styles.filterChip}
                data-active={period === 'all'}
                onClick={() => setPeriod('all')}
              >
                All periods
              </button>
              {PERIODS.map((p: string) => (
                <button
                  key={p}
                  className={styles.filterChip}
                  data-active={period === p}
                  onClick={() => setPeriod(p)}
                >
                  {p}
                  <span className={styles.chipCount}>
                    {PAYMENTS_DATA.filter((r: Record<string, unknown>) => r.period === p).length}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className={styles.resultsMeta}>
          Showing <strong>{rows.length}</strong> of <strong>{PAYMENTS_DATA.length}</strong> payment records
        </div>

        {/* Table */}
        <div className={styles.tableWrap} role="region" aria-label="Payment records table">
          <div className={styles.tableHead}>
            <button className={styles.thBtn} onClick={() => toggleSort('date')}>
              Date <SortIcon col="date" sortKey={sortKey} sortDir={sortDir} />
            </button>
            <button className={styles.thBtn} onClick={() => toggleSort('client')}>
              Client <SortIcon col="client" sortKey={sortKey} sortDir={sortDir} />
            </button>
            <span className={styles.thStatic}>Zone</span>
            <button className={styles.thBtn} onClick={() => toggleSort('period')}>
              Period <SortIcon col="period" sortKey={sortKey} sortDir={sortDir} />
            </button>
            <button className={styles.thBtn} onClick={() => toggleSort('amount')}>
              Amount <SortIcon col="amount" sortKey={sortKey} sortDir={sortDir} />
            </button>
            <span className={styles.thStatic}>Method</span>
            <button className={styles.thBtn} onClick={() => toggleSort('status')}>
              Status <SortIcon col="status" sortKey={sortKey} sortDir={sortDir} />
            </button>
            <span className={styles.thStatic} />
          </div>

          {rows.length === 0 ? (
            <div className={styles.empty}>No payment records match your search or filter.</div>
          ) : (
            rows.map((p: Record<string, unknown>) => (
              <div key={String(p.id)} className={styles.tableRow}>
                {/* Date */}
                <span className={styles.dateCell}>
                  {p.dateLabel ? String(p.dateLabel) : <span className={styles.dateDash}>—</span>}
                </span>

                {/* Client */}
                <div className={styles.clientCell}>
                  <span className={styles.clientName}>{String(p.client)}</span>
                  <span className={styles.zoneCode}>{String(p.zoneCode)}</span>
                </div>

                {/* Zone */}
                <span className={styles.zoneCell}>{String(p.zone)}</span>

                {/* Period */}
                <span className={styles.periodCell}>{String(p.period)}</span>

                {/* Amount */}
                <span className={styles.amountCell}>
                  {Number(p.amountRwf).toLocaleString()}
                </span>

                {/* Method */}
                <span className={styles.methodCell}>
                  {p.method ? METHOD_LABEL[String(p.method)] : <span className={styles.dateDash}>—</span>}
                </span>

                {/* Status */}
                <span>
                  <Badge variant={STATUS_BADGE[String(p.status)] as BadgeVariant}>{STATUS_LABEL[String(p.status)]}</Badge>
                </span>

                {/* Action */}
                <span className={styles.actionsCell}>
                  {p.status === 'overdue' && (
                    <Button variant="ghost" size="sm" onClick={() => setModalOpen(true)}>
                      Record
                    </Button>
                  )}
                </span>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
