/* ── Services ─────────────────────────────────────────────── */

export interface Service {
  title: string;
  items: string[];
  materials?: string[];
  ideal?: string;
}

export interface ComparisonRow {
  feature: string;
  household: string;
  commercial: string;
  hospitality: string;
  government: string;
}

/* ── Pricing ──────────────────────────────────────────────── */

export interface ResidentialPlan {
  name: string;
  frequency: string;
  bestFor: string;
  price: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

/* ── For Business ─────────────────────────────────────────── */

export interface Industry {
  title: string;
  items: string[];
}

/* ── Sustainability ───────────────────────────────────────── */

export interface JourneyStep {
  title: string;
  desc: string;
}

export interface ImpactMetric {
  label: string;
  value: string;
}

export interface Program {
  title: string;
  desc: string;
}

/* ── About Us ─────────────────────────────────────────────── */

export interface Value {
  title: string;
  desc: string;
}

/* ── Resources ────────────────────────────────────────────── */

export interface BinGuide {
  type: string;
  accepted: string;
  notAccepted: string;
}

export interface NewsItem {
  title: string;
  desc: string;
  date: string;
}

/* ── Contact ──────────────────────────────────────────────── */

export interface Department {
  dept: string;
  contactFor: string;
  phone: string;
}

/* ── Footer ───────────────────────────────────────────────── */

export interface FooterLink {
  label: string;
  href: string;
}
