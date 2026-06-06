import { MapPin } from 'lucide-react';
import Button from '@/components/ui/Button/Button';
import styles from './CoverageArea.module.css';

export default function CoverageArea() {
  return (
    <section id="coverage-areas" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <MapPin size={20} strokeWidth={1.5} className={styles.icon} />
          <h2 className={styles.title}>Where we operate</h2>
          <p className={styles.lead}>
            Our primary operations are centered in Gasabo, serving residential neighborhoods, commercial zones, hotels, and government offices throughout the district.
          </p>
          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Currently serving</span>
              <span className={styles.metaValue}>Rwanda — Kigali — Gasabo District</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Expansion</span>
              <span className={styles.metaValue}>Reaching additional districts across Rwanda</span>
            </div>
          </div>
          <div className={styles.action}>
            <Button variant="primary" size="md" href="#get-a-quote">
              Check your area
            </Button>
          </div>
        </div>

        <div className={styles.imageWrap}>
          {/* Replace src with actual coverage map image */}
          <img
            src="/images/coverage-map.png"
            alt="Map showing Gasabo District within Kigali, Rwanda"
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}
