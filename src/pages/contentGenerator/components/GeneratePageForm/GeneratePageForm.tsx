import { SubmitHandler, useForm } from 'react-hook-form';
import { InputField } from './components/InputField';
import styles from './GeneratePageForm.module.css';
import { TextareaField } from './components/TextareaField';
import { DynamicInputList } from './components/DynamicInputList';
import { PageGenerationRequest } from '@/api/contentGeneratorApi/types';
import { useGeneratePageMutation } from '@/api/contentGeneratorApi/contentGeneratorApi';
import {
  IGeneratedPage,
  saveGeneratedPage,
  togglePageGeneratedFlag,
} from '@/store/slices/generatePageSlice';
import { useAppDispatch } from '@/store/hooks';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema';
import { IS_MVP_COMPLETED } from './constants';
import { useAppSelector } from '@/store/hooks';
import { SaveToAirtableRequest } from '@/api/contentGeneratorApi/types';
import { useSaveToAirtableMutation } from '@/api/contentGeneratorApi/contentGeneratorApi';
import { store } from '@/store/store';

type Inputs = {
  name: string;
  serviceType: string;
  basePage: string;
  structurePage: string;
  minTextSize: number;
  keywords: string;
  metaTitle: string;
  metaDescription: string;
  geo: string;
  slug: string;
  breadcrumb?: string;
  contentPrompts: { value: string }[];
  heroSectionTitle: string;
  heroContentPrompts: { value: string }[];
};

export const GeneratePageForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [generatePage] = useGeneratePageMutation();
  const generatedPage = useAppSelector((state) => state.generatedPageSlice);
  const [saveToAirtable] = useSaveToAirtableMutation();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      contentPrompts: [{ value: '' }],
      heroContentPrompts: [{ value: '' }],
    },
  });

  const afterSubmit = useCallback(async () => {
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
      console.log('Save to airtable failed due to:', error);
      toast.error('An error occurred! Try again later', {
        duration: 3000,
      });
    }
  }, [
    generatedPage.breadcrumb,
    generatedPage.heroContent,
    generatedPage.heroTitle,
    generatedPage.mainContent,
    generatedPage.metaDescription,
    generatedPage.metaTitle,
    generatedPage.name,
    generatedPage.slug,
    saveToAirtable,
  ]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(
      'Errors during validation of the schema values occured:',
      errors,
    );
    const heroSectionPrompts = data.heroContentPrompts.map(
      (prompt) => prompt.value,
    );

    const mainContentPrompts = data.contentPrompts.map(
      (prompt) => prompt.value,
    );

    const request: PageGenerationRequest = {
      basePage: data.basePage,
      geo: data.geo,
      keywords: data.keywords,
      heroSectionTitle: data.heroSectionTitle,
      metaDescription: data.metaDescription,
      metaTitle: data.metaTitle,
      serviceType: data.serviceType,
      slug: data.slug,
      breadcrumb: data.breadcrumb || '',
      structurePage: data.structurePage,
      minTextSize: String(data.minTextSize),
      heroContentPrompts: heroSectionPrompts,
      mainContentPrompts: mainContentPrompts,
    };

    setIsLoading(true);
    const loadingToastId = toast.loading('Generating');
    try {
      const { data: result } = await generatePage(request);

      if (result) {
        const page: IGeneratedPage = {
          breadcrumb: data.breadcrumb || '',
          heroContent: result.generatedHeroContent,
          heroTitle: data.heroSectionTitle,
          mainContent: result.generatedMainContent,
          metaDescription: data.metaDescription,
          metaTitle: data.metaTitle,
          name: data.name,
          slug: data.slug,
        };
        dispatch(saveGeneratedPage(page));
        toast.success('Generated successfully', {
          duration: 3000,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred');
    }
    setIsLoading(false);
    toast.remove(loadingToastId);
  };

  useEffect(() => {
    const currentState = store.getState();

    if (!isLoading && currentState.generatedPageSlice.wasPageGenerated) {
      try {
        (async () => {
          await afterSubmit();
        })();
        dispatch(togglePageGeneratedFlag({ wasPageGenerated: false }));
      } catch (err) {
        console.log(err);
      }
    }
  }, [generatedPage, afterSubmit, isLoading, dispatch]);

  return (
    <form
      className={styles.generatePageForm}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <InputField
        label="Name"
        placeholder="My website"
        {...register('name')}
        error={errors.name?.message}
      />
      <InputField
        label="%serviceType%"
        placeholder="AI development"
        {...register('serviceType')}
        error={errors.serviceType?.message}
      />
      <TextareaField
        label="%basePage%"
        placeholder="Enter base page"
        {...register('basePage')}
        error={errors.basePage?.message}
      />
      <TextareaField
        label="%structurePage%"
        placeholder="Enter structure details"
        {...register('structurePage')}
        error={errors.structurePage?.message}
      />
      <InputField
        label="%minTextSize%"
        type="number"
        placeholder="3000"
        {...register('minTextSize')}
        error={errors.minTextSize?.message}
      />
      <InputField
        label="%keywords%"
        placeholder="Enter relevant keywords"
        {...register('keywords')}
        error={errors.keywords?.message}
      />
      <InputField
        label="%metaTitle%"
        placeholder="Enter meta title"
        {...register('metaTitle')}
        error={errors.metaTitle?.message}
      />
      <TextareaField
        label="%metaDescription%"
        placeholder="Enter meta description"
        {...register('metaDescription')}
        error={errors.metaDescription?.message}
      />
      <InputField
        label="%geo%"
        placeholder="New York"
        {...register('geo')}
        error={errors.geo?.message}
      />
      <InputField
        label="%slug%"
        placeholder="best-ai-development-services"
        {...register('slug')}
        error={errors.slug?.message}
      />
      {IS_MVP_COMPLETED ? (
        <InputField
          label="%breadcrumb%"
          placeholder="AI development in New York"
          {...register('breadcrumb')}
          error={errors.breadcrumb?.message}
        />
      ) : (
        <></>
      )}
      <DynamicInputList
        title="Main content prompts"
        control={control}
        name="contentPrompts"
        register={register}
        error={errors.contentPrompts?.message}
      />
      <InputField
        label="%heroSectionTitle%"
        {...register('heroSectionTitle')}
        placeholder="AI development in New York"
        error={errors.heroSectionTitle?.message}
      />
      <DynamicInputList
        title="Hero content prompts"
        name="heroContentPrompts"
        control={control}
        register={register}
        error={errors.heroContentPrompts?.message}
      />
      <button
        disabled={isLoading}
        className={styles.submitButton}
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};
