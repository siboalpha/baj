import { Recycle, Leaf, BarChart3, Users } from 'lucide-react';
import { SUSTAINABILITY_STATS } from '@/lib/constants/home';
import styles from './SustainabilityStats.module.css';

const ICON_MAP: Record<string, React.ReactNode> = {
  Recycle: <Recycle size={20} strokeWidth={1.5} />,
  BarChart3: <BarChart3 size={20} strokeWidth={1.5} />,
  Leaf: <Leaf size={20} strokeWidth={1.5} />,
  Users: <Users size={20} strokeWidth={1.5} />,
};

export default function SustainabilityStats() {
  return (
    <section id="sustainability-impact" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Our sustainability impact</h2>
          <p className={styles.lead}>
            Waste management is not just about removal — it is about creating a circular economy where materials are recovered, reused, and reintegrated.
          </p>
        </div>
        <div className={styles.grid}>
          {SUSTAINABILITY_STATS.map((s) => (
            <div key={s.label} className={styles.card}>
              <div className={styles.cardIcon}>{ICON_MAP[s.iconName]}</div>
              <span className={styles.cardLabel}>{s.label}</span>
              <span className={styles.cardValue}>{s.value}</span>
              <p className={styles.cardDesc}>{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
