import { industries, compliance } from '@/lib/constants/business';
import styles from './page.module.css';

export default function ForBusinessPage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>Waste solutions for Rwandan businesses</h1>
          <p className={styles.lead}>
            Tailored waste management programs designed for your industry, compliance needs, and operational schedule.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Industry-specific solutions</h2>
          <div className={styles.grid}>
            {industries.map((ind) => (
              <div key={ind.title} className={styles.card}>
                <h3 className={styles.cardTitle}>{ind.title}</h3>
                <ul className={styles.cardList}>
                  {ind.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.altSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Compliance & reporting</h2>
          <p className={styles.bodyText}>
            We provide the documentation your business needs to stay compliant and demonstrate environmental responsibility.
          </p>
          <ul className={styles.complianceList}>
            {compliance.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Case study</h2>
          <div className={styles.caseStudy}>
            <h3 className={styles.caseTitle}>How a Kigali hotel reduced waste costs by 30%</h3>
            <div className={styles.caseMeta}>
              <div>
                <span className={styles.caseLabel}>Challenge</span>
                <p>A 120-room hotel was struggling with inconsistent waste collection and high disposal costs.</p>
              </div>
              <div>
                <span className={styles.caseLabel}>Solution</span>
                <p>BAJ Ltd implemented a comprehensive waste stream analysis, introduced recycling separation, and optimized collection schedules.</p>
              </div>
              <div>
                <span className={styles.caseLabel}>Results</span>
                <ul>
                  <li>30% reduction in total waste management costs</li>
                  <li>60% of waste diverted to recycling</li>
                  <li>Zero guest complaints about waste odors or visibility</li>
                  <li>Monthly sustainability reports for management</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
