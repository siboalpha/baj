import type { Payment, PayStatus, PayMethod, PaymentFormState } from '@/lib/types/payment';

export const PAYMENTS_DATA: Payment[] = [
  // ── June 2026 (2 paid) ────────────────────────────────────
  { id:'p01', date:'2026-06-01', dateLabel:'Jun 1, 2026',  client:'Jean-Pierre Nkurunziza', clientType:'household',     zone:'Kimironko North', zoneCode:'KIM-N', amountRwf:3000,  method:'momo', period:'Jun 2026', periodSort:'2026-06', status:'paid'    },
  { id:'p02', date:'2026-06-01', dateLabel:'Jun 1, 2026',  client:'Kigali Office Park',     clientType:'commercial',    zone:'Kacyiru South',   zoneCode:'KAC-S', amountRwf:15000, method:'bank', period:'Jun 2026', periodSort:'2026-06', status:'paid'    },
  // ── May 2026 paid (16) ────────────────────────────────────
  { id:'p03', date:'2026-05-28', dateLabel:'May 28, 2026', client:'Olivier Habimana',        clientType:'household',     zone:'Bumbogo',         zoneCode:'BUM-A', amountRwf:3000,  method:'cash', period:'May 2026', periodSort:'2026-05', status:'paid'    },
  { id:'p04', date:'2026-05-25', dateLabel:'May 25, 2026', client:'Immaculée Kayitesi',      clientType:'household',     zone:'Niboye',          zoneCode:'NIB-A', amountRwf:3000,  method:'momo', period:'May 2026', periodSort:'2026-05', status:'paid'    },
  { id:'p05', date:'2026-05-22', dateLabel:'May 22, 2026', client:'Nyamirambo Tailor',       clientType:'small_business',zone:'Nyamirambo West', zoneCode:'NYA-W', amountRwf:4500,  method:'cash', period:'May 2026', periodSort:'2026-05', status:'paid'    },
  { id:'p06', date:'2026-05-20', dateLabel:'May 20, 2026', client:'Alexis Nsabimana',        clientType:'household',     zone:'Ndera Village',   zoneCode:'NDE-A', amountRwf:3000,  method:'cash', period:'May 2026', periodSort:'2026-05', status:'paid'    },
  { id:'p07', date:'2026-05-19', dateLabel:'May 19, 2026', client:'Kagarama Electronics',    clientType:'small_business',zone:'Kagarama',        zoneCode:'KAG-A', amountRwf:5500,  method:'momo', period:'May 2026', periodSort:'2026-05', status:'paid'    },
  { id:'p08', date:'2026-05-18', dateLabel:'May 18, 2026', client:'Patrick Ndayishimiye',    clientType:'household',     zone:'Kibagabaga',      zoneCode:'KIB-A', amountRwf:3000,  method:'momo', period:'May 2026', periodSort:'2026-05', status:'paid'    },
  { id:'p09', date:'2026-05-16', dateLabel:'May 16, 2026', client:'Kimironko Boutique',      clientType:'small_business',zone:'Kimironko North', zoneCode:'KIM-N', amountRwf:5000,  method:'momo', period:'May 2026', periodSort:'2026-05', status:'paid'    },
  { id:'p10', date:'2026-05-15', dateLabel:'May 15, 2026', client:'Solange Mukagatare',      clientType:'household',     zone:'Kacyiru South',   zoneCode:'KAC-S', amountRwf:3000,  method:'cash', period:'May 2026', periodSort:'2026-05', status:'paid'    },
  { id:'p11', date:'2026-05-14', dateLabel:'May 14, 2026', client:'Remera Hair Salon',       clientType:'small_business',zone:'Remera Central',  zoneCode:'REM-C', amountRwf:5000,  method:'cash', period:'May 2026', periodSort:'2026-05', status:'paid'    },
  { id:'p12', date:'2026-05-14', dateLabel:'May 14, 2026', client:'Emmanuel Hakizimana',     clientType:'household',     zone:'Gisozi East',     zoneCode:'GIS-E', amountRwf:3000,  method:'momo', period:'May 2026', periodSort:'2026-05', status:'paid'    },
  { id:'p13', date:'2026-05-12', dateLabel:'May 12, 2026', client:'Théoneste Bizimana',      clientType:'household',     zone:'Kinyinya',        zoneCode:'KIN-A', amountRwf:3000,  method:'cash', period:'May 2026', periodSort:'2026-05', status:'paid'    },
  { id:'p14', date:'2026-05-11', dateLabel:'May 11, 2026', client:'Kacyiru General Store',   clientType:'small_business',zone:'Kacyiru South',   zoneCode:'KAC-S', amountRwf:6000,  method:'bank', period:'May 2026', periodSort:'2026-05', status:'paid'    },
  { id:'p15', date:'2026-05-09', dateLabel:'May 9, 2026',  client:'Kibagabaga Medical Ctr',  clientType:'commercial',    zone:'Kibagabaga',      zoneCode:'KIB-A', amountRwf:12000, method:'bank', period:'May 2026', periodSort:'2026-05', status:'paid'    },
  { id:'p16', date:'2026-05-08', dateLabel:'May 8, 2026',  client:'Annette Uwase',           clientType:'household',     zone:'Rugando',         zoneCode:'RUG-B', amountRwf:3000,  method:'momo', period:'May 2026', periodSort:'2026-05', status:'paid'    },
  { id:'p17', date:'2026-05-07', dateLabel:'May 7, 2026',  client:'Vénérande Mukamana',      clientType:'household',     zone:'Jali Central',    zoneCode:'JAL-B', amountRwf:3000,  method:'cash', period:'May 2026', periodSort:'2026-05', status:'paid'    },
  { id:'p18', date:'2026-05-05', dateLabel:'May 5, 2026',  client:'Kanombe Inn',             clientType:'hotel',         zone:'Kanombe East',    zoneCode:'KAN-E', amountRwf:18000, method:'bank', period:'May 2026', periodSort:'2026-05', status:'paid'    },
  // ── May 2026 overdue (8) ──────────────────────────────────
  { id:'p19', date:'',           dateLabel:'',              client:'Claire Uwamahoro',         clientType:'household',     zone:'Remera Central',  zoneCode:'REM-C', amountRwf:3000,  method:null,   period:'May 2026', periodSort:'2026-05', status:'overdue' },
  { id:'p20', date:'',           dateLabel:'',              client:'Espérance Uwineza',        clientType:'household',     zone:'Kanombe East',    zoneCode:'KAN-E', amountRwf:3000,  method:null,   period:'May 2026', periodSort:'2026-05', status:'overdue' },
  { id:'p21', date:'',           dateLabel:'',              client:'Cécile Murindangabo',      clientType:'household',     zone:'Gasabo Heights',  zoneCode:'GAS-H', amountRwf:3000,  method:null,   period:'May 2026', periodSort:'2026-05', status:'overdue' },
  { id:'p22', date:'',           dateLabel:'',              client:'Kacyiru Household #112',   clientType:'household',     zone:'Kacyiru South',   zoneCode:'KAC-S', amountRwf:3000,  method:null,   period:'May 2026', periodSort:'2026-05', status:'overdue' },
  { id:'p23', date:'',           dateLabel:'',              client:'Gasabo Household #204',    clientType:'household',     zone:'Gasabo Heights',  zoneCode:'GAS-H', amountRwf:3000,  method:null,   period:'May 2026', periodSort:'2026-05', status:'overdue' },
  { id:'p24', date:'',           dateLabel:'',              client:'Bright Star Shop',         clientType:'small_business',zone:'Gisozi East',     zoneCode:'GIS-E', amountRwf:4500,  method:null,   period:'May 2026', periodSort:'2026-05', status:'overdue' },
  { id:'p25', date:'',           dateLabel:'',              client:'Chez Lando Restaurant',    clientType:'commercial',    zone:'Kimironko North', zoneCode:'KIM-N', amountRwf:12000, method:null,   period:'May 2026', periodSort:'2026-05', status:'overdue' },
  { id:'p26', date:'',           dateLabel:'',              client:'Guest House Kigali',       clientType:'hotel',         zone:'Nyamirambo West', zoneCode:'NYA-W', amountRwf:15000, method:null,   period:'May 2026', periodSort:'2026-05', status:'overdue' },
  // ── April 2026 paid (3) ───────────────────────────────────
  { id:'p27', date:'2026-04-10', dateLabel:'Apr 10, 2026', client:'Chez Lando Restaurant',   clientType:'commercial',    zone:'Kimironko North', zoneCode:'KIM-N', amountRwf:12000, method:'bank', period:'Apr 2026', periodSort:'2026-04', status:'paid'    },
  { id:'p28', date:'2026-04-08', dateLabel:'Apr 8, 2026',  client:'Kigali Office Park',      clientType:'commercial',    zone:'Kacyiru South',   zoneCode:'KAC-S', amountRwf:15000, method:'bank', period:'Apr 2026', periodSort:'2026-04', status:'paid'    },
  { id:'p29', date:'2026-04-04', dateLabel:'Apr 4, 2026',  client:'Kanombe Inn',             clientType:'hotel',         zone:'Kanombe East',    zoneCode:'KAN-E', amountRwf:18000, method:'bank', period:'Apr 2026', periodSort:'2026-04', status:'paid'    },
  // ── April 2026 waived (1) ─────────────────────────────────
  { id:'p30', date:'2026-04-01', dateLabel:'Apr 1, 2026',  client:'Gasabo Shopping Center',  clientType:'commercial',    zone:'Gasabo Heights',  zoneCode:'GAS-H', amountRwf:14000, method:null,   period:'Apr 2026', periodSort:'2026-04', status:'waived'  },
];

