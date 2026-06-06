import { MapPin, Phone, Mail, Globe, Clock } from 'lucide-react';
import { departments } from '@/lib/constants/contact';
import styles from './page.module.css';

export default function ContactUsPage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>Contact us</h1>
          <p className={styles.lead}>
            We are here to answer your questions, provide quotes, and support your waste management needs.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.contactGrid}>
            <div className={styles.contactCard}>
              <MapPin size={18} strokeWidth={1.5} />
              <span className={styles.contactLabel}>Address</span>
              <span className={styles.contactValue}>Rwanda — Kigali — Gasabo</span>
            </div>
            <div className={styles.contactCard}>
              <Phone size={18} strokeWidth={1.5} />
              <span className={styles.contactLabel}>Phone</span>
              <span className={styles.contactValue}>+250 788 990 596 / 078 571 7650</span>
            </div>
            <div className={styles.contactCard}>
              <Mail size={18} strokeWidth={1.5} />
              <span className={styles.contactLabel}>Email</span>
              <a href="mailto:info@baj.rw" className={styles.contactLink}>info@baj.rw</a>
            </div>
            <div className={styles.contactCard}>
              <Globe size={18} strokeWidth={1.5} />
              <span className={styles.contactLabel}>Website</span>
              <a href="https://www.baj.rw" className={styles.contactLink}>www.baj.rw</a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.altSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Department contacts</h2>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Contact for</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((d) => (
                  <tr key={d.dept}>
                    <td>{d.dept}</td>
                    <td>{d.contactFor}</td>
                    <td>{d.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Office hours</h2>
          <div className={styles.hours}>
            <div className={styles.hoursItem}>
              <Clock size={16} strokeWidth={1.5} />
              <div>
                <span className={styles.hoursDay}>Monday — Friday</span>
                <span className={styles.hoursTime}>8:00 AM — 5:00 PM</span>
              </div>
            </div>
            <div className={styles.hoursItem}>
              <Clock size={16} strokeWidth={1.5} />
              <div>
                <span className={styles.hoursDay}>Saturday</span>
                <span className={styles.hoursTime}>8:00 AM — 12:00 PM</span>
              </div>
            </div>
            <div className={styles.hoursItem}>
              <Clock size={16} strokeWidth={1.5} />
              <div>
                <span className={styles.hoursDay}>Sunday</span>
                <span className={styles.hoursTime}>Closed</span>
              </div>
            </div>
            <div className={styles.hoursItem}>
              <Clock size={16} strokeWidth={1.5} />
              <div>
                <span className={styles.hoursDay}>Emergency line</span>
                <span className={styles.hoursTime}>Available 24/7 for urgent waste issues</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
