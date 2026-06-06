'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/lib/context/AuthContext';
import Button from '@/components/ui/Button/Button';
import InputField from '@/components/ui/InputField/InputField';
import styles from './LoginForm.module.css';

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPw,   setShowPw]   = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email.trim(), password);
    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    router.push('/auth/verify-otp');
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <InputField
        label="Email"
        type="email"
        placeholder="you@baj.rw"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
        disabled={loading}
      />

      <div className={styles.passwordField}>
        <InputField
          label="Password"
          type={showPw ? 'text' : 'password'}
          placeholder="Enter your password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
          disabled={loading}
        />
        <button
          type="button"
          className={styles.eyeBtn}
          onClick={() => setShowPw((v) => !v)}
          aria-label={showPw ? 'Hide password' : 'Show password'}
          tabIndex={-1}
        >
          {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      {error && (
        <p className={styles.error} role="alert">{error}</p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={loading}
        disabled={!email || !password}
        style={{ width: '100%' }}
      >
        Continue
      </Button>

      <p className={styles.hint}>
        A 6-digit code will be sent to your email to confirm sign-in.
      </p>

      <p className={styles.devHint}>
        Dev: <span className={styles.devVal}>admin@baj.rw</span> / <span className={styles.devVal}>Admin@123</span>
      </p>
    </form>
  );
}