export const STATUS_BADGE: Record<PayStatus, 'success' | 'danger' | 'neutral'> = {
  paid:    'success',
  overdue: 'danger',
  waived:  'neutral',
};

export const STATUS_LABEL: Record<PayStatus, string> = {
  paid:    'Paid',
  overdue: 'Overdue',
  waived:  'Waived',
};

export const METHOD_LABEL: Record<NonNullable<PayMethod>, string> = {
  cash: 'Cash',
  momo: 'MoMo',
  bank: 'Bank',
};

export const STATUS_SORT: Record<PayStatus, number> = { overdue: 0, paid: 1, waived: 2 };

export const PERIODS = ['Jun 2026', 'May 2026', 'Apr 2026'];

export const CLIENT_OPTIONS = [
  'Chez Lando Restaurant', 'Sunrise Apartments', 'Kacyiru Household #112',
  'Guest House Kigali', 'Bright Star Shop', 'Gasabo Household #204',
  'Claire Uwamahoro', 'Espérance Uwineza', 'Cécile Murindangabo',
  'Kanombe Inn', 'Kigali Office Park', 'Kibagabaga Medical Ctr',
];

export const EMPTY_FORM: PaymentFormState = {
  client: 'Chez Lando Restaurant', period: 'May 2026',
  amount: '', method: 'cash', date: '2026-06-01', notes: '',
};

export const DUMMY_FORM: PaymentFormState = {
  client: 'Chez Lando Restaurant', period: 'May 2026',
  amount: '12000', method: 'bank', date: '2026-06-01',
  notes: 'Payment received at office — cheque cleared.',
};
