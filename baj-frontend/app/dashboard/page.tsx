'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import { useDashboard } from '@/lib/hooks/useDashboard';
import Button from '@/components/ui/Button/Button';
import Avatar from '@/components/ui/Avatar/Avatar';
import Badge from '@/components/ui/Badge/Badge';
import ServicePill from '@/components/ui/ServicePill/ServicePill';
import Spinner from '@/components/ui/Spinner/Spinner';
import Tabs, { TabItem } from '@/components/ui/Tabs/Tabs';
import Modal from '@/components/ui/Modal/Modal';
import PaymentForm from '@/components/forms/PaymentForm/PaymentForm';
import styles from './page.module.css';

const TABS: TabItem[] = [
  { id: 'payments',    label: 'Payments' },
  { id: 'collections', label: 'Collections' },
];

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const { data, loading: dataLoading, error } = useDashboard();

  const [activeTab, setActiveTab] = useState('payments');
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [payments, setPayments] = useState<Record<string, unknown>[]>([]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace('/auth/login');
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (data?.payments) {
      setPayments(data.payments as Record<string, unknown>[]);
    }
  }, [data]);

  const CLIENT = (data?.client ?? {}) as Record<string, unknown>;
  const COLLECTIONS = (data?.collections ?? []) as Record<string, unknown>[];
  const FEE_STATUS_LABEL = (data?.feeStatusLabel ?? {}) as Record<string, string>;
  const FEE_BADGE = (data?.feeBadge ?? {}) as Record<string, string>;

  const clientName = String(CLIENT.name ?? '');
  const clientZone = String(CLIENT.zone ?? '');
  const clientAddress = String(CLIENT.address ?? '');
  const clientServices = (CLIENT.services ?? []) as string[];
  const clientFee = (CLIENT.fee ?? {}) as Record<string, unknown>;
  const nextCollection = (CLIENT.nextCollection ?? {}) as Record<string, unknown>;

  const currentFee = payments.find((p: Record<string, unknown>) => p.period === clientFee.period);
  const feeStatus = String(currentFee?.status ?? 'pending');
  const initials = clientName.split(' ').map((n) => n[0]).join('').slice(0, 2);

  function handlePaymentSuccess() {
    setPayments((prev) =>
      prev.map((p) =>
        p.status === 'pending'
          ? { ...p, status: 'paid', paidDate: 'Jun 1, 2026' }
          : p
      )
    );
    setPayModalOpen(false);
  }

  if (authLoading || !isAuthenticated) {
    return (
      <div className={styles.loading}>
        <Spinner size="lg" label="Loading your account" />
      </div>
    );
  }

  if (dataLoading) {
    return (
      <div className={styles.loading}>
        <Spinner size="lg" label="Loading dashboard data" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.loading}>
        <p className={styles.error}>{error ?? 'Failed to load dashboard data.'}</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>

        {/* ── Welcome ──────────────────────────────────── */}
        <div className={styles.welcome}>
          <Avatar initials={initials} variant="accent" size={48} label={clientName} />
          <div>
            <h1 className={styles.welcomeName}>{clientName}</h1>
            <p className={styles.welcomeMeta}>
              <span className={styles.zone}>{clientZone}</span>
              · {clientAddress}
            </p>
          </div>
        </div>

        {/* ── Summary cards ────────────────────────────── */}
        <div className={styles.primaryRow}>

          {/* Fee card */}
          <div className={styles.feeCard}>
            <div className={styles.feeCardHead}>
              <span className={styles.cardLabel}>Monthly fee</span>
              <Badge variant={FEE_BADGE[feeStatus] as import('@/components/ui/Badge/Badge').BadgeVariant}>
                {FEE_STATUS_LABEL[feeStatus]}
              </Badge>
            </div>
            <p className={styles.feeAmount}>
              {String(clientFee.currency ?? 'RWF')} {Number(clientFee.amount ?? 0).toLocaleString()}
            </p>
            <p className={styles.feePeriod}>{String(clientFee.period ?? '')}</p>
            {feeStatus !== 'paid' && (
              <div className={styles.feeFooter}>
                <span className={styles.feeDue}>Due {String(clientFee.dueDate ?? '')}</span>
                <Button variant="primary" size="sm" onClick={() => setPayModalOpen(true)}>
                  Pay now
                </Button>
              </div>
            )}
            {feeStatus === 'paid' && (
              <p className={styles.feePaidNote}>Thank you — payment received.</p>
            )}
          </div>

          {/* Next collection card */}
          <div className={styles.collectionCard}>
            <div className={styles.collectionCardHead}>
              <span className={styles.cardLabel}>Next collection</span>
              <ServicePill type="collection" />
            </div>
            <p className={styles.collectionDate}>{String(nextCollection.date ?? '')}</p>
            <p className={styles.collectionTime}>{String(nextCollection.time ?? '')}</p>
            <div className={styles.collectionFooter}>
              <Button variant="secondary" size="sm">Report issue</Button>
            </div>
          </div>

          {/* Services card */}
          <div className={styles.servicesCard}>
            <span className={styles.cardLabel}>Your services</span>
            <div className={styles.servicesList}>
              {clientServices.map((s: string) => (
                <ServicePill key={s} type={s as import('@/components/ui/ServicePill/ServicePill').ServiceType} />
              ))}
            </div>
            <p className={styles.servicesZone}>
              Zone <span className={styles.zone}>{clientZone}</span> · Weekly schedule
            </p>
          </div>

        </div>

        {/* ── Tabs + content ───────────────────────────── */}
        <div className={styles.section}>
          <Tabs tabs={TABS} active={activeTab} onChange={setActiveTab} />

          {/* Payments tab */}
          {activeTab === 'payments' && (
            <div className={styles.historyTable}>
              <div className={styles.paymentsHead}>
                <span>Period</span>
                <span>Amount</span>
                <span>Status</span>
                <span>Paid on</span>
              </div>
              {payments.map((row: Record<string, unknown>) => (
                <div key={String(row.id)} className={styles.paymentsRow}>
                  <span className={styles.paymentPeriod}>{String(row.period)}</span>
                  <span className={styles.paymentAmount}>
                    {String(row.currency)} {Number(row.amount).toLocaleString()}
                  </span>
                  <Badge variant={FEE_BADGE[String(row.status)] as import('@/components/ui/Badge/Badge').BadgeVariant}>
                    {FEE_STATUS_LABEL[String(row.status)]}
                  </Badge>
                  <span className={styles.paymentDate}>
                    {row.paidDate ? String(row.paidDate) : (
                      row.status === 'pending'
                        ? <Button variant="primary" size="sm" onClick={() => setPayModalOpen(true)}>Pay now</Button>
                        : <span className={styles.overdueMark}>Not paid</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Collections tab */}
          {activeTab === 'collections' && (
            <div className={styles.historyTable}>
              <div className={styles.collectionsHead}>
                <span>Date</span>
                <span>Status</span>
                <span>Note</span>
              </div>
              {COLLECTIONS.map((row: Record<string, unknown>, i: number) => (
                <div key={i} className={styles.collectionsRow}>
                  <span className={styles.historyDate}>{String(row.date)}</span>
                  <Badge variant={String(row.status) as import('@/components/ui/Badge/Badge').BadgeVariant}>
                    {String(row.status) === 'success' ? 'Done' : String(row.status) === 'warning' ? 'Delayed' : 'Missed'}
                  </Badge>
                  <span className={styles.historyNote}>{String(row.note)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Help footer ───────────────────────────────── */}
        <div className={styles.helpBanner}>
          <div>
            <p className={styles.helpTitle}>Need help?</p>
            <p className={styles.helpSub}>
              Contact BAJ Ltd for missed collections, payment questions, or service requests.
            </p>
          </div>
          <div className={styles.helpContacts}>
            <span className={styles.helpContact}>+250 788 990 596</span>
            <span className={styles.helpContact}>info@baj.rw</span>
          </div>
        </div>

      </main>

      {/* ── Payment modal ─────────────────────────────── */}
      <Modal
        open={payModalOpen}
        onClose={() => setPayModalOpen(false)}
        title="Pay monthly fee"
      >
        <PaymentForm
          amount={Number(clientFee.amount ?? 0)}
          currency={String(clientFee.currency ?? 'RWF')}
          period={String(clientFee.period ?? '')}
          onSuccess={handlePaymentSuccess}
        />
      </Modal>

    </div>
  );
}
