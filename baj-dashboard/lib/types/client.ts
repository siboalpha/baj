/* ── Client domain ───────────────────────────────────────── */
export type ClientType    = 'household' | 'small_business' | 'commercial' | 'hotel';
export type PaymentStatus = 'paid' | 'overdue' | 'pending';
export type ClientStatus  = 'active' | 'inactive' | 'suspended';

export interface Client {
  id:        string;
  name:      string;
  type:      ClientType;
  zone:      string;
  zoneCode:  string;
  sector:    string;
  feeRwf:    number;
  joinDate:  string;   // YYYY-MM-DD for sort
  joinLabel: string;   // display
  payment:   PaymentStatus;
  status:    ClientStatus;
}

export interface ClientFormState {
  name:   string;
  type:   string;
  zone:   string;
  sector: string;
  phone:  string;
  feeRwf: string;
  status: string;
  notes:  string;
}
