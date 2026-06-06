'use client';

import { useState, useMemo } from 'react';
import {
  MapPin, CheckCircle2, AlertTriangle, Users,
  Search, ChevronUp, ChevronDown, ChevronsUpDown,
  AlertCircle,
} from 'lucide-react';
import type { BadgeVariant } from '@/components/ui/Badge/Badge';
import Badge from '@/components/ui/Badge/Badge';
import Button from '@/components/ui/Button/Button';
import Modal from '@/components/ui/Modal/Modal';
import InputField from '@/components/ui/InputField/InputField';
import { useZones } from '@/lib/hooks/useZones';
import { EMPTY_FORM, DUMMY_FORM } from '@/lib/constants/zones';
import type { SortDir } from '@/lib/types/dashboard';
import styles from './page.module.css';

/* ── Local types ─────────────────────────────────────────── */
type ZoneStatus = 'active' | 'inactive' | 'suspended';
type District = 'Gasabo' | 'Kicukiro' | 'Nyarugenge';
type SortKey = 'name' | 'district' | 'clients' | 'schedule' | 'status';

/* ── Helpers ─────────────────────────────────────────────── */
function SortIcon({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey; sortDir: SortDir }) {
  if (col !== sortKey) return <ChevronsUpDown size={13} className={styles.sortIconInactive} />;
  return sortDir === 'asc'
    ? <ChevronUp size={13} className={styles.sortIconActive} />
    : <ChevronDown size={13} className={styles.sortIconActive} />;
}

/* ── Add Zone Form ───────────────────────────────────────── */
function AddZoneModal({ open, onClose }: { open: boolean; onClose: () => void }) {
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
    // TODO: persist zone
    handleClose();
  }

  return (
    <Modal open={open} onClose={handleClose} title="Add zone">
      <form className={styles.form} onSubmit={handleSubmit}>

        {/* Dummy data helper */}
        <div className={styles.formDummy}>
          <Button type="button" variant="ghost" size="sm" onClick={() => setForm(DUMMY_FORM)}>
            Use dummy data
          </Button>
        </div>

        {/* Name + Code */}
        <div className={styles.formRow}>
          <InputField
            label="Zone name"
            placeholder="e.g. Kimironko North"
            value={form.name}
            onChange={(e) => set('name', (e.target as HTMLInputElement).value)}
            required
          />
          <InputField
            label="Zone code"
            placeholder="e.g. KIM-N"
            value={form.code}
            onChange={(e) => set('code', (e.target as HTMLInputElement).value)}
            hint="Short uppercase identifier"
            required
          />
        </div>

        {/* District + Sector */}
        <div className={styles.formRow}>
          <div className={styles.selectField}>
            <label className={styles.selectLabel} htmlFor="zone-district">District</label>
            <select
              id="zone-district"
              className={styles.select}
              value={form.district}
              onChange={(e) => set('district', e.target.value)}
            >
              <option value="Gasabo">Gasabo</option>
              <option value="Kicukiro">Kicukiro</option>
              <option value="Nyarugenge">Nyarugenge</option>
            </select>
          </div>
          <InputField
            label="Sector"
            placeholder="e.g. Kimironko"
            value={form.sector}
            onChange={(e) => set('sector', (e.target as HTMLInputElement).value)}
            hint="Administrative sector name"
          />
        </div>

        {/* Driver + Schedule */}
        <div className={styles.formRow}>
          <div className={styles.selectField}>
            <label className={styles.selectLabel} htmlFor="zone-driver">Driver</label>
            <select
              id="zone-driver"
              className={styles.select}
              value={form.driver}
              onChange={(e) => set('driver', e.target.value)}
            >
              <option value="">Unassigned</option>
              <option value="Jean P.">Jean P.</option>
              <option value="Diane U.">Diane U.</option>
              <option value="Patrick N.">Patrick N.</option>
              <option value="Aimable R.">Aimable R.</option>
              <option value="Claudine M.">Claudine M.</option>
              <option value="Théodore K.">Théodore K.</option>
            </select>
          </div>
          <div className={styles.selectField}>
            <label className={styles.selectLabel} htmlFor="zone-schedule">Collection day</label>
            <select
              id="zone-schedule"
              className={styles.select}
              value={form.schedule}
              onChange={(e) => set('schedule', e.target.value)}
            >
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
            </select>
          </div>
        </div>

        {/* Status */}
        <div className={styles.selectField}>
          <label className={styles.selectLabel} htmlFor="zone-status">Status</label>
          <select
            id="zone-status"
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
          placeholder="Optional notes about this zone…"
          value={form.notes}
          onChange={(e) => set('notes', (e.target as HTMLTextAreaElement).value)}
        />

        {/* Footer */}
        <div className={styles.formFooter}>
          <Button type="button" variant="ghost" onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="primary">Save zone</Button>
        </div>
      </form>
    </Modal>
  );
}

