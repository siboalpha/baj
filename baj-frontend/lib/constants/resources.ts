import type { BinGuide, NewsItem } from '@/lib/types/content';

export const bins: BinGuide[] = [
  { type: 'Recycling', accepted: 'Plastic bottles, paper, cardboard, glass, metal cans', notAccepted: 'Food-contaminated items, plastic bags, ceramics' },
  { type: 'Organic', accepted: 'Food scraps, garden waste, biodegradable materials', notAccepted: 'Plastics, metals, glass, chemicals' },
  { type: 'General waste', accepted: 'Non-recyclable packaging, hygiene products, mixed materials', notAccepted: 'Hazardous waste, electronics, medical waste' },
  { type: 'Special', accepted: 'Batteries, electronics, chemicals, medical waste', notAccepted: 'Regular disposal — requires special handling' },
];

export const tips: string[] = [
  'How to reduce household waste by 50%',
  'Office recycling program setup guide',
  'Composting basics for Rwandan homes',
  'Understanding the circular economy',
];

export const news: NewsItem[] = [
  { title: 'Staff training completed', desc: 'Our staff recently completed a comprehensive training on safety and environmental standards to improve service quality and ensure compliance with international best practices.', date: 'May 2026' },
  { title: 'Annual sensitization campaign starting soon', desc: 'Our community education program kicks off next month, focusing on proper waste segregation and environmental responsibility in Gasabo neighborhoods.', date: 'May 2026' },
  { title: 'Web application launching soon', desc: 'The BAJ Ltd Waste Collection Fee Management System will soon be available, allowing customers to manage accounts, schedule pickups, and track their environmental impact online.', date: 'June 2026' },
  { title: 'Recycling program expansion', desc: 'We are expanding our recycling collection routes to cover additional neighborhoods in Gasabo, making it easier for residents to participate in sustainable waste practices.', date: 'April 2026' },
];
