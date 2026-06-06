import type { NavItem } from '@/lib/types/nav';

export const marketingNav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About us', href: '/about-us' },
  { label: 'Resources', href: '/resources' },
  { label: 'Contact us', href: '/contact-us' },
];

export const moreNav: NavItem[] = [
  { label: 'Pricing', href: '/pricing' },
  { label: 'For business', href: '/for-business' },
  { label: 'Sustainability', href: '/sustainability' },
  { label: 'Coverage areas', href: '/coverage-areas' },
];

export const authPaths: string[] = ['/auth/login', '/auth/verify-otp'];
