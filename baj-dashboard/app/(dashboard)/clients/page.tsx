'use client';

import { useState, useMemo } from 'react';
import {
  Users, CheckCircle2, AlertCircle, Banknote,
  Search, ChevronUp, ChevronDown, ChevronsUpDown,
  UserPlus,
} from 'lucide-react';
import type { BadgeVariant } from '@/components/ui/Badge/Badge';
import Badge from '@/components/ui/Badge/Badge';
import Button from '@/components/ui/Button/Button';
import Modal from '@/components/ui/Modal/Modal';
import InputField from '@/components/ui/InputField/InputField';
import { useClients } from '@/lib/hooks/useClients';
import { EMPTY_FORM, DUMMY_FORM } from '@/lib/constants/clients';
import type { SortDir } from '@/lib/types/dashboard';
import styles from './page.module.css';

/* ── Local types ─────────────────────────────────────────── */
type SortKey = 'name' | 'zone' | 'fee' | 'joinDate' | 'payment' | 'status';
type ClientType = 'household' | 'small_business' | 'commercial' | 'hotel';
type PaymentStatus = 'paid' | 'overdue' | 'pending';

/* ── Helpers ─────────────────────────────────────────────── */
function SortIcon({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey; sortDir: SortDir }) {
  if (col !== sortKey) return <ChevronsUpDown size={13} className={styles.sortIconInactive} />;
  return sortDir === 'asc'
    ? <ChevronUp size={13} className={styles.sortIconActive} />
    : <ChevronDown size={13} className={styles.sortIconActive} />;
}

/* ── Add Client Modal ────────────────────────────────────── */
function AddClientModal({ open, onClose }: { open: boolean; onClose: () => void }) {
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
    // TODO: persist client
    handleClose();
  }

  return (
    <Modal open={open} onClose={handleClose} title="Add client">
      <form className={styles.form} onSubmit={handleSubmit}>

        <div className={styles.formDummy}>
          <Button type="button" variant="ghost" size="sm" onClick={() => setForm(DUMMY_FORM)}>
            Use dummy data
          </Button>
        </div>

        {/* Name + Type */}
        <div className={styles.formRow}>
          <InputField
            label="Client name"
            placeholder="e.g. Sunrise Apartments"
            value={form.name}
            onChange={(e) => set('name', (e.target as HTMLInputElement).value)}
            required
          />
          <div className={styles.selectField}>
            <label className={styles.selectLabel} htmlFor="cl-type">Client type</label>
            <select
              id="cl-type"
              className={styles.select}
              value={form.type}
              onChange={(e) => set('type', e.target.value)}
            >
              <option value="household">Household</option>
              <option value="small_business">Small business</option>
              <option value="commercial">Commercial</option>
              <option value="hotel">Hotel</option>
            </select>
          </div>
        </div>

        {/* Zone + Sector */}
        <div className={styles.formRow}>
          <div className={styles.selectField}>
            <label className={styles.selectLabel} htmlFor="cl-zone">Zone</label>
            <select
              id="cl-zone"
              className={styles.select}
              value={form.zone}
              onChange={(e) => set('zone', e.target.value)}
            >
              {/* Zone options populated from hook data when available */}
              <option value="Kimironko North">Kimironko North</option>
              <option value="Remera Central">Remera Central</option>
              <option value="Gisozi East">Gisozi East</option>
              <option value="Kacyiru South">Kacyiru South</option>
              <option value="Kibagabaga">Kibagabaga</option>
              <option value="Kanombe East">Kanombe East</option>
              <option value="Muhima North">Muhima North</option>
              <option value="Kinyinya">Kinyinya</option>
              <option value="Rugando">Rugando</option>
              <option value="Niboye">Niboye</option>
              <option value="Gasabo Heights">Gasabo Heights</option>
              <option value="Ndera Village">Ndera Village</option>
              <option value="Bumbogo">Bumbogo</option>
              <option value="Jali Central">Jali Central</option>
              <option value="Kagarama">Kagarama</option>
              <option value="Nyamirambo West">Nyamirambo West</option>
              <option value="Gatenga South">Gatenga South</option>
              <option value="Masaka">Masaka</option>
              <option value="Kimicanga">Kimicanga</option>
            </select>
          </div>
          <InputField
            label="Sector / Cell"
            placeholder="e.g. Remera"
            value={form.sector}
            onChange={(e) => set('sector', (e.target as HTMLInputElement).value)}
            hint="Administrative sector or cell"
          />
        </div>

        {/* Phone + Monthly fee */}
        <div className={styles.formRow}>
          <InputField
            label="Phone number"
            placeholder="+250 788 000 000"
            value={form.phone}
            onChange={(e) => set('phone', (e.target as HTMLInputElement).value)}
            hint="Optional"
          />
          <InputField
            label="Monthly fee (RWF)"
            type="number"
            min="0"
            placeholder="3000"
            value={form.feeRwf}
            onChange={(e) => set('feeRwf', (e.target as HTMLInputElement).value)}
            required
          />
        </div>

        {/* Status */}
        <div className={styles.selectField}>
          <label className={styles.selectLabel} htmlFor="cl-status">Status</label>
          <select
            id="cl-status"
            className={styles.select}
            value={form.status}
            onChange={(e) => set('status', e.target.value)}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        {/* Notes */}
        <InputField
          as="textarea"
          label="Notes"
          placeholder="Optional notes about this client…"
          value={form.notes}
          onChange={(e) => set('notes', (e.target as HTMLTextAreaElement).value)}
        />

        <div className={styles.formFooter}>
          <Button type="button" variant="ghost" onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="primary">Save client</Button>
        </div>
      </form>
    </Modal>
  );
}

