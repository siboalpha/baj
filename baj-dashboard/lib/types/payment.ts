/* ── Payment domain ──────────────────────────────────────── */
export type PayStatus = 'paid' | 'overdue' | 'waived';
export type PayMethod = 'cash' | 'momo' | 'bank' | null;

export interface Payment {
  id:         string;
  date:       string;       // YYYY-MM-DD, '' if not yet paid
  dateLabel:  string;       // display
  client:     string;
  clientType: import('./client').ClientType;
  zone:       string;
  zoneCode:   string;
  amountRwf:  number;
  method:     PayMethod;
  period:     string;       // 'Jun 2026', 'May 2026', …
  periodSort: string;       // YYYY-MM for sorting periods
  status:     PayStatus;
}

export interface PaymentFormState {
  client: string;
  period: string;
  amount: string;
  method: string;
  date:   string;
  notes:  string;
}
