import type { ReactNode } from 'react';
import styles from './Badge.module.css';

export type BadgeVariant =
  | 'neutral'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'accent'
  | 'lime';

interface BadgeProps {
  variant?: BadgeVariant;
  icon?: ReactNode;
  children: ReactNode;
}

export default function Badge({ variant = 'neutral', icon, children }: BadgeProps) {
  return (
    <span className={styles.badge} data-variant={variant}>
      {icon && <span className={styles.icon} aria-hidden="true">{icon}</span>}
      {children}
    </span>
  );
}
