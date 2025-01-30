import React, { useState } from 'react';
import './App.css';
import { Prompts } from './components/Prompts';
import { GeneratedData } from './components/GeneratedData';
import toast, { Toaster } from 'react-hot-toast';
import { CreateGeneratedPageDto } from './utils/types';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormValues {
  serviceType: string;
  basePage: string;
  structurePage: string;
  minTextSize: number;
  keywords: string;
  metaTitle: string;
  metaDescription: string;
  geo: string;
  slug: string;
}

export const App: React.FC = () => {
  const [inputs, setInputs] = useState<string[]>(['']);
  const [generatedData, setGenerationData] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formDataObject: CreateGeneratedPageDto = {
      serviceType: data.serviceType,
      basePage: data.basePage,
      structurePage: data.structurePage,
      minTextSize: String(data.minTextSize),
      keywords: data.keywords,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      geo: data.geo,
      slug: data.slug,
      prompts: inputs,
    };

    const toastId = toast.loading('Generating...');
    try {
      setIsLoading(true);

      const response = await fetch(
        'https://webpage-gen-back-production.up.railway.app/generated-page',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formDataObject),
        }
      );

      if (!response.ok) {
        toast.error(`Error: ${response.status} ${response.statusText}`);
      }

      const generated = await response.json();

      setGenerationData(JSON.stringify(generated.generatedPage, null, 2));

      toast.success('Page generated successfully!', { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error('An error occurred! Try again', {
        id: toastId,
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <form
        className="form"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="input-label" htmlFor="serviceType">
          %serviceType%
        </label>
        <input
          className="form-input"
          id="serviceType"
          {...register('serviceType', { required: 'Service Type is required' })}
        />
        {errors.serviceType && (
          <span className="error-message">{errors.serviceType.message}</span>
        )}

        <label className="input-label" htmlFor="basePage">
          %basePage%
        </label>
        <textarea
          className="form-input"
          id="basePage"
          {...register('basePage', { required: 'Base Page is required' })}
        />
        {errors.basePage && (
          <span className="error-message">{errors.basePage.message}</span>
        )}

        <label className="input-label" htmlFor="structurePage">
          %structurePage%
        </label>
        <textarea
          className="form-input"
          id="structurePage"
          {...register('structurePage', {
            required: 'Structure Page is required',
          })}
        />
        {errors.structurePage && (
          <span className="error-message">{errors.structurePage.message}</span>
        )}

        <label className="input-label" htmlFor="minTextSize">
          %minTextSize%
        </label>
        <input
          className="form-input"
          id="minTextSize"
          type="number"
          {...register('minTextSize', {
            required: 'Minimum Text Size is required',
            valueAsNumber: true,
            min: { value: 1, message: 'Minimum Text Size must be at least 1' },
          })}
        />
        {errors.minTextSize && (
          <span className="error-message">{errors.minTextSize.message}</span>
        )}

        <label className="input-label" htmlFor="keywords">
          %keywords%
        </label>
        <input
          className="form-input"
          id="keywords"
          {...register('keywords', { required: 'Keywords are required' })}
        />
        {errors.keywords && (
          <span className="error-message">{errors.keywords.message}</span>
        )}

        <label className="input-label" htmlFor="metaTitle">
          %metaTitle%
        </label>
        <input
          className="form-input"
          id="metaTitle"
          {...register('metaTitle', { required: 'Meta Title is required' })}
        />
        {errors.metaTitle && (
          <span className="error-message">{errors.metaTitle.message}</span>
        )}

        <label className="input-label" htmlFor="metaDescription">
          %metaDescription%
        </label>
        <textarea
          className="form-input"
          id="metaDescription"
          {...register('metaDescription', {
            required: 'Meta Description is required',
          })}
        />
        {errors.metaDescription && (
          <span className="error-message">
            {errors.metaDescription.message}
          </span>
        )}

        <label className="input-label" htmlFor="geo">
          %geo%
        </label>
        <input
          className="form-input"
          id="geo"
          {...register('geo', { required: 'Geo is required' })}
        />
        {errors.geo && (
          <span className="error-message">{errors.geo.message}</span>
        )}

        <label className="input-label" htmlFor="slug">
          %slug%
        </label>
        <input
          className="form-input"
          id="slug"
          {...register('slug', { required: 'Slug is required' })}
        />
        {errors.slug && (
          <span className="error-message">{errors.slug.message}</span>
        )}

        <Prompts inputs={inputs} setInputs={setInputs} />

        <button
          className="submit-button"
          type="submit"
          disabled={isLoading}
          style={{
            opacity: isLoading ? '0.5' : '1',
          }}
        >
          {isLoading ? 'Generating...' : 'Submit'}
        </button>
      </form>

      {/* Generated Data Display */}
      <GeneratedData data={generatedData} />
    </>
  );
};
