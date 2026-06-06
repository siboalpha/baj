import type { Metadata } from 'next';
import LoginForm from '@/components/forms/LoginForm/LoginForm';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Sign in — BAJ Ltd',
  description: 'Sign in to the BAJ Waste Collection Fee Management System.',
};

export default function LoginPage() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>

        {/* Brand */}
        <div className={styles.brand}>
          <span className={styles.brandMark}>BAJ</span>
          <div>
            <p className={styles.brandName}>BAJ Ltd</p>
            <p className={styles.brandSub}>Waste Collection Fee Management</p>
          </div>
        </div>

        {/* Heading */}
        <div className={styles.heading}>
          <h1 className={styles.title}>Sign in</h1>
          <p className={styles.subtitle}>
            Enter your registered phone number to receive a one-time code.
          </p>
        </div>

        {/* Form */}
        <LoginForm />

      </div>

      <p className={styles.footer}>
        © {new Date().getFullYear()} BAJ Ltd · Rwanda · Kigali · Gasabo
      </p>
    </div>
  );
}
