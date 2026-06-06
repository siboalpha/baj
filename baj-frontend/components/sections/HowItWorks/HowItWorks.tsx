import { STEPS } from '@/lib/constants/home';
import styles from './HowItWorks.module.css';

export default function HowItWorks() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>How it works</h2>
          <p className={styles.lead}>
            Getting started with BAJ Ltd is simple. Four steps to cleaner, greener waste management.
          </p>
        </div>
        <div className={styles.grid}>
          {STEPS.map((s) => (
            <div key={s.num} className={styles.step}>
              <span className={styles.stepNum}>{s.num}</span>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepDesc}>{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
