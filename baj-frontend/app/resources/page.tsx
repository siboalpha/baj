import { bins, tips, news } from '@/lib/constants/resources';
import styles from './page.module.css';

export default function ResourcesPage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>Resources</h1>
          <p className={styles.lead}>
            Guides, tips, and updates to help you manage waste responsibly.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Waste sorting guides</h2>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Bin type</th>
                  <th>Accepted materials</th>
                  <th>Not accepted</th>
                </tr>
              </thead>
              <tbody>
                {bins.map((b) => (
                  <tr key={b.type}>
                    <td>{b.type}</td>
                    <td>{b.accepted}</td>
                    <td>{b.notAccepted}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={styles.altSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Sustainability tips</h2>
          <ul className={styles.tipsList}>
            {tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Latest news & updates</h2>
          <div className={styles.newsGrid}>
            {news.map((item) => (
              <article key={item.title} className={styles.newsCard}>
                <h3 className={styles.newsTitle}>{item.title}</h3>
                <p className={styles.newsDesc}>{item.desc}</p>
                <time className={styles.newsDate}>{item.date}</time>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
