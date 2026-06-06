/* ── Dashboard domain ────────────────────────────────────── */
export type FeeStatus = 'paid' | 'pending' | 'overdue';

export interface Client {
  name: string;
  zone: string;
  address: string;
  services: string[];
  fee: {
    amount: number;
    currency: string;
    period: string;
    dueDate: string;
  };
  nextCollection: {
    date: string;
    time: string;
  };
}

export interface Payment {
  id: string;
  period: string;
  amount: number;
  currency: string;
  status: FeeStatus;
  paidDate: string | null;
}

export interface Collection {
  date: string;
  status: 'success' | 'warning' | 'danger';
  note: string;
}
