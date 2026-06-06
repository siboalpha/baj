import type { Collection, CollectionStatus } from '@/lib/types/collection';

export const COLLECTIONS_DATA: Collection[] = [
  { id:'c01', date:'2026-06-01', dateLabel:'Jun 1, 2026',  zone:'Kimironko North', zoneCode:'KIM-N', driver:'Jean P.',      clientsServed:24, clientsTotal:24, status:'completed', notes:'On time' },
  { id:'c02', date:'2026-06-01', dateLabel:'Jun 1, 2026',  zone:'Remera Central',  zoneCode:'REM-C', driver:'Diane U.',     clientsServed:18, clientsTotal:18, status:'completed', notes:'On time' },
  { id:'c03', date:'2026-06-01', dateLabel:'Jun 1, 2026',  zone:'Gisozi East',     zoneCode:'GIS-E', driver:'Patrick N.',   clientsServed:14, clientsTotal:21, status:'partial',   notes:'Vehicle breakdown at midpoint' },
  { id:'c04', date:'2026-05-29', dateLabel:'May 29, 2026', zone:'Kacyiru South',   zoneCode:'KAC-S', driver:'Aimable R.',   clientsServed:31, clientsTotal:31, status:'completed', notes:'On time' },
  { id:'c05', date:'2026-05-29', dateLabel:'May 29, 2026', zone:'Nyamirambo West', zoneCode:'NYA-W', driver:'Claudine M.',  clientsServed:0,  clientsTotal:27, status:'missed',    notes:'Driver absent — no replacement' },
  { id:'c06', date:'2026-05-29', dateLabel:'May 29, 2026', zone:'Kibagabaga',      zoneCode:'KIB-A', driver:'Théodore K.',  clientsServed:19, clientsTotal:19, status:'completed', notes:'On time' },
  { id:'c07', date:'2026-05-28', dateLabel:'May 28, 2026', zone:'Gasabo Heights',  zoneCode:'GAS-H', driver:'Jean P.',      clientsServed:22, clientsTotal:22, status:'completed', notes:'On time' },
  { id:'c08', date:'2026-05-28', dateLabel:'May 28, 2026', zone:'Kanombe East',    zoneCode:'KAN-E', driver:'Aimable R.',   clientsServed:16, clientsTotal:16, status:'completed', notes:'On time' },
  { id:'c09', date:'2026-05-27', dateLabel:'May 27, 2026', zone:'Kinyinya',        zoneCode:'KIN-A', driver:'Diane U.',     clientsServed:11, clientsTotal:15, status:'partial',   notes:'Access blocked — road works on sector B' },
  { id:'c10', date:'2026-05-27', dateLabel:'May 27, 2026', zone:'Rugando',         zoneCode:'RUG-B', driver:'Patrick N.',   clientsServed:20, clientsTotal:20, status:'completed', notes:'On time' },
  { id:'c11', date:'2026-05-26', dateLabel:'May 26, 2026', zone:'Kimironko North', zoneCode:'KIM-N', driver:'Jean P.',      clientsServed:24, clientsTotal:24, status:'completed', notes:'On time' },
  { id:'c12', date:'2026-05-26', dateLabel:'May 26, 2026', zone:'Kacyiru South',   zoneCode:'KAC-S', driver:'Claudine M.',  clientsServed:31, clientsTotal:31, status:'completed', notes:'On time' },
  { id:'c13', date:'2026-05-22', dateLabel:'May 22, 2026', zone:'Remera Central',  zoneCode:'REM-C', driver:'Diane U.',     clientsServed:18, clientsTotal:18, status:'completed', notes:'On time' },
  { id:'c14', date:'2026-05-22', dateLabel:'May 22, 2026', zone:'Gisozi East',     zoneCode:'GIS-E', driver:'Patrick N.',   clientsServed:21, clientsTotal:21, status:'completed', notes:'On time' },
  { id:'c15', date:'2026-05-21', dateLabel:'May 21, 2026', zone:'Nyamirambo West', zoneCode:'NYA-W', driver:'Théodore K.',  clientsServed:25, clientsTotal:27, status:'partial',   notes:'2 properties locked — revisit scheduled' },
  { id:'c16', date:'2026-05-21', dateLabel:'May 21, 2026', zone:'Kibagabaga',      zoneCode:'KIB-A', driver:'Aimable R.',   clientsServed:19, clientsTotal:19, status:'completed', notes:'On time' },
  { id:'c17', date:'2026-05-20', dateLabel:'May 20, 2026', zone:'Kanombe East',    zoneCode:'KAN-E', driver:'Jean P.',      clientsServed:0,  clientsTotal:16, status:'missed',    notes:'Rain — vehicle stuck on unpaved route' },
  { id:'c18', date:'2026-05-20', dateLabel:'May 20, 2026', zone:'Gasabo Heights',  zoneCode:'GAS-H', driver:'Claudine M.',  clientsServed:22, clientsTotal:22, status:'completed', notes:'On time' },
  { id:'c19', date:'2026-05-19', dateLabel:'May 19, 2026', zone:'Kinyinya',        zoneCode:'KIN-A', driver:'Diane U.',     clientsServed:15, clientsTotal:15, status:'completed', notes:'On time' },
  { id:'c20', date:'2026-05-19', dateLabel:'May 19, 2026', zone:'Rugando',         zoneCode:'RUG-B', driver:'Patrick N.',   clientsServed:20, clientsTotal:20, status:'completed', notes:'On time' },
  { id:'c21', date:'2026-05-15', dateLabel:'May 15, 2026', zone:'Kimironko North', zoneCode:'KIM-N', driver:'Théodore K.',  clientsServed:23, clientsTotal:24, status:'partial',   notes:'1 household refused access' },
  { id:'c22', date:'2026-05-15', dateLabel:'May 15, 2026', zone:'Kacyiru South',   zoneCode:'KAC-S', driver:'Aimable R.',   clientsServed:31, clientsTotal:31, status:'completed', notes:'On time' },
  { id:'c23', date:'2026-05-14', dateLabel:'May 14, 2026', zone:'Remera Central',  zoneCode:'REM-C', driver:'Jean P.',      clientsServed:18, clientsTotal:18, status:'completed', notes:'On time' },
  { id:'c24', date:'2026-05-13', dateLabel:'May 13, 2026', zone:'Gisozi East',     zoneCode:'GIS-E', driver:'Diane U.',     clientsServed:0,  clientsTotal:21, status:'missed',    notes:'Public holiday — no collection' },
  { id:'c25', date:'2026-05-12', dateLabel:'May 12, 2026', zone:'Nyamirambo West', zoneCode:'NYA-W', driver:'Claudine M.',  clientsServed:27, clientsTotal:27, status:'completed', notes:'On time' },
  { id:'c26', date:'2026-05-12', dateLabel:'May 12, 2026', zone:'Kibagabaga',      zoneCode:'KIB-A', driver:'Patrick N.',   clientsServed:19, clientsTotal:19, status:'completed', notes:'On time' },
  { id:'c27', date:'2026-05-08', dateLabel:'May 8, 2026',  zone:'Kanombe East',    zoneCode:'KAN-E', driver:'Théodore K.',  clientsServed:16, clientsTotal:16, status:'completed', notes:'On time' },
  { id:'c28', date:'2026-05-08', dateLabel:'May 8, 2026',  zone:'Gasabo Heights',  zoneCode:'GAS-H', driver:'Aimable R.',   clientsServed:20, clientsTotal:22, status:'partial',   notes:'Driver arrived late — 2 stops skipped' },
  { id:'c29', date:'2026-05-07', dateLabel:'May 7, 2026',  zone:'Kinyinya',        zoneCode:'KIN-A', driver:'Jean P.',      clientsServed:15, clientsTotal:15, status:'completed', notes:'On time' },
  { id:'c30', date:'2026-05-06', dateLabel:'May 6, 2026',  zone:'Rugando',         zoneCode:'RUG-B', driver:'Diane U.',     clientsServed:20, clientsTotal:20, status:'completed', notes:'On time' },
];

export const STATUS_BADGE: Record<CollectionStatus, 'success' | 'warning' | 'danger'> = {
  completed: 'success',
  partial:   'warning',
  missed:    'danger',
};

export const STATUS_LABEL: Record<CollectionStatus, string> = {
  completed: 'Completed',
  partial:   'Partial',
  missed:    'Missed',
};
