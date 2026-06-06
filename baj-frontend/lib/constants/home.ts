import type { Step, ServiceCard, StatCard, Testimonial, TrustMetric } from '@/lib/types/home';

export const STEPS: Step[] = [
  {
    num: '01',
    title: 'Choose your plan',
    description: 'Select from residential, commercial, or custom enterprise solutions tailored to your waste volume.',
  },
  {
    num: '02',
    title: 'Schedule collection',
    description: 'Pick your preferred frequency — daily, weekly, bi-weekly, or on-demand.',
  },
  {
    num: '03',
    title: 'We collect',
    description: 'Our trained team arrives on time with modern equipment and safety standards.',
  },
  {
    num: '04',
    title: 'Track & report',
    description: 'Access your waste reports, pickup history, and environmental impact dashboard.',
  },
];

export const SERVICE_CARDS: ServiceCard[] = [
  {
    iconName: 'Home',
    title: 'Household waste',
    description: 'Regular scheduled pickups, bin provision, flexible frequencies for homeowners and residential estates.',
    audience: 'Homeowners, residential estates',
  },
  {
    iconName: 'Building2',
    title: 'Commercial waste',
    description: 'Office buildings, retail spaces, flexible scheduling for SMEs and corporate offices.',
    audience: 'SMEs, corporate offices',
  },
  {
    iconName: 'Hotel',
    title: 'Hospitality waste',
    description: 'Daily collection, back-of-house solutions, and recycling programs for hotels and restaurants.',
    audience: 'Hotels, restaurants, guest houses',
  },
  {
    iconName: 'Landmark',
    title: 'Government & institutional',
    description: 'Contract-based services, compliance documentation, and reporting for institutions.',
    audience: 'Government offices, schools, hospitals',
  },
  {
    iconName: 'Recycle',
    title: 'Recycling services',
    description: 'Material sorting, resource recovery, and sustainability reporting for all client types.',
    audience: 'All client types',
  },
  {
    iconName: 'Wrench',
    title: 'Specialized disposal',
    description: 'Consultancy for specialized waste handling needs including industrial and construction.',
    audience: 'Industrial, construction',
  },
];

export const SUSTAINABILITY_STATS: StatCard[] = [
  {
    iconName: 'Recycle',
    label: 'Waste diverted from landfill',
    value: 'Tons recovered',
    description: 'Recyclable materials recovered annually through our sorting and processing facilities.',
  },
  {
    iconName: 'BarChart3',
    label: 'Recycling rate',
    value: 'Growing yearly',
    description: 'Percentage of collected waste sorted and recycled increases year over year.',
  },
  {
    iconName: 'Leaf',
    label: 'CO₂ offset',
    value: 'Environmental impact',
    description: 'Measurable environmental impact through responsible disposal practices.',
  },
  {
    iconName: 'Users',
    label: 'Community cleanups',
    value: 'Regular events',
    description: 'Ongoing participation in local environmental initiatives across Gasabo.',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'BAJ Ltd has transformed how we handle waste at our hotel. Their daily collection is reliable, and their recycling program has significantly reduced our environmental footprint.',
    author: 'Hotel Manager',
    location: 'Kigali',
  },
  {
    quote: 'Since switching to BAJ Ltd, we have had zero missed pickups. Their professional team and modern equipment give us peace of mind.',
    author: 'Commercial Property Manager',
    location: 'Gasabo',
  },
  {
    quote: 'The waste audit reports BAJ provides help us stay compliant and demonstrate our commitment to sustainability to stakeholders.',
    author: 'Government Office Administrator',
    location: 'Kigali',
  },
];

export const TRUST_METRICS: TrustMetric[] = [
  { label: 'Years in operation', value: '13+', sub: 'Since 2013' },
  { label: 'Fleet', value: 'Modern', sub: 'Vehicles & equipment' },
  { label: 'Coverage', value: 'Kigali', sub: 'Gasabo & expanding' },
  { label: 'Clients', value: 'All sectors', sub: 'Homes, hotels, offices' },
];
