import { useState } from 'react';
import Select from 'react-select';
import {
  useGetPagesQuery,
  useSaveToWebflowMutation,
} from '@/api/contentGeneratorApi/contentGeneratorApi';
import { SaveToWebflowRequest } from '@/api/contentGeneratorApi/types';
import toast from 'react-hot-toast';

export const PublishPage = () => {
  const { data: pages, isLoading } = useGetPagesQuery();
  const [saveToWebflow] = useSaveToWebflowMutation();

  // Store selected item in state
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
    if (!selectedPage) {
      toast('Please select a page before publishing.', {
        duration: 3000,
      });
      return;
    }

    const request: SaveToWebflowRequest = {
      name: selectedPage.value,
    };

    await saveToWebflow(request);
  };

  return (
    <div>
      <Select
        options={options}
        isLoading={isLoading}
        placeholder="Select a page"
        onChange={onChange}
        value={selectedPage}
      />
      <button type="button" onClick={onClick}>
        Publish
      </button>
    </div>
  );
};
