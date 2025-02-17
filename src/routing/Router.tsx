import { BrowserRouter, Route, Routes } from 'react-router';
import { App } from '../App';
import { ContentGeneratorPage } from '@pages/contentGenerator/ContentGeneratorPage';
import { PublishPage } from '@/pages/publish';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<ContentGeneratorPage />} />
        </Route>
        <Route path="publish" element={<PublishPage />} />
      </Routes>
    </BrowserRouter>
  );
};
