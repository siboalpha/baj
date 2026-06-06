import type { Metadata } from 'next';
import OtpForm from '@/components/forms/OtpForm/OtpForm';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Verify code — BAJ Ltd',
};

export default function VerifyOtpPage() {
  return (
    <>
      <div className={styles.heading}>
        <h1 className={styles.title}>Check your email</h1>
        <p className={styles.subtitle}>
          We sent a 6-digit code to your email address. Enter it below to continue.
        </p>
      </div>
      <OtpForm />
    </>
  );
}
