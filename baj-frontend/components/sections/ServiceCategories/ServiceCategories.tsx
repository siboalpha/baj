import { Home, Building2, Hotel, Landmark, Recycle, Wrench } from 'lucide-react';
import { SERVICE_CARDS } from '@/lib/constants/home';
import styles from './ServiceCategories.module.css';

const ICON_MAP: Record<string, React.ReactNode> = {
  Home: <Home size={20} strokeWidth={1.5} />,
  Building2: <Building2 size={20} strokeWidth={1.5} />,
  Hotel: <Hotel size={20} strokeWidth={1.5} />,
  Landmark: <Landmark size={20} strokeWidth={1.5} />,
  Recycle: <Recycle size={20} strokeWidth={1.5} />,
  Wrench: <Wrench size={20} strokeWidth={1.5} />,
};

export default function ServiceCategories() {
  return (
    <section id="services" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Services tailored to your needs</h2>
          <p className={styles.lead}>
            From residential households to large institutions, we provide reliable waste collection and management solutions across Rwanda.
          </p>
        </div>
        <div className={styles.grid}>
          {SERVICE_CARDS.map((s) => (
            <div key={s.title} className={styles.card}>
              <div className={styles.cardIcon}>{ICON_MAP[s.iconName]}</div>
              <h3 className={styles.cardTitle}>{s.title}</h3>
              <p className={styles.cardDesc}>{s.description}</p>
              <span className={styles.cardAudience}>{s.audience}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
