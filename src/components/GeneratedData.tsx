import { FC } from 'react';

interface IGeneratedDataProps {
  data: string;
}

export const GeneratedData: FC<IGeneratedDataProps> = ({ data }) => {
  return (
    <div
      style={{
        background: '#FFFFFF',
        maxWidth: '600px',
        margin: 'auto',
        marginTop: '1rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <p
        style={{
          background: '#93c2c1',
          padding: '0.5rem',
        }}
      >
        Generated data:
      </p>
      {data || 'Here you will see your data'}
    </div>
  );
};
