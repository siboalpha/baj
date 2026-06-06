import type { Metadata } from 'next';
import LoginForm from '@/components/forms/LoginForm/LoginForm';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Sign in — BAJ Ltd',
};

export default function LoginPage() {
  return (
    <>
      <div className={styles.heading}>
        <h1 className={styles.title}>Sign in</h1>
        <p className={styles.subtitle}>
          Enter your email and password to continue.
        </p>
      </div>
      <LoginForm />
    </>
  );
}
