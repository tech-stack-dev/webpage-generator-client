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
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema';
import { IS_MVP_COMPLETED } from './constants';

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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(
      'Errors during validation of the schema values occured:',
      errors
    );
    const heroSectionPrompts = data.heroContentPrompts.map(
      (prompt) => prompt.value
    );

    const mainContentPrompts = data.contentPrompts.map(
      (prompt) => prompt.value
    );

    const geos = data.geo.split(',').map((geo) => geo.trim());

    if (geos.length < 1) {
      toast.error('Please enter at least one location in the %geo% field.');
      return;
    }

    setIsLoading(true);

    for (const geo of geos) {
      const request: PageGenerationRequest = {
        name: data.name,
        basePage: data.basePage,
        geo: geo,
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

      const loadingToastId = toast.loading('Generating');
      try {
        console.log('Request to generate page:', request);
        const { data: result } = await generatePage(request);

        console.log('Response from generate page:', result);

        // NOTE: getting some data from service as placeholders were replaced with actual values
        if (result) {
          const page: IGeneratedPage = {
            breadcrumb: data.breadcrumb || '',
            heroContent: result.generatedHeroContent,
            heroTitle: result.heroSectionTitle,
            mainContent: result.generatedMainContent,
            metaDescription: result.metaDescription,
            metaTitle: result.metaTitle,
            name: data.name,
            slug: result.slug,
            geo: data.geo,
          };
          dispatch(saveGeneratedPage(page));
          toast.remove(loadingToastId);
          toast.success('Generated and saved to database successfully', {
            duration: 3000,
          });
        }
      } catch (error) {
        console.log(error);
        toast.error('An error occurred');
        toast.remove(loadingToastId);
      }
    }
    setIsLoading(false);
  };

  return (
    <form
      className={styles.generatePageForm}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <InputField
        label="Name"
        placeholder="AI Dev Services (4 New States)"
        {...register('name')}
        error={errors.name?.message}
      />
      <div className={styles.fieldHint}>
        Record name for quick search in table
      </div>
      <InputField
        label="%serviceType%"
        placeholder="AI development"
        {...register('serviceType')}
        error={errors.serviceType?.message}
      />
      <div className={styles.fieldHint}>Clearly defined service type</div>
      <InputField
        label="%slug%"
        placeholder="ai-development-in-%geo%"
        {...register('slug')}
        error={errors.slug?.message}
      />
      <div className={styles.fieldHint}>
        Write service type manually (ai-development-in). Use %geo% variable for
        location
      </div>
      <InputField
        label="%metaTitle%"
        placeholder="AI Development Company in %geo% | Techstack"
        {...register('metaTitle')}
        error={errors.metaTitle?.message}
      />
      <div className={styles.fieldHint}>
        Must include service and %geo% variable for location
      </div>
      <TextareaField
        label="%metaDescription%"
        placeholder="Techstack offers AI Development services in %geo%, focusing on developing solutions."
        {...register('metaDescription')}
        error={errors.metaDescription?.message}
      />
      <div className={styles.fieldHint}>
        Write service manually, not through variable %serviceType%
      </div>
      <TextareaField
        label="%structurePage%"
        placeholder="H2 Our Services in %geo%, H3 Case Study by Techstack,etc."
        {...register('structurePage')}
        error={errors.structurePage?.message}
      />
      <div className={styles.fieldHint}>
        DO NOT add H1. Can use %geo% variables
      </div>
      <InputField
        label="%minTextSize%"
        type="number"
        placeholder="15000"
        {...register('minTextSize')}
        error={errors.minTextSize?.message}
      />
      <div className={styles.fieldHint}>
        Minimum character count for SEO (doesn't always work perfectly)
      </div>
      <InputField
        label="%keywords%"
        placeholder="ai development company in %geo%, ai software development company in %geo%"
        {...register('keywords')}
        error={errors.keywords?.message}
      />
      <div className={styles.fieldHint}>
        Comma-separated keywords with dynamic geo variables (%geo%)
      </div>
      <InputField
        label="%geo%"
        placeholder="California,Texas,NewYork"
        {...register('geo')}
        error={errors.geo?.message}
      />
      <div className={styles.fieldHint}>
        Enter locations separated by commas without spaces (e.g.,
        California,London,Berlin)
      </div>
      <InputField
        label="%heroSectionTitle%"
        {...register('heroSectionTitle')}
        placeholder="AI Development in %geo%"
        error={errors.heroSectionTitle?.message}
      />
      <div className={styles.fieldHint}>
        Write service type manually, only %geo% as variable.
      </div>
      <TextareaField
        label="%basePage%"
        placeholder="<p>Our engineering-driven team collaborates...</p>"
        {...register('basePage')}
        error={errors.basePage?.message}
      />
      <div className={styles.fieldHint}>
        Copy reference page text without changes. Additional case studies can be
        added after main text
      </div>
      <DynamicInputList
        title="Hero content prompts"
        name="heroContentPrompts"
        placeholder="Generate engaging hero content for AI development services"
        control={control}
        register={register}
        error={errors.heroContentPrompts?.message}
      />
      <div className={styles.fieldHint}>Insert ready prompt</div>
      <DynamicInputList
        title="Main content prompts"
        control={control}
        name="contentPrompts"
        placeholder="Create comprehensive sections about AI development services and case studies"
        register={register}
        error={errors.contentPrompts?.message}
      />
      <div className={styles.fieldHint}>Insert ready prompt</div>
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
