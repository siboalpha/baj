'use client';

import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button/Button';
import InputField from '@/components/ui/InputField/InputField';
import styles from './PaymentForm.module.css';

type Method = 'mtn' | 'airtel' | 'card';

interface PaymentFormProps {
  amount: number;
  currency: string;
  period: string;
  onSuccess: () => void;
}

export default function PaymentForm({ amount, currency, period, onSuccess }: PaymentFormProps) {
  const [method, setMethod] = useState<Method>('mtn');
  const [phone, setPhone] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function autofillMomo() {
    setPhone(method === 'mtn' ? '0788123456' : '0728123456');
  }

  function autofillCard() {
    setCardNumber('4242 4242 4242 4242');
    setExpiry('12/28');
    setCvv('123');
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 1800);
    }, 1400);
  }

  if (success) {
    return (
      <div className={styles.successState}>
        <div className={styles.successIcon}>
          <CheckCircle size={40} />
        </div>
        <p className={styles.successTitle}>Payment successful</p>
        <p className={styles.successSub}>
          {currency} {amount.toLocaleString()} · {period}
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>

      {/* Amount summary */}
      <div className={styles.summary}>
        <span className={styles.summaryLabel}>Amount due</span>
        <span className={styles.summaryAmount}>
          {currency} {amount.toLocaleString()}
        </span>
        <span className={styles.summaryPeriod}>{period}</span>
      </div>

      {/* Method selector */}
      <div className={styles.methods}>
        {(['mtn', 'airtel', 'card'] as Method[]).map((m) => (
          <button
            key={m}
            type="button"
            className={styles.methodBtn}
            data-active={method === m}
            onClick={() => setMethod(m)}
          >
            <span className={styles.methodIcon} data-method={m} />
            <span className={styles.methodLabel}>
              {m === 'mtn' ? 'MTN Momo' : m === 'airtel' ? 'Airtel Money' : 'Card'}
            </span>
          </button>
        ))}
      </div>

      {/* Momo fields */}
      {(method === 'mtn' || method === 'airtel') && (
        <div className={styles.fields}>
          <div className={styles.fieldRow}>
            <InputField
              label={method === 'mtn' ? 'MTN phone number' : 'Airtel phone number'}
              type="tel"
              placeholder="07XXXXXXXX"
              value={phone}
              onChange={(e) => setPhone((e.target as HTMLInputElement).value)}
              hint="Enter the registered mobile money number"
            />
          </div>
          <Button type="button" variant="ghost" size="sm" onClick={autofillMomo}>
            Autofill test number
          </Button>
        </div>
      )}

      {/* Card fields */}
      {method === 'card' && (
        <div className={styles.fields}>
          <InputField
            label="Card number"
            type="text"
            placeholder="0000 0000 0000 0000"
            value={cardNumber}
            onChange={(e) => setCardNumber((e.target as HTMLInputElement).value)}
          />
          <div className={styles.cardRow}>
            <InputField
              label="Expiry"
              type="text"
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) => setExpiry((e.target as HTMLInputElement).value)}
            />
            <InputField
              label="CVV"
              type="text"
              placeholder="123"
              value={cvv}
              onChange={(e) => setCvv((e.target as HTMLInputElement).value)}
            />
          </div>
          <Button type="button" variant="ghost" size="sm" onClick={autofillCard}>
            Autofill test card
          </Button>
        </div>
      )}

      <Button
        variant="primary"
        size="lg"
        type="submit"
        loading={loading}
      >
        Pay {currency} {amount.toLocaleString()}
      </Button>

    </form>
  );
}
