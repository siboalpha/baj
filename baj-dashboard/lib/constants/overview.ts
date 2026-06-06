import { AlertTriangle, Clock, Info } from 'lucide-react';
import type { AlertItem, OverdueItem, RecentCollection } from '@/lib/types/overview';
import type { CollectionStatus } from '@/lib/types/collection';
import type { ClientType } from '@/lib/types/client';

export const STATS = {
  totalClients:          347,
  totalZones:            19,
  collectionsThisWeek:   214,
  collectionsTotalWeek:  347,
  overdueCount:          41,
  overdueAmountRwf:      143_500,
  zonesActiveToday:      7,
  zonesScheduledToday:   7,
};

export const ALERTS: AlertItem[] = [
  {
    id: 'a1',
    level: 'danger',
    icon: AlertTriangle,
    message: "Nyamirambo zone missed yesterday's collection. A make-up run has not been scheduled.",
    linkLabel: 'Schedule make-up',
    href: '/collections',
  },
  {
    id: 'a2',
    level: 'warning',
    icon: Clock,
    message: '41 clients from May still have unpaid fees. June billing cycle opens in 3 days.',
    linkLabel: 'View overdue',
    href: '/financials',
  },
  {
    id: 'a3',
    level: 'info',
    icon: Info,
    message: 'Kanombe East has no driver assigned for this week\'s schedule.',
    linkLabel: 'Edit zone',
    href: '/zones',
  },
];

export const RECENT_COLLECTIONS: RecentCollection[] = [
  { zone: 'Kimironko North',  code: 'KIM-N', driver: 'Jean P.',     time: '2 hours ago',      status: 'completed' },
  { zone: 'Remera Central',   code: 'REM-C', driver: 'Diane U.',    time: '3 hours ago',      status: 'completed' },
  { zone: 'Gisozi East',      code: 'GIS-E', driver: 'Patrick N.', time: '5 hours ago',      status: 'partial'   },
  { zone: 'Kacyiru South',    code: 'KAC-S', driver: 'Aimable R.', time: 'Yesterday, 15:20', status: 'completed' },
  { zone: 'Nyamirambo',       code: 'NYA-W', driver: 'Claudine M.',time: 'Yesterday, 13:45', status: 'missed'    },
  { zone: 'Kibagabaga',       code: 'KIB-A', driver: 'Théodore K.',time: 'Yesterday, 11:00', status: 'completed' },
  { zone: 'Gasabo Heights',   code: 'GAS-H', driver: 'Jean P.',     time: 'Yesterday, 09:15', status: 'completed' },
  { zone: 'Kanombe East',     code: 'KAN-E', driver: 'Aimable R.', time: '2 days ago',       status: 'completed' },
];

export const COLLECTION_BADGE: Record<CollectionStatus, 'success' | 'warning' | 'danger'> = {
  completed: 'success',
  partial:   'warning',
  missed:    'danger',
};

export const OVERDUE: OverdueItem[] = [
  { name: 'Chez Lando Restaurant',  type: 'commercial',    zone: 'Kimironko', amount: 12_000, daysOverdue: 47 },
  { name: 'Sunrise Apartments',     type: 'commercial',    zone: 'Remera',    amount: 8_500,  daysOverdue: 38 },
  { name: 'Kacyiru Household #112', type: 'household',     zone: 'Kacyiru',   amount: 3_000,  daysOverdue: 31 },
  { name: 'Guest House Kigali',     type: 'hotel',         zone: 'Nyamirambo',amount: 15_000, daysOverdue: 29 },
  { name: 'Bright Star Shop',       type: 'small_business',zone: 'Gisozi',    amount: 4_500,  daysOverdue: 24 },
  { name: 'Gasabo Household #204',  type: 'household',     zone: 'Gasabo',    amount: 3_000,  daysOverdue: 21 },
];

export const CLIENT_TYPE_LABEL: Record<ClientType, string> = {
  household:      'Household',
  small_business: 'Business',
  commercial:     'Commercial',
  hotel:          'Hotel',
};

export function overdueBadge(days: number): 'danger' | 'warning' | 'neutral' {
  if (days >= 30) return 'danger';
  if (days >= 15) return 'warning';
  return 'neutral';
}
