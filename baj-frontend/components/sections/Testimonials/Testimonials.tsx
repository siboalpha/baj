import { TESTIMONIALS } from '@/lib/constants/home';
import styles from './Testimonials.module.css';

export default function Testimonials() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>What our clients say</h2>
        </div>
        <div className={styles.grid}>
          {TESTIMONIALS.map((t, i) => (
            <blockquote key={i} className={styles.card}>
              <p className={styles.quote}>{t.quote}</p>
              <footer className={styles.footer}>
                <span className={styles.author}>{t.author}</span>
                <span className={styles.location}>{t.location}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
