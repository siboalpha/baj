import type { ButtonHTMLAttributes, ReactNode } from 'react';
import Spinner from '@/components/ui/Spinner/Spinner';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'lime';
export type ButtonSize    = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  iconRight?: ReactNode;
  children: ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconRight,
  disabled,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={styles.btn}
      data-variant={variant}
      data-size={size}
      disabled={disabled || loading}
      aria-busy={loading}
      {...rest}
    >
      {loading ? (
        <Spinner size="sm" label="Loading" />
      ) : (
        icon && <span className={styles.icon} aria-hidden="true">{icon}</span>
      )}
      <span className={loading ? styles.labelLoading : undefined}>{children}</span>
      {!loading && iconRight && (
        <span className={styles.icon} aria-hidden="true">{iconRight}</span>
      )}
    </button>
  );
}
