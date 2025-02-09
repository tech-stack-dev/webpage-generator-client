import classNames from 'classnames';
import { GeneratePageForm } from './components/GeneratePageForm';
import styles from './ContentGeneratorPage.module.css';
import { useAppSelector } from '@/store/hooks';

export const ContentGeneratorPage = () => {
  const generatedMainContent = useAppSelector(
    (state) => state.generatedPageSlice.mainContent
  );

  const generatedHeroContent = useAppSelector(
    (state) => state.generatedPageSlice.heroContent
  );
  return (
    <div className={styles.container}>
      <GeneratePageForm />
      <div
        className={classNames(
          styles.generatedContentSection,
          styles.generatedHeroSectionContent
        )}
      >
        {generatedHeroContent}
      </div>
      <div
        className={classNames(
          styles.generatedContentSection,
          styles.generatedMainContent
        )}
      >
        {generatedMainContent}
      </div>
    </div>
  );
};
