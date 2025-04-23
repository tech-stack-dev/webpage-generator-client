import { FC } from 'react';
import styles from './OutputField.module.css';

interface IOutputFieldProps {
  title?: string;
  text: string;
}

/**
 * Component that was previosly used for previews of generated content from AI
 * Not deleted for now in case of need for similar again in the future
 */
export const OutputField: FC<IOutputFieldProps> = ({ title, text }) => {
  return (
    <div style={{ width: '100%' }}>
      {title && <p className={styles.titleStyle}>{title}</p>}
      <div className={styles.text}>{text}</div>
      <p className={styles.charactersCount}>Characters count: {text.length}</p>
    </div>
  );
};
