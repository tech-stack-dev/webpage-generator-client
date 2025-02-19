import { useState } from 'react';
import Select from 'react-select';
import {
  useGetPagesQuery,
  useSaveToWebflowMutation,
} from '@/api/contentGeneratorApi/contentGeneratorApi';
import { SaveToWebflowRequest } from '@/api/contentGeneratorApi/types';
import { toast, Toaster } from 'react-hot-toast';

export const PublishPage = () => {
  const { data: pages, isLoading } = useGetPagesQuery();
  const [saveToWebflow] = useSaveToWebflowMutation();
  const [isSaving, setIsSaving] = useState(false);

  const [selectedPage, setSelectedPage] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const options =
    pages?.map((page) => ({
      value: page.Name,
      label: page.Name,
    })) || [];

  const onChange = (
    selectedOption: { value: string; label: string } | null
  ) => {
    setSelectedPage(selectedOption);
  };

  const onClick = async () => {
    if (!selectedPage?.value) {
      toast.error('Please select a page before publishing.', {
        duration: 3000,
      });
      return;
    }

    const toastId = toast.loading('Saving');
    setIsSaving(true);
    const request: SaveToWebflowRequest = {
      name: selectedPage.value,
    };

    try {
      await saveToWebflow(request);
      toast.success('Published', {
        duration: 3000,
      });
    } catch (error) {
      toast.error('An error occurred. Try again later');
    }
    toast.remove(toastId);
    setIsSaving(false);
  };

  return (
    <div
      style={{
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <Toaster />
      <Select
        options={options}
        isLoading={isLoading}
        placeholder="Select a page"
        onChange={onChange}
        value={selectedPage}
      />
      <button
        type="button"
        onClick={onClick}
        style={{
          maxWidth: '300px',
        }}
        disabled={isSaving}
      >
        Publish
      </button>
    </div>
  );
};
