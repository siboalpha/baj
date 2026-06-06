import type { Service, ComparisonRow } from '@/lib/types/content';

export const services: Service[] = [
  {
    title: 'Household waste management',
    items: [
      'Regular scheduled pickups (weekly, bi-weekly)',
      'Bin provision and maintenance',
      'Flexible plan upgrades',
      'Special collection for bulk items',
      'Affordable residential pricing tiers',
    ],
    ideal: 'Homeowners, residential estates, apartment complexes',
  },
  {
    title: 'Commercial waste collection',
    items: [
      'Customized scheduling for offices and retail',
      'Flexible pickup frequencies',
      'Compliance documentation',
      'Dedicated account management',
      'Cost-effective business plans',
    ],
    ideal: 'SMEs, corporate offices, retail stores, shopping centers',
  },
  {
    title: 'Hospitality & hotel services',
    items: [
      'Daily waste collection for high-volume needs',
      'Back-of-house waste stream management',
      'Food waste and organic material handling',
      'Odor control and hygiene standards',
      'Comprehensive recycling programs',
      'Staff training on waste segregation',
    ],
    ideal: 'Hotels, restaurants, guest houses, event venues',
  },
  {
    title: 'Government & institutional services',
    items: [
      'Contract-based service agreements',
      'Full compliance with environmental regulations',
      'Detailed reporting and waste audits',
      'Transparent procurement processes',
      'Scalable solutions for large institutions',
    ],
    ideal: 'Government offices, schools, hospitals, NGOs',
  },
  {
    title: 'Recycling services',
    items: [
      'Collection of plastics, paper, glass, and metals',
      'Sorting and processing at dedicated facilities',
      'Resource recovery and circular economy support',
      'Sustainability reporting for corporate clients',
      'Education on proper waste segregation',
    ],
    materials: ['Plastic bottles and containers', 'Paper and cardboard', 'Glass bottles and jars', 'Metal cans and scrap', 'Select electronic waste'],
    ideal: 'All client types',
  },
  {
    title: 'Waste dumping & disposal management',
    items: [
      'Licensed waste disposal site management',
      'Compliance with Rwanda environmental regulations',
      'Safe handling of non-recyclable waste',
      'Regular site monitoring and maintenance',
      'Documentation for regulatory reporting',
    ],
  },
  {
    title: 'Specialized environmental solutions',
    items: [
      'Custom consultancy for unique waste challenges',
      'Industrial waste assessment',
      'Construction debris management',
      'Environmental compliance advisory',
      'Waste reduction strategy development',
    ],
  },
];

export const comparison: ComparisonRow[] = [
  { feature: 'Pickup frequency', household: 'Weekly/Bi-weekly', commercial: 'Flexible', hospitality: 'Daily', government: 'Contract-based' },
  { feature: 'Bin provided', household: 'Yes', commercial: 'Yes', hospitality: 'Yes', government: 'Yes' },
  { feature: 'Recycling included', household: 'Yes', commercial: 'Yes', hospitality: 'Yes', government: 'Yes' },
  { feature: 'Dedicated account manager', household: 'No', commercial: 'Yes', hospitality: 'Yes', government: 'Yes' },
  { feature: 'Compliance reporting', household: 'No', commercial: 'Yes', hospitality: 'Yes', government: 'Yes' },
  { feature: 'Waste audit', household: 'On request', commercial: 'Quarterly', hospitality: 'Monthly', government: 'Monthly' },
  { feature: 'Custom scheduling', household: 'Limited', commercial: 'Yes', hospitality: 'Yes', government: 'Yes' },
];
