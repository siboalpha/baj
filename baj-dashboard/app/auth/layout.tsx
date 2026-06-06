import styles from './layout.module.css';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.shell}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <span className={styles.brandMark}>BAJ</span>
          <div>
            <p className={styles.brandName}>BAJ Ltd</p>
            <p className={styles.brandSub}>Staff Dashboard</p>
          </div>
        </div>
        {children}
      </div>
      <p className={styles.footer}>
        © {new Date().getFullYear()} BAJ Ltd · Rwanda · Kigali · Gasabo
      </p>
    </div>
  );
}
