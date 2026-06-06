import type { Client, ClientType, PaymentStatus, ClientStatus, ClientFormState } from '@/lib/types/client';

export const CLIENTS_DATA: Client[] = [
  // ── Households ────────────────────────────────────────────
  { id:'cl01', name:'Jean-Pierre Nkurunziza',  type:'household',     zone:'Kimironko North', zoneCode:'KIM-N', sector:'Kimironko',  feeRwf:3000,  joinDate:'2024-03-10', joinLabel:'Mar 10, 2024', payment:'paid',    status:'active'   },
  { id:'cl02', name:'Claire Uwamahoro',         type:'household',     zone:'Remera Central',  zoneCode:'REM-C', sector:'Remera',     feeRwf:3000,  joinDate:'2023-11-05', joinLabel:'Nov 5, 2023',  payment:'overdue', status:'active'   },
  { id:'cl03', name:'Emmanuel Hakizimana',      type:'household',     zone:'Gisozi East',     zoneCode:'GIS-E', sector:'Gisozi',     feeRwf:3000,  joinDate:'2024-01-20', joinLabel:'Jan 20, 2024', payment:'paid',    status:'active'   },
  { id:'cl04', name:'Solange Mukagatare',       type:'household',     zone:'Kacyiru South',   zoneCode:'KAC-S', sector:'Kacyiru',    feeRwf:3000,  joinDate:'2023-08-14', joinLabel:'Aug 14, 2023', payment:'paid',    status:'active'   },
  { id:'cl05', name:'Patrick Ndayishimiye',     type:'household',     zone:'Kibagabaga',      zoneCode:'KIB-A', sector:'Kibagabaga', feeRwf:3000,  joinDate:'2024-05-02', joinLabel:'May 2, 2024',  payment:'pending', status:'active'   },
  { id:'cl06', name:'Espérance Uwineza',        type:'household',     zone:'Kanombe East',    zoneCode:'KAN-E', sector:'Kanombe',    feeRwf:3000,  joinDate:'2023-12-18', joinLabel:'Dec 18, 2023', payment:'overdue', status:'active'   },
  { id:'cl07', name:'Théoneste Bizimana',       type:'household',     zone:'Kinyinya',        zoneCode:'KIN-A', sector:'Kinyinya',   feeRwf:3000,  joinDate:'2024-02-28', joinLabel:'Feb 28, 2024', payment:'paid',    status:'active'   },
  { id:'cl08', name:'Annette Uwase',            type:'household',     zone:'Rugando',         zoneCode:'RUG-B', sector:'Kinyinya',   feeRwf:3000,  joinDate:'2024-04-15', joinLabel:'Apr 15, 2024', payment:'paid',    status:'active'   },
  { id:'cl09', name:'Cécile Murindangabo',      type:'household',     zone:'Gasabo Heights',  zoneCode:'GAS-H', sector:'Gasabo',     feeRwf:3000,  joinDate:'2023-09-30', joinLabel:'Sep 30, 2023', payment:'overdue', status:'active'   },
  { id:'cl10', name:'Alexis Nsabimana',         type:'household',     zone:'Ndera Village',   zoneCode:'NDE-A', sector:'Ndera',      feeRwf:3000,  joinDate:'2024-03-22', joinLabel:'Mar 22, 2024', payment:'paid',    status:'active'   },
  { id:'cl11', name:'Kacyiru Household #112',   type:'household',     zone:'Kacyiru South',   zoneCode:'KAC-S', sector:'Kacyiru',    feeRwf:3000,  joinDate:'2023-04-01', joinLabel:'Apr 1, 2023',  payment:'overdue', status:'active'   },
  { id:'cl12', name:'Gasabo Household #204',    type:'household',     zone:'Gasabo Heights',  zoneCode:'GAS-H', sector:'Gasabo',     feeRwf:3000,  joinDate:'2023-06-15', joinLabel:'Jun 15, 2023', payment:'overdue', status:'active'   },
  { id:'cl13', name:'Immaculée Kayitesi',       type:'household',     zone:'Niboye',          zoneCode:'NIB-A', sector:'Niboye',     feeRwf:3000,  joinDate:'2024-01-08', joinLabel:'Jan 8, 2024',  payment:'paid',    status:'active'   },
  { id:'cl14', name:'Olivier Habimana',         type:'household',     zone:'Bumbogo',         zoneCode:'BUM-A', sector:'Bumbogo',    feeRwf:3000,  joinDate:'2023-10-20', joinLabel:'Oct 20, 2023', payment:'paid',    status:'active'   },
  { id:'cl15', name:'Vénérande Mukamana',       type:'household',     zone:'Jali Central',    zoneCode:'JAL-B', sector:'Jali',       feeRwf:3000,  joinDate:'2024-04-01', joinLabel:'Apr 1, 2024',  payment:'pending', status:'active'   },
  // ── Small businesses ──────────────────────────────────────
  { id:'cl16', name:'Bright Star Shop',         type:'small_business',zone:'Gisozi East',     zoneCode:'GIS-E', sector:'Gisozi',     feeRwf:4500,  joinDate:'2023-07-01', joinLabel:'Jul 1, 2023',  payment:'overdue', status:'active'   },
  { id:'cl17', name:'Kimironko Boutique',       type:'small_business',zone:'Kimironko North', zoneCode:'KIM-N', sector:'Kimironko',  feeRwf:5000,  joinDate:'2024-02-10', joinLabel:'Feb 10, 2024', payment:'paid',    status:'active'   },
  { id:'cl18', name:'Remera Hair Salon',        type:'small_business',zone:'Remera Central',  zoneCode:'REM-C', sector:'Remera',     feeRwf:5000,  joinDate:'2023-11-25', joinLabel:'Nov 25, 2023', payment:'paid',    status:'active'   },
  { id:'cl19', name:'Kacyiru General Store',    type:'small_business',zone:'Kacyiru South',   zoneCode:'KAC-S', sector:'Kacyiru',    feeRwf:6000,  joinDate:'2024-03-05', joinLabel:'Mar 5, 2024',  payment:'paid',    status:'active'   },
  { id:'cl20', name:'Niboye Pharmacy',          type:'small_business',zone:'Niboye',          zoneCode:'NIB-A', sector:'Niboye',     feeRwf:7500,  joinDate:'2023-09-12', joinLabel:'Sep 12, 2023', payment:'overdue', status:'active'   },
  { id:'cl21', name:'Kagarama Electronics',     type:'small_business',zone:'Kagarama',        zoneCode:'KAG-A', sector:'Kagarama',   feeRwf:5500,  joinDate:'2024-01-30', joinLabel:'Jan 30, 2024', payment:'paid',    status:'active'   },
  { id:'cl22', name:'Nyamirambo Tailor',        type:'small_business',zone:'Nyamirambo West', zoneCode:'NYA-W', sector:'Nyamirambo', feeRwf:4500,  joinDate:'2023-08-08', joinLabel:'Aug 8, 2023',  payment:'paid',    status:'active'   },
  { id:'cl23', name:'Gatenga Bakery',           type:'small_business',zone:'Gatenga South',   zoneCode:'GAT-B', sector:'Gatenga',    feeRwf:6000,  joinDate:'2024-04-20', joinLabel:'Apr 20, 2024', payment:'pending', status:'active'   },
  // ── Commercial ────────────────────────────────────────────
  { id:'cl24', name:'Chez Lando Restaurant',    type:'commercial',    zone:'Kimironko North', zoneCode:'KIM-N', sector:'Kimironko',  feeRwf:12000, joinDate:'2022-06-15', joinLabel:'Jun 15, 2022', payment:'overdue', status:'active'   },
  { id:'cl25', name:'Sunrise Apartments',       type:'commercial',    zone:'Remera Central',  zoneCode:'REM-C', sector:'Remera',     feeRwf:8500,  joinDate:'2022-11-01', joinLabel:'Nov 1, 2022',  payment:'overdue', status:'active'   },
  { id:'cl26', name:'Kigali Office Park',       type:'commercial',    zone:'Kacyiru South',   zoneCode:'KAC-S', sector:'Kacyiru',    feeRwf:15000, joinDate:'2023-02-14', joinLabel:'Feb 14, 2023', payment:'paid',    status:'active'   },
  { id:'cl27', name:'Kibagabaga Medical Ctr',   type:'commercial',    zone:'Kibagabaga',      zoneCode:'KIB-A', sector:'Kibagabaga', feeRwf:12000, joinDate:'2023-05-20', joinLabel:'May 20, 2023', payment:'paid',    status:'active'   },
  { id:'cl28', name:'Gasabo Shopping Center',   type:'commercial',    zone:'Gasabo Heights',  zoneCode:'GAS-H', sector:'Gasabo',     feeRwf:14000, joinDate:'2022-09-01', joinLabel:'Sep 1, 2022',  payment:'paid',    status:'inactive' },
  // ── Hotels ────────────────────────────────────────────────
  { id:'cl29', name:'Guest House Kigali',       type:'hotel',         zone:'Nyamirambo West', zoneCode:'NYA-W', sector:'Nyamirambo', feeRwf:15000, joinDate:'2022-08-01', joinLabel:'Aug 1, 2022',  payment:'overdue', status:'active'   },
  { id:'cl30', name:'Kanombe Inn',              type:'hotel',         zone:'Kanombe East',    zoneCode:'KAN-E', sector:'Kanombe',    feeRwf:18000, joinDate:'2023-04-10', joinLabel:'Apr 10, 2023', payment:'paid',    status:'active'   },
];

