import { FC } from 'react';
import styles from './OutputField.module.css';

interface IOutputFieldProps {
  title?: string;
  text: string;
}

export const OutputField: FC<IOutputFieldProps> = ({ title, text }) => {
  return (
    <div
      style={{
        width: '100%',
      }}
    >
      {title && <p className={styles.titleStyle}>{title}</p>}
      <div className={styles.text}>{text}</div>
      <p className={styles.charactersCount}>Characters count: {text.length}</p>
    </div>
  );
};
