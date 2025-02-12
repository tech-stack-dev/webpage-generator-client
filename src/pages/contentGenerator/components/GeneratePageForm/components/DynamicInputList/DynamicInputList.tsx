import { FC } from 'react';
import { useFieldArray, Control, UseFormRegister } from 'react-hook-form';
import styles from './DynamicInputList.module.css';

interface DynamicInputListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  name: string;
  title: string;
  error?: string;
}

export const DynamicInputList: FC<DynamicInputListProps> = ({
  control,
  register,
  name,
  title,
  error,
}) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name,
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
      }}
    >
      {title && (
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
          }}
        >
          <p>{title}</p>
          <button
            type="button"
            onClick={() => append({ value: '' })}
            className={styles.addTextareaButton}
          >
            +
          </button>
        </div>
      )}
      {fields.map((field, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <textarea
            key={field.id}
            {...register(`${name}.${index}.value`)}
            className={styles.textareaStyle}
          />
          <button
            type="button"
            onClick={() => remove(index)}
            className={styles.removeTextareaButton}
          >
            -
          </button>
        </div>
      ))}
      {error && <p className={styles.errorStyle}>{error}*</p>}
    </div>
  );
};
