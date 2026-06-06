import styles from './ServicePill.module.css';

export type ServiceType =
  | 'collection'
  | 'recycling'
  | 'disposal'
  | 'transport'
  | 'consulting';

const labels: Record<ServiceType, string> = {
  collection: 'collection',
  recycling:  'recycling',
  disposal:   'disposal',
  transport:  'transport',
  consulting: 'consulting',
};

interface ServicePillProps {
  type: ServiceType;
}

export default function ServicePill({ type }: ServicePillProps) {
  return (
    <span className={styles.pill} data-type={type}>
      <span className={styles.dot} aria-hidden="true" />
      {labels[type]}
    </span>
  );
}
