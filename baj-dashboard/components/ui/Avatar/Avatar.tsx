import styles from './Avatar.module.css';

export type AvatarVariant = 'accent' | 'lime' | 'neutral' | 'danger';
export type AvatarSize    = 24 | 32 | 40 | 48;

interface AvatarProps {
  initials: string;
  variant?: AvatarVariant;
  size?: AvatarSize;
  label?: string;
}

export default function Avatar({
  initials,
  variant = 'accent',
  size = 40,
  label,
}: AvatarProps) {
  return (
    <span
      className={styles.avatar}
      data-variant={variant}
      data-size={size}
      aria-label={label ?? initials}
      role="img"
    >
      {initials.slice(0, 2).toUpperCase()}
    </span>
  );
}
