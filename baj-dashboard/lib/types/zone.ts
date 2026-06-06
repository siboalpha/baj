/* ── Zone domain ─────────────────────────────────────────── */
export type ZoneStatus = 'active' | 'inactive' | 'suspended';
export type District   = 'Gasabo' | 'Kicukiro' | 'Nyarugenge';

export interface Zone {
  id:            string;
  name:          string;
  code:          string;
  district:      District;
  sector:        string;
  clients:       number;
  driver:        string | null;
  schedule:      string;
  scheduleOrder: number;
  status:        ZoneStatus;
}

export interface ZoneFormState {
  name:     string;
  code:     string;
  district: string;
  sector:   string;
  driver:   string;
  schedule: string;
  status:   string;
  notes:    string;
}
