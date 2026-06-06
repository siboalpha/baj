'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import Button from '@/components/ui/Button/Button';
import InputField from '@/components/ui/InputField/InputField';
import styles from './LoginForm.module.css';

export default function LoginForm() {
  const { requestOtp } = useAuth();
  const router = useRouter();

  const [phone,   setPhone]   = useState('');
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await requestOtp(phone.replace(/\s/g, ''));

    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    router.push('/auth/verify-otp');
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {error && (
        <div className={styles.errorBanner} role="alert">
          <span className={styles.errorIcon} aria-hidden="true">!</span>
          {error}
        </div>
      )}

      <InputField
        label="Phone number"
        type="tel"
        placeholder="07XX XXX XXX"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        autoComplete="tel"
        inputMode="numeric"
        required
        disabled={loading}
        hint="Enter the phone number registered with BAJ Ltd"
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={loading}
        disabled={phone.replace(/\s/g, '').length < 9}
        style={{ width: '100%', marginTop: 'var(--sp-1)' }}
      >
        Send OTP
      </Button>
    </form>
  );
}
