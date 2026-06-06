import {
  LayoutDashboard,
  Truck,
  MapPin,
  Users,
  BarChart2,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const MAIN_NAV: NavItem[] = [
  { href: '/overview',    label: 'Overview',    icon: LayoutDashboard },
  { href: '/collections', label: 'Collections', icon: Truck },
  { href: '/zones',       label: 'Zones',       icon: MapPin },
  { href: '/clients',     label: 'Clients',     icon: Users },
  { href: '/financials',  label: 'Financials',  icon: BarChart2 },
];

export const PAGE_TITLES: Record<string, string> = {
  '/overview':    'Overview',
  '/collections': 'Collections',
  '/zones':       'Zones',
  '/clients':     'Clients',
  '/financials':  'Financials',
  '/settings':    'Settings',
};
