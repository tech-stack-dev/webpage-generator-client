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
} from '@/store/slices/generatePageSlice';
import { useAppDispatch } from '@/store/hooks';
import { useState } from 'react';
import toast from 'react-hot-toast';

type Inputs = {
  serviceType: string;
  basePage: string;
  structurePage: string;
  minTextSize: number;
  keywords: string;
  metaTitle: string;
  metaDescription: string;
  geo: string;
  slug: string;
  breadcrumb: string;
  contentPrompts: { value: string }[];
  heroSectionTitle: string;
  heroContentPrompts: { value: string }[];
};

export const GeneratePageForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [generatePage] = useGeneratePageMutation();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, control } = useForm<Inputs>({
    defaultValues: {
      contentPrompts: [{ value: '' }],
      heroContentPrompts: [{ value: '' }],
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const heroSectionPrompts = data.heroContentPrompts.map(
      (prompt) => prompt.value
    );

    const mainContentPrompts = data.contentPrompts.map(
      (prompt) => prompt.value
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
      breadcrumb: data.breadcrumb,
      structurePage: data.structurePage,
      minTextSize: data.minTextSize,
      heroContentPrompts: heroSectionPrompts,
      mainContentPrompts: mainContentPrompts,
    };

    setIsLoading(true);
    const loadingToastId = toast.loading('Generating');
    try {
      const { data: result } = await generatePage(request);

      if (result) {
        const page: IGeneratedPage = {
          breadcrumb: data.breadcrumb,
          heroContent: result.generatedHeroContent,
          heroTitle: data.heroSectionTitle,
          mainContent: result.generatedMainContent,
          metaDescription: data.metaDescription,
          metaTitle: data.metaTitle,
          name: 'test',
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

  return (
    <form
      className={styles.generatePageForm}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <InputField
        label="%serviceType%"
        placeholder="AI development"
        {...register('serviceType')}
      />
      <TextareaField
        label="%basePage%"
        placeholder="Enter base page"
        {...register('basePage')}
      />
      <TextareaField
        label="%structurePage%"
        placeholder="Enter structure details"
        {...register('structurePage')}
      />
      <InputField
        label="%minTextSize%"
        type="number"
        placeholder="3000"
        {...register('minTextSize')}
      />
      <InputField
        label="%keywords%"
        placeholder="Enter relevant keywords"
        {...register('keywords')}
      />
      <InputField
        label="%metaTitle%"
        placeholder="Enter meta title"
        {...register('metaTitle')}
      />
      <TextareaField
        label="%metaDescription%"
        placeholder="Enter meta description"
        {...register('metaDescription')}
      />
      <InputField label="%geo%" placeholder="New York" {...register('geo')} />
      <InputField
        label="%slug%"
        placeholder="best-ai-development-services"
        {...register('slug')}
      />
      <InputField
        label="%breadcrumb%"
        placeholder="AI development in New York"
        {...register('breadcrumb')}
      />
      <DynamicInputList
        title="Main content prompts"
        control={control}
        name="contentPrompts"
        register={register}
      />
      <InputField
        label="%heroSectionTitle%"
        {...register('heroSectionTitle')}
      />
      <DynamicInputList
        title="Hero content prompts"
        name="heroContentPrompts"
        control={control}
        register={register}
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
