import { GeneratePageForm } from './components/GeneratePageForm';
import styles from './ContentGeneratorPage.module.css';
import { useAppSelector } from '@/store/hooks';
import { SaveToAirtableRequest } from '@/api/contentGeneratorApi/types';
import { useSaveToAirtableMutation } from '@/api/contentGeneratorApi/contentGeneratorApi';
import toast from 'react-hot-toast';
import { OutputField } from './components/OutputField';

export const ContentGeneratorPage = () => {
  const [saveToAirtable] = useSaveToAirtableMutation();
  const generatedMainContent = useAppSelector(
    (state) => state.generatedPageSlice.mainContent
  );
  const generatedHeroContent = useAppSelector(
    (state) => state.generatedPageSlice.heroContent
  );
  const generatedPage = useAppSelector((state) => state.generatedPageSlice);

  const onClick = async () => {
    const request: SaveToAirtableRequest = {
      name: generatedPage.name,
      breadcrumb: generatedPage.breadcrumb,
      heroContent: generatedPage.heroContent,
      heroTitle: generatedPage.heroTitle,
      mainContent: generatedPage.mainContent,
      metaDescription: generatedPage.metaDescription,
      metaTitle: generatedPage.metaTitle,
      slug: generatedPage.slug,
    };

    try {
      await saveToAirtable(request).unwrap();
      toast.success('Updated airtable', {
        duration: 3000,
      });
    } catch (error) {
      toast.error('Error', {
        duration: 3000,
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <GeneratePageForm />
      </div>
      <div className={styles.outputsWrapper}>
        <OutputField title="Main content" text={generatedMainContent} />
        <OutputField title="Hero section" text={generatedHeroContent} />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <button
          onClick={onClick}
          style={{
            height: '50px',
            padding: '0.5rem',
          }}
        >
          Save to Airtable
        </button>
      </div>
    </div>
  );
};