export const TYPE_LABEL: Record<ClientType, string> = {
  household:      'Household',
  small_business: 'Business',
  commercial:     'Commercial',
  hotel:          'Hotel',
};

export const TYPE_BADGE: Record<ClientType, 'neutral' | 'info' | 'accent' | 'lime'> = {
  household:      'neutral',
  small_business: 'info',
  commercial:     'accent',
  hotel:          'lime',
};

export const PAYMENT_LABEL: Record<PaymentStatus, string> = {
  paid:    'Paid',
  overdue: 'Overdue',
  pending: 'Pending',
};

export const PAYMENT_BADGE: Record<PaymentStatus, 'success' | 'danger' | 'warning'> = {
  paid:    'success',
  overdue: 'danger',
  pending: 'warning',
};

export const STATUS_BADGE: Record<ClientStatus, 'success' | 'neutral' | 'danger'> = {
  active:    'success',
  inactive:  'neutral',
  suspended: 'danger',
};

export const PAYMENT_SORT: Record<PaymentStatus, number> = { overdue: 0, pending: 1, paid: 2 };

export const CLIENT_TYPES: ClientType[] = ['household', 'small_business', 'commercial', 'hotel'];

export const ZONE_OPTIONS = [
  'Kimironko North', 'Remera Central', 'Gisozi East', 'Kacyiru South', 'Kibagabaga',
  'Kanombe East', 'Muhima North', 'Kinyinya', 'Rugando', 'Niboye', 'Gasabo Heights',
  'Ndera Village', 'Bumbogo', 'Jali Central', 'Kagarama', 'Nyamirambo West',
  'Gatenga South', 'Masaka', 'Kimicanga',
];

export const EMPTY_FORM: ClientFormState = {
  name: '', type: 'household', zone: 'Kimironko North',
  sector: '', phone: '', feeRwf: '3000', status: 'active', notes: '',
};

export const DUMMY_FORM: ClientFormState = {
  name: 'Sunrise Apartments B', type: 'commercial', zone: 'Remera Central',
  sector: 'Remera', phone: '+250 788 123 456', feeRwf: '8500', status: 'active',
  notes: 'Block B of the Sunrise complex — 12 units on floors 2–4.',
};
