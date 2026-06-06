import { residentialPlans, residentialIncludes, faq } from '@/lib/constants/pricing';
import styles from './page.module.css';

export default function PricingPage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>Pricing</h1>
          <p className={styles.lead}>
            Transparent pricing for every need. No hidden fees.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Residential plans</h2>
          <div className={styles.plansGrid}>
            {residentialPlans.map((plan) => (
              <div key={plan.name} className={styles.planCard}>
                <h3 className={styles.planName}>{plan.name}</h3>
                <p className={styles.planFreq}>{plan.frequency}</p>
                <p className={styles.planBest}>{plan.bestFor}</p>
                <span className={styles.planPrice}>{plan.price}</span>
              </div>
            ))}
          </div>
          <div className={styles.includes}>
            <h3 className={styles.includesTitle}>All residential plans include</h3>
            <ul className={styles.includesList}>
              {residentialIncludes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.altSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Commercial pricing</h2>
          <p className={styles.bodyText}>
            Commercial waste management is tailored to your business size and waste volume. We offer pay-per-collection for low-volume businesses, monthly subscriptions for regular needs, and enterprise contracts for large-scale operations.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Government & institutional contracts</h2>
          <p className={styles.bodyText}>
            We participate in public procurement processes with competitive RFP responses, long-term contract stability, comprehensive service level agreements, and full regulatory compliance documentation.
          </p>
        </div>
      </section>

      <section className={styles.altSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Pricing FAQ</h2>
          <div className={styles.faqList}>
            {faq.map((item) => (
              <div key={item.q} className={styles.faqItem}>
                <h3 className={styles.faqQ}>{item.q}</h3>
                <p className={styles.faqA}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
