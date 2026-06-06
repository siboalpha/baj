import { values, fleet, safety, careers } from '@/lib/constants/about';
import styles from './page.module.css';

export default function AboutUsPage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>About BAJ Ltd</h1>
          <p className={styles.lead}>
            Leading sustainable waste management in Rwanda since 2013.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.story}>
            <h2 className={styles.sectionTitle}>Our story</h2>
            <p className={styles.bodyText}>
              Established in 2013, BAJ Ltd began with a simple mission: to provide reliable, professional waste collection services where they were desperately needed. Over the past decade, we have grown from a small local operation to a comprehensive waste management provider serving households, businesses, hotels, and government institutions across Kigali.
            </p>
            <p className={styles.bodyText}>
              Our growth has been driven by a commitment to three principles: reliability, sustainability, and professionalism.
            </p>
          </div>

          <div className={styles.visionBlock}>
            <blockquote className={styles.visionQuote}>
              To be the leading provider of innovative and sustainable waste management solutions in Rwanda, contributing to a cleaner environment and a circular economy.
            </blockquote>
            <span className={styles.visionLabel}>Our vision</span>
          </div>

          <div className={styles.mission}>
            <h3 className={styles.subTitle}>Our mission</h3>
            <ol className={styles.missionList}>
              <li>To offer reliable and eco-friendly waste management services to all sectors of society</li>
              <li>To reduce environmental pollution through effective recycling and proper waste disposal</li>
              <li>To collaborate with stakeholders — government, businesses, and communities — in promoting sustainable practices</li>
            </ol>
          </div>
        </div>
      </section>

      <section className={styles.altSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Core values</h2>
          <div className={styles.valuesGrid}>
            {values.map((v) => (
              <div key={v.title} className={styles.valueCard}>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.twoCol}>
            <div>
              <h2 className={styles.subTitle}>Our fleet & facilities</h2>
              <ul className={styles.list}>
                {fleet.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className={styles.subTitle}>Safety & training</h2>
              <ul className={styles.list}>
                {safety.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.altSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Careers at BAJ Ltd</h2>
          <p className={styles.bodyText}>
            We are always looking for dedicated professionals to join our growing team.
          </p>
          <ul className={styles.careersList}>
            {careers.map((role) => (
              <li key={role}>{role}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