/* ── Page ────────────────────────────────────────────────── */
export default function ClientsPage() {
  const { data, loading, error } = useClients();

  const [query,     setQuery]     = useState('');
  const [type,      setType]      = useState<ClientType | 'all'>('all');
  const [payment,   setPayment]   = useState<PaymentStatus | 'all'>('all');
  const [sortKey,   setSortKey]   = useState<SortKey>('name');
  const [sortDir,   setSortDir]   = useState<SortDir>('asc');
  const [modalOpen, setModalOpen] = useState(false);

  const CLIENTS_DATA = (data?.clients ?? []) as Record<string, unknown>[];
  const TYPE_LABEL = (data?.typeLabel ?? {}) as Record<string, string>;
  const TYPE_BADGE = (data?.typeBadge ?? {}) as Record<string, string>;
  const PAYMENT_LABEL = (data?.paymentLabel ?? {}) as Record<string, string>;
  const PAYMENT_BADGE = (data?.paymentBadge ?? {}) as Record<string, string>;
  const STATUS_BADGE = (data?.statusBadge ?? {}) as Record<string, string>;
  const PAYMENT_SORT = (data?.paymentSort ?? {}) as Record<string, number>;
  const CLIENT_TYPES = (data?.clientTypes ?? []) as ClientType[];

  /* Stats */
  const total         = CLIENTS_DATA.length;
  const activeCount   = CLIENTS_DATA.filter((c: Record<string, unknown>) => c.status === 'active').length;
  const overdueCount  = CLIENTS_DATA.filter((c: Record<string, unknown>) => c.payment === 'overdue').length;
  const monthlyRevenue = CLIENTS_DATA
    .filter((c: Record<string, unknown>) => c.status === 'active')
    .reduce((sum: number, c: Record<string, unknown>) => sum + Number(c.feeRwf), 0);

  /* Filtered + sorted rows */
  const rows = useMemo(() => {
    const q = query.toLowerCase();
    let out = CLIENTS_DATA.filter((c: Record<string, unknown>) => {
      const matchSearch  = !q || String(c.name).toLowerCase().includes(q) || String(c.zone).toLowerCase().includes(q) || String(c.sector).toLowerCase().includes(q);
      const matchType    = type    === 'all' || c.type    === type;
      const matchPayment = payment === 'all' || c.payment === payment;
      return matchSearch && matchType && matchPayment;
    });

    out = [...out].sort((a: Record<string, unknown>, b: Record<string, unknown>) => {
      let cmp = 0;
      if (sortKey === 'name')     cmp = String(a.name).localeCompare(String(b.name));
      if (sortKey === 'zone')     cmp = String(a.zone).localeCompare(String(b.zone));
      if (sortKey === 'fee')      cmp = Number(a.feeRwf) - Number(b.feeRwf);
      if (sortKey === 'joinDate') cmp = String(a.joinDate).localeCompare(String(b.joinDate));
      if (sortKey === 'payment')  cmp = PAYMENT_SORT[String(a.payment)] - PAYMENT_SORT[String(b.payment)];
      if (sortKey === 'status')   cmp = String(a.status).localeCompare(String(b.status));
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return out;
  }, [query, type, payment, sortKey, sortDir, CLIENTS_DATA, PAYMENT_SORT]);

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.pageHeader}>
          <h2 className={styles.pageTitle}>Clients</h2>
        </div>
        <div className={styles.empty}>Loading clients…</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.page}>
        <div className={styles.pageHeader}>
          <h2 className={styles.pageTitle}>Clients</h2>
        </div>
        <div className={styles.empty} data-level="danger">
          {error ?? 'Failed to load clients.'}
        </div>
      </div>
    );
  }

  function toggleSort(col: SortKey) {
    if (sortKey === col) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(col);
      setSortDir('asc');
    }
  }

  return (
    <div className={styles.page}>

      {/* ── Page header ──────────────────────────────── */}
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>Clients</h2>
        <Button variant="primary" icon={<UserPlus size={15} />} onClick={() => setModalOpen(true)}>
          Add client
        </Button>
      </div>

      <AddClientModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* ── Stat cards ───────────────────────────────── */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} data-color="accent">
            <Users size={20} />
          </div>
          <div className={styles.statBody}>
            <span className={styles.statLabel}>Total clients</span>
            <span className={styles.statValue}>{total}</span>
            <span className={styles.statSub}>registered for collection</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} data-color="success">
            <CheckCircle2 size={20} />
          </div>
          <div className={styles.statBody}>
            <span className={styles.statLabel}>Active clients</span>
            <span className={styles.statValue}>{activeCount}</span>
            <span className={styles.statSub}>{total - activeCount} inactive or suspended</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} data-color="danger">
            <AlertCircle size={20} />
          </div>
          <div className={styles.statBody}>
            <span className={styles.statLabel}>Overdue payments</span>
            <span className={styles.statValue}>{overdueCount}</span>
            <span className={styles.statSub}>clients with unpaid fees</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} data-color="success">
            <Banknote size={20} />
          </div>
          <div className={styles.statBody}>
            <span className={styles.statLabel}>Monthly fees</span>
            <span className={styles.statValue} style={{ fontSize: 'var(--fs-2xl)' }}>
              {monthlyRevenue.toLocaleString()}
            </span>
            <span className={styles.statSub}>RWF billed per month</span>
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
              placeholder="Search by name, zone, or sector…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search clients"
            />
          </div>

          <div className={styles.filterGroup}>
            {/* Type filter */}
            <div className={styles.filters} role="group" aria-label="Filter by client type">
              <button
                className={styles.filterChip}
                data-active={type === 'all'}
                onClick={() => setType('all')}
              >
                All
                <span className={styles.chipCount}>{total}</span>
              </button>
              {CLIENT_TYPES.map((t) => (
                <button
                  key={t}
                  className={styles.filterChip}
                  data-active={type === t}
                  onClick={() => setType(t)}
                >
                  {TYPE_LABEL[t]}
                  <span className={styles.chipCount}>
                    {CLIENTS_DATA.filter((c: Record<string, unknown>) => c.type === t).length}
                  </span>
                </button>
              ))}
            </div>

            <div className={styles.filterDivider} aria-hidden="true" />

            {/* Payment filter */}
            <div className={styles.filters} role="group" aria-label="Filter by payment status">
              {(['all', 'overdue', 'pending', 'paid'] as const).map((p) => (
                <button
                  key={p}
                  className={styles.filterChip}
                  data-active={payment === p}
                  onClick={() => setPayment(p)}
                >
                  {p === 'all' ? 'All payments' : PAYMENT_LABEL[p]}
                  {p !== 'all' && (
                    <span className={styles.chipCount}>
                      {CLIENTS_DATA.filter((c: Record<string, unknown>) => c.payment === p).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className={styles.resultsMeta}>
          Showing <strong>{rows.length}</strong> of <strong>{total}</strong> clients
        </div>

        {/* Table */}
        <div className={styles.tableWrap} role="region" aria-label="Clients table">
          <div className={styles.tableHead}>
            <button className={styles.thBtn} onClick={() => toggleSort('name')}>
              Client <SortIcon col="name" sortKey={sortKey} sortDir={sortDir} />
            </button>
            <button className={styles.thBtn} onClick={() => toggleSort('zone')}>
              Zone <SortIcon col="zone" sortKey={sortKey} sortDir={sortDir} />
            </button>
            <button className={styles.thBtn} onClick={() => toggleSort('fee')}>
              Fee / mo <SortIcon col="fee" sortKey={sortKey} sortDir={sortDir} />
            </button>
            <button className={styles.thBtn} onClick={() => toggleSort('joinDate')}>
              Since <SortIcon col="joinDate" sortKey={sortKey} sortDir={sortDir} />
            </button>
            <button className={styles.thBtn} onClick={() => toggleSort('payment')}>
              Payment <SortIcon col="payment" sortKey={sortKey} sortDir={sortDir} />
            </button>
            <button className={styles.thBtn} onClick={() => toggleSort('status')}>
              Status <SortIcon col="status" sortKey={sortKey} sortDir={sortDir} />
            </button>
            <span className={styles.thStatic} />
          </div>

          {rows.length === 0 ? (
            <div className={styles.empty}>No clients match your search or filter.</div>
          ) : (
            rows.map((client: Record<string, unknown>) => (
              <div key={String(client.id)} className={styles.tableRow}>
                {/* Name + type */}
                <div className={styles.clientCell}>
                  <span className={styles.clientName}>{String(client.name)}</span>
                  <Badge variant={TYPE_BADGE[String(client.type)] as BadgeVariant}>{TYPE_LABEL[String(client.type)]}</Badge>
                </div>

                {/* Zone + code */}
                <div className={styles.zoneCell}>
                  <span className={styles.zoneName}>{String(client.zone)}</span>
                  <span className={styles.zoneCode}>{String(client.zoneCode)} · {String(client.sector)}</span>
                </div>

                {/* Fee */}
                <span className={styles.feeCell}>
                  {Number(client.feeRwf).toLocaleString()}
                </span>

                {/* Join date */}
                <span className={styles.dateCell}>{String(client.joinLabel)}</span>

                {/* Payment */}
                <span>
                  <Badge variant={PAYMENT_BADGE[String(client.payment)] as BadgeVariant}>
                    {PAYMENT_LABEL[String(client.payment)]}
                  </Badge>
                </span>

                {/* Status */}
                <span>
                  <Badge variant={STATUS_BADGE[String(client.status)] as BadgeVariant}>
                    {String(client.status).charAt(0).toUpperCase() + String(client.status).slice(1)}
                  </Badge>
                </span>

                {/* Actions */}
                <span className={styles.actionsCell}>
                  <Button variant="ghost" size="sm">Edit</Button>
                </span>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
