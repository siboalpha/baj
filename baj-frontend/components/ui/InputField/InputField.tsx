import type { InputHTMLAttributes, TextareaHTMLAttributes, ReactNode } from 'react';
import styles from './InputField.module.css';

interface BaseProps {
  label?: string;
  hint?: string;
  error?: string;
  /** Rendered on the right side of the label row (e.g. "Forgot password?" link) */
  labelAction?: ReactNode;
}

interface InputProps extends BaseProps, InputHTMLAttributes<HTMLInputElement> {
  as?: 'input';
}

interface TextareaProps extends BaseProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
  as: 'textarea';
}

type InputFieldProps = InputProps | TextareaProps;

export default function InputField(props: InputFieldProps) {
  const { label, hint, error, labelAction, as: Tag = 'input', id, ...rest } = props;

  const fieldId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
  const hintId  = hint  ? `${fieldId}-hint`  : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={styles.field}>
      {(label || labelAction) && (
        <div className={styles.labelRow}>
          {label && (
            <label htmlFor={fieldId} className={styles.label}>
              {label}
            </label>
          )}
          {labelAction && (
            <span className={styles.labelAction}>{labelAction}</span>
          )}
        </div>
      )}

      {Tag === 'textarea' ? (
        <textarea
          id={fieldId}
          className={styles.input}
          data-error={!!error}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={fieldId}
          className={styles.input}
          data-error={!!error}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {hint && !error && (
        <span id={hintId} className={styles.hint}>
          {hint}
        </span>
      )}
      {error && (
        <span id={errorId} className={styles.errorText} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
