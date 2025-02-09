import { forwardRef } from 'react';
import styles from './InputField.module.css';

interface IInputFieldProps {
  name: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  type?: React.HTMLInputTypeAttribute;
}

export const InputField = forwardRef<HTMLInputElement, IInputFieldProps>(
  ({ name, label, error, disabled, placeholder, type, ...rest }, ref) => {
    return (
      <div className={styles.container}>
        {label && (
          <label className={styles.label} htmlFor={name}>
            {label}
          </label>
        )}
        <input
          className={styles.inputField}
          id={name}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          type={type}
          ref={ref}
          {...rest}
        />
        {error && <p>{error}</p>}
      </div>
    );
  }
);
