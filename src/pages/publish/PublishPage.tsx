import { useGetPagesQuery } from '@/api/contentGeneratorApi/contentGeneratorApi';
import Select from 'react-select';

export const PublishPage = () => {
  const { data: pages, isLoading } = useGetPagesQuery();

  const options =
    pages?.map((page) => ({
      value: page.Name,
      label: page.Name,
    })) || [];

  return (
    <div>
      <Select
        options={options}
        isLoading={isLoading}
        placeholder="Select a page"
      />
      <button type="button">Publish</button>
    </div>
  );
};
