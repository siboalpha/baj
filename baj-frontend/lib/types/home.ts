import type { ReactNode } from 'react';

/* ── Home page sections ──────────────────────────────────── */
export interface Step {
  num: string;
  title: string;
  description: string;
}

export interface ServiceCard {
  iconName: string;
  title: string;
  description: string;
  audience: string;
}

export interface StatCard {
  iconName: string;
  label: string;
  value: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  location: string;
}

export interface TrustMetric {
  label: string;
  value: string;
  sub: string;
}
