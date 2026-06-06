import Button from '@/components/ui/Button/Button';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section id="home" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.headline}>
            Reliable waste collection for homes, hotels &amp; businesses in Rwanda
          </h1>
          <p className={styles.subheadline}>
            Comprehensive waste management solutions tailored for households, commercial properties, hotels, and government institutions across Kigali and beyond.
          </p>
          <div className={styles.actions}>
            <Button variant="primary" size="lg" href="#get-a-quote">
              Get a free quote
            </Button>
            <Button variant="secondary" size="lg" href="#services">
              Explore our services
            </Button>
          </div>
        </div>

        <div className={styles.imageWrap}>
          {/* Replace src with actual hero image */}
          <img
            src="/images/hero-truck.png"
            alt="BAJ Ltd waste collection truck on a clean street in Kigali"
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}
