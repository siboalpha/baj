import { TRUST_METRICS } from '@/lib/constants/home';
import styles from './TrustBar.module.css';

export default function TrustBar() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {TRUST_METRICS.map((m) => (
            <div key={m.label} className={styles.item}>
              <span className={styles.value}>{m.value}</span>
              <span className={styles.label}>{m.label}</span>
              <span className={styles.sub}>{m.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
