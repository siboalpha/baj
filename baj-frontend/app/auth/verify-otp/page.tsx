import type { Metadata } from 'next';
import OtpForm from '@/components/forms/OtpForm/OtpForm';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Verify OTP — BAJ Ltd',
};

export default function VerifyOtpPage() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>

        <div className={styles.brand}>
          <span className={styles.brandMark}>BAJ</span>
          <div>
            <p className={styles.brandName}>BAJ Ltd</p>
            <p className={styles.brandSub}>Waste Collection Fee Management</p>
          </div>
        </div>

        <div className={styles.heading}>
          <h1 className={styles.title}>Enter your code</h1>
          <p className={styles.subtitle}>
            We sent a 4-digit code to your phone. Enter it below to continue.
          </p>
        </div>

        <OtpForm />

      </div>

      <p className={styles.footer}>
        © {new Date().getFullYear()} BAJ Ltd · Rwanda · Kigali · Gasabo
      </p>
    </div>
  );
}
