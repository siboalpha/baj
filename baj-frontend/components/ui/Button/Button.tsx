import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import Spinner from '@/components/ui/Spinner/Spinner';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'lime';
export type ButtonSize    = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  /** Icon rendered to the left of the label */
  icon?: ReactNode;
  /** Icon rendered to the right of the label */
  iconRight?: ReactNode;
  children: ReactNode;
}

type ButtonAsButton = BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsAnchor = BaseButtonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export default function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', loading = false, icon, iconRight, children } = props;

  const sharedProps = {
    className: styles.btn,
    'data-variant': variant as string,
    'data-size': size as string,
  };

  const content = (
    <>
      {loading ? (
        <Spinner size="sm" label="Loading" />
      ) : (
        icon && <span className={styles.icon} aria-hidden="true">{icon}</span>
      )}
      <span className={loading ? styles.labelLoading : undefined}>{children}</span>
      {!loading && iconRight && (
        <span className={styles.icon} aria-hidden="true">{iconRight}</span>
      )}
    </>
  );

  if ('href' in props && props.href !== undefined) {
    const { href, variant: _v, size: _s, loading: _l, icon: _i, iconRight: _ir, children: _c, ...anchorRest } = props;
    return (
      <a {...sharedProps} href={href} {...anchorRest}>
        {content}
      </a>
    );
  }

  const { disabled, variant: _v, size: _s, loading: _l, icon: _i, iconRight: _ir, children: _c, ...buttonRest } = props;
  return (
    <button
      {...sharedProps}
      disabled={disabled || loading}
      aria-busy={loading}
      {...buttonRest}
    >
      {content}
    </button>
  );
}
