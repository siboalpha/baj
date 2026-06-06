import Button from '@/components/ui/Button/Button';
import styles from './FinalCTA.module.css';

export default function FinalCTA() {
  return (
    <section id="get-a-quote" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Ready for cleaner, greener waste management?</h2>
        <p className={styles.lead}>
          Join hundreds of households, businesses, and institutions across Kigali who trust BAJ Ltd for reliable waste collection.
        </p>
        <div className={styles.actions}>
          <Button variant="primary" size="lg" href="#get-a-quote">
            Get your free waste audit
          </Button>
        </div>
        <div className={styles.promise}>
          <span>Free, no-obligation quote</span>
          <span className={styles.dot} />
          <span>Response within 24 hours</span>
          <span className={styles.dot} />
          <span>Setup within 48 hours</span>
        </div>
      </div>
    </section>
  );
}
