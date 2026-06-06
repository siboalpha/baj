import styles from './page.module.css';

export default function CoverageAreasPage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>Coverage areas</h1>
          <p className={styles.lead}>
            Reliable waste collection where you need it. Expanding across Rwanda.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.current}>
            <h2 className={styles.sectionTitle}>Current service area</h2>
            <p className={styles.areaName}>Rwanda — Kigali — Gasabo District</p>
            <p className={styles.bodyText}>
              Our primary operations are centered in Gasabo, serving residential neighborhoods, commercial zones, hotels, and government offices throughout the district. We maintain daily, weekly, and bi-weekly collection routes covering the full extent of Gasabo.
            </p>
          </div>

          <div className={styles.schedule}>
            <h3 className={styles.subTitle}>Service schedule lookup</h3>
            <p className={styles.bodyText}>
              Enter your address to find your collection day and frequency options. Our team can verify coverage and recommend the best plan for your location.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.altSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Expansion plans</h2>
          <p className={styles.bodyText}>
            BAJ Ltd is actively working to extend reliable waste management services to additional districts across Kigali and, eventually, to other major cities in Rwanda.
          </p>
          <div className={styles.waitlist}>
            <p className={styles.waitlistText}>
              Want us in your area? Join our waitlist and we will notify you when service becomes available.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