/* ── Page ────────────────────────────────────────────────── */
export default function ZonesPage() {
  const { data, loading, error } = useZones();

  const [query,      setQuery]      = useState('');
  const [status,     setStatus]     = useState<ZoneStatus | 'all'>('all');
  const [district,   setDistrict]   = useState<District | 'all'>('all');
  const [sortKey,    setSortKey]    = useState<SortKey>('name');
  const [sortDir,    setSortDir]    = useState<SortDir>('asc');
  const [modalOpen,  setModalOpen]  = useState(false);

  const ZONES_DATA = (data?.zones ?? []) as Record<string, unknown>[];
  const STATUS_BADGE = (data?.statusBadge ?? {}) as Record<string, string>;
  const STATUS_LABEL = (data?.statusLabel ?? {}) as Record<string, string>;
  const DISTRICTS = (data?.districts ?? []) as District[];

  const totalZones    = ZONES_DATA.length;
  const activeCount   = ZONES_DATA.filter((z: Record<string, unknown>) => z.status === 'active').length;
  const noDriverCount = ZONES_DATA.filter((z: Record<string, unknown>) => z.driver === null).length;
  const totalClients  = ZONES_DATA.reduce((sum: number, z: Record<string, unknown>) => sum + Number(z.clients), 0);

  const rows = useMemo(() => {
    const q = query.toLowerCase();
    let out = ZONES_DATA.filter((z: Record<string, unknown>) => {
      const matchSearch   = !q || String(z.name).toLowerCase().includes(q) || String(z.code).toLowerCase().includes(q) || String(z.sector).toLowerCase().includes(q);
      const matchStatus   = status   === 'all' || z.status   === status;
      const matchDistrict = district === 'all' || z.district === district;
      return matchSearch && matchStatus && matchDistrict;
    });

    out = [...out].sort((a: Record<string, unknown>, b: Record<string, unknown>) => {
      let cmp = 0;
      if (sortKey === 'name')     cmp = String(a.name).localeCompare(String(b.name));
      if (sortKey === 'district') cmp = String(a.district).localeCompare(String(b.district)) || String(a.sector).localeCompare(String(b.sector));
      if (sortKey === 'clients')  cmp = Number(a.clients) - Number(b.clients);
      if (sortKey === 'schedule') cmp = Number(a.scheduleOrder) - Number(b.scheduleOrder) || String(a.name).localeCompare(String(b.name));
      if (sortKey === 'status')   cmp = String(a.status).localeCompare(String(b.status));
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return out;
  }, [query, status, district, sortKey, sortDir, ZONES_DATA]);

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.pageHeader}>
          <h2 className={styles.pageTitle}>Zones</h2>
        </div>
        <div className={styles.empty}>Loading zones…</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.page}>
        <div className={styles.pageHeader}>
          <h2 className={styles.pageTitle}>Zones</h2>
        </div>
        <div className={styles.empty} data-level="danger">
          {error ?? 'Failed to load zones.'}
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
        <h2 className={styles.pageTitle}>Zones</h2>
        <Button variant="primary" icon={<MapPin size={15} />} onClick={() => setModalOpen(true)}>
          Add zone
        </Button>
      </div>

      {/* ── Add zone modal ───────────────────────────── */}
      <AddZoneModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* ── Stat cards ───────────────────────────────── */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} data-color="accent">
            <MapPin size={20} />
          </div>
          <div className={styles.statBody}>
            <span className={styles.statLabel}>Total zones</span>
            <span className={styles.statValue}>{totalZones}</span>
            <span className={styles.statSub}>collection areas</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} data-color="success">
            <CheckCircle2 size={20} />
          </div>
          <div className={styles.statBody}>
            <span className={styles.statLabel}>Active zones</span>
            <span className={styles.statValue}>{activeCount}</span>
            <span className={styles.statSub}>{totalZones - activeCount} inactive or suspended</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} data-color="warning">
            <AlertTriangle size={20} />
          </div>
          <div className={styles.statBody}>
            <span className={styles.statLabel}>No driver assigned</span>
            <span className={styles.statValue}>{noDriverCount}</span>
            <span className={styles.statSub}>zones need assignment</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} data-color="accent">
            <Users size={20} />
          </div>
          <div className={styles.statBody}>
            <span className={styles.statLabel}>Total clients</span>
            <span className={styles.statValue}>{totalClients.toLocaleString()}</span>
            <span className={styles.statSub}>across all zones</span>
          </div>
        </div>
      </div>

      {/* ── Table card ───────────────────────────────── */}
      <div className={styles.tableCard}>

        <div className={styles.toolbar}>
          <div className={styles.searchWrap}>
            <Search size={15} className={styles.searchIcon} aria-hidden="true" />
            <input
              className={styles.searchInput}
              type="search"
              placeholder="Search by zone, code, or sector…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search zones"
            />
          </div>

          <div className={styles.filterGroup}>
            <div className={styles.filters} role="group" aria-label="Filter by status">
              {(['all', 'active', 'inactive', 'suspended'] as const).map((s) => (
                <button
                  key={s}
                  className={styles.filterChip}
                  data-active={status === s}
                  onClick={() => setStatus(s)}
                >
                  {s === 'all' ? 'All' : STATUS_LABEL[s]}
                  <span className={styles.chipCount}>
                    {s === 'all' ? totalZones : ZONES_DATA.filter((z: Record<string, unknown>) => z.status === s).length}
                  </span>
                </button>
              ))}
            </div>

            <div className={styles.filterDivider} aria-hidden="true" />

            <div className={styles.filters} role="group" aria-label="Filter by district">
              <button
                className={styles.filterChip}
                data-active={district === 'all'}
                onClick={() => setDistrict('all')}
              >
                All districts
              </button>
              {DISTRICTS.map((d: District) => (
                <button
                  key={d}
                  className={styles.filterChip}
                  data-active={district === d}
                  onClick={() => setDistrict(d)}
                >
                  {d}
                  <span className={styles.chipCount}>
                    {ZONES_DATA.filter((z: Record<string, unknown>) => z.district === d).length}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.resultsMeta}>
          Showing <strong>{rows.length}</strong> of <strong>{totalZones}</strong> zones
        </div>

        <div className={styles.tableWrap} role="region" aria-label="Zones table">
          <div className={styles.tableHead}>
            <button className={styles.thBtn} onClick={() => toggleSort('name')}>
              Zone <SortIcon col="name" sortKey={sortKey} sortDir={sortDir} />
            </button>
            <button className={styles.thBtn} onClick={() => toggleSort('district')}>
              Location <SortIcon col="district" sortKey={sortKey} sortDir={sortDir} />
            </button>
            <button className={styles.thBtn} onClick={() => toggleSort('clients')}>
              Clients <SortIcon col="clients" sortKey={sortKey} sortDir={sortDir} />
            </button>
            <span className={styles.thStatic}>Driver</span>
            <button className={styles.thBtn} onClick={() => toggleSort('schedule')}>
              Schedule <SortIcon col="schedule" sortKey={sortKey} sortDir={sortDir} />
            </button>
            <button className={styles.thBtn} onClick={() => toggleSort('status')}>
              Status <SortIcon col="status" sortKey={sortKey} sortDir={sortDir} />
            </button>
            <span className={styles.thStatic} />
          </div>

          {rows.length === 0 ? (
            <div className={styles.empty}>No zones match your search or filter.</div>
          ) : (
            rows.map((zone: Record<string, unknown>) => (
              <div key={String(zone.id)} className={styles.tableRow}>
                <div className={styles.zoneCell}>
                  <span className={styles.zoneName}>{String(zone.name)}</span>
                  <span className={styles.zoneCode}>{String(zone.code)}</span>
                </div>
                <div className={styles.locationCell}>
                  <span className={styles.districtName}>{String(zone.district)}</span>
                  <span className={styles.sectorName}>{String(zone.sector)} sector</span>
                </div>
                <span className={styles.clientsCell}>{Number(zone.clients)}</span>
                {zone.driver ? (
                  <span className={styles.driverCell}>{String(zone.driver)}</span>
                ) : (
                  <span className={styles.driverUnassigned}>
                    <AlertCircle size={13} aria-hidden="true" />
                    Unassigned
                  </span>
                )}
                <span className={styles.scheduleCell}>{String(zone.schedule)}</span>
                <span>
                  <Badge variant={STATUS_BADGE[String(zone.status)] as BadgeVariant}>{STATUS_LABEL[String(zone.status)]}</Badge>
                </span>
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
