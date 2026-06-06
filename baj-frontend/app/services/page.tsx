import { services, comparison } from '@/lib/constants/services';
import styles from './page.module.css';

export default function ServicesPage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>Our services</h1>
          <p className={styles.lead}>
            Comprehensive waste management solutions for every sector in Rwanda.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {services.map((s) => (
              <div key={s.title} className={styles.card}>
                <h2 className={styles.cardTitle}>{s.title}</h2>
                <ul className={styles.cardList}>
                  {s.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {s.materials && (
                  <div className={styles.materials}>
                    <span className={styles.materialsLabel}>Materials accepted</span>
                    <ul className={styles.materialsList}>
                      {s.materials.map((m) => (
                        <li key={m}>{m}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {s.ideal && (
                  <p className={styles.ideal}>
                    <span>Ideal for:</span> {s.ideal}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.comparisonSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Service comparison</h2>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Household</th>
                  <th>Commercial</th>
                  <th>Hospitality</th>
                  <th>Government</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.feature}>
                    <td>{row.feature}</td>
                    <td>{row.household}</td>
                    <td>{row.commercial}</td>
                    <td>{row.hospitality}</td>
                    <td>{row.government}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
