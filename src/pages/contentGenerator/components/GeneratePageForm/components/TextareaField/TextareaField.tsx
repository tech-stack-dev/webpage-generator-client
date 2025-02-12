import { forwardRef } from 'react';
import styles from './TextareaField.module.css';

interface ITextareaFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name?: string;
  label?: string;
  error?: string;
  placeholder?: string;
}

export const TextareaField = forwardRef<
  HTMLTextAreaElement,
  ITextareaFieldProps
>(({ name, label, error, placeholder, ...rest }, ref) => {
  return (
    <div className={styles.container}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        ref={ref}
        {...rest}
        className={styles.textareaStyle}
      />
      {error && <p className={styles.errorStyle}>{error}*</p>}
    </div>
  );
});
