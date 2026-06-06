import type { JourneyStep, ImpactMetric, Program } from '@/lib/types/content';

export const journeySteps: JourneyStep[] = [
  { title: 'Collection', desc: 'Our fleet collects segregated waste from your location' },
  { title: 'Sorting', desc: 'Materials are sorted at our facilities into recyclable categories' },
  { title: 'Processing', desc: 'Partner facilities transform recyclables into raw materials' },
  { title: 'Reintegration', desc: 'Recovered materials re-enter the manufacturing cycle' },
  { title: 'Reporting', desc: 'You receive documentation of your environmental contribution' },
];

export const impactMetrics: ImpactMetric[] = [
  { label: 'Total waste collected annually', value: 'Growing volume across Kigali' },
  { label: 'Recycling diversion rate', value: 'Increasing percentage year-over-year' },
  { label: 'CO₂ emissions prevented', value: 'Through recycling vs. landfill disposal' },
  { label: 'Landfill space saved', value: 'Cubic meters preserved through diversion' },
  { label: 'Community cleanups conducted', value: 'Regular participation in environmental initiatives' },
];

export const certifications: string[] = [
  'Rwanda Environmental Management Authority (REMA) compliance',
  'Licensed waste disposal operations',
  'Municipal partnership agreements',
  'International best practice adoption',
];

export const programs: Program[] = [
  { title: 'Annual sensitization campaigns', desc: 'Educating communities on waste segregation' },
  { title: 'School programs', desc: 'Teaching children environmental responsibility' },
  { title: 'Neighborhood cleanups', desc: 'Organized community improvement events' },
  { title: 'Staff training', desc: 'Continuous professional development in safety and environmental standards' },
];
