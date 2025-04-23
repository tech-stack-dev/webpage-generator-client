import { GeneratePageForm } from './components/GeneratePageForm';
import styles from './ContentGeneratorPage.module.css';

export const ContentGeneratorPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <GeneratePageForm />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      ></div>
    </div>
  );
};
