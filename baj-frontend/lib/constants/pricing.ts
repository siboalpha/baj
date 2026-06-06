import type { ResidentialPlan, FaqItem } from '@/lib/types/content';

export const residentialPlans: ResidentialPlan[] = [
  { name: 'Basic', frequency: 'Bi-weekly pickup', bestFor: 'Small households (1–3 people)', price: 'Contact for quote' },
  { name: 'Standard', frequency: 'Weekly pickup', bestFor: 'Average households (3–5 people)', price: 'Contact for quote' },
  { name: 'Premium', frequency: 'Twice weekly + recycling', bestFor: 'Large households (5+ people)', price: 'Contact for quote' },
];

export const residentialIncludes: string[] = [
  'Standard waste bin provision',
  'Regular scheduled pickups',
  'Customer support access',
  'Annual waste summary report',
];

export const faq: FaqItem[] = [
  { q: 'Are there any hidden fees?', a: 'No. Our quotes include all collection, transportation, and disposal costs. Additional services are quoted separately with full transparency.' },
  { q: 'What is your contract term?', a: 'Residential: Month-to-month or annual (discounts apply). Commercial: Flexible terms from 3 months to multi-year agreements.' },
  { q: 'Can I change my plan?', a: 'Yes. Upgrade, downgrade, or modify your service frequency with 7 days notice.' },
  { q: 'Is there a cancellation fee?', a: 'No cancellation fees for residential plans. Commercial contracts may have terms based on agreement duration.' },
];
