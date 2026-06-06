import { journeySteps, impactMetrics, certifications, programs } from '@/lib/constants/sustainability';
import styles from './page.module.css';

export default function SustainabilityPage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>Our commitment to a cleaner Rwanda</h1>
          <p className={styles.lead}>
            Waste management is not just about removal — it is about creating a circular economy where materials are recovered, reused, and reintegrated into productive cycles.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>The recycling journey</h2>
          <div className={styles.journey}>
            {journeySteps.map((step, i) => (
              <div key={step.title} className={styles.journeyStep}>
                <span className={styles.journeyNum}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className={styles.journeyTitle}>{step.title}</h3>
                <p className={styles.journeyDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.altSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Impact dashboard</h2>
          <div className={styles.metricsGrid}>
            {impactMetrics.map((m) => (
              <div key={m.label} className={styles.metricCard}>
                <span className={styles.metricLabel}>{m.label}</span>
                <span className={styles.metricValue}>{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Certifications & partnerships</h2>
          <ul className={styles.certList}>
            {certifications.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.altSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Community programs</h2>
          <div className={styles.programsGrid}>
            {programs.map((p) => (
              <div key={p.title} className={styles.programCard}>
                <h3 className={styles.programTitle}>{p.title}</h3>
                <p className={styles.programDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
