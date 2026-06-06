'use client';

import { useState, useRef, useEffect, type KeyboardEvent, type ClipboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import Button from '@/components/ui/Button/Button';
import styles from './OtpForm.module.css';

const OTP_LENGTH = 6;

export default function OtpForm() {
  const { verifyOtp, pendingEmail } = useAuth();
  const router = useRouter();

  const [digits,  setDigits]  = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => { inputRefs.current[0]?.focus(); }, []);

  function updateDigit(index: number, value: string) {
    if (!/^\d?$/.test(value)) return;
    const next = [...digits];
    next[index] = value;
    setDigits(next);
    setError('');
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowLeft'  && index > 0)               inputRefs.current[index - 1]?.focus();
    if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1)  inputRefs.current[index + 1]?.focus();
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!pasted) return;
    const next = [...digits];
    pasted.split('').forEach((char, i) => { next[i] = char; });
    setDigits(next);
    inputRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const otp = digits.join('');
    if (otp.length < OTP_LENGTH) return;

    setError('');
    setLoading(true);
    const result = await verifyOtp(otp);
    setLoading(false);

    if (result.error) {
      setError(result.error);
      setDigits(Array(OTP_LENGTH).fill(''));
      inputRefs.current[0]?.focus();
      return;
    }

    router.replace('/clients');
  }

  const otp = digits.join('');

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {pendingEmail && (
        <p className={styles.sentTo}>
          Code sent to <span className={styles.email}>{pendingEmail}</span>
        </p>
      )}

      <div className={styles.boxes} role="group" aria-label="One-time code">
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => { inputRefs.current[i] = el; }}
            className={styles.box}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            data-filled={!!digit}
            data-error={!!error}
            onChange={(e) => updateDigit(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            onFocus={(e) => e.target.select()}
            autoComplete="one-time-code"
            aria-label={`Digit ${i + 1}`}
            disabled={loading}
          />
        ))}
      </div>

      {error && (
        <p className={styles.error} role="alert">{error}</p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={loading}
        disabled={otp.length < OTP_LENGTH}
        style={{ width: '100%' }}
      >
        Verify code
      </Button>

      <p className={styles.back}>
        Wrong account?{' '}
        <a href="/auth/login" className={styles.backLink}>Go back</a>
      </p>

      <p className={styles.devHint}>
        Dev OTP: <span className={styles.devVal}>123456</span>
      </p>
    </form>
  );
}
