/* ── Collection domain ───────────────────────────────────── */
export type CollectionStatus = 'completed' | 'partial' | 'missed';

export interface Collection {
  id:            string;
  date:          string; // YYYY-MM-DD for sorting
  dateLabel:     string; // display label
  zone:          string;
  zoneCode:      string;
  driver:        string;
  clientsServed: number;
  clientsTotal:  number;
  status:        CollectionStatus;
  notes:         string;
}
