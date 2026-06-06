import type { Client, Payment, Collection, FeeStatus } from '@/lib/types/dashboard';

export const CLIENT: Client = {
  name:    'Mutesi Kalisa',
  zone:    'KGL-GAS-04',
  address: 'Gasabo District, Kigali',
  services: ['collection', 'disposal', 'transport'],
  fee: {
    amount:   3500,
    currency: 'RWF',
    period:   'June 2026',
    dueDate:  'Jun 5, 2026',
  },
  nextCollection: {
    date: 'Tue, Jun 3, 2026',
    time: '7:00 AM – 10:00 AM',
  },
};

export const INITIAL_PAYMENTS: Payment[] = [
  { id: 'p6', period: 'June 2026',     amount: 3500, currency: 'RWF', status: 'pending', paidDate: null },
  { id: 'p5', period: 'May 2026',      amount: 3500, currency: 'RWF', status: 'paid',    paidDate: 'May 2, 2026' },
  { id: 'p4', period: 'April 2026',    amount: 3500, currency: 'RWF', status: 'paid',    paidDate: 'Apr 1, 2026' },
  { id: 'p3', period: 'March 2026',    amount: 3500, currency: 'RWF', status: 'paid',    paidDate: 'Mar 3, 2026' },
  { id: 'p2', period: 'February 2026', amount: 3000, currency: 'RWF', status: 'paid',    paidDate: 'Feb 4, 2026' },
  { id: 'p1', period: 'January 2026',  amount: 3000, currency: 'RWF', status: 'overdue', paidDate: null },
];

export const COLLECTIONS: Collection[] = [
  { date: 'May 27, 2026', status: 'success', note: 'Collected on time' },
  { date: 'May 20, 2026', status: 'success', note: 'Collected on time' },
  { date: 'May 13, 2026', status: 'success', note: 'Collected on time' },
  { date: 'May 6, 2026',  status: 'warning', note: 'Delayed by 2 hours' },
  { date: 'Apr 29, 2026', status: 'success', note: 'Collected on time' },
  { date: 'Apr 22, 2026', status: 'success', note: 'Collected on time' },
  { date: 'Apr 15, 2026', status: 'danger',  note: 'Missed — reported' },
];

export const FEE_STATUS_LABEL: Record<FeeStatus, string> = {
  paid:    'Paid',
  pending: 'Due',
  overdue: 'Overdue',
};

export const FEE_BADGE: Record<FeeStatus, 'success' | 'warning' | 'danger'> = {
  paid:    'success',
  pending: 'warning',
  overdue: 'danger',
};
