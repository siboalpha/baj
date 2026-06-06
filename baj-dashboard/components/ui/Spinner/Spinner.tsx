import styles from './Spinner.module.css';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export default function Spinner({ size = 'sm', label = 'Loading' }: SpinnerProps) {
  return (
    <span
      className={styles.spinner}
      data-size={size}
      role="status"
      aria-label={label}
    />
  );
}
